/**
 * Website discovery — fetches each charity's CRA profile page and extracts their website URL.
 * The CRA charity search pages include the charity's registered website.
 *
 * Usage:
 *   npx tsx --env-file=.env scripts/discover-websites.ts [--limit=N]
 *
 * Runs at ~1 req/sec to avoid hammering CRA. Expect ~2-4 hours for all 12k charities.
 * Safe to stop and re-run — skips charities that already have a website_url.
 */

import { db, charities } from '../db';
import { isNull, isNotNull, eq, sql } from 'drizzle-orm';

const DELAY_MS = 700;
const TIMEOUT_MS = 10000;
const CRA_BASE = 'https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch';

function delay() { return new Promise(r => setTimeout(r, DELAY_MS)); }

async function fetchWithTimeout(url: string): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TorontoCharitiesBot/1.0)',
        'Accept': 'text/html',
      },
    });
  } catch { return null; } finally { clearTimeout(timer); }
}

function extractWebsite(html: string): string | null {
  // CRA pages show website in a link labelled "Website" or in a specific field
  const patterns = [
    /Website[^<]*<[^>]+href=["']([^"']+)["'][^>]*>/i,
    /<a[^>]+href=["'](https?:\/\/(?!apps\.cra|canada\.ca|gc\.ca)[^"']+)["'][^>]*>\s*(?:Visit website|Website|www\.[^<]+)</i,
    /href=["'](https?:\/\/(?!apps\.cra|canada\.ca|gc\.ca|w3\.org|schema)[^"'\s]+)["'][^>]*class=["'][^"']*(?:website|web-site|url)[^"']*["']/i,
  ];
  for (const pat of patterns) {
    const m = html.match(pat);
    if (m?.[1] && !m[1].includes('javascript:') && !m[1].includes('mailto:')) {
      return m[1].trim();
    }
  }
  return null;
}

async function main() {
  const limitArg = process.argv.find(a => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 999999;

  const candidates = await db.select({
    id: charities.id,
    display_name: charities.display_name,
    cra_charity_number: charities.cra_charity_number,
  })
    .from(charities)
    .where(isNull(charities.website_url))
    .limit(limit);

  console.log(`Checking CRA profiles for ${candidates.length} charities...`);

  let found = 0;
  let checked = 0;

  for (const { id, display_name, cra_charity_number } of candidates) {
    if (!cra_charity_number) { checked++; continue; }
    checked++;

    try {
      const url = `${CRA_BASE}?q.bnRegistrationNumber=${encodeURIComponent(cra_charity_number)}`;
      const res = await fetchWithTimeout(url);
      if (!res?.ok) { await delay(); continue; }

      const html = await res.text();
      const website = extractWebsite(html);

      if (website) {
        await db.update(charities)
          .set({ website_url: website, updated_at: new Date() })
          .where(eq(charities.id, id));
        found++;
        if (found <= 10 || found % 100 === 0) {
          console.log(`  ✓ ${display_name}: ${website}`);
        }
      }
    } catch {}

    if (checked % 50 === 0) {
      process.stdout.write(`\r${checked}/${candidates.length} checked, ${found} websites found`);
    }

    await delay();
  }

  console.log(`\n\nDone. ${found} websites discovered from ${checked} charities checked.`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
