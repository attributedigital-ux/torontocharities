/**
 * Claude Haiku enrichment pass — takes raw_events in 'pending' state and:
 * 1. Confirms the event is a real Toronto-area charity event (not a corporate promo)
 * 2. Rewrites the description to 60-120 words, plain prose, no AI fingerprints
 * 3. Extracts/confirms structured fields (cost, location, dates)
 * 4. Assigns a confidence score 0.0-1.0
 * 5. Links to a charity in our DB if the organiser name matches
 *
 * Runs as a weekly Batches API job (50% discount, 24h SLA is fine).
 * For small queues (<20 events), runs inline without batching.
 */

import Anthropic from '@anthropic-ai/sdk';
import { eq, isNull, and } from 'drizzle-orm';
import { db, raw_events, events, charities, event_sources } from '@/db';

const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 800;

const SYSTEM_PROMPT = `You process charity event listings for a Toronto charity directory.

For each event, return a JSON object with these fields:
{
  "is_charity_event": true/false,
  "confidence": 0.0-1.0,
  "title": "cleaned event title",
  "description": "60-120 word plain prose description",
  "cost_text": "Free" or "$25" or "From $50" or "Donation" etc,
  "reject_reason": null or "reason if not a charity event"
}

Rules for is_charity_event = true:
- The event is run by or benefits a registered charity, nonprofit, or community organization
- It is open to the public (galas, walks, auctions, concerts, fundraisers, community events)
- It takes place in Toronto or the GTA

Reject if:
- It's a corporate product launch, networking event, or conference with no charitable purpose
- It's a private members-only event with no public access
- Location is clearly outside the GTA

Description rules:
- Plain prose, one paragraph, third person
- Lead with what the event is and what it raises money for
- Include the date and location naturally if known
- No em dashes. No "Not just X but Y". No "Join us".
- No banned words: seamless, comprehensive, tailored, holistic, leverage, cutting-edge,
  empower, streamline, elevate, transformative, passionate, committed to, making a difference`;

type RawPayload = {
  title: string;
  description?: string | null;
  starts_at: string;
  ends_at?: string | null;
  location_name?: string | null;
  location_address?: string | null;
  registration_url?: string | null;
  cost_text?: string | null;
  organizer_name?: string | null;
};

function buildUserPrompt(payload: RawPayload): string {
  return [
    `Title: ${payload.title}`,
    payload.organizer_name ? `Organizer: ${payload.organizer_name}` : null,
    `Date: ${payload.starts_at}`,
    payload.location_name ? `Venue: ${payload.location_name}` : null,
    payload.location_address ? `Address: ${payload.location_address}` : null,
    payload.cost_text ? `Cost: ${payload.cost_text}` : null,
    payload.description ? `\nDescription:\n${payload.description.slice(0, 800)}` : null,
  ].filter(Boolean).join('\n');
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

const slugCache = new Set<string>();

async function uniqueSlug(title: string): Promise<string> {
  if (slugCache.size === 0) {
    const existing = await db.select({ slug: events.slug }).from(events);
    for (const { slug } of existing) slugCache.add(slug);
  }
  const base = slugify(title);
  let slug = base || 'event';
  let n = 1;
  while (slugCache.has(slug)) { n++; slug = `${base}-${n}`; }
  slugCache.add(slug);
  return slug;
}

async function findCharityId(organizerName: string | null | undefined): Promise<number | null> {
  if (!organizerName) return null;
  const rows = await db.select({ id: charities.id })
    .from(charities)
    .where(eq(charities.display_name, organizerName))
    .limit(1);
  return rows[0]?.id ?? null;
}

async function writeEvent(rawId: number, result: Record<string, unknown>, raw: typeof raw_events.$inferSelect) {
  const payload = raw.raw_payload as RawPayload;
  const charityId = await findCharityId(payload.organizer_name);
  const slug = await uniqueSlug(String(result.title ?? payload.title));

  await db.insert(events).values({
    slug,
    charity_id: charityId,
    title: String(result.title ?? payload.title),
    description: String(result.description ?? payload.description ?? ''),
    starts_at: new Date(payload.starts_at),
    ends_at: payload.ends_at ? new Date(payload.ends_at) : null,
    location_name: payload.location_name ?? null,
    location_address: payload.location_address ?? null,
    registration_url: payload.registration_url ?? null,
    cost_text: String(result.cost_text ?? payload.cost_text ?? ''),
    image_url: (payload as any).image_url ?? null,
    source_url: raw.source_url,
    source_type: 'eventbrite',
    status: Number(result.confidence ?? 0) >= 0.7 ? 'approved' : 'pending',
    confidence_score: String(result.confidence ?? '0.5'),
    approved_at: Number(result.confidence ?? 0) >= 0.7 ? new Date() : null,
    approved_by: Number(result.confidence ?? 0) >= 0.7 ? 'claude-haiku-auto' : null,
  }).onConflictDoNothing();

  // Update source approved count
  if (raw.source_id) {
    await db.update(event_sources).set({
      events_approved_count: db.$count(events, eq(events.source_url, raw.source_url ?? '')) as any,
    }).where(eq(event_sources.id, raw.source_id));
  }

  await db.update(raw_events).set({
    processed_status: 'done',
    processed_at: new Date(),
  }).where(eq(raw_events.id, rawId));
}

export async function enrichPendingEvents(useBatches = false): Promise<number> {
  const pending = await db.select()
    .from(raw_events)
    .where(eq(raw_events.processed_status, 'pending'))
    .limit(200);

  if (pending.length === 0) {
    console.log('No pending raw events to enrich.');
    return 0;
  }

  console.log(`Enriching ${pending.length} raw events...`);
  const client = new Anthropic();

  if (!useBatches || pending.length < 20) {
    // Inline processing for small queues
    let written = 0;
    for (const raw of pending) {
      try {
        const payload = raw.raw_payload as RawPayload;
        const res = await client.messages.create({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
          messages: [{ role: 'user', content: buildUserPrompt(payload) }],
        });

        const text = res.content[0].type === 'text' ? res.content[0].text : '';
        const cleaned = text.trim().replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
        const result = JSON.parse(cleaned);

        if (!result.is_charity_event) {
          await db.update(raw_events).set({ processed_status: 'rejected', processed_at: new Date() })
            .where(eq(raw_events.id, raw.id));
          continue;
        }

        await writeEvent(raw.id, result, raw);
        written++;
      } catch (err) {
        console.error(`Error enriching raw event ${raw.id}:`, (err as Error).message);
        await db.update(raw_events).set({ processed_status: 'error', processed_at: new Date() })
          .where(eq(raw_events.id, raw.id));
      }
    }
    return written;
  }

  // Batches API for large queues
  const requests = pending.map(raw => ({
    custom_id: String(raw.id),
    params: {
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: [{ type: 'text' as const, text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' as const } }],
      messages: [{ role: 'user' as const, content: buildUserPrompt(raw.raw_payload as RawPayload) }],
    },
  }));

  const batch = await client.messages.batches.create({ requests: requests as any });
  console.log(`Batch submitted: ${batch.id}`);
  console.log('Run poll-enrich with this ID when processing completes (~1-4 hours).');
  console.log(`  npx tsx --env-file=.env scripts/run-enrich.ts poll ${batch.id}`);
  return 0;
}
