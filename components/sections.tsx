import Link from 'next/link';
import { PhotoPlaceholder } from './PhotoPlaceholder';

/* ============================================================
   Shared bits
   ============================================================ */

function Eyebrow({ children, sage = false }: { children: React.ReactNode; sage?: boolean }) {
  return (
    <p
      className={`font-sans text-xs font-medium tracking-[0.12em] uppercase mb-5 ${
        sage ? 'text-tc-sage' : 'text-tp-amber'
      }`}
    >
      {children}
    </p>
  );
}

function SectionHead({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex justify-between items-end mb-14 gap-8">
      <div className="max-w-[720px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-[40px] leading-[1.15]">{title}</h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="font-sans text-sm text-tp-blue whitespace-nowrap border-b border-transparent hover:border-tp-blue pb-0.5 transition-all duration-[600ms]"
        >
          {link.label} →
        </Link>
      )}
    </div>
  );
}

/* ============================================================
   Hero
   ============================================================ */

export function Hero({ charityCount }: { charityCount: number }) {
  return (
    <section className="bg-tp-bg py-24" aria-label="Hero">
      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-[7fr_5fr] gap-14 items-stretch">
        <div className="flex flex-col justify-center">
          <Eyebrow>Toronto Community Directory</Eyebrow>
          <h1 className="text-[60px] leading-[1.05] mb-7 font-medium tracking-[-0.015em]">
            A directory of <span className="italic">{charityCount}</span> Toronto
            charities and the work they do.
          </h1>
          <p className="font-sans text-lg text-tp-ink/80 leading-[1.6] max-w-[56ch] mb-9">
            Find local charities by cause, browse upcoming events, and discover how
            Toronto-area organizations are working in your community. Free for
            everyone, free for charities.
          </p>
          <form
            action="/toronto-charities-list/"
            method="get"
            className="w-full h-16 flex items-center bg-tp-paper border border-[rgba(44,61,85,0.12)] px-6"
          >
            <input
              type="search"
              name="q"
              placeholder="Search by charity name or cause"
              className="flex-1 bg-transparent outline-none font-sans text-base text-tp-ink placeholder:text-tp-ink/60"
            />
            <button
              type="submit"
              aria-label="Search"
              className="text-tp-blue hover:text-tp-ink transition-colors duration-[600ms]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </form>
          <div className="flex mt-[18px] font-sans text-sm text-tp-ink/60">
            <Link
              href="/toronto-charities-list/"
              className="border-b border-transparent hover:border-tp-blue hover:text-tp-blue pb-0.5 transition-all duration-[600ms]"
            >
              Browse all charities
            </Link>
            <span className="mx-[14px] opacity-50">·</span>
            <Link
              href="/causes/"
              className="border-b border-transparent hover:border-tp-blue hover:text-tp-blue pb-0.5 transition-all duration-[600ms]"
            >
              Browse by cause
            </Link>
            <span className="mx-[14px] opacity-50">·</span>
            <Link
              href="/submit-a-charity/"
              className="border-b border-transparent hover:border-tp-blue hover:text-tp-blue pb-0.5 transition-all duration-[600ms]"
            >
              Submit a charity
            </Link>
          </div>
        </div>
        <PhotoPlaceholder
          caption="Photo · Hero · Documentary frame from a featured Toronto charity"
          className="min-h-[540px] self-stretch"
        />
      </div>
    </section>
  );
}

/* ============================================================
   Events grid
   ============================================================ */

export type EventCardData = {
  href: string;
  date: string;
  title: string;
  host: string;
  location: string;
  time: string;
  photoCaption: string;
};

function PinIcon() {
  return (
    <span className="inline-block w-3 h-3 shrink-0">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full block"
      >
        <path d="M12 22s-7-7.58-7-12a7 7 0 1 1 14 0c0 4.42-7 12-7 12z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    </span>
  );
}

function EventCard({ event }: { event: EventCardData }) {
  return (
    <Link
      href={event.href}
      className="group bg-tp-paper hover:bg-tp-bg transition-colors duration-[600ms] flex flex-col"
    >
      <PhotoPlaceholder caption={event.photoCaption} className="aspect-[4/3] w-full" />
      <div className="px-7 pt-[22px] pb-7 flex flex-col flex-1">
        <div className="inline-flex self-start bg-tp-amber text-tp-paper font-sans text-[11px] font-medium tracking-[0.12em] uppercase px-2.5 py-1 mb-[14px]">
          {event.date}
        </div>
        <h3 className="font-serif font-medium text-[22px] leading-[1.25] text-tp-blue mb-[14px]">
          {event.title}
        </h3>
        <div className="font-sans text-sm text-tp-ink mb-[14px]">
          <span className="text-tp-ink/60">by </span>
          <span className="border-b border-transparent group-hover:border-tp-ink pb-px transition-colors duration-[600ms]">
            {event.host}
          </span>
        </div>
        <div className="font-sans text-[13px] text-tp-ink/60 leading-[1.5] mt-auto pt-[14px]">
          <div className="flex items-center gap-1.5">
            <PinIcon />
            {event.location}
          </div>
          <div className="mt-1">{event.time}</div>
        </div>
      </div>
    </Link>
  );
}

export function EventsSection({ events }: { events: EventCardData[] }) {
  return (
    <section className="bg-tp-bg py-24" aria-label="Upcoming events">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionHead
          eyebrow="This week in Toronto"
          title="Upcoming charity events"
          link={{ href: '/events/', label: 'View all events' }}
        />
        <div className="grid grid-cols-3 gap-6">
          {events.map((e) => (
            <EventCard key={e.href} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Causes grid
   ============================================================ */

export type CauseTileData = { href: string; name: string; count: number; caption: string };

export function CausesSection({ causes }: { causes: CauseTileData[] }) {
  return (
    <section className="bg-tp-paper py-24" aria-label="Browse by cause">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionHead eyebrow="Explore the directory" title="Browse charities by cause" />
        <div className="grid grid-cols-4 gap-3">
          {causes.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              data-ph={c.caption}
              className="cause-tile photo-ph overlay relative aspect-square overflow-hidden transition-transform duration-[600ms]"
            >
              <div className="absolute left-[22px] right-[22px] bottom-5 text-tp-bg z-[2]">
                <div className="font-serif font-medium text-[22px] leading-[1.15] tracking-[-0.005em] mb-1.5 text-tp-bg">
                  {c.name}
                </div>
                <div className="font-sans text-[11px] text-tp-bg/85 tracking-[0.12em] uppercase">
                  {c.count} charities
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Featured charities
   ============================================================ */

export type CharityCardData = {
  href: string;
  name: string;
  tags: string;
  description: string;
  photoCaption: string;
};

function VerifiedTick() {
  return (
    <div className="inline-flex self-start items-center gap-1.5 border border-tc-sage text-tc-sage font-sans text-[11px] font-medium tracking-[0.12em] uppercase px-2.5 py-1 mb-[14px]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3 block"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Verified
    </div>
  );
}

function CharityCard({ charity }: { charity: CharityCardData }) {
  return (
    <Link
      href={charity.href}
      className="group bg-tp-paper hover:bg-tp-bg transition-colors duration-[600ms] flex flex-col"
    >
      <PhotoPlaceholder caption={charity.photoCaption} className="aspect-[4/3] w-full" />
      <div className="px-8 pt-7 pb-8 flex flex-col flex-1">
        <VerifiedTick />
        <h3 className="font-serif font-medium text-2xl leading-[1.25] text-tp-blue mb-3">
          {charity.name}
        </h3>
        <div className="font-sans text-xs text-tp-ink/60 mb-[18px] tracking-[0.02em]">
          {charity.tags}
        </div>
        <p className="font-sans text-[15px] text-tp-ink leading-[1.6] mb-[22px] flex-1">
          {charity.description}
        </p>
        <span className="font-sans text-sm text-tp-blue border-b border-transparent group-hover:border-tp-blue pb-0.5 self-start transition-colors duration-[600ms]">
          Visit profile →
        </span>
      </div>
    </Link>
  );
}

export function FeaturedSection({ charities }: { charities: CharityCardData[] }) {
  return (
    <section className="bg-tp-bg py-24" aria-label="Featured charities">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionHead
          eyebrow="Verified charities"
          title="Featured this month"
          link={{ href: '/toronto-charities-list/', label: 'Browse all charities' }}
        />
        <div className="grid grid-cols-3 gap-6">
          {charities.map((c) => (
            <CharityCard key={c.href} charity={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Claim CTA
   ============================================================ */

export function ClaimSection() {
  return (
    <section className="bg-tp-blue text-tp-bg py-28" aria-label="Claim CTA">
      <div className="max-w-[720px] mx-auto px-8 text-center">
        <Eyebrow sage>For listed charities</Eyebrow>
        <h2 className="text-[40px] text-tp-bg mb-6 leading-[1.15]">
          Already listed? Claim your profile.
        </h2>
        <p className="font-sans text-lg text-tp-bg/80 leading-[1.65] mb-10">
          If your charity is in our directory, you can claim your profile to post
          your own events, update your description, and get a "Featured on Toronto
          Charities" badge for your website. The only thing we ask is a link from
          your site to your profile, so visitors can find related charities in the
          GTA.
        </p>
        <div className="flex gap-[14px] justify-center flex-wrap">
          <Link
            href="/charity/claim/"
            className="bg-tc-sage text-tp-bg border border-tc-sage px-7 py-4 font-sans text-sm font-medium tracking-[0.02em] hover:bg-tc-sage-d hover:border-tc-sage-d transition-all duration-[600ms]"
          >
            Claim your profile
          </Link>
          <Link
            href="/charity/how-claiming-works/"
            className="bg-transparent text-tp-bg border border-tp-bg/40 px-7 py-4 font-sans text-sm font-medium tracking-[0.02em] hover:border-tp-bg transition-all duration-[600ms]"
          >
            How claiming works
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Recently added — list
   ============================================================ */

export type RecentRowData = {
  href: string;
  name: string;
  description: string;
  added: string;
};

export function RecentSection({ rows }: { rows: RecentRowData[] }) {
  return (
    <section className="bg-tp-bg py-16" aria-label="Recently added">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex justify-between items-end mb-8 gap-8">
          <div className="max-w-[720px]">
            <Eyebrow>New to the directory</Eyebrow>
            <h2 className="text-[40px] leading-[1.15]">Recently added charities</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-16">
          {rows.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="grid grid-cols-[1fr_auto] gap-4 items-baseline py-5 border-b border-[rgba(44,61,85,0.08)] hover:bg-tp-paper hover:px-3 transition-all duration-[600ms]"
            >
              <div>
                <div className="font-sans text-base font-medium text-tp-blue mb-1">
                  {r.name}
                </div>
                <div className="font-sans text-sm text-tp-ink/60 leading-[1.5]">
                  {r.description}
                </div>
              </div>
              <div className="font-sans text-xs text-tp-ink/40 whitespace-nowrap self-start pt-0.5">
                Added {r.added}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Guides
   ============================================================ */

export type GuideCardData = {
  href: string;
  category: string;
  title: string;
  dek: string;
  readTime: string;
};

export function GuidesSection({ guides }: { guides: GuideCardData[] }) {
  return (
    <section className="bg-tp-paper py-24" aria-label="Guides">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionHead
          eyebrow="Editorial"
          title="Guides for giving in Toronto"
          link={{ href: '/guides/', label: 'All guides' }}
        />
        <div className="grid grid-cols-2 gap-6">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="bg-tp-bg hover:bg-tp-paper p-10 flex flex-col transition-colors duration-[600ms]"
            >
              <Eyebrow>{g.category}</Eyebrow>
              <h3 className="font-serif font-medium text-[28px] leading-[1.2] text-tp-blue mb-4 tracking-[-0.005em]">
                {g.title}
              </h3>
              <p className="font-sans text-[15px] text-tp-ink leading-[1.6] mb-6 flex-1">
                {g.dek}
              </p>
              <span className="font-sans text-xs text-tp-ink/60 tracking-[0.04em]">
                {g.readTime}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
