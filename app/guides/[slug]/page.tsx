import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { guides, charities } from '@/db/schema';
import { eq, and, inArray, isNotNull } from 'drizzle-orm';
import { format } from 'date-fns';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/Schema';
import { pageMeta } from '@/lib/meta';

// Rendered on first visit after a publish, then cached for a week. The publish
// workflow fires the build hook, so a new guide is live within one build.
export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 604800;

// The charities a guide names, read back from the profile links in its body.
async function featuredCharities(html: string) {
  const slugs = [...new Set([...html.matchAll(/\/profile\/([a-z0-9-]+)\//g)].map((m) => m[1]))];
  if (slugs.length === 0) return [];
  return db
    .select({ slug: charities.slug, name: charities.display_name, logo: charities.logo_url })
    .from(charities)
    .where(and(inArray(charities.slug, slugs), isNotNull(charities.logo_url)));
}

async function getGuide(slug: string) {
  const [guide] = await db
    .select()
    .from(guides)
    .where(and(eq(guides.slug, slug), eq(guides.status, 'published')))
    .limit(1);
  return guide ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};
  return pageMeta({
    title: guide.title,
    description: guide.dek ?? guide.title,
    path: `/guides/${guide.slug}/`,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) notFound();

  const published = guide.published_at ?? guide.updated_at;
  const featured = await featuredCharities(guide.content);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toronto-charities.ca/' },
          { name: 'Guides', url: 'https://toronto-charities.ca/guides/' },
          { name: guide.title, url: `https://toronto-charities.ca/guides/${guide.slug}/` },
        ]}
      />
      <Nav />
      <main>
        <header className="guide-hero">
          <div className="guide-hero-inner">
            <p className="guide-kicker">
              <Link href="/guides/">Guides</Link>
            </p>
            <h1>{guide.title}</h1>
            {guide.dek && <p className="guide-dek">{guide.dek}</p>}
            <p className="guide-date">Updated {format(published, 'd MMMM yyyy')}</p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <article className="guide-body" dangerouslySetInnerHTML={{ __html: guide.content }} />
        </div>
        {featured.length > 0 && (
          <section className="guide-logos">
            <div className="guide-logos-inner">
              <h2>The charities named in this guide</h2>
              <ul>
                {featured.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/profile/${c.slug}/`}>
                      <img src={c.logo!} alt="" width={48} height={48} loading="lazy" />
                      <span>{c.name}</span>
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
