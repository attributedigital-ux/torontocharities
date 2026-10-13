/**
 * Netlify Background Function (the -background suffix gives it 15 minutes).
 * Triggered by weekly-events.mts. Pulls new events from Eventbrite, then
 * enriches every pending raw event with Claude Haiku and writes the events
 * table, in passes of 200 until nothing is pending.
 */

import { pullEventbrite, ensureEventbriteSource } from '../../lib/events/eventbrite';
import { enrichPendingEvents } from '../../lib/events/enrich';

export default async function handler(req: Request) {
  const secret = process.env.EVENTS_TRIGGER_SECRET;
  if (!secret || req.headers.get('x-trigger-secret') !== secret) {
    return new Response('forbidden', { status: 403 });
  }

  console.log('[pull-events] Starting event pull...');
  try {
    const sourceId = await ensureEventbriteSource();
    const fetched = await pullEventbrite(sourceId);
    console.log(`[pull-events] ${fetched} raw events fetched`);

    let written = 0;
    for (let pass = 0; pass < 5; pass++) {
      const n = await enrichPendingEvents(false);
      console.log(`[pull-events] pass ${pass + 1}: ${n} events written`);
      written += n;
      if (n === 0) break;
    }
    console.log(`[pull-events] done: ${fetched} fetched, ${written} written`);
    return new Response(JSON.stringify({ fetched, written }), { status: 200 });
  } catch (err) {
    console.error('[pull-events] Error:', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
