# Commissions — 20 November 2026 (Friday)

Written by the editor, commissioning run. Friday is a fixed-track day per
`CLIENT.md`: "Toronto charity news this week" is due today (Track 2). Monday
(events) is the other fixed day; Wednesday/Thursday's queue rotation (#6, #9,
#10) is carried forward unchanged below, not re-detailed, since nothing on
any of the three has changed since 18-19 November.

## Connectivity, checked this session

Independently re-verified rather than trusted from yesterday's entry:
`git fetch origin && git checkout -B main origin/main` (routine startup
rule) landed clean at `59574f6` (18 Nov gate run was `da5362d`; three more
commits since — writer, designer, gate, all 19 Nov NOTHING-found entries),
`git status` clean. `curl -sS -m 10 https://toronto-charities.ca/` and
`/charity-events-toronto/` both returned `CONNECT tunnel failed, response
403` (exit 56) — the identical `connect_rejected` shape logged every
weekday session since 21 October. A presence check on `DATABASE_URL`,
`ANTHROPIC_API_KEY` and `RESEND_API_KEY` found all three absent. `ls
content/drafts content/approved content/images` — none of the three exist.
`ls research/facts/` still shows exactly the four rows behind the four
published guides, no row for #6, #9, #10, or for today's news issue.

Checked `attribute-brain/todo/toronto-charities.md` directly: R-192
(egress/`DATABASE_URL`) and R-170 (category mapping) both still open,
unchanged. One new item since yesterday, unrelated to drafting capability:
R-335 (added 19 Nov) logs a fifth recurrence of Neon's monthly compute-quota
exhaustion on this project — a billing decision already sitting with
Richard on its own item, masked this month by a separate cross-repo GitHub
Actions billing outage (R-326) that is stopping the backup job from even
reaching its probe step. Noting it here because it touches this site's
infrastructure, not because it changes today's commission: it does not
affect whether a writer session can draft (that is R-192 alone), and it is
already tracked on its own id. Checked `attribute-brain/raw/` for anything
dated after 16 November naming this site: the two 19 November files
(`session-2026-11-19-gmail-sweep.md`, `session-2026-11-19-household-co-live.md`)
are an inbox cleanup and a different client's video launch — neither names
Toronto Charities. `RULINGS.md`'s tail through 20 Nov (a manufacturer-
attribution ruling for Lucie Mé, a Claude-email-invention ruling, and a
note about an attribute-media GSC snapshot refreshing mid-cycle) — none of
the three bears on this site's brief, scoring method or cannibalisation
map.

This is at least the thirty-ninth calendar day with no draft produced
since 13 October, per `research/editlog/EDITLOG.md`'s unbroken run of
"NOTHING DRAFTED"/"NOTHING TO REVIEW" entries through the 19 November gate
run. A commission is a brief, not a draft, and does not itself need live
egress, so today's fixed-track commission is written in full below
regardless; it cannot clear its facts-needed section until the block
lifts.

## Commission: Toronto charity news, 20 November 2026

**Slug:** `toronto-charity-news-2026-11-20`
**Cluster / intent tier:** Fixed weekly Track 2 (`CLIENT.md`). Published
Friday; a dated record, not an evergreen page — it supersedes no earlier
issue and is itself superseded by next Friday's. Per `CLIENT.md`'s dated-
record rule, the backlog of unpublished Friday issues since the block
began (weeks of 16/23/30 October, 6/13 November) is not reissued; whichever
issue drafts first once the block lifts is the live one.

**The angle, in one sentence:** what actually happened this week at a GTA
charity, nonprofit, food bank, fundraiser or foundation, each item a fact
with a named outlet behind it, five to twelve items, no commentary between
them.

**Who it is for:** someone in Toronto — a donor, a charity's own staff
checking whether their organisation got covered, a reporter or researcher
scanning the week — who wants a dated list of what happened, not an essay
about the sector.

**What it must answer:**
1. What concrete thing happened this week — an announcement, a funding
   award, a closure, a leadership change, a campaign result, a controversy
   — at a specific GTA charity, nonprofit, food bank, fundraiser or
   foundation?
2. Which outlet reported it, and on what date, so the item can carry a
   working outbound link to the actual story (Toronto Star, CBC Toronto,
   CP24, Globe and Mail, BlogTO, Toronto Life, The Philanthropist, Future
   of Good, CharityVillage, or Google News RSS for the named search terms
   per `CLIENT.md`)?
3. Is the charity named one with a profile on this site, and does its slug
   resolve against the sitemap/`DATABASE_URL` before it is linked?
4. Is this genuinely new this week, not a story this issue or an earlier
   week's issue already carried?
5. Does the item belong here at all, or is it actually an event listing
   (which goes to the events source list for the Monday track and never
   into this issue, per `CLIENT.md`)?

**Links it must earn:**
- The reporting outlet, on every item, no exceptions — `CLIENT.md`'s
  outbound-link rule is not optional here.
- `/profile/<slug>/` for the charity named in every item, checked against
  the sitemap/`DATABASE_URL` first; a charity whose slug does not resolve
  is named without a link.
- `/category/social-services/` only where the specific charity named is
  verified in that category; no other category page (R-170 still open).
- No sister-site link unless an item is genuinely tied to a
  torontoproperty.ca neighbourhood (`CLIENT.md`'s sister-sites row) — do
  not force one in.

**Facts needed and where they come from:**
- Every item's substance: a live read of Google News RSS for "Toronto
  charity", "Toronto nonprofit", "Toronto food bank", "Toronto fundraiser",
  "Toronto foundation", plus the nine named outlets' own feeds. Nothing
  here is in the CRA bulk-import data or the database; it is this week's
  news, full stop.
- Every charity's slug and category: a `DATABASE_URL` query or a live
  sitemap check, never assumed from a familiar name.
Both routes are confirmed blocked this session (see Connectivity above).
Nothing here can be drafted until the block lifts.

**Do not claim:**
- No item without a story a researcher can cite to a named outlet —
  `CLIENT.md`'s first rule: "Nothing a researcher cannot cite to an
  outlet. No outlet, no item."
- No event description inside this issue. An event belongs in the Monday
  events track's source list, never here, even if it is the only thing
  found this week about a given charity.
- No invented reaction, quote, or motive attributed to a charity beyond
  what the outlet actually reported.
- No charity profile link not checked live against the sitemap/DB first;
  an unresolved slug is named, never linked to a guess.
- No unsourced superlative about any charity or story ("the biggest story
  this week," "the most generous donor") — `CLIENT.md` fault #2.
- No invented count, dollar figure, or comparison not stated by the outlet
  itself — fault #3.
- No category-page link besides `/category/social-services/`, and only
  once verified for the specific charity named (R-170).
- No claim about this site's own pages not checked live first — fault #5.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No personification: nothing a page, charity, or story "carries,"
  "holds," or "shows" in the sense of deciding what to include (RULINGS
  2026-11-03).
- A failed probe is "I could not reach it," never "it does not exist"
  (RULINGS 2026-11-16) — a story not yet checked is unconfirmed, not
  nonexistent.
- No adjectives about the cause. Canadian spelling throughout. Dates in
  full, with the year.

## Carried forward, not re-detailed today (standing evergreen commissions, still blocked)

All three unchanged since their last full detail; re-verified blocked
above, nothing new to add.

- **#9 `donate-furniture-toronto`** — fully re-detailed 19 November
  (commit `22c1f70`). `EVIDENCE.md`'s 16 Nov pack independently strengthens
  this one further: its question-phrased exact-match term held difficulty
  0 / volume 70 for a *third* consecutive pull, the strongest-confirmed
  WINNABLE NOW call on the board. If the writer's block lifts and only one
  of the three queued evergreen clusters can be drafted first, prioritise
  this one.
- **#10 `donate-hair-toronto`** — fully re-detailed 19 November (commit
  `22c1f70`), unchanged since.
- **#6 `volunteer-opportunities-toronto-students`** — fully re-detailed 18
  November (commit `2d6fed4`), unchanged since.

Per `EVIDENCE.md`'s 16 Nov pack: do not add a fourth evergreen commission
this week. The seed-group pull is now sixth-consecutive with no new
cluster outside these ten rows, and a fourth ready-but-blocked cluster
would only extend a backlog that already cannot be drafted.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked `research/editlog/EDITLOG.md`'s tail through the 19 November gate
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

Unchanged since 4-19 November, restated once rather than per brief:
- `CLIENT.md`'s five faults (invented reader beliefs, unsourced
  superlatives, invented numbers/comparisons, FAQ-restating H2s, unchecked
  claims about our own site) apply directly.
- Bare-intensifier family ("real"/"genuine(ly)"/"actually"/"actual")
  deleted as filler, never reworded, unless the sentence draws an explicit
  contrast.
- GRAMMAR.md's object-as-actor rule (RULINGS 2026-10-18, 2026-11-03): no
  page "says" in the sense of deciding, no table "shows" beyond its plain
  contents — name the person, or use has/is in/shows plainly.
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
access and `DATABASE_URL`) is now at least thirty-nine calendar days old
with zero drafts produced since 13 October, across every weekday session
this fleet has run in that window, and remains his decision alone: either
this session type gets general web egress, or `DATABASE_URL` is provisioned
to it, or both. Not pushing a fresh notification today — the last one fired
at the four-calendar-week mark (10 Nov WRITER run) and nothing has changed
since. R-170 (category-page mapping) and R-335 (Neon monthly quota, a
separate billing decision) remain open on the same todo file, both
unaffected by today's run.
