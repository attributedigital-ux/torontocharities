# Evidence — toronto-charities.ca, 9 November 2026

Ahrefs matching-terms (country CA, terms=questions) pulled once this run for
the six standing seed groups (eight keyword strings: volunteer toronto,
volunteer opportunities toronto, where to donate clothes/books/furniture
toronto, charity events toronto, charities in toronto, food bank toronto),
1,035 units, cached to `research/ahrefs/clusters.json`. Fifth pull on this
cache (13 Oct all-terms, 19 Oct questions, 26 Oct questions, 2 Nov
questions, this one). No new `serp-overview` pull this run — last week's
live SERP check on "where to donate furniture toronto" (228 units, 2 Nov)
is independently re-confirmed by this pull's own numbers without needing to
spend units checking it again (see Headline). GSC: still no snapshot —
`content/CLIENT.md` names `research/gsc/snapshot.md`/`.json`, committed by
CI, as an input; that CI job is still `[BUILD]`, unchanged since 13 Oct. No
new dictation from Richard about this site in `raw/` since 16 Oct (checked
every `raw/session-2026-11-02-*` through `raw/session-2026-11-06-*` file;
none name toronto-charities — the 6 Nov files are all about a gym-lead
video, an unrelated client).

## Headline: nothing new to commission; one cluster's upgrade strengthens, one published row's number drifted, the pipeline block is now older still

**No genuine gap, no status change, fifth pull running.** Every
question-phrased term under the six seed groups maps to a parent_topic
already on `QUEUE.md`. Full numbers: `clusters.json` → `delta_vs_2_nov_pull`.

**#9 donate-furniture-toronto's WINNABLE NOW call strengthens on an
independent second reading.** 2 Nov's live `serp-overview` check (not
repeated this run — no reason to, nothing changed enough to warrant 228
more units) found no organic top-10 incumbent for "where to donate
furniture toronto" stronger than DR66, overturning three pulls' worth of
assumption that furniturebank.org blocked the slot. This pull's plain
matching-terms read, taken a week later with no live check attached, holds
difficulty at 0 for a second straight pull and reads volume up 60→70. A
single SERP check that doesn't get re-confirmed by the next plain pull is
weaker evidence than one that does; this is the latter. The caveat from 2
Nov stands unchanged: an AI Overview, a 3-pack local pack and a PAA box all
sit above position 1 organic, so commission this as "winnable, modest
traffic ceiling," never as an easy 70/mo.

**#4 where-to-donate-clothes-toronto (published) showed its first
difficulty drift in five pulls — not actionable, worth naming anyway.**
"Where to donate clothes toronto" read difficulty 0 across all four prior
pulls (13 Oct through 2 Nov); this pull reads 4, and its parent_topic label
dropped the word "toronto". Volume is unchanged at 90. This is the same
family of small KD wobble already seen and named on "where to volunteer in
toronto" (6→16 between 19 Oct and 2 Nov, now holding at 16) — read as
scoring noise, not as the published page having lost ground, because there
is no GSC data to check an actual position against (see Striking distance).
Naming it rather than silently absorbing it: if this site had rank-tracking
data, a KD move on a page's own head term the week after a weird parent_topic
label change is exactly the kind of thing worth checking against reality;
without GSC, it is a number to watch, not a finding.

Everything else this pull: no material change. "Where to volunteer in
toronto" (KD16) and "where can i volunteer in toronto" (KD18) each held
their 2 Nov readings, which reads as those two numbers having settled after
the earlier swings rather than still drifting. "Where to donate clothes
downtown toronto" dropped from a new vol-10 appearance on 2 Nov back to
vol 0 this pull — never a standalone opportunity at either volume. One new
zero-volume variant surfaced ("how do i find charity events toronto?"),
already answered by nothing new. "Charity events toronto," "charities in
toronto" and "food bank toronto" returned no question-phrased volume for
the fifth pull running — both covered rows (#11, #12) stand unchanged.

## Striking distance / ranking without clicks
Still not assessable. The GSC snapshot job remains unbuilt and no live GSC
read exists; ~0 organic users/week and 61/3,528 indexed (12 Oct manual
check, unchanged) means the site has no pages with real position/impression
data to report on yet. This has been true every pack since 19 Oct — it is a
pipeline gap (R-161), not something a sixth Ahrefs pull will fix.

## Status check against the live guides (substitute for a direct read)
`WebFetch` to `https://toronto-charities.ca/guides/` failed again this
session — `getaddrinfo ENOTFOUND` — the identical egress fault logged as
R-187 (15 Oct), R-192 (16 Oct) and R-193 (18 Oct onward). This is the fourth
researcher session in a row to hit it (19 Oct, 26 Oct, 2 Nov, now 9 Nov).
Used `content/published/*.json` as the record of what is live, same
substitute as the prior three packs: still exactly four guides — #1, #4,
#5, #7 — nothing has published since the 13 Oct gate. `research/editlog/
EDITLOG.md`'s own tail (through 6 Nov, two sessions that day: writer,
designer and gate all logging "NOTHING TO REVIEW"/"NOTHING DRAFTED," the
gate run itself putting the count at twenty-sixth consecutive weekday
session hitting the fault) confirms this independently; `content/
COMMISSIONS.md`'s 6 Nov entry puts the same block at twenty-fifth calendar
day with zero drafts since 13 October. This researcher pull does not
re-derive that count — it is the editor/writer/gate roles' own tally to
keep, not a keyword question — but cites both files so the number here
does not go stale the way QUEUE.md's row #6 note had (fixed this run; see
QUEUE.md's edit).

## Genuine gaps
None new. The six-seed-group pull returned no parent_topic outside the
clusters already on `QUEUE.md`, the fifth pull in a row with this result.

## Cannibalisation risks
None triggered. Every cluster this pull touched maps to a row already
marked published/ready/hold/covered on `QUEUE.md`; nothing recommends a page
`CLIENT.md`'s map excludes.

## Repairs
Not a keyword repair, but the same two structural blockers flagged since 19
Oct are both still open and now worse by elapsed time:
- **Egress fault (R-187/R-192/R-193).** Per EDITLOG.md and COMMISSIONS.md,
  this fleet has now hit the identical `getaddrinfo ENOTFOUND` / proxy 403
  shape on every weekday session since 15 Oct, with zero drafts, zero gate
  reviews, zero publishes since 13 October — this researcher's own WebFetch
  attempt above reproduces the same fault independently. The three `ready`/
  `commissioned` evergreen clusters (#6, #9, #10) remain undrafted for want
  of anywhere a writer session can land a draft.
- **R-170 (category-page mapping).** Still open per
  `attribute-brain/todo/toronto-charities.md`, still means no guide may
  link any category page but `/category/social-services/`.
Neither is a researcher-side fix; both are already on
`attribute-brain/todo/toronto-charities.md` awaiting Richard's decision.
Restating because they are the actual reason this week's "what to write
next" answer is thin even though one cluster's evidence got stronger: there
is still nowhere for a writer session to land a draft.

## What Richard said
Nothing new this week specific to this site. Checked every `raw/` file
dated 2 Nov through 6 Nov (the only files in that window); none name
toronto-charities — the 6 Nov files concern a different client's video
work. Standing instructions (13 Oct go-ahead on evergreen #1–10, undecided
third evergreen track on `hold`) are unchanged and already folded into
`CLIENT.md`/`QUEUE.md`. `RULINGS.md`'s most recent entry is dated 8 Nov
(a TorontoProperty listing-overviews finding) — checked in full; nothing in
it or any entry back to 1 Nov changes this site's brief, scoring method, or
cannibalisation map.

## What NOT to write
- **Do not commission anything new from this pull.** It produced zero
  genuine gaps and zero cannibalisation risks — the only real movement this
  week was a second-pull confirmation of last week's SERP-checked upgrade
  and a small KD drift on an already-published page, not new keyword
  evidence.
- **Do not promise #9 (donate-furniture-toronto) as a guaranteed quick
  win**, and do not treat this pull's vol 60→70 bump as reason to raise
  that promise. The AI Overview/local-pack/PAA stack above it still caps
  clicks below what KD0 suggests. Commission it as "winnable, modest
  traffic ceiling," exactly as last week, not as "easy 70/mo."
- **Do not read #4's KD0→4 drift as the published clothes guide losing
  ground.** There is no GSC data to check a real position against, and the
  same wobble has already been seen and dismissed on other near-zero-KD
  terms this cache. Watch it; don't act on it.
- **Do not un-fold #2, #3 or #8** ("toronto volunteer opportunities,"
  "volunteer opportunities toronto," "food bank volunteer toronto") back
  into standalone pages. Same reader and answer as #1 and #5; nothing this
  pull argues against the fold.
- **Do not chase "where to donate books in toronto," "where to donate
  clothes downtown toronto," or the newly surfaced "how do i find charity
  events toronto?" as their own pages.** All read zero volume or the same
  parent_topic as an existing published guide; a separate page would
  compete with our own content, not add to it.
- **Do not read "one cluster strengthened" as "the pipeline is healthy."**
  The single highest-value action available right now is still fixing the
  egress/credential block, not writing. Twenty-six calendar days of zero
  output from a five-stage pipeline (per EDITLOG.md's 6 Nov count) is a
  bigger loss than any one evergreen guide is a gain, and this pull adds no
  new ready cluster to the three already sitting undrafted behind it.
