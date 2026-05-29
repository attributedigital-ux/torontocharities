'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';

const NAV_LINKS = [
  { label: 'Browse charities', href: '/toronto-charities-list/' },
  { label: 'Events', href: '/events/' },
  { label: 'Guides', href: '/guides/' },
  { label: 'About', href: '/about/' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 4);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 bg-tp-bg border-b transition-[border-color] duration-[400ms] ${
        scrolled ? 'border-[rgba(44,61,85,0.12)]' : 'border-transparent'
      }`}
    >
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between px-8 py-[22px]">
        <Logo />
        <div className="flex items-center gap-9">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-sans text-sm text-tp-ink hover:text-tp-blue transition-colors duration-[600ms]"
            >
              {label}
            </Link>
          ))}
        </div>
        <Link
          href="/charity/claim/"
          className="border border-tc-sage text-tc-sage px-[18px] py-[10px] font-sans text-[13px] font-medium tracking-[0.02em] hover:bg-tc-sage hover:text-tp-bg transition-all duration-[600ms]"
        >
          For charities
        </Link>
      </nav>
    </div>
  );
}
