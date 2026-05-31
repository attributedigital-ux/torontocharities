import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  title: 'Claim your charity profile',
  description: 'Add your charity to the Toronto Charities directory and manage your events listing.',
  path: '/charity/claim/',
  noindex: true,
});

export default function ClaimPage() {
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl mb-4">Claim your charity profile</h1>
        <p className="text-tp-ink leading-relaxed mb-6">
          Your charity is already listed in our directory from the CRA public registry. Claiming your profile lets you update your description, add events, and display a verified badge.
        </p>

        <div className="border border-tp-rule rounded p-6 space-y-4">
          <h2 className="text-lg">How it works</h2>
          <ol className="space-y-3 text-tp-ink">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-tc-sage text-tp-bg text-xs flex items-center justify-center font-medium">1</span>
              <span>Add a link to <strong>toronto-charities.ca</strong> from your charity website — your about page, footer, or resources page works well.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-tc-sage text-tp-bg text-xs flex items-center justify-center font-medium">2</span>
              <span>Email us at <a href="mailto:hello@toronto-charities.ca" className="text-tp-blue hover:underline">hello@toronto-charities.ca</a> with your charity name and website URL.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-tc-sage text-tp-bg text-xs flex items-center justify-center font-medium">3</span>
              <span>We verify the link and mark your profile as verified, usually within 2 business days.</span>
            </li>
          </ol>
        </div>

        <p className="text-sm text-tp-muted mt-6">
          This is a free community directory. There is no fee to claim or maintain your profile.
        </p>
      </main>
      <Footer />
    </>
  );
}
