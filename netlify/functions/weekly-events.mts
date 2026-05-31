/**
 * Netlify Scheduled Function — runs every Sunday at 23:00 UTC (7pm ET).
 * Pulls new events from Eventbrite, enriches with Claude Haiku, writes to DB.
 *
 * Schedule: "0 23 * * 0"
 */

import type { Config } from '@netlify/functions';
import { pullEventbrite, ensureEventbriteSource } from '../../lib/events/eventbrite';
import { enrichPendingEvents } from '../../lib/events/enrich';

export default async function handler() {
  console.log('[weekly-events] Starting event pull...');

  try {
    const sourceId = await ensureEventbriteSource();
    const fetched = await pullEventbrite(sourceId);
    console.log(`[weekly-events] ${fetched} raw events fetched`);

    const written = await enrichPendingEvents(false);
    console.log(`[weekly-events] ${written} events written to events table`);

    return new Response(JSON.stringify({ fetched, written }), { status: 200 });
  } catch (err) {
    console.error('[weekly-events] Error:', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}

export const config: Config = {
  schedule: '0 23 * * 0',
};
