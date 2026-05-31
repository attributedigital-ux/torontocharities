import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  title: 'Charity Guides — Toronto',
  description: 'Guides for donors and volunteers: how to find a Toronto charity, how to donate effectively, how to volunteer in the GTA.',
  path: '/guides/',
});

const GUIDES = [
  {
    title: 'How to find a reputable charity in Toronto',
    slug: 'how-to-find-a-reputable-charity-toronto',
    dek: 'What to look for when choosing a charity to support, and how to verify it is registered with the CRA.',
  },
  {
    title: 'How to donate effectively to Toronto charities',
    slug: 'how-to-donate-effectively',
    dek: 'Making the most of your charitable giving: tax receipts, cause areas, and how charities use donations.',
  },
  {
    title: 'Volunteering in Toronto: how to get started',
    slug: 'volunteering-toronto',
    dek: 'How to find volunteer opportunities with registered charities in Toronto and the GTA.',
  },
  {
    title: 'Toronto charity events: a guide for attendees',
    slug: 'toronto-charity-events-guide',
    dek: 'What to expect at charity galas, fundraising walks, auctions, and community events in Toronto.',
  },
];

export default function GuidesPage() {
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl mb-4">Guides</h1>
        <p className="text-tp-muted mb-10">Resources for donors, volunteers, and anyone looking to support Toronto-area charities.</p>

        <ul className="space-y-6">
          {GUIDES.map((g) => (
            <li key={g.slug} className="border-b border-tp-rule pb-6">
              <h2 className="text-lg mb-1">
                <span className="text-tp-ink">{g.title}</span>
              </h2>
              <p className="text-tp-muted text-sm">{g.dek}</p>
              <p className="text-xs text-tp-muted mt-2 italic">Coming soon</p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
