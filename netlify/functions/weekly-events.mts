/**
 * Netlify Scheduled Function — runs every Sunday at 23:00 UTC (7pm ET).
 * Only triggers the background worker. The pull and the Claude enrichment
 * take several minutes, which is longer than a scheduled function is allowed
 * (the run of 11 Oct 2026 was cut at 60 s before writing a single event, and
 * had been since June). Background functions get 15 minutes.
 *
 * Schedule: "0 23 * * 0"
 */

import type { Config } from '@netlify/functions';

export default async function handler() {
  const base = process.env.URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://toronto-charities.ca';
  const secret = process.env.EVENTS_TRIGGER_SECRET;
  if (!secret) {
    console.error('[weekly-events] EVENTS_TRIGGER_SECRET not set; not triggering');
    return new Response('missing secret', { status: 500 });
  }
  const res = await fetch(`${base}/.netlify/functions/pull-events-background`, {
    method: 'POST',
    headers: { 'x-trigger-secret': secret },
  });
  console.log(`[weekly-events] triggered background pull, status ${res.status}`);
  return new Response(JSON.stringify({ triggered: res.status }), { status: 200 });
}

export const config: Config = {
  schedule: '0 23 * * 0',
};
