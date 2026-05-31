/**
 * Eventbrite puller — extracts event URLs from public search pages,
 * then fetches structured data for each via the Eventbrite API v3.
 *
 * The /v3/events/search/ endpoint was removed in 2020 but individual
 * event lookups via /v3/events/{id}/ still work. We get the IDs from
 * the public search page HTML (event URLs are in the server-rendered JSON-LD).
 */

import Anthropic from '@anthropic-ai/sdk';
import { db, event_sources, raw_events } from '@/db';
import { eq, and } from 'drizzle-orm';

const BASE = 'https://www.eventbriteapi.com/v3';
const SEARCH_PAGES = [
  // Charity & fundraising — 4 pages
  'https://www.eventbrite.ca/d/canada--toronto/charity--fundraising/',
  'https://www.eventbrite.ca/d/canada--toronto/charity--fundraising/?page=2',
  'https://www.eventbrite.ca/d/canada--toronto/charity--fundraising/?page=3',
  'https://www.eventbrite.ca/d/canada--toronto/charity--fundraising/?page=4',
  // Fundraiser — 4 pages
  'https://www.eventbrite.ca/d/canada--toronto/fundraiser/',
  'https://www.eventbrite.ca/d/canada--toronto/fundraiser/?page=2',
  'https://www.eventbrite.ca/d/canada--toronto/fundraiser/?page=3',
  'https://www.eventbrite.ca/d/canada--toronto/fundraiser/?page=4',
  // Community & non-profit
  'https://www.eventbrite.ca/d/canada--toronto/community--non-profit/',
  'https://www.eventbrite.ca/d/canada--toronto/community--non-profit/?page=2',
  // Gala & auction
  'https://www.eventbrite.ca/d/canada--toronto/gala/',
  'https://www.eventbrite.ca/d/canada--toronto/auction/',
  // Volunteer & walk
  'https://www.eventbrite.ca/d/canada--toronto/volunteer/',
  'https://www.eventbrite.ca/d/canada--toronto/charity-walk/',
];

function extractEventIds(html: string): string[] {
  const ids = new Set<string>();
  // Event URLs: /e/anything-tickets-{id}
  const matches = html.matchAll(/"url":"https:\/\/www\.eventbrite\.[a-z]+\/e\/[^"]*-tickets-(\d+)"/g);
  for (const m of matches) ids.add(m[1]);
  // Also catch href patterns
  const hrefs = html.matchAll(/href="https:\/\/www\.eventbrite\.[a-z]+\/e\/[^"]*-tickets-(\d+)/g);
  for (const m of hrefs) ids.add(m[1]);
  return [...ids];
}

type EBEvent = {
  id: string;
  name: { text: string };
  description: { text: string | null };
  start: { utc: string };
  end: { utc: string };
  url: string;
  is_free: boolean;
  status: string;
  ticket_availability?: { minimum_ticket_price?: { display: string } };
  logo?: { url: string };
  organizer?: { name: string; website?: string | null };
  venue?: {
    name: string;
    address: { localized_address_display: string; city: string };
  };
};

async function fetchEvent(id: string, token: string): Promise<EBEvent | null> {
  const res = await fetch(
    `${BASE}/events/${id}/?expand=organizer,venue,ticket_availability&token=${token}`,
  );
  if (!res.ok) return null;
  return res.json();
}

function toCostText(ev: EBEvent): string {
  if (ev.is_free) return 'Free';
  return ev.ticket_availability?.minimum_ticket_price?.display ?? 'Paid';
}

function isGTA(ev: EBEvent): boolean {
  const city = (ev.venue?.address?.city ?? '').toLowerCase();
  if (!city) return true; // assume Toronto if no venue
  return (
    city.includes('toronto') || city.includes('mississauga') ||
    city.includes('brampton') || city.includes('markham') ||
    city.includes('vaughan') || city.includes('richmond hill') ||
    city.includes('oakville') || city.includes('scarborough') ||
    city.includes('north york') || city.includes('etobicoke') ||
    city.includes('pickering') || city.includes('ajax') ||
    city.includes('whitby') || city.includes('oshawa')
  );
}

export async function pullEventbrite(sourceId: number): Promise<number> {
  const token = process.env.EVENTBRITE_TOKEN;
  if (!token) throw new Error('EVENTBRITE_TOKEN not set');

  // Step 1: collect event IDs from search pages
  const allIds = new Set<string>();
  for (const pageUrl of SEARCH_PAGES) {
    try {
      const res = await fetch(pageUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TorontoCharitiesBot/1.0)' },
      });
      if (!res.ok) continue;
      const html = await res.text();
      const ids = extractEventIds(html);
      ids.forEach(id => allIds.add(id));
      console.log(`  ${pageUrl}: ${ids.length} event IDs found`);
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.warn(`  Error fetching ${pageUrl}:`, (err as Error).message);
    }
  }

  console.log(`  Total unique event IDs: ${allIds.size}`);

  // Step 2: fetch structured data for each event
  let found = 0;
  for (const id of allIds) {
    try {
      const ev = await fetchEvent(id, token);
      if (!ev) continue;

      // Skip ended events
      if (new Date(ev.start.utc) < new Date()) continue;
      if (ev.status === 'completed' || ev.status === 'canceled') continue;
      if (!isGTA(ev)) continue;

      const payload = {
        external_id: ev.id,
        title: ev.name.text,
        description: ev.description?.text ?? null,
        starts_at: ev.start.utc,
        ends_at: ev.end.utc,
        location_name: ev.venue?.name ?? null,
        location_address: ev.venue?.address?.localized_address_display ?? null,
        registration_url: ev.url,
        cost_text: toCostText(ev),
        image_url: ev.logo?.url ?? null,
        organizer_name: ev.organizer?.name ?? null,
        organizer_website: ev.organizer?.website ?? null,
      };

      await db.insert(raw_events)
        .values({
          source_id: sourceId,
          source_url: ev.url,
          external_id: ev.id,
          raw_payload: payload,
          processed_status: 'pending',
        })
        .onConflictDoNothing();

      found++;
      await new Promise(r => setTimeout(r, 100)); // stay well under rate limit
    } catch {
      // Silent — individual event failures are fine
    }
  }

  await db.update(event_sources).set({
    last_checked_at: new Date(),
    last_success_at: found > 0 ? new Date() : undefined,
    consecutive_failures: 0,
    events_found_count: found,
  }).where(eq(event_sources.id, sourceId));

  return found;
}

export async function ensureEventbriteSource(): Promise<number> {
  const existing = await db.select({ id: event_sources.id })
    .from(event_sources)
    .where(and(
      eq(event_sources.source_type, 'scrape'),
      eq(event_sources.source_url, 'https://www.eventbrite.ca/d/canada--toronto/charity--fundraising/'),
    ))
    .limit(1);

  if (existing[0]) return existing[0].id;

  const [row] = await db.insert(event_sources).values({
    source_type: 'scrape',
    source_url: 'https://www.eventbrite.ca/d/canada--toronto/charity--fundraising/',
    source_name: 'Eventbrite Toronto — Charity & Fundraising',
    is_active: true,
  }).returning({ id: event_sources.id });

  return row.id;
}
