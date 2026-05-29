/**
 * Manual event pull + enrich — run this to test the pipeline before Netlify deploy.
 *
 * Usage:
 *   npx tsx --env-file=.env scripts/pull-events.ts
 *
 * What it does:
 *   1. Pulls charity events from Eventbrite Toronto
 *   2. Runs Claude Haiku enrichment on any pending raw events
 *   3. Reports how many events landed in the events table
 */

import { db, events, raw_events } from '@/db';
import { eq, gte, count } from 'drizzle-orm';
import { pullEventbrite, ensureEventbriteSource } from '@/lib/events/eventbrite';
import { enrichPendingEvents } from '@/lib/events/enrich';

async function main() {
  console.log('=== Toronto Charities — event pull ===\n');

  // 1. Eventbrite
  console.log('Pulling from Eventbrite...');
  const sourceId = await ensureEventbriteSource();
  const found = await pullEventbrite(sourceId);
  console.log(`  ${found} raw events fetched\n`);

  // 2. Enrich
  console.log('Enriching with Claude Haiku...');
  const written = await enrichPendingEvents(false); // inline for test run
  console.log(`  ${written} events written to events table\n`);

  // 3. Report
  const [approved] = await db.select({ n: count() })
    .from(events)
    .where(eq(events.status, 'approved'));

  const [upcoming] = await db.select({ n: count() })
    .from(events)
    .where(eq(events.status, 'approved') && gte(events.starts_at, new Date()) as any);

  console.log(`=== Results ===`);
  console.log(`  Total approved events in DB: ${approved.n}`);
  console.log(`  Upcoming events: ${upcoming.n}`);
  console.log('\nDone.');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
