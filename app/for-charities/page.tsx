import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  title: 'For Charities — Free event listings and directory profile',
  description: 'Activate your free Toronto Charities profile. We publish your events automatically, permanently, at no cost.',
  path: '/for-charities/',
});

export default function ForCharitiesPage() {
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl mb-4">Free listings for Toronto charities</h1>
        <p className="text-tp-muted text-lg mb-10">Your charity is already in our directory. Activating your profile takes two minutes.</p>

        <div className="space-y-8">
          <div className="border border-tp-rule rounded p-6">
            <h2 className="text-xl mb-3">What you get</h2>
            <ul className="space-y-3 text-tp-ink">
              <li className="flex gap-3">
                <span className="text-tc-sage font-bold mt-0.5">✓</span>
                <span>Your upcoming events published automatically from Eventbrite and your website calendar — no manual submission</span>
              </li>
              <li className="flex gap-3">
                <span className="text-tc-sage font-bold mt-0.5">✓</span>
                <span>A permanent, indexed profile page with your description, contact details, and CRA registration</span>
              </li>
              <li className="flex gap-3">
                <span className="text-tc-sage font-bold mt-0.5">✓</span>
                <span>A verified badge and direct link to your website</span>
              </li>
              <li className="flex gap-3">
                <span className="text-tc-sage font-bold mt-0.5">✓</span>
                <span>Update your listing any time by sending a plain-English email — no forms, no portal</span>
              </li>
            </ul>
          </div>

          <div className="border border-tp-rule rounded p-6">
            <h2 className="text-xl mb-3">How to activate</h2>
            <ol className="space-y-4 text-tp-ink">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-tc-sage text-tp-bg text-xs flex items-center justify-center font-medium">1</span>
                <div>
                  <strong>Find your profile</strong> — search for your charity in our{' '}
                  <Link href="/toronto-charities-list/" className="text-tp-blue hover:underline">directory</Link>.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-tc-sage text-tp-bg text-xs flex items-center justify-center font-medium">2</span>
                <div>
                  <strong>Add a link</strong> — place a link to <strong>toronto-charities.ca</strong> on your website. Your footer, about page, or resources section all work.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-tc-sage text-tp-bg text-xs flex items-center justify-center font-medium">3</span>
                <div>
                  <strong>Verify</strong> — click "Activate your free listing" on your profile page and we confirm the link on the spot.
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-tp-paper border border-tp-rule rounded p-6">
            <p className="text-tp-ink mb-4">
              This is free. There is no fee to list, no fee to maintain, and no plans to charge one. The directory exists to connect Toronto residents with local charities.
            </p>
            <Link
              href="/toronto-charities-list/"
              className="inline-block bg-tc-sage text-tp-bg px-6 py-3 font-medium hover:opacity-90 transition-opacity"
            >
              Find your charity →
            </Link>
          </div>

          <p className="text-sm text-tp-muted">
            Questions? Find your charity in the directory and use the activation link on your profile page.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
