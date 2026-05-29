import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { charities, categories, charity_categories } from '@/db/schema';
import { eq, and, inArray, desc, count } from 'drizzle-orm';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/Schema';
import { pageMeta } from '@/lib/meta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [cat] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  if (!cat) return {};

  const [{ value: n }] = await db
    .select({ value: count() })
    .from(charity_categories)
    .where(eq(charity_categories.category_id, cat.id));

  return pageMeta({
    title: `Toronto ${cat.name} Charities — ${n} organizations`,
    description: `Directory of ${n} Toronto-area charities working on ${cat.name.toLowerCase()} in the GTA. Browse organizations, upcoming events, and ways to support this cause.`,
    path: `/category/${slug}/`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [cat] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  if (!cat) notFound();

  const charityIdsInCat = db
    .select({ charity_id: charity_categories.charity_id })
    .from(charity_categories)
    .where(eq(charity_categories.category_id, cat.id));

  const [rows, siblings, total] = await Promise.all([
    db
      .select({
        id: charities.id,
        slug: charities.slug,
        display_name: charities.display_name,
        address_city: charities.address_city,
        description: charities.description,
        is_featured: charities.is_featured,
        claimed_at: charities.claimed_at,
      })
      .from(charities)
      .where(and(eq(charities.status, 'published'), inArray(charities.id, charityIdsInCat)))
      .orderBy(desc(charities.is_featured), charities.display_name)
      .limit(100),

    db
      .select({ slug: categories.slug, name: categories.name })
      .from(categories)
      .orderBy(categories.display_order, categories.name)
      .limit(20),

    db
      .select({ value: count() })
      .from(charity_categories)
      .where(eq(charity_categories.category_id, cat.id)),
  ]);

  const otherCats = siblings.filter((c) => c.slug !== slug).slice(0, 8);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Toronto Charities', url: 'https://toronto-charities.ca/' },
          { name: 'Directory', url: 'https://toronto-charities.ca/toronto-charities-list/' },
          { name: cat.name, url: `https://toronto-charities.ca/category/${slug}/` },
        ]}
      />
      <Nav />
      <main>
        <section className="bg-tp-paper border-b border-tp-rule py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-sm text-tp-muted mb-4">
              <Link href="/toronto-charities-list/" className="hover:underline">
                Directory
              </Link>
              {' / '}
              <span>{cat.name}</span>
            </nav>
            <h1 className="text-3xl mb-2">
              Toronto {cat.name} Charities
            </h1>
            <p className="text-tp-muted text-sm">
              {Number(total[0].value).toLocaleString()} organizations in this cause area
            </p>
            {cat.description && (
              <p className="mt-4 text-tp-ink max-w-2xl">{cat.description}</p>
            )}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-8">
          {rows.length === 0 ? (
            <p className="text-tp-muted py-16 text-center">
              No charities listed in this category yet.
            </p>
          ) : (
            <ul className="divide-y divide-tp-rule">
              {rows.map((charity) => (
                <li key={charity.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      href={`/profile/${charity.slug}/`}
                      className="font-medium text-tp-blue hover:underline"
                    >
                      {charity.display_name}
                    </Link>
                    {charity.address_city && (
                      <span className="text-tp-muted text-sm ml-2">
                        {charity.address_city}
                      </span>
                    )}
                    {charity.description && (
                      <p className="text-sm text-tp-muted mt-0.5 line-clamp-2">
                        {charity.description}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex gap-2 items-center">
                    {charity.claimed_at && (
                      <span className="text-xs border border-tc-sage text-tc-sage px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {otherCats.length > 0 && (
          <section className="border-t border-tp-rule py-8 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-lg mb-4">Other causes</h2>
              <div className="flex flex-wrap gap-2">
                {otherCats.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}/`}
                    className="px-3 py-1.5 border border-tp-rule rounded-full text-sm text-tp-ink hover:border-tp-blue hover:text-tp-blue transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
