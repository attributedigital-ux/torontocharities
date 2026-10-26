# Commissions — 26 October 2026 (Monday)

Written by the editor, commissioning run. Monday is a fixed track day per
`content-engine.md`/CLIENT.md: today commissions only "This week's charity
events in Toronto," no guides from the queue.

**No new researcher run bearing on this.** `research/EVIDENCE.md` (26 Oct)
is a keyword/SEO pack only — it has never covered the events track, which is
this track's own job per CLIENT.md Track 1 (the live `events` table, not
Ahrefs). `content/QUEUE.md` is unchanged since 20 Oct and not relevant to a
fixed-track Monday.

## Connectivity, checked this session

`WebFetch` to `https://toronto-charities.ca/charity-events-toronto/` — the
exact page this commission is supposed to be built from — failed
`getaddrinfo ENOTFOUND`. A direct Bash `curl` to the same URL got
`CONNECT tunnel failed, response 403`, logged by the proxy itself as
`connect_rejected` ("host not allowed for this session"). This is the
identical fault R-187/R-192/R-193 log for writer, gate and researcher
sessions, and the same one 23 Oct's commissioning run confirmed for this
session type for the first time — today is now the eighth weekday session
to hit it (15, 16, 19, 20, 21, 22, 23, 26 Oct), and the second commissioning
session. `DATABASE_URL` was not independently re-checked this session — a
direct `env` read was refused by the harness's own credential-materialization
guard, the identical block R-193's 20 Oct update logged — but every session
back to 19 Oct that could check found it absent, and nothing in today's
`EVIDENCE.md` suggests either route has been provisioned since. Not filing a
new item: R-192/R-193 already carry the open question (provision egress,
provision `DATABASE_URL`, or both) and a ninth log entry restating it would
change nothing. This is today's data point, filed here, not a fresh
escalation.

**This means today's commission is written exactly as the live page and the
`events` table require it to be built, and the writer inherits the same
block logged against every commission since 15 Oct.** Per content-writer.md's
own hard rule and the pattern already set on 15/16/19/20/21/22/23 Oct
(stop rather than substitute a cached or remembered event list), the writer
should draft nothing against this commission until one of the two routes
below actually returns data, and should log which one it tried rather than
re-describing the fault.

## Commission

**Slug:** `charity-events-toronto-week-of-2026-10-26`
**Working title:** Toronto charity events, week of 26 October 2026
**Track:** Fixed weekly, Track 1 (Monday) — not a QUEUE.md cluster, no
intent-tier scoring applies.

**Angle (one sentence):** A reader deciding what to do in Toronto this week
— volunteer, donor, or a charity's own staff checking their listing — gets
every approved event starting between 26 October and 1 November 2026, grouped
by day, each one carrying its date, time, place, what it is, cost, the
Eventbrite link and the organising charity's profile link where one resolves.

**Reader:** Someone in Toronto scanning for what's on this week to attend,
volunteer at, or share — not a general feature reader. They want the fact
and the two links, not scene-setting or commentary.

**What it must answer, per event:**
1. What is it, in one line — no interpretation of what it's "really" for?
2. When (date and time, this calendar week) and where (venue/address as
   given)?
3. What does it cost — free, a fixed amount, or "see Eventbrite" if the
   source doesn't state a figure plainly?
4. Which charity is organising it, and does that charity have a resolvable
   profile slug in our database?
5. Does the Eventbrite listing for this event actually still show it as
   upcoming at the time of writing (CLIENT.md: source is "every approved
   event starting in the next seven days" from the live table, not a stale
   pull)?

**Links it must earn, every event:**
- The event's own Eventbrite page (outbound, required — CLIENT.md: every
  event listed must link Eventbrite).
- The organising charity's profile `/profile/<slug>/` — the writer checks
  the slug resolves (sitemap or direct DB check per CLIENT.md's rule) before
  linking; a charity with no resolving slug, or an event whose organiser is
  named only as given with no matching charity record (per the 13 Oct
  baseline, roughly half of upcoming events don't yet match a profile), is
  named without a link, never linked to a guessed URL.
- `/charity-events-toronto/` itself as the issue's own hub-page link (this
  page IS the evergreen events page's weekly content, per CLIENT.md's
  strategic context — link back to it as the standing page, not as a
  "see also").
- No category-page link of any kind. This track has no reason to touch a
  category page, and R-170 (category mapping broken, open since 13 Oct)
  means none may be linked regardless.

**Facts needed, and where they come from:**
- Every event comes from the live `events` table, read either by direct
  query (the `DATABASE_URL` route CLIENT.md and prior commissions name) or
  by reading the live `/charity-events-toronto/` page. CLIENT.md's own rule:
  "the writer never adds an event found elsewhere; it goes to the events
  source list instead." No search result, cached snippet, or remembered
  event list substitutes for either route, per the standing instruction on
  every commission since 15 Oct.
- Image: the Eventbrite image of the lead event (the first or most
  prominent event of the week), per CLIENT.md's imagery rule for this track
  — no generated hero, no stock photo.
- Grouped by day (Monday 26 Oct through Sunday 1 Nov), no commentary or
  filler between entries.

**Do not claim (binding):**
- No event that is not live on the events table/page at the time of
  writing — not one remembered from a prior week's issue, not one inferred
  from a charity's own site.
- No charity profile link on a guessed or unresolved slug; name without a
  link instead.
- No commentary, framing, or "what to expect" language between entries —
  CLIENT.md: "No commentary, no filler between entries."
- No claim about how many events there are this week, how it compares to
  other weeks, or which is "the best" or "biggest" — these are unsourced
  superlatives (CLIENT.md's own promoted editlog lesson #2) unless the
  count is simply stated as a fact ("14 events this week") with no ranking
  language attached.
- No cost stated as free unless the source says so; "see Eventbrite" rather
  than guessing a figure.
- No bare "real"/"genuine(ly)"/"actually"/"actual" filler (RULINGS
  2026-10-10/16/18); no object-as-actor construction (a page, a listing or
  an event given a human verb — GRAMMAR.md).
- Dates in full, with the year (CLIENT.md: "the issue is a record").
- Canadian spelling throughout.

## Held, not commissioned today

`donate-hair-toronto` (#10) and `volunteer-opportunities-toronto-students`
(#6) stay held exactly as 20–23 Oct left them — commissioned 15 Oct,
undrafted since, blocked on the same egress/credential fault above, not an
editorial issue. Not re-commissioned today because today is a fixed-track
day, not because the hold has changed; the next non-Monday, non-Friday
commissioning run picks them up again unchanged. `donate-furniture-toronto`
(#9) stays deliberately uncommissioned for the same reason as every prior
run since 13 Oct — no new supply into a pipeline that has drafted nothing in
thirteen calendar days, and per `EVIDENCE.md` 26 Oct its SERP caveat
(parent_topic is "furniture bank," a real single-charity incumbent) is still
unchecked. `toronto-charity-news-2026-10-16` and
`charity-events-toronto-week-of-2026-10-19` remain the two earlier fixed-track
issues that never drafted; this week's events issue supersedes the 19 Oct one
rather than stacking behind it — if the block clears, draft this week's
issue first, not the four-week-old one.

## For Richard

Nothing new needs his input from this run specifically. R-192 (writer/gate/
researcher/commissioning egress) and R-193 (`DATABASE_URL` absence, Neon
quota) already carry the operational blocker; today adds one data point
(confirmed again in a second commissioning session) to that record, logged
above, not re-filed. No new `[NEEDS RICHARD]` item. Separate from this
commission: R-170 (category-page mapping) and R-213 (Neon backup-skip
recurrence) remain open on the same todo file and are unaffected by today's
run.
