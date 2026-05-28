# Toronto Charities — Charity Directory Data Import Spec

**For**: Claude Code
**Goal**: import every registered charity in the GTA from CRA open data, generate descriptions, and populate the database with 2,000-3,000 high-quality charity profiles within 1-2 weeks of launch.

This is a one-time bulk import. After it runs, ongoing additions come from the `/submit-a-charity/` form and quarterly CRA registry refresh.

---

## Source: CRA "List of Charities"

The Canada Revenue Agency publishes the complete list of registered Canadian charities as open data, updated quarterly.

### Where to get it

The data is available in two forms:

1. **Public web search (HTML, no bulk download)**: `apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyAdvncdSrch` — useful for spot-checks, not for import.

2. **Open Government Portal CSV bulk download**: search "List of Charities" on `open.canada.ca` — this returns a dataset titled something like "List of charities" with downloadable CSV/Excel. The dataset is maintained by CRA and refreshed quarterly.

**First action for Claude Code**: web fetch `https://open.canada.ca/data/en/dataset/?q=list+of+charities&sort=metadata_modified+desc` and locate the most recent active dataset. Confirm:
- License: Open Government Licence — Canada (allows commercial reuse with attribution)
- Format: CSV preferred
- Download size: ~50-100MB compressed

The CSV columns vary by release year. Expect (approximately):

| Column | Notes |
|--------|-------|
| BN/Registration Number | The CRA charity number, format `XXXXXXXXX RR XXXX` |
| Charity Name | Legal name |
| Operating Name | Display name if different from legal |
| Designation | "Charitable organization" / "Public foundation" / "Private foundation" |
| Address Line 1, 2 | Mailing address |
| City | |
| Province | |
| Postal Code | |
| Country | All "Canada" — filter elsewhere |
| Status | "Registered" / "Revoked" / "Annulled" — keep "Registered" only |
| Effective Date of Status | |
| Category | CRA's high-level category code (1-50 numeric) |
| Category Description | Human-readable version of the code |

**Backup source if CRA CSV is unavailable**: `apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyAdvncdSrch` supports paginated HTML scraping by province. Falls back to scraping with respectful rate limits (1 request/2 seconds, real User-Agent).

---

## Import pipeline

Build as a standalone script in `scripts/import-cra-charities.ts`. Run once during Phase 1. Idempotent — running it again updates existing records by CRA charity number, doesn't duplicate.

### Step 1: Download and parse

```typescript
// scripts/import-cra-charities.ts
import { parse } from 'csv-parse/sync';
import { db } from '@/lib/db';

const CRA_CSV_URL = '<resolved URL from open.canada.ca>';
const GTA_CITIES = [
  'Toronto', 'North York', 'Scarborough', 'Etobicoke', 'York', 'East York',
  'Mississauga', 'Brampton', 'Markham', 'Vaughan', 'Richmond Hill', 'Aurora',
  'Newmarket', 'King City', 'Stouffville', 'Whitchurch-Stouffville',
  'Oakville', 'Burlington', 'Milton', 'Halton Hills', 'Georgetown',
  'Pickering', 'Ajax', 'Whitby', 'Oshawa', 'Clarington', 'Bowmanville',
  'Caledon', 'Bolton', 'Orangeville',
];

async function main() {
  const response = await fetch(CRA_CSV_URL);
  const csv = await response.text();
  const records = parse(csv, { columns: true, skip_empty_lines: true });

  // Filter
  const gtaCharities = records.filter(r =>
    r['Status'] === 'Registered' &&
    r['Country'] === 'Canada' &&
    r['Province'] === 'ON' &&
    GTA_CITIES.some(city => r['City']?.trim().toLowerCase() === city.toLowerCase())
  );

  console.log(`Filtered ${gtaCharities.length} GTA registered charities`);

  // Insert in batches
  for (const charity of gtaCharities) {
    await upsertCharity(charity);
  }
}
```

### Step 2: Upsert with slug generation

```typescript
async function upsertCharity(record: CRARecord) {
  const craNumber = normalizeCraNumber(record['BN/Registration Number']);
  const legalName = record['Charity Name'].trim();
  const displayName = record['Operating Name']?.trim() || legalName;
  const slug = await generateUniqueSlug(displayName);

  await db.insert(charities).values({
    cra_charity_number: craNumber,
    legal_name: legalName,
    display_name: displayName,
    slug,
    address_street: [record['Address Line 1'], record['Address Line 2']].filter(Boolean).join(', '),
    address_city: record['City']?.trim(),
    address_postcode: record['Postal Code']?.trim(),
    cra_designation: record['Designation'],
    status: 'published',
    description: null,  // generated in step 3
    description_source: null,
    last_verified_at: new Date(),
  }).onConflictDoUpdate({
    target: charities.cra_charity_number,
    set: {
      legal_name: legalName,
      display_name: displayName,
      address_street: /* same as above */,
      address_city: record['City']?.trim(),
      address_postcode: record['Postal Code']?.trim(),
      cra_designation: record['Designation'],
      last_verified_at: new Date(),
    }
  });

  // Map category
  await mapCategory(craNumber, record['Category']);
}

function normalizeCraNumber(raw: string): string {
  // Strip whitespace, ensure format like "118809691 RR 0001"
  return raw.replace(/\s+/g, ' ').trim().toUpperCase();
}

async function generateUniqueSlug(name: string): Promise<string> {
  let base = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // strip diacritics
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);

  // De-stop-word
  base = base.replace(/^(the|a|an)-/, '');

  let slug = base;
  let suffix = 1;
  while (await slugExists(slug)) {
    suffix++;
    slug = `${base}-${suffix}`;
  }
  return slug;
}
```

### Step 3: Generate descriptions via Claude API

After all charities are inserted (no descriptions yet), run a second pass that generates descriptions in batches.

```typescript
// scripts/generate-charity-descriptions.ts
import Anthropic from '@anthropic-ai/sdk';

const claude = new Anthropic();
const BATCH_SIZE = 20;       // 20 charities per batch
const DELAY_MS = 1000;       // 1s between batches

async function main() {
  const pending = await db.select().from(charities)
    .where(eq(charities.description, null))
    .limit(10000);

  console.log(`${pending.length} charities need descriptions`);

  for (let i = 0; i < pending.length; i += BATCH_SIZE) {
    const batch = pending.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(generateAndSave));
    await sleep(DELAY_MS);
    console.log(`Processed ${Math.min(i + BATCH_SIZE, pending.length)}/${pending.length}`);
  }
}

async function generateAndSave(charity: Charity) {
  let websiteText = '';
  if (charity.website_url) {
    try {
      websiteText = await fetchCharitySite(charity.website_url);
    } catch {
      // No website or unreachable — generate from CRA data alone
    }
  }

  const description = await claude.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 600,
    messages: [{
      role: 'user',
      content: buildPrompt(charity, websiteText),
    }],
  });

  await db.update(charities).set({
    description: extractText(description),
    description_source: charity.website_url || 'CRA registry',
    updated_at: new Date(),
  }).where(eq(charities.id, charity.id));
}

function buildPrompt(charity: Charity, websiteText: string): string {
  return `
You are writing a charity profile description for Toronto Charities, a community directory. Your tone is warm but factual, never promotional, never charity's-own-marketing-copy.

Charity name: ${charity.display_name}
Legal name: ${charity.legal_name}
CRA designation: ${charity.cra_designation}
Location: ${charity.address_city}, Ontario
${charity.cra_charity_number ? `CRA charity number: ${charity.cra_charity_number}` : ''}

${websiteText ? `Their own website content (excerpt, may be marketing copy):
---
${websiteText.substring(0, 4000)}
---` : 'No public website content available; rely on the charity name and category to infer activities.'}

Write a 80-150 word description that explains:
1. What the charity does in concrete terms (programs, services, populations served)
2. Where it operates within the GTA (city, neighbourhood, region)
3. One specific detail that's not generic (a program name, a service offered, a community served)

Do NOT:
- Use marketing language: "dedicated to", "passionate about", "committed to", "tirelessly", "making a difference"
- Copy phrases directly from their website
- Make claims about effectiveness, impact, lives changed, or money raised that you can't verify
- Use em dashes
- Start with "Founded in..." or any other formula
- Begin sentences with the charity's name more than once

Write in third person, present tense. Aim for sentences that a journalist would write. If the website text is sparse or unclear, write less rather than fabricate.

Output the description only — no preamble, no quotes, no explanation.
`;
}
```

### Step 4: Fetch charity websites (when available)

For each CRA record, the website is sometimes in the registry but often not. Two-step approach:

```typescript
async function findCharityWebsite(charity: Charity): Promise<string | null> {
  // 1. Check CRA charity public detail page (slow but authoritative)
  const craUrl = `https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyRprtngPrd?q.charityName=${encodeURIComponent(charity.legal_name)}&q.charityRegistrationNumber=${charity.cra_charity_number.replace(/\s+/g, '')}`;

  try {
    const html = await fetch(craUrl).then(r => r.text());
    const websiteMatch = html.match(/Website[^<]*<[^>]+>([^<]+)/i);
    if (websiteMatch) return normalizeUrl(websiteMatch[1]);
  } catch {}

  // 2. Fallback: Google CSE programmatic search
  // Only use this for charities marked is_featured or claimed, to save quota
  return null;
}
```

Then fetch:

```typescript
async function fetchCharitySite(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; TorontoCharitiesBot/1.0; +https://toronto-charities.ca/bot)',
    },
    signal: AbortSignal.timeout(8000),
  });

  const html = await res.text();
  // Strip nav, footer, scripts — keep the main content
  const text = extractMainContent(html);
  return text.substring(0, 8000);
}
```

Use a library like `cheerio` to extract `<main>`, `<article>`, or `<body>` content, stripping nav and footer. Don't over-engineer — 8KB of mixed-quality text is enough for Claude to write a 100-word description.

### Step 5: Category mapping

CRA uses a numeric category code (~50 categories). Map to our taxonomy:

```typescript
// lib/cra-category-map.ts
export const CRA_TO_INTERNAL_CATEGORY: Record<string, string[]> = {
  // CRA category → array of internal slugs (may be multiple)

  // Welfare & relief
  '101': ['homelessness', 'food-security'],
  '102': ['housing', 'homelessness'],
  '103': ['food-security'],

  // Health
  '110': ['health'],
  '111': ['cancer'],
  '112': ['mental-health'],
  '113': ['health'],

  // Children & youth
  '120': ['children', 'youth'],
  '121': ['early-childhood-studies'],
  '122': ['youth'],

  // Education
  '130': ['education'],

  // Arts & culture
  '140': ['arts-culture'],

  // Religion
  '150': ['religion'],  // listed but lower priority

  // Animals & environment
  '160': ['animals'],
  '161': ['environmental'],

  // Community
  '170': ['community-wellness'],
  '171': ['seniors'],
  '172': ['indigenous'],
  '173': ['refugees-newcomers'],
  '174': ['lgbtq'],
  '175': ['womens-services'],

  // Other / general
  '180': ['ngos'],
  '190': ['fundraising-events'],

  // Default
  '_default': ['ngos'],
};
```

The exact mapping should be built by reading the CRA category codes from the data file once and mapping each to our internal taxonomy. Adjust during the first import based on what shows up.

For each charity, also do a keyword-based augmentation: if the description mentions "youth", add `youth`. If it mentions "environment" or "climate", add `environmental`. This adds depth to the category taxonomy beyond CRA's single-category-per-charity limit.

### Step 6: Featured charity selection

After all descriptions are generated, pick the initial `is_featured = true` set:

```typescript
async function selectInitialFeatured() {
  // Criteria for featured (auto-selected):
  // - Description quality score > threshold (manual scoring or length-based proxy)
  // - Public website confirmed
  // - Located in core Toronto (not far GTA)
  // - Recognised name (cross-reference Imagine Canada top 100 if available)

  // Manual override: a curated list of 30-50 well-known Toronto charities
  const wellKnown = [
    'daily-bread-food-bank',
    'covenant-house-toronto',
    'sick-kids-foundation',
    'second-harvest',
    'aga-khan-museum',  // arts
    'toronto-humane-society',
    'evergreen',  // environmental
    'centre-for-addiction-and-mental-health-foundation',  // CAMH
    // ... etc, ~30 entries
  ];

  await db.update(charities).set({ is_featured: true })
    .where(inArray(charities.slug, wellKnown));
}
```

The featured list grows organically as charities claim their profiles and as editorial content highlights specific ones.

---

## Data quality guardrails

- **Mandatory fields before publish**: legal_name, cra_charity_number, address_city, at least one category, slug
- **Optional but encouraged**: description, website_url, email, phone — if missing, profile still publishes but with lower priority in featured rotation
- **Duplicate detection**: CRA charity number is unique; on second runs of the import, match by CRA number and update fields, never duplicate
- **Status changes**: if a charity becomes "Revoked" in the next CRA refresh, set `status = 'hidden'` (keep the URL alive for SEO, but mark as not currently registered)
- **Description regeneration**: if a description was generated more than 6 months ago AND the charity has updated its website, queue for regeneration

---

## What this produces

After running this pipeline once:

- ~2,500-3,500 charity profiles populated (estimated GTA registered charity count)
- All with database-level structure (CRA number, address, category, slug)
- ~60-70% with Claude-written descriptions (where website was reachable or CRA description sufficient)
- ~30-40% with minimal descriptions (CRA registry data only — these are smaller charities without web presence; profiles still work but are thinner)
- Initial 30-50 marked as `is_featured` for homepage rotation
- All published, all crawlable, all schema-marked, all indexable

That's the Phase 1 deliverable from the build spec: "200+ charity organizations listed" — except we deliver 10x that count automatically.

---

## Compliance and attribution

The CRA data is published under the Open Government Licence — Canada. Required:

- Attribution somewhere on the site (footer or `/about/`): *"This directory includes data from the Canada Revenue Agency's List of Charities, used under the Open Government Licence — Canada."*
- No claim of authorship over the underlying registry data
- We can absolutely add our own descriptions, categorise differently, and present it however we like

Charity information (name, address, registration) is public record. Charity website content excerpts used for description-writing are processed and rewritten — never republished verbatim. The published description is our own writing, attributable to Toronto Charities.

---

## Quarterly refresh

After launch, run the import again every 3 months when CRA publishes a refreshed dataset:

- New "Registered" charities → insert
- Changed addresses or names → update
- Newly "Revoked" or "Annulled" → set status to hidden
- Newly "Re-registered" → set status back to published

Build this as a cron job that runs the import script on the 1st of January, April, July, October.

---

*Spec version: 1.0*
