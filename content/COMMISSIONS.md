# Commissions — 2 November 2026 (Monday)

Written by the editor, commissioning run. Monday is a fixed-track day. Per
`CLIENT.md`/`content-engine.md`, today commissions only "This week's charity
events in Toronto" (Track 1), not a guide from `QUEUE.md`. The fixed tracks
take priority over the queue on their own day.

## Connectivity, checked this session

`curl -m 10` to `https://toronto-charities.ca/charity-events-toronto/`
returned `000` (connection never completed, exit 56). The proxy's own
status endpoint logs the identical `connect_rejected` shape ("gateway
answered 403 to CONNECT") against a wide, unrelated spread of hosts in the
same window (mcp.box.com, mcp.atlassian.com, mcp.hubspot.com, mcp.notion.com,
mcp.eu.amplitude.com, mcp.similarweb.com, mcp.figma.com, mcp-server.egnyte.com,
mcp.intercom.com, api.ahrefs.com and others), policy `"selective": false` —
confirming, as every session since 21 Oct has, that this is a blanket block
for the session type, not a dead page. `DATABASE_URL` and `ANTHROPIC_API_KEY`
are both confirmed absent (presence check against `env`). This is the
**thirteenth** weekday session to hit the fault (15, 16, 19, 20, 21, 22, 23,
26, 27, 28, 29, 30 Oct, now 2 Nov) — twenty calendar days, no writer run
producing a draft since 13 October.

**This means today's commission inherits the same block every commission
since 15 Oct has logged.** Per `content-writer.md`'s own hard rule, the
writer drafts nothing until a live fetch of the events table/page (or a
working `DATABASE_URL` query) actually returns data, and logs which route it
tried rather than re-describing the fault. Not re-escalating as a new item:
`attribute-brain/todo/toronto-charities.md` R-192 (egress) and R-193
(`DATABASE_URL`/Neon quota, updated 1 Nov with a third consecutive
month-end exhaustion email) already carry the open question; a fourteenth
log entry restating it would change nothing. R-213 (Neon backup-skip
recurrence) and R-170 (category-page mapping) are also unchanged. All four
remain Richard's decisions.

## Researcher pull since the last commissioning run

`research/EVIDENCE.md` and `content/QUEUE.md` were both refreshed today (2
Nov pull). The one substantive change — cluster #9, `donate-furniture-toronto`,
moved from borderline to **WINNABLE NOW** on a live SERP re-check — is an
evergreen guide, not Track 1 or Track 2, so it is **not** commissioned
today. It carries forward to the next non-Monday/Friday commissioning run,
alongside the two guides already held since 15/20 Oct
(`volunteer-opportunities-toronto-students`, `donate-hair-toronto`), all
three still blocked by the same egress/credential fault above. Per
`EVIDENCE.md`'s own instruction, it should be commissioned as "winnable,
modest traffic ceiling" (an AI Overview, a 3-pack local pack and a PAA box
all sit above the first organic result), never as an easy 60/mo win.

## Fixed-track backlog, carried forward

Reading the fixed tracks the way `CLIENT.md`'s dated-record rule says they
work — a newer issue supersedes the older one of the same track:
- `charity-events-toronto-week-of-2026-10-19` and `-10-26` — both stale,
  both undrafted, both superseded by today's issue below.
- `toronto-charity-news-2026-10-16`, `-10-23` and `-10-30` — all stale, all
  undrafted; the next Friday issue (6 Nov) will supersede them if it ever
  drafts first.
- The two guide commissions held since 15/20 Oct
  (`volunteer-opportunities-toronto-students`, `donate-hair-toronto`), plus
  `donate-furniture-toronto` above, are not re-issued today — today is a
  fixed-track day, not a queue day — and pick back up on the next
  non-Monday/Friday commissioning run.

## Standing rules for the commission below

The five faults from `CLIENT.md` ("What the editors kept catching") apply
directly: invented reader beliefs, unsourced superlatives, invented
numbers/counts not matching a facts row (here: event counts, dates, times,
costs — count them against the table, not against the sentence just
written), headings that restate their own content, and any claim about this
site's own pages (events, category) not checked live this session.

- **The bare-intensifier family includes "actually"/"actual"** alongside
  "real"/"genuine(ly)" (RULINGS 2026-10-10, 2026-10-16, 2026-10-18) — delete
  as filler, never reword, unless the sentence draws an explicit contrast.
- **GRAMMAR.md's object-as-actor rule** (RULINGS 2026-10-18): no verb that
  needs intention, judgement or perception attached to a thing that cannot
  do it.
- No adjectives about the cause ("heartwarming", "vital", "inspiring") —
  `CLIENT.md`'s voice line: a local reporter listing what is on, not
  endorsing it. No commentary and no filler between entries — this is a
  grouped listing, not prose around a list.
- Only `/category/social-services/` among category pages, same restriction
  as every other commission until R-170 lands. Canadian spelling throughout.
  Dates in full, with the year (CLIENT.md: "the issue is a record").

## Commission: Monday events issue

**Slug:** `charity-events-toronto-week-of-2026-11-02`
**Working title:** Toronto charity events, week of 2 November 2026
**Track / intent tier:** Fixed Track 1 (`CLIENT.md`), weekly, Monday. Dated
events listing, not keyword-driven — not a `QUEUE.md` cluster, though it
supports the evergreen term "charity events toronto" (covered row #12,
100/mo, KD 1) that `/charity-events-toronto/` already owns. Reader intent:
someone in Toronto deciding what to attend this week, or a charity's own
staff checking whether their event is listed.

**Angle (one sentence):** Every approved charity event starting in the next
seven days, grouped by day, each one stating only what the events table
holds — date, time, place, what it is, cost, the Eventbrite link, the
charity's profile link where the organiser resolves to one — with no
commentary or filler between entries.

**What it must cover (the per-entry bar, in place of FAQ-style questions —
this surface has no FAQ):**
1. Does the event actually appear in the live `events` table/page as
   approved and starting within the next seven days of 2 November 2026? No
   entry invented, remembered from a prior week's issue, or carried over
   unconfirmed.
2. Date, time, place, a plain one-line description of what it is, and cost
   (or "free") — each taken from the table's own fields, not inferred or
   guessed from the event name.
3. Does the event's organiser resolve to a charity profile slug in our own
   directory? Named with a profile link if it does; named without one,
   exactly as the table gives the organiser, if it does not — never a
   guessed URL.
4. Is the Eventbrite link present and does it point at this specific
   event's own listing, not a generic search or category page?
5. Are entries grouped by day, in date order, with no editorial sentence
   introducing or closing a day's group — the CLIENT.md rule against
   filler between entries applies to section intros too (RULINGS/EDITLOG
   pattern on other tracks: a section intro is not licence to editorialise).
6. If fewer events turn up than a typical week, does the issue say so
   plainly (or simply list fewer) rather than padding with an uncited or
   out-of-window event?

**Links it must earn:**
- The Eventbrite link for every single event — no exception. An event with
  no Eventbrite link does not ship.
- The charity's own profile `/profile/<slug>/` for every event whose
  organiser resolves to a directory charity, checked against the
  sitemap/DB before linking — unresolved, name the organiser without a
  link, never guess the slug.
- `/category/social-services/` only where a named charity genuinely sits in
  that category (the only category page `CLIENT.md` confirms is correctly
  mapped) — optional, not required for this surface, and never for any
  other category page.
- No link to a sister site unless an event is itself tied to a specific
  place (torontoproperty.ca neighbourhood page) — expected to be rare or
  absent this issue.

**Image:** the Eventbrite image of the lead event (CLIENT.md: every
upcoming event has one). No generated hero for this track.

**Facts needed, and where from:**
- Every event: the live `events` table (via `DATABASE_URL` query) or the
  live `/charity-events-toronto/` page (via fetch), fetched or queried live
  this run — not recalled from a prior week's issue or from training data.
- Each charity's directory slug: our own sitemap/DB, live query, not a
  guess based on the organiser name.
- Nothing else — this track carries no evergreen research dependency.

**Do not claim (binding):**
- No event invented, paraphrased from memory, or carried over from a
  superseded issue (19 or 26 Oct) to fill out the week.
- No charity named as an event's organiser unless the table's own
  organiser field names it.
- No profile link to an unresolved or guessed slug.
- No date, time, cost or count asserted without checking it against the
  table's own field for that event — a number in an entry is a claim.
- No adjective about the cause, no "heartwarming"/"vital"/"inspiring", no
  commentary or editorial sentence between or introducing day groups.
- No claim about our own site's events or category pages not checked live
  this session.
- No bare "real"/"genuine(ly)"/"actually"/"actual" filler; no "where"
  pivots; no object-as-actor construction.
- Canadian spelling throughout; dates in full with the year.

## For Richard

No new `[NEEDS RICHARD]` item from this run. The standing operational
blocker (R-192 egress, R-193 `DATABASE_URL`/Neon quota — now in its third
consecutive month-end exhaustion per the 1 Nov update) is twenty calendar
days old across thirteen consecutive weekday sessions with zero drafts
produced since 13 October — carried forward above, not re-filed as a new
item, per the already-open todo entries. R-170 (category-page mapping) and
R-213 (Neon backup-skip recurrence) remain open on the same todo file,
unaffected by today's run.
