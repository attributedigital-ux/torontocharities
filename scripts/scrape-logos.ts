/**
 * Logo scraper — fetches og:image or apple-touch-icon from charity websites.
 * Run after CRA import. Slow by design (500ms delay).
 *
 * Usage:
 *   npx tsx --env-file=.env scripts/scrape-logos.ts [--limit=N]
 */

import { db, charities } from '@/db';
import { isNotNull, eq } from 'drizzle-orm';

const DELAY_MS = 500;
const TIMEOUT_MS = 7000;

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

function extractLogo(html: string, baseUrl: string): string | null {
  // og:image (best quality)
  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (og?.[1]) {
    try { return new URL(og[1], baseUrl).toString(); } catch {}
  }

  // apple-touch-icon (usually square, good for logos)
  const apple = html.match(/<link[^>]+rel=["']apple-touch-icon["'][^>]+href=["']([^"']+)["']/i)
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']apple-touch-icon["']/i);
  if (apple?.[1]) {
    try { return new URL(apple[1], baseUrl).toString(); } catch {}
  }

  // <link rel="icon"> with png/jpg
  const icon = html.match(/<link[^>]+rel=["']icon["'][^>]+href=["']([^"']*\.(?:png|jpg|jpeg|svg)[^"']*)["']/i);
  if (icon?.[1]) {
    try { return new URL(icon[1], baseUrl).toString(); } catch {}
  }

  return null;
}

async function main() {
  const limitArg = process.argv.find(a => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 1000;

  const candidates = await db.select({ id: charities.id, display_name: charities.display_name, website_url: charities.website_url })
    .from(charities)
    .where(isNotNull(charities.website_url))
    .limit(limit);

  const toCheck = candidates.filter(c => c.website_url);
  console.log(`Checking ${toCheck.length} charity websites for logos...`);

  let found = 0;
  for (let i = 0; i < toCheck.length; i++) {
    const { id, display_name, website_url } = toCheck[i];
    if (!website_url) continue;

    try {
      const res = await fetchWithTimeout(website_url);
      if (!res?.ok) continue;
      const html = await res.text();
      const logo = extractLogo(html, website_url);
      if (logo) {
        await db.update(charities).set({ logo_url: logo, updated_at: new Date() })
          .where(eq(charities.id, id));
        found++;
        if (found <= 10 || found % 50 === 0) console.log(`  ✓ ${display_name}: ${logo}`);
      }
    } catch {}

    if ((i + 1) % 100 === 0) process.stdout.write(`\r${i + 1}/${toCheck.length} checked, ${found} logos found`);
    await new Promise(r => setTimeout(r, DELAY_MS));
  }

  console.log(`\n\nDone. ${found} logos stored.`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
