import Link from 'next/link';
import { db } from '@/db';
import { events, charities } from '@/db/schema';
import { eq, and, gte, count } from 'drizzle-orm';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { pageMeta } from '@/lib/meta';
import { format } from 'date-fns';

export async function generateMetadata() {
  const [{ value: m }] = await db
    .select({ value: count() })
    .from(events)
    .where(and(eq(events.status, 'approved'), gte(events.starts_at, new Date())));

  const [{ value: n }] = await db
    .select({ value: count() })
    .from(charities)
    .where(eq(charities.status, 'published'));

  return pageMeta({
    title: 'Toronto Charity Events — upcoming GTA fundraisers and galas',
    description: `Upcoming charity events in Toronto and the GTA. ${m} fundraisers, galas, walks, and benefit events from ${n} local organizations.`,
    path: '/charity-events-toronto/',
  });
}

export default async function EventsIndexPage() {
  const upcoming = await db
    .select({
      id: events.id,
      slug: events.slug,
      title: events.title,
      starts_at: events.starts_at,
      ends_at: events.ends_at,
      location_name: events.location_name,
      cost_text: events.cost_text,
      image_url: events.image_url,
      charity_id: events.charity_id,
      charityName: charities.display_name,
      charitySlug: charities.slug,
    })
    .from(events)
    .leftJoin(charities, eq(events.charity_id, charities.id))
    .where(and(eq(events.status, 'approved'), gte(events.starts_at, new Date())))
    .orderBy(events.starts_at)
    .limit(60);

  return (
    <>
      <Nav />
      <main>
        <section className="bg-tp-paper border-b border-tp-rule py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl mb-2">Toronto Charity Events</h1>
            <p className="text-tp-muted text-sm">
              Upcoming fundraisers, galas, walks, and community events from GTA charities
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-8">
          {upcoming.length === 0 ? (
            <p className="text-tp-muted py-16 text-center">
              No upcoming events right now. Check back soon.
            </p>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcoming.map((event) => (
                <li key={event.id}>
                  <Link
                    href={`/listing/${event.slug}/`}
                    className="block border border-tp-rule rounded hover:border-tp-blue transition-colors overflow-hidden"
                  >
                    {event.image_url ? (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-36 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="photo-ph w-full h-36" data-ph="Event photo" />
                    )}
                    <div className="p-4">
                      <div className="flex gap-2 items-center mb-2">
                        <span className="text-xs font-medium bg-tp-amber text-tp-white px-2 py-0.5 rounded">
                          {format(event.starts_at, 'MMM d')}
                        </span>
                        {event.cost_text === 'Free' && (
                          <span className="text-xs border border-tc-sage text-tc-sage px-2 py-0.5 rounded">
                            Free
                          </span>
                        )}
                      </div>
                      <h2 className="text-base font-medium text-tp-ink line-clamp-2 leading-snug">
                        {event.title}
                      </h2>
                      {event.charityName && (
                        <p className="text-xs text-tp-muted mt-1">{event.charityName}</p>
                      )}
                      {event.location_name && (
                        <p className="text-xs text-tp-muted mt-0.5">{event.location_name}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
