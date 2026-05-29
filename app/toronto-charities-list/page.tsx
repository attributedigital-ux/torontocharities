import { Suspense } from 'react';
import Link from 'next/link';
import { db } from '@/db';
import {
  charities,
  categories,
  charity_categories,
} from '@/db/schema';
import { eq, ilike, or, and, desc, count, inArray } from 'drizzle-orm';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { DirectorySearch } from '@/components/DirectorySearch';
import { pageMeta } from '@/lib/meta';

const PAGE_SIZE = 50;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; page?: string }>;
}) {
  const { q } = await searchParams;
  const [{ value: total }] = await db
    .select({ value: count() })
    .from(charities)
    .where(eq(charities.status, 'published'));

  return pageMeta({
    title: q
      ? `Search "${q}" — Toronto Charities directory`
      : `Toronto Charities List — directory of ${total} GTA charity organizations`,
    description: `Complete directory of registered charities in Toronto and the GTA. Filterable by cause area. ${total} charities listed.`,
    path: '/toronto-charities-list/',
  });
}

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; page?: string }>;
}) {
  const { q = '', cat = '', page = '1' } = await searchParams;
  const offset = (parseInt(page, 10) - 1) * PAGE_SIZE;

  const [allCategories, total, rows] = await Promise.all([
    db.select({ slug: categories.slug, name: categories.name })
      .from(categories)
      .orderBy(categories.display_order, categories.name),

    (async () => {
      const catFilter = cat
        ? inArray(
            charities.id,
            db.select({ charity_id: charity_categories.charity_id })
              .from(charity_categories)
              .innerJoin(categories, eq(charity_categories.category_id, categories.id))
              .where(eq(categories.slug, cat))
          )
        : undefined;

      const [{ value }] = await db
        .select({ value: count() })
        .from(charities)
        .where(and(
          eq(charities.status, 'published'),
          q ? or(ilike(charities.display_name, `%${q}%`), ilike(charities.legal_name, `%${q}%`)) : undefined,
          catFilter,
        ));
      return value;
    })(),

    (async () => {
      const catFilter = cat
        ? inArray(
            charities.id,
            db.select({ charity_id: charity_categories.charity_id })
              .from(charity_categories)
              .innerJoin(categories, eq(charity_categories.category_id, categories.id))
              .where(eq(categories.slug, cat))
          )
        : undefined;

      return db
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
        .where(and(
          eq(charities.status, 'published'),
          q ? or(ilike(charities.display_name, `%${q}%`), ilike(charities.legal_name, `%${q}%`)) : undefined,
          catFilter,
        ))
        .orderBy(desc(charities.is_featured), charities.display_name)
        .limit(PAGE_SIZE)
        .offset(offset);
    })(),
  ]);

  const totalPages = Math.ceil(Number(total) / PAGE_SIZE);
  const currentPage = parseInt(page, 10);

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (cat) params.set('cat', cat);
    if (p > 1) params.set('page', String(p));
    return `/toronto-charities-list/${params.size ? '?' + params.toString() : ''}`;
  }

  return (
    <>
      <Nav />
      <main>
        <section className="bg-tp-paper border-b border-tp-rule py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl mb-2">
              Toronto Charities Directory
            </h1>
            <p className="text-tp-muted text-sm mb-6">
              {Number(total).toLocaleString()} registered GTA charities
              {q && ` matching "${q}"`}
              {cat && ` in ${allCategories.find(c => c.slug === cat)?.name ?? cat}`}
            </p>
            <Suspense>
              <DirectorySearch
                categories={allCategories}
                initialQ={q}
                initialCat={cat}
              />
            </Suspense>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-8">
          {rows.length === 0 ? (
            <p className="text-tp-muted py-16 text-center">
              No charities found.{q || cat ? ' Try a different search.' : ''}
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
                    {charity.is_featured && (
                      <span className="text-xs border border-tp-amber text-tp-amber px-2 py-0.5 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2 mt-10">
              {currentPage > 1 && (
                <Link
                  href={pageUrl(currentPage - 1)}
                  className="px-3 py-1.5 border border-tp-rule rounded text-sm hover:bg-tp-paper"
                >
                  Previous
                </Link>
              )}
              <span className="text-sm text-tp-muted">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link
                  href={pageUrl(currentPage + 1)}
                  className="px-3 py-1.5 border border-tp-rule rounded text-sm hover:bg-tp-paper"
                >
                  Next
                </Link>
              )}
            </nav>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
