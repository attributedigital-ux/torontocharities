import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { charities, categories, charity_categories, events } from '@/db/schema';
import { eq, and, gte, desc } from 'drizzle-orm';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CharitySchema, BreadcrumbSchema } from '@/components/Schema';
import { pageMeta } from '@/lib/meta';
import { format } from 'date-fns';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [charity] = await db
    .select()
    .from(charities)
    .where(eq(charities.slug, slug))
    .limit(1);
  if (!charity) return {};

  const desc150 = charity.description
    ? charity.description.slice(0, 150)
    : `${charity.display_name} is a registered charity in the Toronto area.`;

  return pageMeta({
    title: `${charity.display_name} — Toronto charity profile`,
    description: desc150,
    path: `/profile/${slug}/`,
  });
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [charity] = await db
    .select()
    .from(charities)
    .where(eq(charities.slug, slug))
    .limit(1);
  if (!charity) notFound();

  const [cats, upcomingEvents, similarCharities] = await Promise.all([
    db
      .select({ name: categories.name, slug: categories.slug, is_primary: charity_categories.is_primary })
      .from(categories)
      .innerJoin(charity_categories, eq(categories.id, charity_categories.category_id))
      .where(eq(charity_categories.charity_id, charity.id))
      .orderBy(desc(charity_categories.is_primary)),

    db
      .select({
        id: events.id,
        slug: events.slug,
        title: events.title,
        starts_at: events.starts_at,
        location_name: events.location_name,
        cost_text: events.cost_text,
      })
      .from(events)
      .where(
        and(
          eq(events.charity_id, charity.id),
          eq(events.status, 'approved'),
          gte(events.starts_at, new Date()),
        ),
      )
      .orderBy(events.starts_at)
      .limit(6),

    // Similar charities: same primary category, different slug, limit 4
    (async () => {
      const primaryCat = await db
        .select({ category_id: charity_categories.category_id })
        .from(charity_categories)
        .where(and(
          eq(charity_categories.charity_id, charity.id),
          eq(charity_categories.is_primary, true),
        ))
        .limit(1);

      if (!primaryCat[0]) return [];

      const peers = await db
        .select({
          id: charities.id,
          slug: charities.slug,
          display_name: charities.display_name,
          address_city: charities.address_city,
          is_featured: charities.is_featured,
        })
        .from(charities)
        .innerJoin(charity_categories, eq(charities.id, charity_categories.charity_id))
        .where(
          and(
            eq(charities.status, 'published'),
            eq(charity_categories.category_id, primaryCat[0].category_id),
          ),
        )
        .orderBy(desc(charities.is_featured), charities.display_name)
        .limit(6);

      return peers.filter((p) => p.slug !== slug).slice(0, 4);
    })(),
  ]);

  const primaryCat = cats.find((c) => c.is_primary);

  return (
    <>
      <CharitySchema
        charity={{
          name: charity.display_name,
          slug: charity.slug,
          description: charity.description,
          address_street: charity.address_street,
          address_city: charity.address_city,
          address_postcode: charity.address_postcode,
          email: charity.email,
          phone: charity.phone,
          website_url: charity.website_url,
          cra_charity_number: charity.cra_charity_number,
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Toronto Charities', url: 'https://toronto-charities.ca/' },
          { name: 'Directory', url: 'https://toronto-charities.ca/toronto-charities-list/' },
          ...(primaryCat
            ? [{ name: primaryCat.name, url: `https://toronto-charities.ca/category/${primaryCat.slug}/` }]
            : []),
          { name: charity.display_name, url: `https://toronto-charities.ca/profile/${slug}/` },
        ]}
      />
      <Nav />
      <main>
        <section className="bg-tp-paper border-b border-tp-rule py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <nav className="text-sm text-tp-muted mb-4">
              <Link href="/toronto-charities-list/" className="hover:underline">
                Directory
              </Link>
              {primaryCat && (
                <>
                  {' / '}
                  <Link href={`/category/${primaryCat.slug}/`} className="hover:underline">
                    {primaryCat.name}
                  </Link>
                </>
              )}
            </nav>

            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl">{charity.display_name}</h1>
                {charity.legal_name !== charity.display_name && (
                  <p className="text-tp-muted text-sm mt-1">
                    Legal name: {charity.legal_name}
                  </p>
                )}
              </div>
              <div className="flex-shrink-0 flex flex-col gap-1.5 items-end">
                {charity.claimed_at && (
                  <span className="text-xs border border-tc-sage text-tc-sage px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                )}
                {charity.is_featured && (
                  <span className="text-xs border border-tp-amber text-tp-amber px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {cats.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {cats.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}/`}
                    className="text-xs px-2.5 py-1 bg-tp-bg border border-tp-rule rounded-full text-tp-ink hover:border-tp-blue hover:text-tp-blue transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {charity.description ? (
                <p className="text-tp-ink leading-relaxed">{charity.description}</p>
              ) : (
                <p className="text-tp-muted italic">
                  No description yet.{' '}
                  {charity.claimed_at
                    ? 'The charity manager can add one from the dashboard.'
                    : (
                      <Link href={`/charity/claim/?charity=${slug}&name=${encodeURIComponent(charity.display_name)}&site=${encodeURIComponent(charity.website_url ?? '')}`} className="underline hover:text-tp-blue">
                        Activate this profile
                      </Link>
                    )}{' '}
                </p>
              )}

              {upcomingEvents.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl mb-4">Upcoming events</h2>
                  <ul className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <li key={event.id} className="flex gap-3">
                        <div className="flex-shrink-0 w-12 text-center">
                          <span className="block text-xs font-medium bg-tp-amber text-tp-white rounded px-1 py-0.5">
                            {format(event.starts_at, 'MMM')}
                          </span>
                          <span className="block text-lg font-medium text-tp-blue leading-tight">
                            {format(event.starts_at, 'd')}
                          </span>
                        </div>
                        <div>
                          <Link
                            href={`/listing/${event.slug}/`}
                            className="font-medium text-tp-blue hover:underline"
                          >
                            {event.title}
                          </Link>
                          <div className="text-xs text-tp-muted mt-0.5">
                            {event.location_name && <span>{event.location_name}</span>}
                            {event.cost_text && (
                              <span className="ml-2">{event.cost_text}</span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/charity-events-toronto/"
                    className="inline-block mt-4 text-sm text-tp-blue hover:underline"
                  >
                    Browse all Toronto charity events
                  </Link>
                </div>
              )}
            </div>

            <aside>
              <div className="bg-tp-paper rounded border border-tp-rule p-4 space-y-3">
                {(charity.address_street || charity.address_city) && (
                  <div>
                    <dt className="text-xs text-tp-muted uppercase tracking-wide mb-0.5">
                      Address
                    </dt>
                    <dd className="text-sm text-tp-ink">
                      {charity.address_street && <div>{charity.address_street}</div>}
                      {charity.address_city && (
                        <div>
                          {charity.address_city}
                          {charity.address_postcode && `, ${charity.address_postcode}`}
                        </div>
                      )}
                    </dd>
                  </div>
                )}
                {charity.website_url && (
                  <div>
                    <dt className="text-xs text-tp-muted uppercase tracking-wide mb-0.5">
                      Website
                    </dt>
                    <dd>
                      <a
                        href={charity.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-tp-blue hover:underline break-all"
                      >
                        {charity.website_url.replace(/^https?:\/\//, '')}
                      </a>
                    </dd>
                  </div>
                )}
                {charity.phone && (
                  <div>
                    <dt className="text-xs text-tp-muted uppercase tracking-wide mb-0.5">
                      Phone
                    </dt>
                    <dd>
                      <a
                        href={`tel:${charity.phone}`}
                        className="text-sm text-tp-ink hover:text-tp-blue"
                      >
                        {charity.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {charity.cra_designation && (
                  <div>
                    <dt className="text-xs text-tp-muted uppercase tracking-wide mb-0.5">
                      CRA designation
                    </dt>
                    <dd className="text-sm text-tp-ink">{charity.cra_designation}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs text-tp-muted uppercase tracking-wide mb-0.5">
                    Charity number
                  </dt>
                  <dd className="text-sm text-tp-muted font-mono">
                    {charity.cra_charity_number}
                  </dd>
                </div>
              </div>

              {!charity.linkback_verified_at && (
                <div className="mt-4 p-4 border border-tc-sage rounded bg-tp-paper">
                  <p className="text-sm text-tp-ink mb-2">
                    Is this your charity?
                  </p>
                  <Link
                    href={`/charity/claim/?charity=${slug}&name=${encodeURIComponent(charity.display_name)}&site=${encodeURIComponent(charity.website_url ?? '')}`}
                    className="text-sm text-tc-sage hover:underline font-medium"
                  >
                    Activate your free listing →
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </section>

        {similarCharities.length > 0 && (
          <section className="border-t border-tp-rule py-8 px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-lg mb-4">Similar charities</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {similarCharities.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/profile/${c.slug}/`}
                      className="block p-3 border border-tp-rule rounded hover:border-tp-blue transition-colors"
                    >
                      <span className="font-medium text-tp-blue text-sm">
                        {c.display_name}
                      </span>
                      {c.address_city && (
                        <span className="text-tp-muted text-xs ml-1.5">
                          {c.address_city}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
