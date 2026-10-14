import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { guides } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
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
      <main className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-sm text-tp-muted mb-6">
          <Link href="/guides/" className="underline">Guides</Link>
        </p>
        <h1 className="text-3xl md:text-4xl mb-4">{guide.title}</h1>
        {guide.dek && <p className="text-lg text-tp-muted mb-4">{guide.dek}</p>}
        <p className="text-xs text-tp-muted mb-10">
          Updated {format(published, 'd MMMM yyyy')}
        </p>
        <article className="guide-body" dangerouslySetInnerHTML={{ __html: guide.content }} />
      </main>
      <Footer />
    </>
  );
}
