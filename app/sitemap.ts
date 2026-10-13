import { MetadataRoute } from 'next';
import { db } from '@/db';
import {
  charities as charitiesTable,
  categories as categoriesTable,
  events as eventsTable,
  guides as guidesTable,
} from '@/db/schema';
import { eq, gte, and } from 'drizzle-orm';

const BASE = 'https://toronto-charities.ca';

const STATIC_PAGES: MetadataRoute.Sitemap = [
  // Only URLs that have a page. Eight entries listed here since 28 May 2026
  // never had one (fundraising, non-profits, jobs, contact, submit, how
  // claiming works, two without trailing slashes) and returned 404.
  { url: `${BASE}/`, changeFrequency: 'daily', priority: 1.0 },
  { url: `${BASE}/toronto-charities-list/`, changeFrequency: 'daily', priority: 0.95 },
  { url: `${BASE}/charity-events-toronto/`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE}/guides/`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE}/for-charities/`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/charity/claim/`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/about/`, changeFrequency: 'monthly', priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cats, chars, evts, guides] = await Promise.all([
    db.select({ slug: categoriesTable.slug, updated_at: categoriesTable.updated_at })
      .from(categoriesTable),

    db.select({ slug: charitiesTable.slug, claimed_at: charitiesTable.claimed_at, updated_at: charitiesTable.updated_at })
      .from(charitiesTable)
      .where(eq(charitiesTable.status, 'published')),

    db.select({ slug: eventsTable.slug, updated_at: eventsTable.updated_at })
      .from(eventsTable)
      .where(and(
        eq(eventsTable.status, 'approved'),
        gte(eventsTable.starts_at, new Date()),
      )),

    db.select({ path: guidesTable.path, updated_at: guidesTable.updated_at })
      .from(guidesTable)
      .where(eq(guidesTable.status, 'published')),
  ]);

  return [
    ...STATIC_PAGES,
    ...cats.map(c => ({
      url: `${BASE}/category/${c.slug}/`,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
      lastModified: c.updated_at,
    })),
    ...chars.map(c => ({
      url: `${BASE}/profile/${c.slug}/`,
      changeFrequency: 'weekly' as const,
      priority: c.claimed_at ? 0.7 : 0.5,
      lastModified: c.updated_at,
    })),
    ...evts.map(e => ({
      url: `${BASE}/listing/${e.slug}/`,
      changeFrequency: 'daily' as const,
      priority: 0.6,
      lastModified: e.updated_at,
    })),
    ...guides.map(g => ({
      url: `${BASE}${g.path}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      lastModified: g.updated_at,
    })),
  ];
}
