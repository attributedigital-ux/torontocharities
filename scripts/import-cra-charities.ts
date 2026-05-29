/**
 * Structural CRA import — inserts GTA charities (names, addresses, categories).
 * Run once in Phase 1. Idempotent: re-running updates existing records by CRA number.
 *
 * Usage:
 *   npx tsx --env-file=.env scripts/import-cra-charities.ts /path/to/ident_2023_update.csv
 *
 * Column names in the 2023 CRA ident CSV:
 *   BN, Category, Sub Category, Designation, Legal Name, Account Name,
 *   Address Line 1, Address Line 2, City, Province, Postal Code, Country
 *
 * Designation codes: C = Charitable organization, B = Public foundation, A = Private foundation
 */

import { readFileSync } from 'node:fs';
import { parse } from 'csv-parse/sync';
import { eq } from 'drizzle-orm';
import { db, charities, categories, charity_categories } from '@/db';

const GTA_CITIES = new Set([
  'toronto', 'north york', 'scarborough', 'etobicoke', 'york', 'east york',
  'mississauga', 'brampton', 'markham', 'vaughan', 'richmond hill', 'aurora',
  'newmarket', 'king city', 'stouffville', 'whitchurch-stouffville',
  'oakville', 'burlington', 'milton', 'halton hills', 'georgetown',
  'pickering', 'ajax', 'whitby', 'oshawa', 'clarington', 'bowmanville',
  'caledon', 'bolton', 'orangeville',
  'thornhill', 'woodbridge', 'concord', 'maple', 'nobleton',
  'don mills', 'willowdale', 'agincourt', 'malvern',
]);

// CRA category codes → our category slugs
// Derived from CRA's published category guide + charity name patterns
const CRA_CATEGORY_MAP: Record<string, string> = {
  '1':   'social-services',    // Relief of poverty
  '10':  'community-services', // Other charitable (catch-all)
  '11':  'education',          // Education
  '20':  'health',             // Health
  '30':  'religion',           // Religion
  '40':  'international',      // International aid
  '50':  'animal-welfare',     // Animal welfare
  '60':  'environment',        // Environment
  '70':  'community-services', // Other (general community)
  '80':  'housing',            // Housing
  '90':  'seniors',            // Seniors
  '100': 'arts-culture',       // Arts & culture
  '110': 'education',          // Education (schools, libraries)
  '120': 'health',             // Health
  '130': 'social-services',    // Social services
  '140': 'youth-children',     // Youth & children
  '150': 'sports-recreation',  // Sports & recreation
  '160': 'community-services', // Other community orgs
  '170': 'food-hunger',        // Food & hunger
  '180': 'housing',            // Housing
  '190': 'arts-culture',       // Arts (music, bands, galleries)
  '200': 'arts-culture',       // Arts & culture
  '210': 'community-services', // Foundations (private/public — no specific category)
};

const DESIGNATION_MAP: Record<string, string> = {
  'C': 'Charitable organization',
  'B': 'Public foundation',
  'A': 'Private foundation',
};

type CRARecord = Record<string, string>;

function normalizeCraNumber(raw: string): string {
  return raw.replace(/\s+/g, ' ').trim().toUpperCase();
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/^(the|a|an)-/, '')
    .substring(0, 80);
}

const slugCache = new Set<string>();

function generateUniqueSlug(name: string): string {
  const base = toSlug(name);
  let slug = base || 'charity';
  let suffix = 1;
  while (slugCache.has(slug)) {
    suffix++;
    slug = `${base}-${suffix}`;
  }
  slugCache.add(slug);
  return slug;
}

async function ensureCategories(): Promise<Map<string, number>> {
  const defaults = [
    { slug: 'arts-culture',      name: 'Arts & Culture',       order: 1 },
    { slug: 'animal-welfare',    name: 'Animal Welfare',        order: 2 },
    { slug: 'community-services',name: 'Community Services',    order: 3 },
    { slug: 'education',         name: 'Education',             order: 4 },
    { slug: 'environment',       name: 'Environment',           order: 5 },
    { slug: 'food-hunger',       name: 'Food & Hunger',         order: 6 },
    { slug: 'fundraising-events',name: 'Fundraising Events',    order: 7 },
    { slug: 'health',            name: 'Health',                order: 8 },
    { slug: 'housing',           name: 'Housing',               order: 9 },
    { slug: 'international',     name: 'International Aid',     order: 10 },
    { slug: 'religion',          name: 'Religion & Spirituality', order: 11 },
    { slug: 'seniors',           name: 'Seniors',               order: 12 },
    { slug: 'social-services',   name: 'Social Services',       order: 13 },
    { slug: 'sports-recreation', name: 'Sports & Recreation',   order: 14 },
    { slug: 'youth-children',    name: 'Youth & Children',      order: 15 },
  ];

  for (const def of defaults) {
    await db.insert(categories)
      .values({ slug: def.slug, name: def.name, display_order: def.order })
      .onConflictDoNothing();
  }

  const all = await db.select({ id: categories.id, slug: categories.slug }).from(categories);
  return new Map(all.map((c) => [c.slug, c.id]));
}

async function main() {
  const csvPath = process.argv[2];
  if (!csvPath) {
    console.error('Usage: npx tsx --env-file=.env scripts/import-cra-charities.ts /path/to/ident_2023_update.csv');
    process.exit(1);
  }

  console.log(`Reading ${csvPath}...`);
  const csvText = readFileSync(csvPath, 'utf8');

  const records: CRARecord[] = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  });

  const gtaRecords = records.filter(
    (r) =>
      r['Province'] === 'ON' &&
      GTA_CITIES.has((r['City'] ?? '').toLowerCase()),
  );

  console.log(`Total records: ${records.length.toLocaleString()}. GTA: ${gtaRecords.length.toLocaleString()}`);

  // Pre-load existing slugs so re-runs don't generate conflicts
  const existingSlugs = await db.select({ slug: charities.slug }).from(charities);
  for (const { slug } of existingSlugs) slugCache.add(slug);

  const categoryMap = await ensureCategories();
  console.log(`${categoryMap.size} categories ready`);

  let inserted = 0;
  let updated = 0;
  let errored = 0;

  for (let i = 0; i < gtaRecords.length; i++) {
    const r = gtaRecords[i];
    try {
      const craNumber = normalizeCraNumber(r['BN'] ?? '');
      if (!craNumber) { errored++; continue; }

      const legalName = (r['Legal Name'] ?? '').trim();
      const displayName = (r['Account Name'] ?? legalName).trim() || legalName;
      if (!legalName) { errored++; continue; }

      const addressStreet = [r['Address Line 1'], r['Address Line 2']]
        .filter(Boolean)
        .join(', ');

      const designation = DESIGNATION_MAP[r['Designation']?.trim()] ?? r['Designation'] ?? null;

      const existing = await db
        .select({ id: charities.id })
        .from(charities)
        .where(eq(charities.cra_charity_number, craNumber))
        .limit(1);

      let charityId: number;

      if (existing[0]) {
        await db.update(charities).set({
          legal_name: legalName,
          display_name: displayName,
          address_street: addressStreet || null,
          address_city: r['City']?.trim() || null,
          address_postcode: r['Postal Code']?.trim() || null,
          cra_designation: designation,
          last_verified_at: new Date(),
          updated_at: new Date(),
        }).where(eq(charities.cra_charity_number, craNumber));
        charityId = existing[0].id;
        updated++;
      } else {
        const slug = generateUniqueSlug(displayName);
        const [ins] = await db.insert(charities).values({
          cra_charity_number: craNumber,
          legal_name: legalName,
          display_name: displayName,
          slug,
          address_street: addressStreet || null,
          address_city: r['City']?.trim() || null,
          address_postcode: r['Postal Code']?.trim() || null,
          cra_designation: designation,
          status: 'published',
          description: null,
          last_verified_at: new Date(),
        }).returning({ id: charities.id });
        charityId = ins.id;
        inserted++;
      }

      // Assign primary category
      const catCode = (r['Category'] ?? '').trim();
      const catSlug = CRA_CATEGORY_MAP[catCode];
      if (catSlug && categoryMap.has(catSlug)) {
        await db.insert(charity_categories)
          .values({ charity_id: charityId, category_id: categoryMap.get(catSlug)!, is_primary: true })
          .onConflictDoNothing();
      }

      if ((i + 1) % 500 === 0) {
        process.stdout.write(`\r${i + 1}/${gtaRecords.length} — ${inserted} new, ${updated} updated, ${errored} errors`);
      }
    } catch (err) {
      errored++;
      if (errored <= 5) console.error(`\nRow ${i} error:`, (err as Error).message);
    }
  }

  console.log(`\n\nDone. ${inserted} inserted, ${updated} updated, ${errored} errors.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
