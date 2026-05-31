import Link from 'next/link';
import { Logo } from './Logo';

const COLS = [
  {
    title: 'Browse',
    links: [
      { label: 'All charities', href: '/toronto-charities-list/' },
      { label: 'Upcoming events', href: '/charity-events-toronto/' },
      { label: 'Guides', href: '/guides/' },
    ],
  },
  {
    title: 'For charities',
    links: [
      { label: 'Activate your listing', href: '/for-charities/' },
      { label: 'How it works', href: '/for-charities/' },
      { label: 'Find your profile', href: '/toronto-charities-list/' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About us', href: '/about/' },
      { label: 'hello@toronto-charities.ca', href: 'mailto:hello@toronto-charities.ca' },
    ],
  },
];

export function Footer({ lastUpdated = '' }: { lastUpdated?: string }) {
  return (
    <footer className="bg-tp-blue text-tp-bg pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-16">
        <div>
          <Logo tone="paper" />
          <p className="font-sans text-sm text-tp-bg/70 leading-[1.6] mt-[22px] mb-[18px] max-w-[320px]">
            A community directory of Toronto-area charities and the events they
            run.
          </p>
          <p className="font-sans text-[11px] text-tp-bg/25">
            A community resource by{' '}
            <a
              href="https://torontoproperty.ca"
              className="text-tp-bg/25 hover:text-tp-bg/40 transition-colors duration-[600ms]"
            >
              Toronto Property
            </a>
            .
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="font-sans text-xs font-medium tracking-[0.12em] uppercase text-tc-sage mb-[22px]">
              {col.title}
            </p>
            {col.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block font-sans text-sm text-tp-bg/70 mb-3 hover:text-tp-bg transition-colors duration-[600ms]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="max-w-[1200px] mx-auto px-8 mt-16 pt-6 border-t border-tp-bg/15 flex justify-between font-sans text-xs text-tp-bg/50">
        <span>
          © {new Date().getFullYear()} Toronto Charities. A community resource by Toronto Property.
        </span>
        {lastUpdated && <span>Directory last updated {lastUpdated}</span>}
      </div>
    </footer>
  );
}
