import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { events, charities } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EventSchema, BreadcrumbSchema } from '@/components/Schema';
import { pageMeta } from '@/lib/meta';
import { format } from 'date-fns';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [row] = await db
    .select({
      title: events.title,
      starts_at: events.starts_at,
      description: events.description,
      charityName: charities.display_name,
    })
    .from(events)
    .leftJoin(charities, eq(events.charity_id, charities.id))
    .where(eq(events.slug, slug))
    .limit(1);

  if (!row) return {};

  const dateStr = format(row.starts_at, 'MMMM d, yyyy');
  const desc = row.description
    ? row.description.slice(0, 120)
    : `${row.title} on ${dateStr}${row.charityName ? ` hosted by ${row.charityName}` : ''}.`;

  return pageMeta({
    title: `${row.title} — ${dateStr} in Toronto`,
    description: desc,
    path: `/listing/${slug}/`,
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [row] = await db
    .select({
      id: events.id,
      slug: events.slug,
      title: events.title,
      description: events.description,
      starts_at: events.starts_at,
      ends_at: events.ends_at,
      location_name: events.location_name,
      location_address: events.location_address,
      registration_url: events.registration_url,
      cost_text: events.cost_text,
      image_url: events.image_url,
      source_url: events.source_url,
      charityName: charities.display_name,
      charitySlug: charities.slug,
      charityId: charities.id,
    })
    .from(events)
    .leftJoin(charities, eq(events.charity_id, charities.id))
    .where(eq(events.slug, slug))
    .limit(1);

  if (!row || (row as any).status === 'rejected') notFound();

  const dateStr = format(row.starts_at, 'EEEE, MMMM d, yyyy');
  const timeStr = format(row.starts_at, 'h:mm a');
  const hasEnds = row.ends_at && row.ends_at.getTime() !== row.starts_at.getTime();

  return (
    <>
      {row.charitySlug && (
        <EventSchema
          event={{
            title: row.title,
            description: row.description,
            starts_at: row.starts_at,
            ends_at: row.ends_at,
            location_name: row.location_name,
            location_address: row.location_address,
            registration_url: row.registration_url,
            cost_text: row.cost_text,
            image_url: row.image_url,
            slug: row.slug,
            charityName: row.charityName ?? '',
            charitySlug: row.charitySlug,
          }}
        />
      )}
      <BreadcrumbSchema
        items={[
          { name: 'Toronto Charities', url: 'https://toronto-charities.ca/' },
          { name: 'Events', url: 'https://toronto-charities.ca/charity-events-toronto/' },
          { name: row.title, url: `https://toronto-charities.ca/listing/${slug}/` },
        ]}
      />
      <Nav />
      <main>
        <section className="bg-tp-paper border-b border-tp-rule py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <nav className="text-sm text-tp-muted mb-4">
              <Link href="/charity-events-toronto/" className="hover:underline">
                Events
              </Link>
              {row.charitySlug && row.charityName && (
                <>
                  {' / '}
                  <Link href={`/profile/${row.charitySlug}/`} className="hover:underline">
                    {row.charityName}
                  </Link>
                </>
              )}
            </nav>

            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 text-center bg-tp-amber text-tp-white rounded px-3 py-1.5">
                <span className="block text-xs font-medium uppercase tracking-wide">
                  {format(row.starts_at, 'MMM')}
                </span>
                <span className="block text-2xl font-medium leading-tight">
                  {format(row.starts_at, 'd')}
                </span>
              </div>
              <div>
                <h1 className="text-3xl leading-tight">{row.title}</h1>
                <p className="text-tp-muted text-sm mt-1">
                  {dateStr} at {timeStr}
                  {hasEnds && ` – ${format(row.ends_at!, 'h:mm a')}`}
                </p>
              </div>
            </div>

            {row.image_url && (
              <img
                src={row.image_url}
                alt={row.title}
                className="w-full rounded mt-4 max-h-72 object-cover"
              />
            )}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {row.description ? (
                <div className="prose prose-sm max-w-none text-tp-ink leading-relaxed">
                  {row.description.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ) : (
                <p className="text-tp-muted italic">No description available.</p>
              )}

              {row.registration_url && (
                <a
                  href={row.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-6 py-2.5 bg-tp-blue text-tp-white rounded font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Register for this event
                </a>
              )}

              {row.source_url && !row.registration_url && (
                <a
                  href={row.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-6 py-2.5 bg-tp-blue text-tp-white rounded font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  View event details
                </a>
              )}
            </div>

            <aside>
              <div className="bg-tp-paper rounded border border-tp-rule p-4 space-y-3">
                <div>
                  <dt className="text-xs text-tp-muted uppercase tracking-wide mb-0.5">
                    Date
                  </dt>
                  <dd className="text-sm text-tp-ink">{dateStr}</dd>
                </div>
                <div>
                  <dt className="text-xs text-tp-muted uppercase tracking-wide mb-0.5">
                    Time
                  </dt>
                  <dd className="text-sm text-tp-ink">
                    {timeStr}
                    {hasEnds && ` – ${format(row.ends_at!, 'h:mm a')}`}
                  </dd>
                </div>
                {row.location_name && (
                  <div>
                    <dt className="text-xs text-tp-muted uppercase tracking-wide mb-0.5">
                      Location
                    </dt>
                    <dd className="text-sm text-tp-ink">
                      <div>{row.location_name}</div>
                      {row.location_address && (
                        <div className="text-tp-muted">{row.location_address}</div>
                      )}
                    </dd>
                  </div>
                )}
                {row.cost_text && (
                  <div>
                    <dt className="text-xs text-tp-muted uppercase tracking-wide mb-0.5">
                      Cost
                    </dt>
                    <dd className="text-sm text-tp-ink">{row.cost_text}</dd>
                  </div>
                )}
                {row.charityName && row.charitySlug && (
                  <div>
                    <dt className="text-xs text-tp-muted uppercase tracking-wide mb-0.5">
                      Hosted by
                    </dt>
                    <dd>
                      <Link
                        href={`/profile/${row.charitySlug}/`}
                        className="text-sm text-tp-blue hover:underline"
                      >
                        {row.charityName}
                      </Link>
                    </dd>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
