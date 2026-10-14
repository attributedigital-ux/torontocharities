import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { pageMeta } from '@/lib/meta';
import { db } from '@/db';
import { guides } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export const metadata = pageMeta({
  title: 'Charity Guides — Toronto',
  description: 'Guides for donors and volunteers: how to find a Toronto charity, how to donate effectively, how to volunteer in the GTA.',
  path: '/guides/',
});

export const dynamic = 'force-static';
export const revalidate = 604800;

export default async function GuidesPage() {
  const rows = await db
    .select({ slug: guides.slug, title: guides.title, dek: guides.dek })
    .from(guides)
    .where(eq(guides.status, 'published'))
    .orderBy(desc(guides.published_at));
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl mb-4">Guides</h1>
        <p className="text-tp-muted mb-10">Resources for donors, volunteers, and anyone looking to support Toronto-area charities.</p>

        {rows.length === 0 && <p className="text-tp-muted">The first guides are being written.</p>}
        <ul className="space-y-6">
          {rows.map((g) => (
            <li key={g.slug} className="border-b border-tp-rule pb-6">
              <h2 className="text-lg mb-1">
                <Link href={`/guides/${g.slug}/`} className="text-tp-ink underline">{g.title}</Link>
              </h2>
              {g.dek && <p className="text-tp-muted text-sm">{g.dek}</p>}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
