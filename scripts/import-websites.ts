/**
 * Imports website URLs from CRA open data weburl CSV into charities table.
 * Matches on cra_charity_number (BN).
 *
 * Usage:
 *   npx tsx --env-file=.env scripts/import-websites.ts /tmp/cra_websites.csv
 */

import { readFileSync } from 'node:fs';
import { parse } from 'csv-parse/sync';
import { db, charities } from '../db';
import { eq } from 'drizzle-orm';

function normaliseUrl(raw: string): string | null {
  let u = raw.trim().toLowerCase();
  if (!u) return null;
  if (!u.startsWith('http')) u = 'https://' + u;
  try { new URL(u); return u; } catch { return null; }
}

async function main() {
  const csvPath = process.argv[2] ?? '/tmp/cra_websites.csv';
  const rows = parse(readFileSync(csvPath, 'utf8'), {
    columns: true, skip_empty_lines: true, trim: true, bom: true,
  }) as Array<Record<string, string>>;

  // Build BN → URL map (keep first entry per BN)
  const map = new Map<string, string>();
  for (const row of rows) {
    const bn = (row['BN/NE'] ?? row['BN'] ?? '').trim().toUpperCase();
    const url = normaliseUrl(row['Contact URL'] ?? row['URL'] ?? '');
    if (bn && url && !map.has(bn)) map.set(bn, url);
  }
  console.log(`Loaded ${map.size} website entries from CSV`);

  // Load all charities with BN numbers
  const all = await db.select({
    id: charities.id,
    cra_charity_number: charities.cra_charity_number,
  }).from(charities);

  let updated = 0;
  for (const c of all) {
    const bn = c.cra_charity_number?.trim().toUpperCase();
    if (!bn) continue;
    const url = map.get(bn);
    if (!url) continue;
    await db.update(charities)
      .set({ website_url: url, updated_at: new Date() })
      .where(eq(charities.id, c.id));
    updated++;
    if (updated % 500 === 0) process.stdout.write(`\r${updated} updated...`);
  }

  console.log(`\nDone. ${updated} charities updated with website URLs.`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
