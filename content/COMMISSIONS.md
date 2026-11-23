# Commissions — 23 November 2026 (Monday)

Written by the editor, commissioning run. Monday is a fixed-track day per
`CLIENT.md`: "This week's charity events in Toronto" is due today (Track 1),
built from the events the live site lists at
`https://toronto-charities.ca/charity-events-toronto/`. Friday (news) is the
other fixed day; the queue rotation (#6, #9, #10) is carried forward
unchanged below, not re-detailed, since nothing on any of the three has
changed since 19 November.

## Connectivity, checked this session

Independently re-verified rather than trusted from Friday's (20 Nov) entry:
`git fetch origin && git checkout -B main origin/main` (routine startup
rule) landed clean at `b4d34b9` (yesterday's researcher pull, seventh
consecutive with no new cluster — see `EVIDENCE.md`), `git status` clean.
`curl -sS -m 10 https://toronto-charities.ca/` and
`https://toronto-charities.ca/charity-events-toronto/` — the exact page
this track must be built from — both returned `CONNECT tunnel failed,
response 403` (exit 56); the agent-proxy's own status line confirms
`connect_rejected`, a destination-not-allowed refusal, not a timeout or a
non-200. This is the identical blanket block logged every weekday session
since 21 October (R-192). A presence check (no value printed) found
`DATABASE_URL`, `ANTHROPIC_API_KEY` and `RESEND_API_KEY` all absent from
the environment this session — so the events-table route to the same data
(`CLIENT.md`'s stated source, the `events` table) is equally closed, not
only the live-page route the user's brief named. `ls content/drafts
content/approved content/images` — none of the three exist. `ls
research/facts/` still shows exactly the four rows behind the four
published guides, no row for #6, #9, #10, or for today's events issue.

Checked `attribute-brain/todo/toronto-charities.md` directly: R-192
(egress/`DATABASE_URL`) and R-170 (category mapping) both still open,
unchanged. Checked `attribute-brain/raw/` for anything dated after 16
November naming this site: nothing does — the most recent files (18–21
Nov) concern Pierce Fitness, Household Co and Lucie Mé, unrelated clients.
`RULINGS.md`'s tail through 23 Nov (the TorontoProperty actor/verb-on-object
script gap, closing the same day it was opened) does not bear on this
site's brief, scoring method or cannibalisation map; its standing language
rules (no verb on an object or process, nothing "carries," only people
"earn," quote-the-line when reporting a fault) are followed in this
commission's own prose.

This is at least the forty-second calendar day with no draft produced
since 13 October, per `research/editlog/EDITLOG.md`'s unbroken run of
"NOTHING DRAFTED"/"NOTHING TO REVIEW" entries through the 20 November gate
run. A commission is a brief, not a draft, and does not itself need live
egress, so today's fixed-track commission is written in full below
regardless; it cannot clear its facts-needed section until the block
lifts.

## Commission: Toronto charity events, week of 23 November 2026

**Slug:** `charity-events-toronto-week-of-2026-11-23`
**Working title:** Toronto charity events, week of 23 November 2026
**Cluster / intent tier:** Fixed weekly Track 1 (`CLIENT.md`). Published
Monday morning; a dated record, not an evergreen page — it supersedes no
earlier issue and is itself superseded by next Monday's. Per `CLIENT.md`'s
dated-record rule, the backlog of unpublished Monday issues since the
block began (every Monday from 19 October through 16 November) is not
reissued; whichever issue drafts first once the block lifts is the live
one, dated for that week, not backfilled for a past one.

**The angle, in one sentence:** every approved charity event in the GTA
starting in the next seven days, grouped by day, each one a fact — date,
time, place, what it is, cost, who runs it — with nothing said about any
of them beyond what the events table and the Eventbrite listing state.

**Who it is for:** someone in Toronto deciding what to go to this week —
a volunteer, a donor, a charity's own staff checking whether their event
made the list — who wants a dated schedule, not a write-up of the charity
sector.

**What it must answer:**
1. What is on, each event's date, start time, place, a one-line
   description of what it is, and its cost (free, by donation, or a
   figure), sourced from the `events` table / the live events page, never
   estimated?
2. Which events are in the next seven calendar days from publish (Monday
   23 November through Sunday 29 November), grouped by day, in date
   order, with nothing from a later week pulled forward to fill the list?
3. Does the event's organiser have a profile on this site, and does that
   slug resolve against the sitemap/`DATABASE_URL` before it is linked —
   or is it named without a link, per `CLIENT.md`'s rule that an unmatched
   organiser is still named as given?
4. Does every event carry its real Eventbrite link, checked live, not
   assumed from the event's title?
5. Is any event actually tied to a torontoproperty.ca neighbourhood (a
   venue in a named community that site covers), earning that one sister
   link — or is it a generic citywide event that earns none?

**Links it must earn:**
- The event's own Eventbrite page, on every event, no exceptions —
  `CLIENT.md`'s outbound-link rule.
- `/profile/<slug>/` for the organising charity, checked against the
  sitemap/`DATABASE_URL` first; an organiser whose slug does not resolve
  is named without a link, never guessed.
- `/listing/<slug>/` for the event's own page on this site.
- `/charity-events-toronto/`, the evergreen hub this issue supports —
  `CLIENT.md`'s internal-link-target #4, and the page this track must not
  compete with for "charity events toronto" itself (cannibalisation map).
- `/category/social-services/` only where the specific organising charity
  is verified in that category; no other category page (R-170 still
  open).
- torontoproperty.ca only where an event is genuinely tied to one of that
  site's neighbourhoods — not a default link.

**Facts needed and where they come from:**
- Every event's date, time, place, description, cost and Eventbrite link:
  the `events` table (via `DATABASE_URL`) or, per the live site, the
  rendered list at `https://toronto-charities.ca/charity-events-toronto/`
  — `CLIENT.md` names both as the same underlying data. Nothing here is
  estimated or carried over from a prior week's issue.
- Each organiser's slug and category: a `DATABASE_URL` query or a live
  sitemap check, never assumed from a familiar charity name.
- The lead image: the Eventbrite image of the week's first-listed event
  (`CLIENT.md`'s imagery rule for this track) — no generated hero.
Every route above is confirmed blocked this session (see Connectivity).
Nothing here can be drafted until the block lifts.

**Do not claim:**
- No event not in the `events` table / the live events page — nothing
  sourced from memory of a past week's issue or a charity's general
  programming.
- No cost, time or description invented where the source is thin; an
  event with a missing field states only what is known.
- No charity profile link not checked live against the sitemap/DB first;
  an unresolved slug is named, never linked to a guess.
- No unsourced superlative about any event or charity ("the week's
  biggest event," "Toronto's best-loved food drive") — `CLIENT.md` fault
  #2.
- No invented attendance figure, dollar target, or comparison between
  events — fault #3.
- No commentary or filler between entries — `CLIENT.md`'s shape rule for
  this track: a list, not an essay.
- No category-page link besides `/category/social-services/`, and only
  once verified for the specific organiser named (R-170).
- No claim about this site's own pages (the events page, a profile, the
  sitemap) not checked live first — fault #5.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No personification: nothing an event, page, or table "carries,"
  "holds," "shows" or "decides" in the sense of a person acting (RULINGS
  2026-10-18, 2026-11-03, 2026-11-21) — name the person or state the fact
  plainly.
- A failed probe is "I could not reach it," never "it does not exist"
  (RULINGS 2026-11-16) — an event not yet confirmed live is unconfirmed,
  not cancelled.
- No adjectives about the cause. Canadian spelling throughout. Dates in
  full, with the year.

## Carried forward, not re-detailed today (standing evergreen commissions, still blocked)

All three unchanged since their last full detail; re-verified blocked
above, nothing new to add.

- **#9 `donate-furniture-toronto`** — fully re-detailed 19 November
  (commit `22c1f70`). `EVIDENCE.md`'s 23 Nov pack independently
  strengthens this one further: its question-phrased exact-match term
  held difficulty 0 / volume 70 for a *fourth* consecutive pull, the
  strongest-confirmed WINNABLE NOW call on the board. If the writer's
  block lifts and only one of the three queued evergreen clusters can be
  drafted first, prioritise this one.
- **#10 `donate-hair-toronto`** — fully re-detailed 19 November (commit
  `22c1f70`), unchanged since.
- **#6 `volunteer-opportunities-toronto-students`** — fully re-detailed 18
  November (commit `2d6fed4`), unchanged since.

Per `EVIDENCE.md`'s 23 Nov pack: do not add a fourth evergreen commission
this week. The seed-group pull is now seventh-consecutive with no new
cluster outside these ten rows, and a fourth ready-but-blocked cluster
would only extend a backlog that already cannot be drafted.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked `research/editlog/EDITLOG.md`'s tail through the 20 November gate
run. Every entry since 2 November is a WRITER/DESIGNER/GATE run finding
nothing to review, because nothing has drafted since 13 October — there is
no new prose fault to add this run. The standing lessons remain the five
faults in `CLIENT.md`, the category-link restriction (R-170), and the
general-ledger rules folded into "Standing rules" below, carried from the
four 13 October gate passes (soup-kitchen, books, clothes, volunteer-toronto):
unsourced superlatives, invented beliefs about the reader, invented
numbers/comparisons, a 200 response treated as proof an anchor is right,
and FAQ-restating H2s.

## Standing rules for every commission above

Unchanged since 4-23 November, restated once rather than per brief:
- `CLIENT.md`'s five faults (invented reader beliefs, unsourced
  superlatives, invented numbers/comparisons, FAQ-restating H2s, unchecked
  claims about our own site) apply directly.
- Bare-intensifier family ("real"/"genuine(ly)"/"actually"/"actual")
  deleted as filler, never reworded, unless the sentence draws an explicit
  contrast.
- GRAMMAR.md's object-as-actor rule (RULINGS 2026-10-18, 2026-11-03,
  2026-11-21): no page, event or table "sits," "holds," "carries,"
  "decides" or "shows" beyond its plain contents; only a person "earns."
  Name the person, or use has/is/lists plainly.
- No adjectives about the cause. Canadian spelling throughout.
- Only `/category/social-services/` among category pages, verified for
  that specific charity, never guessed (R-170 still open).
- Every charity named gets its profile link, checked against the
  sitemap/DB before linking; unresolved slugs are named without a link.
- A category, label or taxonomy is a claim (RULINGS 2026-11-01): no
  eligibility stated without a source that actually defines it.
- A failed probe is "I could not reach it," never "it does not exist"
  (RULINGS 2026-11-16).

## For Richard

No new `[NEEDS RICHARD]` item from this run. The standing operational
blocker (R-192 egress; the writer/editor session type's missing general web
access and `DATABASE_URL`) is now at least forty-two calendar days old with
zero drafts produced since 13 October, across every weekday session this
fleet has run in that window, and remains his decision alone: either this
session type gets general web egress, or `DATABASE_URL` is provisioned to
it, or both. Not pushing a fresh notification today — the last one fired
at the four-calendar-week mark (10 Nov WRITER run) and nothing has changed
since; the six-week mark falls late this week and is the next natural
point to re-raise it if the block still stands. R-170 (category-page
mapping) and R-335 (Neon monthly quota, a separate billing decision)
remain open on the same todo file, both unaffected by today's run.
