# Static rebuild (started 2026-08-31, branch `static-rebuild`)

## Why
Every public page ran a live DB query per request. 12,805 pages x crawlers exhausted the
Neon free-tier compute quota on 31 Aug and the whole site returned 500s. Same root cause as
the ~$70/mo Netlify overage found 20 Aug. House rule (global CLAUDE.md): pre-render public
pages, never a DB query per hit.

## Approach
Not a rewrite. Next.js renders these pages at BUILD time using the same drizzle queries, so
the database is read once per build instead of once per visitor. Pages ship as files on the
CDN. Neon drops back to serving only outreach/claims state, which it does on the free tier
forever.

## Done on this branch
- `app/profile/[slug]/page.tsx` — generateStaticParams over published charities (the 12,805)
- `app/category/[slug]/page.tsx` — generateStaticParams over categories
- `app/listing/[slug]/page.tsx` — generateStaticParams over events
- `app/page.tsx`, `app/charity-events-toronto/page.tsx` — force-static
- All five: `dynamic = 'force-static'`, `revalidate = 604800` (weekly)
- `npx tsc --noEmit` clean.

## Left to do (needs the DB awake)
1. `app/toronto-charities-list/page.tsx` — the only route using searchParams (6 uses).
   Convert to a static shell + client-side filtering over an embedded JSON index
   (the proven Leslieville-microsite pattern; see global CLAUDE.md Phase 2 notes).
2. Run a real `next build` against live data. Expect a long build (12,805 pages);
   if Netlify build minutes are a concern, generate on a schedule rather than per push.
3. Keep API routes (`/api/*`, claim flow, inbound-email) dynamic. They are POST endpoints
   with negligible traffic and genuinely need the DB.
4. Events freshness: the weekly Eventbrite job should, after writing to the DB, hit a
   Netlify build hook so the static pages pick the events up. Weekly is the current cadence;
   nightly if fresher listings are wanted. No per-request queries either way.
5. Verify: sample 25 sitemap URLs return 200, and confirm the sitemap matches generated routes.

## Do not
- Do not point the outreach function at static data. It needs live DB state.
- Do not commit a DB dump to this repo: it is PUBLIC. Backups go to the private
  attribute-brain repo (`.github/workflows/tc-backup.yml`).
