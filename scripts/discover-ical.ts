/**
 * iCal feed discovery — crawls charity websites looking for .ics calendar feeds.
 * Run once after CRA import, then quarterly for new charities.
 *
 * Usage:
 *   npx tsx --env-file=.env scripts/discover-ical.ts [--limit N]
 *
 * Adds discovered feeds to event_sources so the weekly puller picks them up.
 * Respects a 500ms delay between requests — this is a slow crawl, not a scrape.
 */

import { db, charities, event_sources } from '@/db';
import { isNotNull, isNull, eq, and } from 'drizzle-orm';

const DELAY_MS = 500;
const TIMEOUT_MS = 8000;
const COMMON_ICS_PATHS = [
  '/calendar.ics',
  '/events.ics',
  '/feed.ics',
  '/calendar/feed/',
  '/events/feed/',
];

async function fetchWithTimeout(url: string, ms = TIMEOUT_MS): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function isValidIcs(url: string): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(url);
    if (!res || !res.ok) return false;
    const ct = res.headers.get('content-type') ?? '';
    if (ct.includes('text/calendar') || ct.includes('application/ics')) return true;
    const text = await res.text();
    return text.trimStart().startsWith('BEGIN:VCALENDAR');
  } catch {
    return false;
  }
}

async function discoverIcalForCharity(charity: { id: number; website_url: string }): Promise<string[]> {
  const found: string[] = [];

  // Fetch homepage HTML to look for .ics links and alternate calendar links
  const res = await fetchWithTimeout(charity.website_url);
  if (res?.ok) {
    const html = await res.text();

    // Explicit .ics href links
    const icsLinks = [...html.matchAll(/href=["']([^"']+\.ics[^"']*)["']/gi)]
      .map(m => m[1]);

    // rel="alternate" type="text/calendar"
    const altLinks = [...html.matchAll(/<link[^>]+type=["']text\/calendar["'][^>]+href=["']([^"']+)["']/gi)]
      .map(m => m[1]);

    // Google Calendar public iCal pattern
    const gcalLinks = [...html.matchAll(/calendar\.google\.com\/calendar\/ical\/([^/]+)\/public\/basic\.ics/gi)]
      .map(m => `https://calendar.google.com/calendar/ical/${m[1]}/public/basic.ics`);

    for (const href of [...icsLinks, ...altLinks, ...gcalLinks]) {
      try {
        const absolute = new URL(href, charity.website_url).toString();
        if (await isValidIcs(absolute)) found.push(absolute);
      } catch { /* invalid URL, skip */ }
    }
  }

  // Try common paths
  for (const path of COMMON_ICS_PATHS) {
    try {
      const url = new URL(path, charity.website_url).toString();
      if (!found.includes(url) && await isValidIcs(url)) found.push(url);
    } catch { /* skip */ }
  }

  return [...new Set(found)];
}

async function registerSource(charityId: number, url: string, charityName: string) {
  await db.insert(event_sources).values({
    charity_id: charityId,
    source_type: 'ical',
    source_url: url,
    source_name: `${charityName} — iCal`,
    is_active: true,
  }).onConflictDoNothing();
}

async function main() {
  const limitArg = process.argv.find(a => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 500;

  // Only charities that have a website_url and no iCal source yet
  const candidates = await db.select({
    id: charities.id,
    display_name: charities.display_name,
    website_url: charities.website_url,
  })
    .from(charities)
    .where(isNotNull(charities.website_url))
    .limit(limit);

  // Filter out ones that already have an iCal source registered
  const existingSources = await db.select({ charity_id: event_sources.charity_id })
    .from(event_sources)
    .where(eq(event_sources.source_type, 'ical'));
  const alreadyHasIcal = new Set(existingSources.map(s => s.charity_id));

  const toCheck = candidates.filter(c => !alreadyHasIcal.has(c.id));
  console.log(`Checking ${toCheck.length} charities for iCal feeds...`);

  let discovered = 0;

  for (let i = 0; i < toCheck.length; i++) {
    const charity = toCheck[i];
    if (!charity.website_url) continue;

    try {
      const feeds = await discoverIcalForCharity({ id: charity.id, website_url: charity.website_url });
      for (const url of feeds) {
        await registerSource(charity.id, url, charity.display_name);
        console.log(`  ✓ ${charity.display_name}: ${url}`);
        discovered++;
      }
    } catch (err) {
      // Silent — most charities won't have iCal feeds
    }

    if ((i + 1) % 50 === 0) {
      process.stdout.write(`\r${i + 1}/${toCheck.length} checked, ${discovered} feeds found`);
    }

    await new Promise(r => setTimeout(r, DELAY_MS));
  }

  console.log(`\n\nDone. ${discovered} iCal feeds registered.`);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
