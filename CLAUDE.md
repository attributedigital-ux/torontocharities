# CLAUDE.md — Toronto Charities

Operating rules for Claude Code on this project. Read this file before touching anything.

## What this project is

A free public directory of every registered charity in the Greater Toronto Area, with automated event ingestion and a self-managing charity activation pipeline. Operated as a community resource by Toronto Property (credited subtly in footer only — one line, 70% opacity).

- Domain: `toronto-charities.ca`
- Live data: 12,758 GTA charities from CRA bulk import, events from Eventbrite + charity websites, AI-generated descriptions
- Hosted on Netlify (web + scheduled functions). No VPS — everything runs on Netlify crons.
- Repo: `github.com/attributedigital-ux/torontocharities`

## Stack

```
Next.js 16 App Router + React 19 + Tailwind 4
Drizzle ORM + Neon (serverless Postgres, pg_trgm enabled)
Resend — sending + receiving (hello@toronto-charities.ca, MX verified)
Anthropic SDK — Haiku 4.5 (inbound email handler + edit processing)
Netlify scheduled functions (crons — no VPS needed)
```

## Current state (as of 2026-05-31)

### Data
- 12,758 charities imported from CRA CSV (names, addresses, CRA numbers, categories)
- 5,531 charities have website URLs (imported from CRA open data `weburl_2023_updated.csv`)
- ~2,400 charities have discovered email addresses (scraped from charity websites)
- All 12,747 AI-generated descriptions cleaned of JSON markdown fences
- 15 categories with correct slugs and Unsplash cover images

### Email pipeline
- **Outreach cron**: `netlify/functions/daily-outreach.mts` — fires 9am UTC daily, sends 90 emails/day (Resend free tier limit: 3,000/month)
- **Send logic**: initial email → follow-up at 14 days → final follow-up at 30 days → stops. Tracked via `outreach_sent_at` and `outreach_count` columns.
- **Inbound handler**: `app/api/inbound-email/route.ts` — Resend webhook → fetches body via `resend.emails.receiving.get(id)` → Claude Haiku classifies and responds
- **Webhook**: set up in Resend → Webhooks pointing to `https://toronto-charities.ca/api/inbound-email`
- **Verification**: `app/api/charity/verify/route.ts` — checks homepage + 7 common sub-pages (/about, /about-us, /contact, /links, /resources, /community, /support) for `toronto-charities.ca` link

### Activation flow
1. Charity receives outreach email
2. Clicks "Activate your free listing" → `/charity/claim/`
3. Adds link to their website
4. Clicks verify — we fetch their site and confirm the link exists
5. `linkback_verified_at` and `claimed_at` set — charity is activated

### Events
- Eventbrite ingestion: `lib/events/eventbrite.ts` — 14 search pages across charity/fundraising/community categories
- Weekly cron: `netlify/functions/weekly-events.mts` — fires Sunday 11pm UTC
- Event enrichment: `lib/events/enrich.ts` — Claude Haiku, fuzzy charity matching via pg_trgm
- Homepage shows 18 upcoming events

## Netlify environment variables required

```
DATABASE_URL          — Neon connection string
ANTHROPIC_API_KEY     — Claude Haiku for inbound email + edit processing
RESEND_API_KEY        — Sending + receiving
RESEND_WEBHOOK_SECRET — Svix signing secret from Resend webhook settings
NEXTAUTH_URL          — https://toronto-charities.ca
NEXTAUTH_SECRET       — Random secret for auth
```

## Key scripts (run with `npx tsx --env-file=.env scripts/[name].ts`)

| Script | Purpose |
|---|---|
| `import-cra-charities.ts` | One-time CRA CSV import. Pass path to CSV. |
| `import-websites.ts` | Import website URLs from CRA open data weburl CSV. Download from open.canada.ca dataset `05b3abd0-e70f-4b3b-a9c5-acc436bd15b6`. |
| `discover-emails.ts` | Scrape emails from charity websites. Run after import-websites. |
| `fix-descriptions.ts` | Strip JSON markdown fences from descriptions. Already run — don't re-run unless new descriptions are generated. |
| `generate-descriptions.ts` | Generate AI descriptions via Batches API. Run once. |
| `pull-events.ts` | Manual event pull (Eventbrite). Normally handled by weekly cron. |
| `reset-errors.ts` | Reset `processed_status='error'` back to `'pending'` for re-processing. |
| `scrape-logos.ts` | Find charity logo URLs from their websites. |

## Claude pipelines — cost rules

### Always Haiku 4.5
```typescript
const MODEL = 'claude-haiku-4-5-20251001';
```
Never use Sonnet or Opus. Both tasks are pattern work, not reasoning work.

### Prompt caching on static portions
```typescript
system: [{ type: 'text', text: STATIC_INSTRUCTIONS, cache_control: { type: 'ephemeral' } }]
```

### Inbound email handler — hard limits
Claude handles inbound email from charities. It may ONLY:
- Edit a charity's listing (description, address, phone, email, website, display name)
- Remove a charity from the directory
- Answer questions about the directory

It must NEVER:
- Promise features that don't exist
- Make up charity information
- Agree to promote specific campaigns beyond automated event ingestion
- Discuss pricing, partnerships, or commercial arrangements
- Take any action outside the three above

## Charity branding rules
- Toronto Property: one line in footer only, 70% opacity, one link to torontoproperty.ca
- Logo: "TC / Toronto Charities" only — no "by Toronto Property" in the logo
- Email from: `hello@toronto-charities.ca`

## Things not to build without explicit instruction
- Payment processing
- User accounts for donors/public (charity owners + admins only)
- Multi-language support
- Native mobile apps
- Social media posting
- Fundraising tools
- Donor or volunteer matching

## Next steps / todo

### Immediate
- [ ] Monitor first outreach wave — check Resend logs for bounces and replies coming in
- [ ] Verify inbound email handler is working when a charity replies (check Resend webhook logs)
- [ ] Run `scripts/scrape-logos.ts --limit=2000` to find charity logos
- [ ] Run `scripts/discover-ical.ts` to find iCal feeds from charity websites

### Content
- [ ] Write actual content for guide pages (currently "Coming soon" stubs at `/guides/`)
- [ ] Select and mark `is_featured = true` for 6-12 high-quality charities for homepage featured section

### Growth
- [ ] Business backlink outreach pipeline — contact Toronto businesses to link to the directory in exchange for a mention in Toronto Property neighbourhood guides. See memory: `torontocharities_business_backlinks.md`

### Technical
- [ ] Implement proper Svix webhook signature verification in `app/api/inbound-email/route.ts` (currently just checks header exists)
- [ ] Add `RESEND_WEBHOOK_SECRET` to Netlify env vars once retrieved from Resend → Webhooks → signing secret
- [ ] United Way GT event scraper
- [ ] Toronto Life event scraper
- [ ] Admin view: dashboard showing outreach stats, verified charities, recent inbound emails handled

## Build hygiene

- Netlify free tier: 300 build minutes/month — push deliberately, not repeatedly
- Git push via terminal (`git push origin main`) — HTTPS credentials are configured
- One logical change per commit
- Never edit anything live without committing the same session
- Scheduled functions cost nothing meaningful on free tier (~65 invocations/month)

## Working principles

- Edit, don't rewrite — targeted Edits over Writes for existing files
- Server Components by default; `'use client'` only for forms, search, interactive elements
- No third-party UI libraries
- Resend free tier: 3,000 emails/month, 100/day — outreach cron is capped at 90/day to stay within this
