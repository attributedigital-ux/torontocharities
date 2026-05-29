/**
 * Generates 80-150 word descriptions for charities that don't have one.
 * Uses Claude Haiku 4.5 via the Batches API — ~50% token discount, no rate limits.
 * Prompt caching on the static system prompt — cache reads are 90% cheaper than writes.
 *
 * Cost estimate: ~$4-5 for 12,000 charities (Haiku + Batches + caching)
 *
 * Usage:
 *   # Enqueue a batch and get a batch ID back (non-blocking)
 *   npx tsx --env-file=.env scripts/generate-descriptions.ts enqueue [--limit N]
 *
 *   # Check status of a batch and write results to DB
 *   npx tsx --env-file=.env scripts/generate-descriptions.ts poll <batch-id>
 *
 * The Batches API has a 24-hour processing SLA. "enqueue" submits the job;
 * "poll" is safe to run repeatedly and only writes results once the batch ends.
 */

import Anthropic from '@anthropic-ai/sdk';
import { eq, isNull, inArray } from 'drizzle-orm';
import { db, charities } from '@/db';

const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 600;

// Static system prompt — this is the cacheable portion.
// Sent with cache_control: ephemeral so it's reused across all requests in the batch.
const SYSTEM_PROMPT = `You write directory descriptions for a Toronto charity website.
Each description is 80-150 words, plain prose, one paragraph.

Rules:
- Write in third person ("The Daily Bread Food Bank is...")
- Lead with what the charity actually does, not who founded it or when
- Be specific about the cause area and who they serve
- Mention Toronto or the GTA once naturally
- Never use these words: seamless, comprehensive, tailored, holistic, bespoke,
  leverage, robust, ensure, peace of mind, top-notch, rest assured, cutting-edge,
  empower, streamline, unlock, elevate, game-changing, innovative, solution,
  deliverables, synergy, ecosystem, journey, curated, vibrant, dynamic,
  thriving, bustling, nestled, boasts, committed to, dedicated to, passionate,
  world-class, transformative, impactful, actionable, utilize, facilitate,
  paramount, furthermore, in conclusion, making a difference
- No em dashes (—). Use commas or periods.
- No rhetorical questions. No "Not just X, but Y" constructions.
- No trailing sentence like "Learn more at their website" or "Contact them today."

Output: a single JSON object with one key: {"description": "..."}
No other text. No markdown. No code fences.`;

function buildUserPrompt(charity: {
  display_name: string;
  legal_name: string;
  address_city: string | null;
  cra_designation: string | null;
  categoryName: string | null;
}): string {
  const parts = [
    `Charity name: ${charity.display_name}`,
    charity.legal_name !== charity.display_name
      ? `Legal name: ${charity.legal_name}`
      : null,
    `City: ${charity.address_city ?? 'Toronto'}`,
    `Designation: ${charity.cra_designation ?? 'Charitable organization'}`,
    charity.categoryName ? `Cause area: ${charity.categoryName}` : null,
  ].filter(Boolean);

  return parts.join('\n') + '\n\nWrite the description.';
}

async function enqueue(limit?: number) {
  const client = new Anthropic();

  // Fetch charities needing descriptions, with their primary category name
  const pending = await db.query.charities.findMany({
    where: isNull(charities.description),
    limit: limit ?? 15000,
    with: {
      categories: {
        with: { category: true },
        where: (cc, { eq }) => eq(cc.is_primary, true),
        limit: 1,
      },
    },
  });

  if (pending.length === 0) {
    console.log('All charities already have descriptions.');
    return;
  }

  console.log(`Building batch for ${pending.length} charities...`);

  const requests = pending.map((c) => ({
    custom_id: String(c.id),
    params: {
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: [
        {
          type: 'text' as const,
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' as const },
        },
      ],
      messages: [
        {
          role: 'user' as const,
          content: buildUserPrompt({
            display_name: c.display_name,
            legal_name: c.legal_name,
            address_city: c.address_city,
            cra_designation: c.cra_designation,
            categoryName: (c as any).categories?.[0]?.category?.name ?? null,
          }),
        },
      ],
    },
  }));

  // Batches API accepts up to 10,000 requests per batch
  // Split if needed
  const BATCH_LIMIT = 10000;
  const batchIds: string[] = [];

  for (let i = 0; i < requests.length; i += BATCH_LIMIT) {
    const slice = requests.slice(i, i + BATCH_LIMIT);
    const batch = await client.messages.batches.create({ requests: slice as any });
    batchIds.push(batch.id);
    console.log(`Batch ${batchIds.length} submitted: ${batch.id} (${slice.length} requests)`);
  }

  console.log('\nBatch IDs (save these):');
  batchIds.forEach((id) => console.log(' ', id));
  console.log('\nRun this when processing is complete (check in a few hours):');
  batchIds.forEach((id) =>
    console.log(`  npx tsx --env-file=.env scripts/generate-descriptions.ts poll ${id}`),
  );
}

async function poll(batchId: string) {
  const client = new Anthropic();

  const batch = await client.messages.batches.retrieve(batchId);
  console.log(`Batch ${batchId}: ${batch.processing_status}`);
  console.log(
    `  Succeeded: ${batch.request_counts.succeeded}  ` +
    `Errored: ${batch.request_counts.errored}  ` +
    `Processing: ${batch.request_counts.processing}  ` +
    `Canceled: ${batch.request_counts.canceled}`,
  );

  if (batch.processing_status !== 'ended') {
    console.log('Batch is still processing. Run poll again later.');
    return;
  }

  console.log('Writing results to database...');
  let written = 0;
  let skipped = 0;
  let errored = 0;

  for await (const result of await client.messages.batches.results(batchId)) {
    const charityId = parseInt(result.custom_id, 10);

    if (result.result.type !== 'succeeded') {
      errored++;
      continue;
    }

    const content = result.result.message.content[0];
    if (content.type !== 'text') { errored++; continue; }

    let description: string;
    try {
      const parsed = JSON.parse(content.text.trim());
      description = (parsed.description ?? '').trim();
    } catch {
      // Model didn't return valid JSON — try extracting text directly
      description = content.text.trim().replace(/^["']|["']$/g, '');
    }

    if (!description || description.length < 40) { skipped++; continue; }

    await db.update(charities).set({
      description,
      description_source: 'claude-haiku',
      updated_at: new Date(),
    }).where(eq(charities.id, charityId));

    written++;
    if (written % 500 === 0) {
      process.stdout.write(`\r${written} written...`);
    }
  }

  console.log(`\nDone. ${written} written, ${skipped} skipped, ${errored} errored.`);
}

const [cmd, arg] = process.argv.slice(2);

if (cmd === 'enqueue') {
  const limit = arg?.startsWith('--limit=')
    ? parseInt(arg.split('=')[1], 10)
    : undefined;
  enqueue(limit).catch((err) => { console.error(err); process.exit(1); });
} else if (cmd === 'poll') {
  if (!arg) { console.error('Usage: poll <batch-id>'); process.exit(1); }
  poll(arg).catch((err) => { console.error(err); process.exit(1); });
} else {
  console.log('Usage:');
  console.log('  npx tsx --env-file=.env scripts/generate-descriptions.ts enqueue [--limit=N]');
  console.log('  npx tsx --env-file=.env scripts/generate-descriptions.ts poll <batch-id>');
}
