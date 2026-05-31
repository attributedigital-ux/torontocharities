import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import {
  Hero, EventsSection, CausesSection, FeaturedSection,
  ClaimSection, RecentSection, GuidesSection,
  type EventCardData, type CauseTileData, type CharityCardData,
  type RecentRowData, type GuideCardData,
} from '@/components/sections';
import { db } from '@/db';
import { charities, events, categories, charity_categories } from '@/db/schema';
import { eq, and, gte, desc, count, sql } from 'drizzle-orm';
import { format } from 'date-fns';

export const revalidate = 3600;

export default async function HomePage() {
  const now = new Date();

  const [charityCountResult, upcomingEventsRaw, categoriesRaw, featuredRaw, recentRaw] =
    await Promise.all([
      db.select({ n: count() }).from(charities).where(eq(charities.status, 'published')),

      db.select({
        slug: events.slug,
        title: events.title,
        starts_at: events.starts_at,
        location_name: events.location_name,
        cost_text: events.cost_text,
        image_url: events.image_url,
        charity_id: events.charity_id,
      })
        .from(events)
        .where(and(eq(events.status, 'approved'), gte(events.starts_at, now)))
        .orderBy(events.starts_at)
        .limit(6),

      db.select({
        slug: categories.slug,
        name: categories.name,
        display_order: categories.display_order,
        count: count(charity_categories.charity_id),
      })
        .from(categories)
        .leftJoin(charity_categories, eq(categories.id, charity_categories.category_id))
        .groupBy(categories.id)
        .orderBy(categories.display_order)
        .limit(20),

      db.select({
        slug: charities.slug,
        display_name: charities.display_name,
        description: charities.description,
        logo_url: charities.logo_url,
      })
        .from(charities)
        .where(and(eq(charities.status, 'published'), eq(charities.is_featured, true)))
        .limit(6)
        .then(async (rows) => {
          if (rows.length >= 3) return rows;
          return db.select({
            slug: charities.slug,
            display_name: charities.display_name,
            description: charities.description,
            logo_url: charities.logo_url,
          })
            .from(charities)
            .where(and(
              eq(charities.status, 'published'),
              sql`${charities.description} IS NOT NULL`,
              sql`${charities.logo_url} IS NOT NULL`,
            ))
            .limit(6);
        }),

      db.select({
        slug: charities.slug,
        display_name: charities.display_name,
        description: charities.description,
        created_at: charities.created_at,
      })
        .from(charities)
        .where(and(eq(charities.status, 'published'), sql`${charities.description} IS NOT NULL`))
        .orderBy(desc(charities.created_at))
        .limit(8),
    ]);

  // Fetch organizer names for events
  const charityIds = [...new Set(upcomingEventsRaw.map(e => e.charity_id).filter(Boolean) as number[])];
  const organizerMap = new Map<number, string>();
  if (charityIds.length > 0) {
    const orgs = await db.select({ id: charities.id, display_name: charities.display_name })
      .from(charities)
      .where(sql`${charities.id} = ANY(ARRAY[${sql.join(charityIds.map(id => sql`${id}`), sql`, `)}]::int[])`);
    orgs.forEach(o => organizerMap.set(o.id, o.display_name));
  }

  const upcomingEvents: EventCardData[] = upcomingEventsRaw.map(e => ({
    href: `/listing/${e.slug}/`,
    date: format(e.starts_at, 'EEE · MMM d'),
    title: e.title,
    host: (e.charity_id ? organizerMap.get(e.charity_id) : null) ?? 'Toronto charity',
    location: e.location_name ?? 'Toronto',
    time: e.cost_text ?? 'Free',
    imageUrl: e.image_url,
  }));

  const causes: CauseTileData[] = categoriesRaw.map(c => ({
    href: `/category/${c.slug}/`,
    name: c.name,
    count: Number(c.count),
    slug: c.slug,
  }));

  const featuredCharities: CharityCardData[] = featuredRaw.map(c => ({
    href: `/profile/${c.slug}/`,
    name: c.display_name,
    tags: '',
    description: c.description?.slice(0, 160) ?? '',
    logoUrl: c.logo_url,
  }));

  const recentlyAdded: RecentRowData[] = recentRaw.map(c => ({
    href: `/profile/${c.slug}/`,
    name: c.display_name,
    description: c.description?.slice(0, 100) ?? '',
    added: format(c.created_at, 'MMM d'),
  }));

  const guides: GuideCardData[] = [
    { href: '/guides/', category: 'Giving guide', title: 'How to find a reputable charity in Toronto', dek: 'What to look for when choosing a charity to support, and how to verify it is registered with the CRA.', readTime: '5 min read' },
    { href: '/guides/', category: 'Volunteer guide', title: 'Volunteering in Toronto: how to get started', dek: 'How to match your skills and schedule to a charity that needs them.', readTime: '4 min read' },
    { href: '/guides/', category: 'Event guide', title: 'Toronto charity events: what to expect', dek: 'A guide to galas, fundraising walks, auctions, and community events in the GTA.', readTime: '4 min read' },
    { href: '/guides/', category: 'Giving guide', title: 'How to donate effectively to Toronto charities', dek: 'Tax receipts, cause areas, and how charities use donations.', readTime: '6 min read' },
  ];

  return (
    <>
      <Nav />
      <main>
        <Hero charityCount={Number(charityCountResult[0]?.n ?? 0)} />
        {upcomingEvents.length > 0 && <EventsSection events={upcomingEvents} />}
        {causes.length > 0 && <CausesSection causes={causes} />}
        {featuredCharities.length > 0 && <FeaturedSection charities={featuredCharities} />}
        <ClaimSection />
        {recentlyAdded.length > 0 && <RecentSection rows={recentlyAdded} />}
        <GuidesSection guides={guides} />
      </main>
      <Footer lastUpdated={format(now, 'MMMM d, yyyy')} />
    </>
  );
}
