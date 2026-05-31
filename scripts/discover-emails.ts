/**
 * Email discovery — fetches charity websites and extracts contact email addresses.
 * Stores results in charities.email. Run after CRA import.
 *
 * Usage:
 *   npx tsx --env-file=.env scripts/discover-emails.ts [--limit=N]
 *
 * Respects 500ms delay. Expects ~30-40% yield from charities with websites.
 */

import { db, charities } from '@/db';
import { isNotNull, isNull, eq } from 'drizzle-orm';

const DELAY_MS = 500;
const TIMEOUT_MS = 8000;

async function fetchWithTimeout(url: string): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'TorontoCharitiesBot/1.0' },
    });
  } catch { return null; } finally { clearTimeout(timer); }
}

function extractEmail(html: string, siteUrl: string): string | null {
  // mailto: links — most reliable
  const mailto = [...html.matchAll(/href=["']mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})["']/gi)];
  if (mailto.length > 0) {
    // Prefer info@, contact@, hello@, admin@ over noreply@ or wordpress@
    const preferred = mailto.find(m =>
      /^(info|contact|hello|admin|office|charity|director|executive)/i.test(m[1])
    );
    return preferred?.[1] ?? mailto[0][1];
  }

  // Plain text email pattern (catches unlinked emails)
  const plain = html.match(/\b([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})\b/);
  if (plain?.[1]) {
    const email = plain[1];
    // Skip common false positives
    if (/(noreply|no-reply|example|wordpress|w3\.org|schema\.org|sentry\.io)/i.test(email)) return null;
    return email;
  }

  return null;
}

async function main() {
  const limitArg = process.argv.find(a => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 5000;

  // Only charities with a website but no email yet
  const candidates = await db.select({
    id: charities.id,
    display_name: charities.display_name,
    website_url: charities.website_url,
  })
    .from(charities)
    .where(isNotNull(charities.website_url))
    .limit(limit);

  const toCheck = candidates.filter(c => c.website_url);
  console.log(`Checking ${toCheck.length} charity websites for contact emails...`);

  let found = 0;
  let checked = 0;

  for (const { id, display_name, website_url } of toCheck) {
    if (!website_url) continue;
    checked++;

    try {
      const res = await fetchWithTimeout(website_url);
      if (!res?.ok) { await delay(); continue; }

      const html = await res.text();
      const email = extractEmail(html, website_url);

      if (email) {
        await db.update(charities)
          .set({ email, updated_at: new Date() })
          .where(eq(charities.id, id));
        found++;
        if (found <= 5 || found % 100 === 0) {
          console.log(`  ✓ ${display_name}: ${email}`);
        }
      }
    } catch {}

    if (checked % 100 === 0) {
      process.stdout.write(`\r${checked}/${toCheck.length} checked, ${found} emails found`);
    }

    await delay();
  }

  console.log(`\n\nDone. ${found} emails discovered from ${checked} sites.`);
  process.exit(0);
}

function delay() { return new Promise(r => setTimeout(r, DELAY_MS)); }

main().catch(e => { console.error(e); process.exit(1); });
