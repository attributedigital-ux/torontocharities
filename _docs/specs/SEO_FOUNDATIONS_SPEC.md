# Toronto Charities — SEO Foundations Build Spec

**For**: Claude Code
**Stack**: Next.js 14 App Router + Postgres
**Prerequisite**: site scaffolding exists, database schema from main build spec is applied
**Output**: a fully crawlable, schema-marked-up site ready for indexing on day one

This is the technical SEO layer. Without this in place, even a perfectly designed and content-rich site won't rank. With it in place, the link-recovery URLs and editorial content do their job.

---

## 1. URL handling and redirects

### Canonical URL rules

The canonical form for every URL is: `https://toronto-charities.ca/<path>` — bare domain, https, lowercase, exact slug match.

Implement these in `middleware.ts` at the root of the Next.js app:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;
  let target = request.nextUrl.clone();
  let needsRedirect = false;

  // Force bare domain (no www)
  if (hostname.startsWith('www.')) {
    target.hostname = hostname.replace(/^www\./, '');
    needsRedirect = true;
  }

  // Force https (in production)
  if (process.env.NODE_ENV === 'production' && request.nextUrl.protocol === 'http:') {
    target.protocol = 'https:';
    needsRedirect = true;
  }

  // Lowercase pathname (but preserve query)
  if (pathname !== pathname.toLowerCase()) {
    target.pathname = pathname.toLowerCase();
    needsRedirect = true;
  }

  if (needsRedirect) {
    return NextResponse.redirect(target, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/health).*)'],
};
```

### Trailing slash policy

Some historical URLs have trailing slashes, some don't (matching the actual historical paths is non-negotiable — these have live links). Configure `next.config.js` to **preserve** whatever is requested rather than normalize:

```javascript
// next.config.js
module.exports = {
  trailingSlash: false,  // default behaviour, BUT see below
  async redirects() {
    return [];  // we handle in middleware + page resolution
  },
};
```

Since some link-recovery paths have trailing slashes (`/toronto-charities-list/`) and some don't (`/childrens-charities`, `/non-profit-organizations`), the routing system must:

1. Both `/toronto-charities-list/` and `/toronto-charities-list` resolve to the same canonical
2. The canonical (in the `<link rel="canonical">` tag) matches the historical form exactly
3. `/childrens-charities/` 301s to `/childrens-charities` (no slash is canonical for this one)
4. `/toronto-charities-list` 301s to `/toronto-charities-list/` (slash is canonical)

Build a small `canonical-paths.ts` config that lists every URL with its canonical form. Middleware checks against this map and redirects mismatches.

### Historical URL 301 map

Create `lib/redirects.ts` with the full map of historical URLs from Ahrefs that need to resolve:

```typescript
export const HISTORICAL_REDIRECTS: Record<string, string> = {
  // ASP.NET legacy URLs (the site was on ASP.NET originally)
  '/page.aspx': '/',
  '/pg.aspx': '/',
  '/page.aspx?dt=242': '/category/fundraising-events/',
  '/page.aspx?dt=754': '/',  // Booty Bash event — long expired
  '/pg.aspx?id=67': '/category/environmental/',
  '/?page_id=419': '/fundraising/',

  // Old paths that should resolve to current ones (where content moved)
  '/charity-events-toronto/': '/charity-events-toronto/',  // keep — has live links
  '/children/': '/childrens-charities',  // canonicalise children/ to no-slash
  '/non-profit-organizations': '/non-profit-organizations',  // keep — has live links
  '/non-profits/': '/non-profits/',  // keep — has live links

  // WordPress upload image URLs that picked up links
  '/wp-content/uploads/2018/09/https_2F2Fcdn.evbuc_.com2Fimages2F498396242F445691342332F12Foriginal.jpg': '/listing/red-dress-gala/',
  '/wp-content/uploads/2018/09/https_2F2Fcdn.evbuc_.com2Fimages2F493938202F2374769491622F12Foriginal.jpg': '/listing/sign-painting-fundraiser/',
  '/wp-content/uploads/2019/01/1240.jpg': '/',
  '/images/smaller_RMHC2212.gif': '/profile/ronald-mcdonald-house-charities-toronto/',

  // Specific historical event/charity URLs that have live links
  '/walk-now-for-autism-speaks-2014': '/listing/walk-now-for-autism-speaks/',
  '/merry-music-at-the-grove-2012': '/listing/merry-musique-at-the-grove/',
  '/st-michaels-hospital-foundation': '/profile/st-michaels-hospital-foundation/',
};
```

Middleware applies these as 301s on a path match. Any historical URL not in the map but recognisable as `/page.aspx`, `/pg.aspx`, or `/wp-content/*` redirects to homepage with a `301`.

---

## 2. Sitemap generation

Generate `sitemap.xml` server-side at `/sitemap.xml`. Next.js convention is `app/sitemap.ts`:

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

const BASE = 'https://toronto-charities.ca';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/toronto-charities-list/`, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE}/charity-events-toronto/`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/events/`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/fundraising/`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/listing/volunteer-opportunities/`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/listing/volunteer/`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/non-profits/`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/non-profit-organizations`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/childrens-charities`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/toronto-charity-jobs/`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/charity/claim/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/charity/how-claiming-works/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/submit-a-charity/`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/about/`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/contact/`, changeFrequency: 'monthly', priority: 0.4 },
  ];

  // Categories
  const categories = await db.query.categories.findMany();
  const categoryPages = categories.map(c => ({
    url: `${BASE}/category/${c.slug}/`,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
    lastModified: c.updated_at,
  }));

  // Charities
  const charities = await db.query.charities.findMany({
    where: { status: 'published' },
  });
  const charityPages = charities.map(c => ({
    url: `${BASE}/profile/${c.slug}/`,
    changeFrequency: 'weekly' as const,
    priority: c.claimed_at ? 0.7 : 0.5,
    lastModified: c.updated_at,
  }));

  // Approved events (current + 90 days)
  const events = await db.query.events.findMany({
    where: {
      status: 'approved',
      starts_at: { gte: new Date() }
    },
  });
  const eventPages = events.map(e => ({
    url: `${BASE}/listing/${e.slug}/`,
    changeFrequency: 'daily' as const,
    priority: 0.6,
    lastModified: e.updated_at,
  }));

  // Guides
  const guides = await db.query.guides.findMany({
    where: { status: 'published' },
  });
  const guidePages = guides.map(g => ({
    url: `${BASE}${g.path}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: g.updated_at,
  }));

  return [...staticPages, ...categoryPages, ...charityPages, ...eventPages, ...guidePages];
}
```

For sites with more than 50,000 URLs, split into a sitemap index. The directory will be in the 3,000-5,000 URL range, so a single sitemap is fine.

Add a `sitemap_index.xml` later if/when expired events push the count up.

---

## 3. robots.txt

`app/robots.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Major crawlers — full access
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },

      // AI crawlers — explicitly allowed (per LESSONS_LEARNED, blocking these is a GEO failure)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },

      // Default — allow everything except admin and API internals
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/charity/dashboard/',
          '/admin/',
          '/_next/',
          '/*.json$',
          '/search?',  // disallow internal search result pages (thin content)
        ],
      },
    ],
    sitemap: 'https://toronto-charities.ca/sitemap.xml',
    host: 'https://toronto-charities.ca',
  };
}
```

---

## 4. Schema markup

Every page type gets specific JSON-LD. Implement as a `Schema` component that pages compose:

```typescript
// components/Schema.tsx
export function OrganizationSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Toronto Charities",
        "url": "https://toronto-charities.ca",
        "description": "A community directory of Toronto-area charities and their events.",
        "founder": {
          "@type": "Organization",
          "name": "Toronto Property",
          "url": "https://torontoproperty.ca"
        },
        "areaServed": {
          "@type": "City",
          "name": "Toronto",
          "containedInPlace": { "@type": "Country", "name": "Canada" }
        },
      })
    }} />
  );
}

export function WebSiteSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Toronto Charities",
        "url": "https://toronto-charities.ca",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://toronto-charities.ca/toronto-charities-list/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      })
    }} />
  );
}
```

### Per-page-type schema

| Page type            | Schema types                                          | Notes |
|----------------------|-------------------------------------------------------|-------|
| Homepage             | `Organization`, `WebSite` with SearchAction          | Both in `<head>` |
| `/toronto-charities-list/` | `CollectionPage`, `ItemList` of `Organization`  | ItemList items are summary-only with `url` and `name` |
| Category pages       | `CollectionPage`, `ItemList`, `BreadcrumbList`        | |
| Charity profile      | `NonprofitOrganization` (preferred) or `Organization` | With `address`, `email`, `telephone`, `url`, `sameAs` |
| Event detail         | `Event`                                               | Full spec below |
| Guide pages          | `Article` + `FAQPage` for FAQ blocks, `BreadcrumbList` | |
| Events index         | `CollectionPage`, `ItemList` of `Event`               | |

### Event schema (most strict — Google has explicit requirements)

```typescript
// components/EventSchema.tsx
export function EventSchema({ event, charity }: { event: Event, charity: Charity }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        "name": event.title,
        "description": event.description,
        "startDate": event.starts_at,        // ISO 8601 with timezone
        "endDate": event.ends_at || event.starts_at,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": event.location_name,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": event.location_address,
            "addressLocality": "Toronto",
            "addressRegion": "ON",
            "addressCountry": "CA"
          }
        },
        "organizer": {
          "@type": "NonprofitOrganization",
          "name": charity.display_name,
          "url": `https://toronto-charities.ca/profile/${charity.slug}/`
        },
        "offers": event.registration_url ? {
          "@type": "Offer",
          "url": event.registration_url,
          "price": event.cost_text === "Free" ? "0" : event.cost_text,
          "priceCurrency": "CAD",
          "availability": "https://schema.org/InStock",
          "validFrom": new Date().toISOString()
        } : undefined,
        "image": event.image_url ? [event.image_url] : undefined,
      })
    }} />
  );
}
```

Google's event rich-result requires: `name`, `startDate`, `location`, and either `image` or "no image" — the data we have always covers these for ingested events. If any required field is missing, omit the schema rather than emit invalid markup.

### Charity profile schema

```json
{
  "@context": "https://schema.org",
  "@type": "NonprofitOrganization",
  "name": "Daily Bread Food Bank",
  "alternateName": "Daily Bread",
  "url": "https://toronto-charities.ca/profile/daily-bread-food-bank/",
  "sameAs": "https://www.dailybread.ca",
  "description": "...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "191 New Toronto Street",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M8V 2E7",
    "addressCountry": "CA"
  },
  "email": "info@dailybread.ca",
  "telephone": "+1-416-203-0050",
  "areaServed": { "@type": "City", "name": "Toronto" },
  "identifier": [
    { "@type": "PropertyValue", "propertyID": "CRA Charity Number", "value": "118809691RR0001" }
  ]
}
```

CRA number in `identifier` is non-standard but useful — Google parses it; for end users it shows in the knowledge panel.

---

## 5. Meta tags template

Every page needs proper meta. Create `lib/meta.ts`:

```typescript
import { Metadata } from 'next';

const BASE = 'https://toronto-charities.ca';
const DEFAULT_OG = `${BASE}/og-default.jpg`;  // 1200x630, create before launch

export function pageMeta({
  title,
  description,
  path,
  ogImage,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
}): Metadata {
  const fullTitle = title.endsWith('Toronto Charities') ? title : `${title} | Toronto Charities`;
  const url = `${BASE}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Toronto Charities',
      images: [{ url: ogImage || DEFAULT_OG, width: 1200, height: 630 }],
      locale: 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage || DEFAULT_OG],
    },
  };
}
```

### Title and description templates by page type

| Page type | Title pattern | Description pattern |
|-----------|---------------|---------------------|
| Homepage | `Toronto Charities — directory of {N} GTA charities and events` | `A community directory of {N} Toronto-area charities and {M} upcoming events. Browse by cause, find local volunteer opportunities, and discover how GTA organizations are working in your community.` |
| Directory | `Toronto Charities List — directory of {N} GTA charity organizations` | `Complete directory of registered charities in Toronto and the GTA. Filterable by cause area, service region, and category. {N} charities listed and verified.` |
| Category | `Toronto {Category} Charities — {N} organizations` | `Directory of {N} Toronto-area charities working on {category lowercase} in the GTA. Browse organizations, upcoming events, and ways to support {category lowercase} work in Toronto.` |
| Charity profile | `{Charity name} — Toronto charity profile` | `{Charity name} is a {category} charity in {location}. {First 120 chars of description}` |
| Event detail | `{Event title} — {Date} in Toronto` | `{Event title} on {date} hosted by {charity name}. {First 100 chars of description}.` |
| Events index | `Toronto Charity Events — upcoming GTA fundraisers and galas` | `Upcoming charity events in Toronto and the GTA. {M} fundraisers, galas, walks, and benefit events from {N} local organizations.` |
| Guide | `{Guide title} | Toronto Charities` | `{Guide dek — first 155 chars}` |

All descriptions: 140-160 characters. All titles: 50-60 characters where possible.

---

## 6. Internal linking

The single biggest internal-link lift on this site comes from getting cross-references right. Implement these patterns:

### Homepage → key pages
- "Browse all charities" link in hero → `/toronto-charities-list/` with anchor text "Toronto charities directory"
- Each cause card → `/category/{slug}/` with anchor text "Toronto {category} charities"
- "View all events" → `/charity-events-toronto/` with anchor text "Toronto charity events"

### Directory page → individual profiles
- Every charity name in the list links to its profile with the charity's name as anchor
- Category tags on each row link to their category page

### Category pages
- Each cross-links to 5-8 sibling categories at the bottom ("Other causes")
- Each links to relevant guides ("Read: How to donate to Toronto {category} charities")
- Each links upward to `/toronto-charities-list/`

### Charity profile pages
- Hosting charity name on events page links to profile
- Profile page links to 4 "similar charities" (same primary category, ordered by featured status then recency)
- Profile page category tags link to category pages

### Guide pages
- Mention real charities by name with profile-page links inline (drives editorial-mention emails per Pipeline D)
- "Featured charities for this topic" sidebar with 3-5 profile links

### Footer (every page)
- All 20 category pages linked from the footer (this is significant for crawl depth — without footer links, deep category pages get sparse internal links)
- Browse, For charities, About columns as specified in the homepage brief

### Internal link guardrails
- Per ATTRIBUTE_DESIGN_STANDARDS / LESSONS_LEARNED: links only inside `<p>` and `<li>` tags, never inside headings or nav structure
- First mention of a service/cause keyword in body copy links once, subsequent mentions don't
- No page links to itself
- Run a build-time check that walks every internal URL and reports orphans (pages with zero inbound internal links)

---

## 7. Page-speed and Core Web Vitals

These determine ranking on mobile especially. Defaults:

- Next.js Image component for any image (covers lazy-load, sizing, WebP)
- Fonts: `next/font` with `display: swap` and preload for Playfair and Inter
- No render-blocking JS — everything Server Component by default, mark `'use client'` only where needed (mobile nav toggle, search submit, charity dashboard)
- No third-party analytics until launch is stable — Plausible only (lightweight, GDPR-compliant)
- Compressed assets via Vercel default

LCP target: < 2.5s on mobile. CLS target: < 0.1. INP target: < 200ms.

Test pre-launch with PageSpeed Insights and WebPageTest from a Canadian endpoint.

---

## 8. Verification before launch

Pre-launch checklist:

- [ ] Every URL in the sitemap returns 200
- [ ] Every `[link-recovery]` URL from the sitemap brief returns 200 with topical content (not a placeholder)
- [ ] Every URL in HISTORICAL_REDIRECTS map either resolves or 301s correctly
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] `sitemap.xml` accessible and valid (run through validator.w3.org/feed or Google's tester)
- [ ] OG image at `/og-default.jpg` exists, 1200x630, < 1MB
- [ ] Favicon exists at `/favicon.ico` (16x16, 32x32, 48x48 combined ICO)
- [ ] Apple touch icon at `/apple-touch-icon.png` (180x180)
- [ ] Schema validates: paste any 5 sample URLs into Google's Rich Results Test and confirm no errors
- [ ] All meta titles and descriptions present (no `<title>` empty, no missing description)
- [ ] Canonical URL present on every page and points to canonical form
- [ ] No "noindex" tags except on dashboard and admin pages
- [ ] `_redirects` or middleware redirects tested for: www → bare, http → https, uppercase → lowercase, trailing-slash variants
- [ ] Internal link audit run — no orphan pages, no self-links, no broken internal links

Submit to Google Search Console and Bing Webmaster Tools on day one with sitemap URL. Use URL Inspection to request indexing on the 10 Tier-0 link-recovery URLs.

---

*Spec version: 1.0*
