# Commissions — 9 November 2026 (Monday)

Written by the editor, commissioning run. Monday is a fixed-track day per
`CLIENT.md`: Track 1, "This week's charity events in Toronto," takes priority
over anything from `QUEUE.md`.

## Connectivity, checked this session

`curl -m 10` to `https://toronto-charities.ca/charity-events-toronto/`
returned `HTTP 000` (connection never completed, not a non-200). The proxy
status endpoint (`$HTTPS_PROXY/__agentproxy/status`) logs the identical
`connect_rejected`/"gateway answered 403 to CONNECT" shape against a wide,
unrelated spread of hosts in the same window (mcp.hubspot.com, mcp.notion.com
and others), policy `"selective": false` — the same blanket block logged
every session since 21 Oct. Cross-checked `attribute-brain/todo/
toronto-charities.md` directly: R-192 (general web egress for this session
type) and R-170 (category-page mapping) are both still open, unchanged since
the dates cited in prior entries; R-193/R-213 (Neon quota) remain closed per
5 Nov's resolution, unaffected either way. `research/editlog/EDITLOG.md`'s
own tail (through 6 Nov) puts this at the twenty-sixth consecutive weekday
session the fleet has hit the fault, with zero drafts since 13 October — a
commission is a brief, not a draft, and does not itself need live egress, so
it is written below in full regardless, but no commission below can clear
its facts-needed section until the block lifts.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked `research/editlog/EDITLOG.md`'s tail: every entry since 2 Nov is a
WRITER/DESIGNER/GATE run finding nothing to review, because nothing has
drafted since 13 October. There is no new prose fault to add — the only
standing lessons are the five faults and the category-link restriction
already in `CLIENT.md`, restated below rather than re-derived.

## Commission: Toronto charity events, week of 9 November 2026

**Slug:** `charity-events-toronto-week-of-2026-11-09`
**Cluster / intent tier:** fixed Track 1 (weekly events), not a `QUEUE.md`
cluster.
**Publish day:** Monday, 9 November 2026.

**The angle, in one sentence:** every approved charity event in Toronto
starting in the next seven days, grouped by day, straight from the live
events table, with no commentary between entries.

**Who it is for:** someone in Toronto deciding what to go to this week, or a
charity's own staff checking whether their event is listed and will want to
share the page.

**What it must answer, per event:**
1. What it is, in plain terms (no adjectives about the cause).
2. When and where — date in full with the year, time, place.
3. What it costs, if anything.
4. Which charity is running it, and whether that charity has a profile on
   this site.

**Links every event must carry:**
- The event's own Eventbrite page.
- The charity's profile `/profile/<slug>/`, checked against the sitemap/DB
  before linking. If the slug does not resolve, name the organiser as given,
  never linked to a guessed URL — CLIENT.md's rule for an event not matched
  to a profile.
- `/charity-events-toronto/` once, as the page this issue supports (the
  evergreen term CLIENT.md says this issue must not compete with, only
  reinforce).

**Facts needed and where they come from:**
- The `events` table: every approved event starting in the next seven days
  from today (9–16 November 2026), grouped by day, per CLIENT.md's Track 1
  spec. 110 upcoming events were on record as of 13 October (54 matched to a
  profile); that count has not been re-checked since because no session has
  reached the table — nothing here may be drafted from that stale figure.
- The lead event's own Eventbrite image, for the issue's single image. No
  generated hero on this track.
- A live slug check against the sitemap or `DATABASE_URL` for every charity
  named.
All three routes are live-fetch or DB-query dependent and are confirmed
blocked this session (see Connectivity above). Nothing here can be drafted
until the block lifts.

**Do not claim:**
- No event not in the table. Never add one found elsewhere (a charity's own
  site, a search result) — CLIENT.md's rule; it goes to the events source
  list instead, not into this issue.
- No charity named without its profile link checked live against the
  sitemap/DB first; an unresolved slug is named, never linked to a guess.
- No commentary or filler between entries — the issue is a dated list, not a
  narrative.
- No category-page link except `/category/social-services/` (R-170 still
  open; every other category page misattributes charities to the wrong
  cause).
- No claim about this site's own pages (the events page, a category page)
  that is not checked live first — CLIENT.md fault #5.
- No unsourced superlative about any event or charity ("the city's biggest,"
  "best known") — CLIENT.md fault #2.
- No invented count of attendees, capacity, or how many similar events
  exist — CLIENT.md fault #3.
- No adjective about the cause ("heartwarming," "vital," "beloved").
  CLIENT.md's voice rule: a local reporter listing what is on, not an
  appeal.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No personification: nothing a page "carries," "holds," or "shows" in the
  sense of deciding what to include (RULINGS 2026-11-03).
- Dates in full, with the year. Canadian spelling throughout.
- If fewer events turn up in the next seven days than expected, publish that
  fewer number and say so in the facts file — never pad with an event
  outside the window or one not in the table.

**[NEEDS RICHARD]:** none new this run. The standing blocker (R-192 egress;
the writer/editor session type's missing general web access and DB route)
already covers why this commission cannot be drafted; it is not a per-piece
question and is not being added as one, per content-editor.md's own rule
against one `@richard` item per piece.

## Carried forward, not re-detailed today (standing evergreen commissions, still blocked)

Monday is a fixed-track day, so no new `QUEUE.md` cluster is commissioned
today, per `CLIENT.md`/`content-engine.md`. The three standing evergreen
commissions remain open and blocked on the same fault, full detail in git
history rather than re-typed here:

- **#6 `volunteer-opportunities-toronto-students`** — commissioned 4 Nov.
- **#9 `donate-furniture-toronto`** — commissioned 3 Nov. WINNABLE NOW per
  2 Nov's live SERP re-check, independently confirmed a second time 9 Nov
  (KD held at 0, vol 60→70) — commission it as "winnable, modest traffic
  ceiling" (AI Overview + local pack + PAA above organic), never as an easy
  win.
- **#10 `donate-hair-toronto`** — commissioned 3 Nov.

The prior Monday events-track backlog (weeks of 19/26 Oct, 2 Nov) and the
Friday news-track backlog (weeks of 16/23/30 Oct, 6 Nov) remain superseded by
whichever issue of each track drafts first once the block lifts, per
CLIENT.md's dated-record rule — not reissued here.

## Standing rules for every commission above

Unchanged since 4/5/6 Nov, restated once rather than per brief:
- CLIENT.md's five faults (invented reader beliefs, unsourced superlatives,
  invented numbers/comparisons, FAQ-restating H2s, unchecked claims about
  our own site) apply directly.
- Bare-intensifier family ("real"/"genuine(ly)"/"actually"/"actual") deleted
  as filler, never reworded, unless the sentence draws an explicit contrast.
- GRAMMAR.md's object-as-actor rule (RULINGS 2026-10-18, 2026-11-03): no
  page "says" in the sense of deciding, no table "shows" beyond its plain
  contents — name the person, or use has/is in/shows plainly.
- No adjectives about the cause. Canadian spelling throughout.
- Only `/category/social-services/` among category pages, verified for that
  specific charity, never guessed (R-170 still open).
- Every charity named gets its profile link, checked against the
  sitemap/DB before linking; unresolved slugs are named without a link.
- A category, label or taxonomy is a claim (RULINGS 2026-11-01): no
  eligibility stated without a source that actually defines it.

## For Richard

No new `[NEEDS RICHARD]` item from this run. The standing operational
blocker (R-192 egress; the writer/editor session type's missing general web
access and `DATABASE_URL`) is now twenty-seven calendar days old with zero
drafts produced since 13 October, across every weekday session this fleet
has run in that window, and remains his decision alone: either this session
type gets general web egress, or `DATABASE_URL` is provisioned to it, or
both. R-170 (category-page mapping) remains open on the same todo file,
unaffected by today's run.
