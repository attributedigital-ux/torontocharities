# Commissions — 13 November 2026 (Friday)

Written by the editor, commissioning run. Friday is a fixed-track day
(`CLIENT.md`): "Toronto charity news this week" takes priority over any
evergreen pick from `content/QUEUE.md`.

## Connectivity, checked this session

Presence-only check: `DATABASE_URL`, `ANTHROPIC_API_KEY`, `RESEND_API_KEY`
all absent from the session environment; no `.env` file. `curl -m 10` to
`https://toronto-charities.ca/` and `https://www.cbc.ca/` both returned
`000` (`connect_rejected`, the agent proxy refusing the CONNECT tunnel, not
a non-200). The proxy status endpoint (checked directly this session,
timestamp 2026-11-13T11:32Z) logs the identical shape against a wide,
unrelated spread of hosts (mcp.atlassian.com, mcp.clickup.com,
mcp.klaviyo.com, mcp.asana.com, mcp.linear.app and others), policy
`"selective": false` — the same blanket block logged every session since
21 Oct. `content/drafts/` and `content/approved/` do not exist; `git
status` clean, `content/published/` unchanged at four guides.
Cross-checked `attribute-brain/todo/toronto-charities.md` directly rather
than trusting yesterday's note: R-192 (general web egress for this session
type, opened 16 Oct) and R-170 (category-page mapping, opened 13 Oct) are
both still open, unchanged since 11–12 November. Today is at least the
thirty-third consecutive weekday session this fleet has hit the identical
fault, and the thirty-first calendar day with no draft produced since 13
October. Not pushing a new notification: the four-calendar-week mark
already triggered one (10 Nov WRITER run) and nothing has changed since —
a further one today would be noise, per the pattern every GATE/WRITER/
DESIGNER entry since has already followed.

A commission is a brief, not a draft, and is written below regardless of
the block, so the writer has a brief the moment egress or `DATABASE_URL`
lands.

## Commission: Friday Track 2 — Toronto charity news this week

- **Slug:** `toronto-charity-news-2026-11-13`
- **Working title:** Toronto charity news, 13 November 2026
- **Cluster / intent tier:** Weekly fixed track 2 (news), not a `QUEUE.md`
  evergreen cluster — informational, dated, high internal-link density.
- **Reader:** Someone in Toronto who wants to know what happened this week
  to a charity they know or follow, plus the charity's own staff, who will
  share a page that names them (`CLIENT.md`, "Who is reading").

**The angle, in one sentence:** a plain, dated list of what actually
happened this week to Toronto-area charities, nonprofits, food banks,
fundraisers and foundations — each item sourced to the outlet that reported
it and linked to the charity's own profile where one exists, nothing else.

**Questions the piece must answer (5):**
1. What happened this week (week of 13 November 2026) to a specific
   Toronto-area charity, nonprofit, food bank, fundraiser or foundation,
   each fact traceable to one named outlet's own article?
2. Which outlet reported each item, and does the outbound link go to that
   outlet's specific article, not its homepage or a section front?
3. Which charity named in each item has a profile on this site, with a
   slug that resolves against the sitemap/`DATABASE_URL` — and for the ones
   that don't resolve or don't have a profile, is the charity named without
   a link rather than guessed at?
4. Is every item genuinely dated to this week, with nothing that is
   actually an event (an event belongs to the Monday events track and the
   events source list, never this issue)?
5. If genuine citable items number fewer than five this week, does the
   piece say so plainly rather than pad with older or weaker items?

**Links it must earn:**
- Every item: one outbound link to the specific outlet article the fact
  came from (Toronto Star, CBC Toronto, CP24, Globe and Mail, BlogTO,
  Toronto Life, The Philanthropist, Future of Good, CharityVillage, or
  whichever outlet actually ran it).
- Every item naming a charity with a resolvable profile: a link to
  `/profile/<slug>/`. A charity without a confirmed slug is named with no
  link — never guessed (`CLIENT.md`, "What this site does not claim").
- No category-page link except `/category/social-services/`, and only when
  independently verified for that specific organisation (R-170 is still
  open; every other category page is wrong).
- No link to `/charity-events-toronto/` unless an item is itself about that
  page's own content, which should be rare on this track.

**Facts it will need, and where from:**
- Google News RSS for: Toronto charity, Toronto nonprofit, Toronto food
  bank, Toronto fundraiser, Toronto foundation.
- The outlets' own feeds: Toronto Star, CBC Toronto, CP24, Globe and Mail,
  BlogTO, Toronto Life, The Philanthropist, Future of Good, CharityVillage.
- Charity profile slugs: the sitemap or a live `DATABASE_URL` query —
  whichever route egress allows once it is unblocked; neither is available
  to this session today.

**Do not claim:**
- Nothing the writer cannot cite to a named outlet's own article. No
  outlet, no item.
- No item that is actually an event — route it to the events source list,
  not into this issue.
- No invented quote, figure, outcome or detail beyond what the outlet's
  own piece states.
- No charity profile link guessed at; unresolved names run without a link.
- No adjectives about the cause, no invented belief about the reader, no
  unsourced superlative, no invented number or comparison, no unchecked
  claim about this site's own pages (`CLIENT.md`'s five standing faults).
- No commentary or filler between items — one or two sentences per item,
  what happened, who reported it, who it concerns, then the next item.
- No bare intensifier filler ("real", "genuine(ly)", "actually", "actual")
  unless the sentence draws an explicit contrast.
- No object-as-actor phrasing ("the report holds," "the story carries,"
  "the outlet shows") — name the outlet or the person, or use has/is
  in/says.
- Fewer than five genuine items is a reason to say so in the piece, never
  a reason to invent a sixth.

## Carried forward, unchanged

`QUEUE.md` holds exactly three `ready`/`commissioned` evergreen clusters,
all blocked on the identical egress/`DATABASE_URL` fault, all still within
their last full-detail refresh window (next due: `#9`/`#10` around 17 Nov,
`#6` around 18 Nov, per the 12 Nov commission's cadence). No Ahrefs pull,
SERP check or `raw/` dictation has touched any of the three since their
last full write-up, so re-typing them today would be ceremony
(`wiki/processes/content-engine.md`'s own test). Not detailed again here:

- **`#9` donate-furniture-toronto** and **`#10` donate-hair-toronto** — full
  brief stands as written in the 10 November version of this file (commit
  `16ab7f9`).
- **`#6` volunteer-opportunities-toronto-students** — full brief stands as
  written in the 11 November version of this file (commit `df00eb1`).

The Monday events-track backlog (every week since 19 Oct) remains
superseded by whichever issue of each track drafts first once the block
lifts, per `CLIENT.md`'s dated-record rule.

## Standing rules for every commission above

Unchanged since 4–12 Nov, restated once rather than per brief:
- `CLIENT.md`'s five faults (invented reader beliefs, unsourced
  superlatives, invented numbers/comparisons, FAQ-restating H2s, unchecked
  claims about our own site) apply directly.
- Bare-intensifier family ("real"/"genuine(ly)"/"actually"/"actual")
  deleted as filler, never reworded, unless the sentence draws an explicit
  contrast.
- `GRAMMAR.md`'s object-as-actor rule (RULINGS 2026-10-18, 2026-11-03): no
  page "says" in the sense of deciding, no table "shows" beyond its plain
  contents, nothing a page or organisation "carries" or "holds" — name the
  person, or use has/is in/shows plainly.
- No adjectives about the cause. Canadian spelling throughout (programme,
  organisation, not program, organization).
- Only `/category/social-services/` among category pages, verified for that
  specific organisation, never guessed (R-170 still open).
- Every organisation named gets its profile link if it has one, checked
  against the sitemap/`DATABASE_URL` before linking; unresolved or
  unlisted organisations are named without a link.
- A category, label or taxonomy is a claim (RULINGS 2026-11-01): no
  eligibility stated without a source that actually defines it.

## For Richard

No new `[NEEDS RICHARD]` item from this run. The standing operational
blocker (R-192 egress; this session type's missing general web access and
`DATABASE_URL`) is now 31 calendar days old with zero drafts produced since
13 October, across every weekday session this fleet has run in that window,
and remains his decision alone: either this session type gets general web
egress, or `DATABASE_URL` is provisioned to it, or both. Not re-pushing a
notification today — the four-calendar-week mark already triggered one
(10 Nov WRITER run) and nothing has changed since. R-170 (category-page
mapping) remains open on the same todo file, unaffected by today's run.
