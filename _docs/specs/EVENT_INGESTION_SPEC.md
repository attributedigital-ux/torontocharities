# Toronto Charities — Event Ingestion Pipeline Spec

**For**: Claude Code
**Goal**: an automated event-discovery pipeline that produces 20-50 approved Toronto charity events per week without manual scraping work.

---

## REVISED ARCHITECTURE — 2026-05-28 (supersedes the original below)

Three changes from the original spec, in effect from this date forward:

**1. Runtime: Netlify Scheduled Functions, not a DigitalOcean VPS.**
Each cron job lives in `netlify/functions/` with its own schedule in `netlify.toml` (or via the v2 API). Same platform as the web app, deployed by the same `git push`, no SSH, no server to maintain. Functions write to Neon Postgres exactly the same way the web app does. Chunking required for any job > 10s (Starter timeout); most fit. Cost: $0/month on Starter for the expected volume (~250 invocations/month with weekly cadence).

**2. Cadence: weekly, not hourly/daily.**
Charity events are announced weeks to months in advance, not hours. One weekly ingest is sufficient. Schedule:
```
Sunday 23:00 EST   →  all source pullers (chunked invocations over ~30 min)
Monday 01:00 EST   →  Claude enrichment on raw_events queue
Monday 09:00 EST   →  expire ended events + linkback verification
Monday 10:00 EST   →  weekly summary email to owner
```
The Claude enrichment runs as **one weekly Batches API job** (50% discount, 24h SLA is plenty). Last-minute events posted by claimed charities go through the dashboard directly — no automation needed for that path.

**3. HTML scrapers: replaced by Claude-as-scraper.**
Source type #5 in the original spec called for hand-coded per-site scrapers (`scrapers/daily-bread.ts`, etc.) — fragile, break on site redesign. Replace with a single generic function that fetches the page HTML and asks Claude (Haiku, prompt-cached) to extract events as JSON. Adapts automatically when sites redesign. Cost: ~$1–3/month for the 5–10 sites in this category. Other source types (iCal, RSS, Eventbrite, schema.org) stay as-is — they're already structured and don't need a language model.

**Monitoring (new, two layers):**
- **healthchecks.io dead-man-switch**: each scheduled function pings a unique URL on success. If a ping doesn't arrive within the expected window, healthchecks emails. Catches function crashes, Netlify outages, misconfigured schedules. Free tier covers it.
- **Weekly summary email** loudly flags: sources with 0 events for 3+ weeks running, unverified claims older than 7 days, weeks with zero approvals. Catches silent breakage where the cron runs but produces nothing useful.

The rest of the spec below (source types 1–4, dedup logic, Claude enrichment prompt, approval queue, schema) remains accurate — only the *runtime, cadence, and scraper approach* change. Read with the above in mind.

---

This is the make-or-break for the directory's content density. A charity directory with no events is a yellow pages. A charity directory with a real, current events feed is a destination.

---

## Architecture overview

```
┌─────────────────────────────────────────────────────────────┐
│  VPS — Node worker (single-process, cron-driven)            │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │ iCal puller │  │ RSS puller   │  │ Eventbrite API   │    │
│  │ (hourly)    │  │ (hourly)     │  │ puller (daily)   │    │
│  └─────────────┘  └──────────────┘  └──────────────────┘    │
│                                                             │
│  ┌──────────────────────┐  ┌─────────────────────────────┐  │
│  │ Schema.org Event     │  │ Source-specific scrapers    │  │
│  │ parser (daily)       │  │ (per-source, fragile)       │  │
│  └──────────────────────┘  └─────────────────────────────┘  │
│                                                             │
│              ↓ all push raw events into                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Dedup & normalise → Claude rewrite → approval queue  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│              ↓ writes to                                    │
└─────────────────────────────────────────────────────────────┘
                                ↓
                  ┌─────────────────────────┐
                  │  Postgres (events table) │
                  └─────────────────────────┘
                                ↓
                       Next.js web app reads
```

---

## Source registry

Single table, manually populated initially, then grows:

```sql
CREATE TABLE event_sources (
  id SERIAL PRIMARY KEY,
  charity_id INTEGER REFERENCES charities(id),  -- nullable for aggregator sources
  source_type TEXT NOT NULL,                    -- 'ical' | 'rss' | 'eventbrite' | 'schema_org' | 'scrape'
  source_url TEXT NOT NULL,
  source_name TEXT,                             -- human-readable, e.g. "CAMH Foundation events"
  is_active BOOLEAN DEFAULT true,
  last_checked_at TIMESTAMP,
  last_success_at TIMESTAMP,
  last_error TEXT,
  consecutive_failures INTEGER DEFAULT 0,       -- auto-disable after 5
  events_found_count INTEGER DEFAULT 0,
  events_approved_count INTEGER DEFAULT 0,      -- quality metric for the source
  config JSONB,                                 -- source-specific config (CSS selectors, API params)
  created_at TIMESTAMP DEFAULT now()
);
```

**Seed the registry by source type** (priority order):

### 1. iCal feeds (.ics)

These are the gold standard — structured, reliable, machine-readable. Many charities publish events as iCal but don't realise people can subscribe.

Discovery: for each charity with `website_url`, crawl their site looking for `.ics` links. Common patterns:
- `<a href="*.ics">` in HTML
- `<link rel="alternate" type="text/calendar">` in `<head>`
- `/calendar.ics`, `/events.ics`, `/feed.ics` paths
- iCal-as-Google-Calendar-public-URL pattern: `calendar.google.com/calendar/ical/[id]/public/basic.ics`

```typescript
// scripts/discover-ical-feeds.ts
async function discoverIcalForCharity(charity: Charity) {
  if (!charity.website_url) return;

  const html = await fetch(charity.website_url).then(r => r.text());

  // Pattern 1: explicit .ics links
  const icsMatches = html.match(/href=["']([^"']+\.ics)["']/gi) ?? [];

  // Pattern 2: alternate calendar links
  const altMatches = html.match(/<link[^>]+type=["']text\/calendar["'][^>]*>/gi) ?? [];

  // Pattern 3: try common paths
  const commonPaths = ['/calendar.ics', '/events.ics', '/feed.ics', '/calendar/feed/'];
  for (const path of commonPaths) {
    const testUrl = new URL(path, charity.website_url).toString();
    if (await isValidIcs(testUrl)) {
      await registerSource(charity, 'ical', testUrl);
    }
  }

  for (const match of icsMatches) {
    const url = match.match(/href=["']([^"']+)["']/)[1];
    const absolute = new URL(url, charity.website_url).toString();
    if (await isValidIcs(absolute)) {
      await registerSource(charity, 'ical', absolute);
    }
  }
}
```

Run this once after the CRA import, then quarterly for new charities.

### 2. RSS feeds

Less reliable than iCal but more common. Many WordPress-based charity sites publish a `/feed/` URL with event posts mixed in among news.

Discovery pattern:
- `<link rel="alternate" type="application/rss+xml">` in `<head>`
- Common paths: `/feed/`, `/rss/`, `/feed/events/`, `/category/events/feed/`

```typescript
async function discoverRssForCharity(charity: Charity) {
  const html = await fetch(charity.website_url).then(r => r.text());

  const rssLinks = [];

  // Pattern 1: explicit declaration
  const altMatches = html.match(/<link[^>]+type=["']application\/(rss|atom)\+xml["'][^>]+href=["']([^"']+)["']/gi) ?? [];
  for (const m of altMatches) {
    const href = m.match(/href=["']([^"']+)["']/)?.[1];
    if (href) rssLinks.push(new URL(href, charity.website_url).toString());
  }

  // Pattern 2: common WordPress paths
  for (const path of ['/feed/', '/feed/events/', '/category/events/feed/']) {
    const url = new URL(path, charity.website_url).toString();
    if (await isValidFeed(url)) rssLinks.push(url);
  }

  for (const url of rssLinks) {
    await registerSource(charity, 'rss', url);
  }
}
```

RSS events are harder than iCal because the feed mixes news posts and event posts. Use a heuristic at parse time:

```typescript
function isLikelyEvent(item: RssItem): boolean {
  const text = `${item.title} ${item.description}`.toLowerCase();
  const eventKeywords = [
    'gala', 'fundraiser', 'fundraising', 'walk', 'run', 'auction', 'benefit',
    'ceremony', 'concert', 'festival', 'rally', 'march', 'tournament',
    'register', 'tickets', 'rsvp', 'join us', 'pm', 'am', 'doors open',
  ];
  const dateRegex = /\b(jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|jun(e)?|jul(y)?|aug(ust)?|sep(tember)?|oct(ober)?|nov(ember)?|dec(ember)?)\s+\d{1,2}\b/i;

  const hasKeyword = eventKeywords.some(k => text.includes(k));
  const hasDate = dateRegex.test(text) || dateRegex.test(item.pubDate || '');

  return hasKeyword && hasDate;
}
```

If `isLikelyEvent` returns true, route to Claude for structured extraction (see step "Claude rewrite" below). Claude returns `{is_event: bool, parsed_event: {...}}` and we discard if it disagrees.

### 3. Eventbrite API

Eventbrite has a free-tier API with search by location and category. This is the single highest-yield source — Toronto charity events overwhelmingly use Eventbrite for ticketing.

Setup:
- Register an Eventbrite developer account at `eventbrite.com/platform/api`
- Generate a personal OAuth token (sufficient for read-only search; full app registration not needed)
- Store token in `EVENTBRITE_TOKEN` env var on the worker

Query pattern:

```typescript
async function pullEventbriteToronto(): Promise<EventbriteEvent[]> {
  const token = process.env.EVENTBRITE_TOKEN;
  const allEvents: EventbriteEvent[] = [];

  // Category 113 = Charity & Causes
  // Other useful: 102 (Community), 110 (Family & Education), 105 (Performing Arts) — filter further at ingestion

  for (const category of ['113', '102']) {
    let url = `https://www.eventbriteapi.com/v3/events/search/?location.address=Toronto&location.within=25km&categories=${category}&expand=organizer,venue&page=1`;

    while (url) {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      allEvents.push(...data.events);

      url = data.pagination.has_more_items
        ? url.replace(/page=\d+/, `page=${data.pagination.page_number + 1}`)
        : null;

      await sleep(1000);  // be respectful
    }
  }

  return allEvents;
}
```

Match each Eventbrite event to a charity in our directory via fuzzy organizer-name matching:

```typescript
async function matchOrganizerToCharity(organizerName: string): Promise<Charity | null> {
  const normalized = organizerName.toLowerCase().trim();

  // Exact match on display_name or legal_name
  const exact = await db.query.charities.findFirst({
    where: or(
      eq(sql`lower(display_name)`, normalized),
      eq(sql`lower(legal_name)`, normalized),
    ),
  });
  if (exact) return exact;

  // Trigram similarity (Postgres pg_trgm extension)
  const fuzzy = await db.execute(sql`
    SELECT id, display_name, similarity(lower(display_name), ${normalized}) as score
    FROM charities
    WHERE status = 'published'
    AND similarity(lower(display_name), ${normalized}) > 0.4
    ORDER BY score DESC
    LIMIT 1
  `);

  return fuzzy.rows[0] || null;
}
```

Events without a charity match get inserted with `charity_id = null` and `source_type = 'eventbrite_unmatched'`. These go to a separate admin queue — they're often new charities to add to the directory, or false positives.

### 4. Schema.org Event markup

Many modern charity sites publish event data as JSON-LD inside their HTML. Crawl listed charities' `/events/`, `/upcoming/`, `/calendar/` pages weekly and parse `<script type="application/ld+json">` for `@type: Event`.

```typescript
async function scrapeSchemaEvents(charity: Charity) {
  const eventPages = await findEventPages(charity.website_url);

  for (const url of eventPages) {
    const html = await fetch(url).then(r => r.text());
    const $ = cheerio.load(html);

    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const data = JSON.parse($(el).html() || '{}');
        const items = Array.isArray(data) ? data : (data['@graph'] || [data]);

        for (const item of items) {
          if (item['@type'] === 'Event' || (Array.isArray(item['@type']) && item['@type'].includes('Event'))) {
            queueRawEvent({
              charity_id: charity.id,
              source_type: 'schema_org',
              source_url: url,
              raw: item,
            });
          }
        }
      } catch (e) {
        // Malformed JSON-LD — skip
      }
    });
  }
}
```

Parse the JSON-LD `Event` directly — it already has `name`, `startDate`, `location`, `description`, `url`. Highest-quality structured source after iCal.

### 5. HTML scraping (last resort)

For 5-10 high-value charities that have events but no feeds and no JSON-LD. Hand-crafted per source. Cassar HVAC-style pattern: a `scrapers/` directory with one file per source, each exporting a `parse(html): RawEvent[]` function.

```typescript
// worker/scrapers/daily-bread.ts
export const config = {
  url: 'https://www.dailybread.ca/events/',
  name: 'Daily Bread Food Bank',
  charity_slug: 'daily-bread-food-bank',
};

export function parse(html: string): RawEvent[] {
  const $ = cheerio.load(html);
  const events: RawEvent[] = [];

  $('.event-card').each((_, el) => {
    const $el = $(el);
    events.push({
      title: $el.find('.event-title').text().trim(),
      starts_at: parseDate($el.find('.event-date').text().trim()),
      location_name: $el.find('.event-location').text().trim(),
      description: $el.find('.event-description').text().trim(),
      source_url: $el.find('a').attr('href'),
    });
  });

  return events;
}
```

Maintain a `scrapers/registry.ts` that maps source_type configs to parse functions. Add per-scraper breakage alerts — if a scraper has previously returned events and now returns 0, log it and disable after 3 zero-result runs in a row.

---

## Ingestion pipeline (the core processing loop)

Every source pull writes to `raw_events` — a staging table separate from the public `events` table:

```sql
CREATE TABLE raw_events (
  id SERIAL PRIMARY KEY,
  source_id INTEGER REFERENCES event_sources(id),
  source_url TEXT,
  external_id TEXT,                    -- iCal UID, Eventbrite ID, etc — used for dedup within source
  raw_payload JSONB NOT NULL,
  charity_id INTEGER REFERENCES charities(id),
  processed_at TIMESTAMP,
  processed_status TEXT,               -- 'pending' | 'duplicate' | 'enriched' | 'rejected'
  created_at TIMESTAMP DEFAULT now()
);

CREATE UNIQUE INDEX idx_raw_events_dedup ON raw_events(source_id, external_id) WHERE external_id IS NOT NULL;
```

### Pipeline steps for each raw event

```typescript
async function processRawEvent(raw: RawEvent) {
  // 1. Dedup within source by external_id (insertion-time uniqueness)
  //    — handled by the unique index above

  // 2. Dedup across sources by content similarity
  const existing = await findSimilarPublishedEvent(raw);
  if (existing) {
    await markProcessed(raw.id, 'duplicate');
    return;
  }

  // 3. Normalise
  const normalized = normaliseEvent(raw);
  if (!normalized.starts_at || normalized.starts_at < new Date()) {
    await markProcessed(raw.id, 'rejected');  // past or undated event
    return;
  }

  // 4. Claude rewrite of description + extract structured fields if missing
  const enriched = await enrichWithClaude(normalized);
  if (enriched.rejected_reason) {
    await markProcessed(raw.id, 'rejected', enriched.rejected_reason);
    return;
  }

  // 5. Determine auto-approve eligibility
  const charity = raw.charity_id ? await getCharity(raw.charity_id) : null;
  const autoApprove =
    charity?.linkback_verified_at != null &&    // claimed AND linkback verified
    enriched.confidence_score >= 0.8 &&         // claude confidence
    raw.source_type !== 'scrape';               // never auto-approve scraped content

  // 6. Insert into events table
  const slug = await generateUniqueEventSlug(enriched.title);
  await db.insert(events).values({
    slug,
    charity_id: raw.charity_id,
    title: enriched.title,
    description: enriched.description,
    starts_at: enriched.starts_at,
    ends_at: enriched.ends_at,
    location_name: enriched.location_name,
    location_address: enriched.location_address,
    registration_url: enriched.registration_url,
    cost_text: enriched.cost_text,
    source_url: raw.source_url,
    source_type: raw.source_type,
    status: autoApprove ? 'approved' : 'pending',
    approved_at: autoApprove ? new Date() : null,
    approved_by: autoApprove ? 'auto' : null,
  });

  await markProcessed(raw.id, 'enriched');
}
```

### Dedup heuristic

Two events are likely duplicates if:
- Same charity
- Same date (within 24 hours)
- Title similarity > 0.7 (trigram match)

OR:
- Different charities but identical title AND identical date AND identical location

```typescript
async function findSimilarPublishedEvent(raw: NormalisedEvent): Promise<Event | null> {
  return await db.execute(sql`
    SELECT * FROM events
    WHERE
      starts_at BETWEEN ${raw.starts_at - 86400000} AND ${raw.starts_at + 86400000}
      AND (
        (charity_id = ${raw.charity_id} AND similarity(lower(title), lower(${raw.title})) > 0.7)
        OR
        (lower(title) = lower(${raw.title}) AND lower(location_name) = lower(${raw.location_name}))
      )
    LIMIT 1
  `).then(r => r.rows[0] || null);
}
```

### Claude enrichment

```typescript
async function enrichWithClaude(event: NormalisedEvent): Promise<EnrichedEvent> {
  const response = await claude.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 800,
    messages: [{
      role: 'user',
      content: `
You are processing a charity event for the Toronto Charities directory. Given the raw event data below, return a JSON object with the cleaned and rewritten event.

Raw event:
Title: ${event.title}
Date: ${event.starts_at}
Location: ${event.location_name || 'Not specified'}
Description (may be marketing copy or HTML): ${event.description}
Source URL: ${event.source_url}

Return JSON only, no preamble:

{
  "title": "<cleaned title, max 80 chars, sentence case>",
  "description": "<60-120 word rewrite. Factual, no marketing language. No em dashes. Third person. State what the event is, who it benefits, what attendees can expect. If the source description is mostly marketing fluff, write less rather than fabricate detail.>",
  "starts_at_iso": "<ISO 8601 datetime if extractable from raw, else null>",
  "ends_at_iso": "<ISO 8601 datetime if extractable, else null>",
  "location_name": "<venue name, cleaned>",
  "location_address": "<full address if available, else null>",
  "registration_url": "<URL if found in raw, else null>",
  "cost_text": "<'Free' or '$N' or 'Pay what you can' or null>",
  "category_hints": ["<category slug>", ...],  // 1-3 of: cancer, children, community-wellness, environmental, fundraising-events, health, ngos, mental-health, food-security, homelessness, housing, youth, education, arts-culture, animals, seniors, womens-services, indigenous, refugees-newcomers, lgbtq
  "confidence_score": <0.0 to 1.0>,
  "rejected_reason": "<if this isn't a real upcoming charity event, explain why. Otherwise null.>"
}

Reject (set rejected_reason) if:
- Not actually an event (it's a news post, a campaign launch, a service announcement)
- Past date with no recurrence
- For-profit / commercial promotion (a business "supporting charity" but the event is commercial)
- Religious service or worship event (these aren't directory-fit even from registered religious charities)
- Generic ongoing program like "Volunteer Mondays" — these belong on a charity's profile page, not the events feed
      `.trim(),
    }],
  });

  return parseClaudeJson(response.content[0]);
}
```

The Claude enrichment is the single most important step. It:
- Cleans marketing-heavy source copy into editorial prose
- Standardises dates and times
- Extracts cost and registration URLs
- Categorises by cause area
- Flags non-events that slipped through source filters
- Provides a confidence score for auto-approval decisions

### Approval queue

Events with `status = 'pending'` appear in the admin dashboard at `/admin/events/queue` (or however auth is structured). For each:

- Display the cleaned title, description, date, charity
- Display the raw source content side-by-side for comparison
- Display the Claude-suggested categories
- Three buttons: **Approve** (publishes), **Edit** (opens form), **Reject** (logs reason)
- Bulk approve action: select multiple, approve in one click

Once approved: event appears at `/listing/{slug}/`, in the events index, on the charity's profile, and in the public iCal/RSS feeds.

### Auto-expire

A scheduled job runs daily:

```typescript
async function expireOldEvents() {
  await db.update(events).set({ status: 'expired' })
    .where(and(
      lt(events.ends_at || events.starts_at, sql`now() - interval '2 days'`),
      eq(events.status, 'approved'),
    ));
}
```

Expired events stay in the database (URLs continue to work — important for SEO from any inbound links to specific event pages) but drop from the active feeds and homepage rotation. The event page itself shows "This event has ended" and links to upcoming events from the same charity.

---

## Cron schedule

Single crontab on the VPS:

```cron
# Every hour: iCal and RSS pulls (cheap, high-frequency for freshness)
0 * * * * /usr/bin/node /opt/charity-worker/dist/pull-ical.js
0 * * * * /usr/bin/node /opt/charity-worker/dist/pull-rss.js

# Every 4 hours: Schema.org parser (medium cost, slower-changing data)
0 */4 * * * /usr/bin/node /opt/charity-worker/dist/pull-schema.js

# Daily 02:00 EST: Eventbrite (rate-limited, daily is plenty)
0 7 * * * /usr/bin/node /opt/charity-worker/dist/pull-eventbrite.js

# Daily 03:00 EST: scrapers (run when sites are quiet)
0 8 * * * /usr/bin/node /opt/charity-worker/dist/pull-scrapers.js

# Daily 04:00: process raw_events queue through Claude
0 9 * * * /usr/bin/node /opt/charity-worker/dist/process-raw-events.js

# Daily 05:00: expire old events
0 10 * * * /usr/bin/node /opt/charity-worker/dist/expire-events.js

# Daily 09:00 EST: linkback verification crawler (Pipeline C from main spec)
0 14 * * * /usr/bin/node /opt/charity-worker/dist/verify-linkbacks.js

# Daily 10:00 EST: send summary email
0 15 * * * /usr/bin/node /opt/charity-worker/dist/daily-summary.js
```

### Daily summary email

Sends to the project owner each morning with:
- New events found yesterday (count by source)
- Events auto-approved (count)
- Events in pending queue (count, deep link to admin)
- Events rejected by Claude (count + sample reasons)
- New charities discovered via Eventbrite unmatched-organizer queue
- Linkback verifications added
- Source health: any sources with 3+ consecutive failures

Single HTML email, sent via the same transactional email infrastructure used for charity notifications.

---

## Monitoring and reliability

- Every source pull logs success/failure to `event_sources.last_checked_at`, `last_success_at`, `last_error`, `consecutive_failures`
- After 5 consecutive failures, source is auto-disabled (`is_active = false`) and flagged in the daily summary
- Worker logs to journald on the VPS; weekly check via `journalctl -u charity-worker --since '1 week ago' | grep ERROR`
- Database queries time out at 30 seconds, individual HTTP fetches at 15 seconds
- Claude API errors caught and retried with exponential backoff (3 attempts max)
- Per-source rate limit: max 1 request every 2 seconds, max 100 requests per source per day

---

## Manual quality controls

Despite the automation, the admin needs:

- Source registry editor at `/admin/sources/` — add, edit, disable sources
- Approval queue at `/admin/events/queue/` — bulk approve, edit, reject
- Unmatched organizer queue at `/admin/events/unmatched/` — "this is X charity" / "this isn't a real charity"
- Per-charity events override at `/admin/charities/{slug}/events/` — manually add an event for a charity that doesn't have a feed

These admin views are minimal — no fancy UI. Tables, filters, action buttons. Built fast, used daily.

---

## Initial seeding plan

Phase 3 of the build (per main spec, weeks 8-10):

**Week 8**:
- Build event_sources table, raw_events table, pipeline skeleton
- Implement Eventbrite puller (highest yield, simplest integration)
- Implement iCal puller
- Set up first 10 manual sources by hand (well-known Toronto charities with known calendars)

**Week 9**:
- Claude enrichment integration
- Approval queue UI
- RSS puller
- iCal/RSS feed exports at `/api/events.ics` and `/api/events.rss`

**Week 10**:
- Schema.org parser
- One sample scraper (Daily Bread or similar) as proof of pattern
- Source discovery script (run across all imported charities to auto-register their feeds)

By end of week 10, expect:
- 50-150 known event sources
- 100-300 events processed
- 20-50 events approved and live on the site

By month 4, expect:
- 300-500 sources
- 500-1000 events processed weekly
- 80-150 events live at any time

---

## Compliance notes

- All scraped content is rewritten by Claude before publication — never republished verbatim
- Every event page links back to the source URL with attribution
- Robots.txt of each source is respected; sources that disallow our user agent are not scraped
- iCal feeds, RSS feeds, and JSON-LD are explicitly published for syndication — no compliance question
- Eventbrite Terms of Service explicitly permit API-based event discovery and republication with attribution

If a charity asks us to remove their events from automated ingestion, set `event_sources.is_active = false` for their sources and add a row to `event_source_opt_outs` to prevent re-discovery. Single-charity opt-out is one click in the admin.

---

*Spec version: 1.0*
