import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  title: 'About Toronto Charities',
  description: 'Toronto Charities is a free public directory of every registered charity in the Greater Toronto Area, with automated event listings and verified profiles.',
  path: '/about/',
});

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl mb-8">About this directory</h1>

        <div className="space-y-6 text-tp-ink leading-relaxed">
          <p>
            Toronto Charities is a free public directory of every registered charity in the Greater Toronto Area. It exists to make it easier for Toronto residents to find, support, and stay connected with local charitable organisations.
          </p>

          <p>
            The directory is built from the Canada Revenue Agency's public registry of registered charities, which covers more than 12,000 organisations operating in Toronto and the surrounding region. Each profile shows the charity's registered name, contact information, CRA designation, and upcoming events.
          </p>

          <p>
            Events are pulled automatically from Eventbrite and charity websites. When a charity activates their profile by linking to this site, their events are published here as soon as they are announced — no manual submission needed.
          </p>

          <h2 className="text-xl mt-10 mb-4">For charities</h2>
          <p>
            Your charity already has a profile here. Activating it takes about two minutes: add a link to toronto-charities.ca on your website and we verify it automatically. Once active, your events appear here for free, permanently, with no ongoing work required on your end.
          </p>
          <p>
            You can update your description, address, or contact details at any time by finding your profile in the directory and using the activation link.
          </p>

          <h2 className="text-xl mt-10 mb-4">For donors and volunteers</h2>
          <p>
            Browse by cause area to find charities working on issues you care about. Event listings are updated weekly so you can find fundraisers, volunteer days, galas, and community events happening near you.
          </p>

          <h2 className="text-xl mt-10 mb-4">Contact</h2>
          <p>
            Questions, corrections, or removal requests: email <a href="mailto:hello@toronto-charities.ca" className="text-tp-blue hover:underline">hello@toronto-charities.ca</a> or find your charity profile in the directory and use the activation link.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
