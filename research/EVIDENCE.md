# Evidence — toronto-charities.ca, 2 November 2026

Ahrefs matching-terms (country CA, terms=questions) pulled once this run for
the six standing seed groups (eight keyword strings: volunteer toronto,
volunteer opportunities toronto, where to donate clothes/books/furniture
toronto, charity events toronto, charities in toronto, food bank toronto),
1,012 units, cached to `research/ahrefs/clusters.json`. Fourth pull on this
cache (13 Oct all-terms, 19 Oct questions, 26 Oct questions, this one). One
targeted `serp-overview` pull (278 units total across two calls) on "where
to donate furniture toronto" to resolve a caveat that had been carried
unverified across three straight pulls — see below. GSC: still no snapshot
— `content/CLIENT.md` names `research/gsc/snapshot.md`/`.json`, committed by
CI, as an input; that CI job is still `[BUILD]`, unchanged since 13 Oct. No
new dictation from Richard about this site in `raw/` since 16 Oct (checked
every `raw/session-2026-10-*` and `raw/session-2026-11-*` file added since
the 26 Oct pack; none name toronto-charities).

## Headline: one cluster upgraded on a live SERP check; otherwise no change

**#9 donate-furniture-toronto moves from "borderline WINNABLE" to WINNABLE
NOW.** Three consecutive pulls (13, 19, 26 Oct) read this cluster's
parent_topic as literally "furniture bank" and carried a standing caveat
that the #1 organic result was almost certainly Furniture Bank Toronto's
own site — a real single-charity incumbent, not a thin SERP. This pull's
matching-terms result changed that: "where to donate furniture toronto"
(vol 60) now reads parent_topic "donate furniture with free pick up
toronto" and difficulty 7 → 0, the first change in four pulls. Rather than
carry a fourth caveat forward unverified, I ran a live `serp-overview`
check (228 units). It confirms the shift is real: organic position 1 is
habithmd.ca (DR 38); the full organic top 10 tops out at DR 66
(nesto.ca) with Reddit's DR 95 thread the only stronger domain present, and
furniturebank.org holds no organic top-10 slot at all for this exact
phrase. The three-pull-old "single strong incumbent" read was wrong for the
organic SERP.

**But the caveat doesn't disappear, it changes shape.** Position 1 is a
Google AI Overview citing furniturebank.org six times plus four other
sites; position 2 is a three-pack local pack (Furniture Bank, Habitat
ReStore, JRCC Furniture Depot); position 3 is a four-item "people also ask"
box. All three sit above the first organic result. Whoever commissions this
should expect lower click-through than KD0/vol60 alone implies, because
most of this query's demand is answered on the SERP itself. Full detail
and the organic result list: `clusters.json` → `serp_checks`.

Everything else this pull: no material change. Rows #4 and #7 (clothes,
books) reappeared with the same numbers as 26 Oct. One new zero-volume
variant surfaced ("where to donate clothes downtown toronto," vol 10),
already covered by the published clothes guide. "Charity events toronto,"
"charities in toronto" and "food bank toronto" returned no question-phrased
volume for the fourth pull running — both covered rows (#11, #12) stand
unchanged. Full numbers: `clusters.json` → `delta_vs_26_oct_pull`.

## Striking distance / ranking without clicks
Still not assessable. The GSC snapshot job remains unbuilt and no live GSC
read exists; ~0 organic users/week and 61/3,528 indexed (12 Oct manual
check, unchanged) means the site has no pages with real position/impression
data to report on yet. This has been true every pack since 19 Oct — it is a
pipeline gap (R-161), not something a fifth Ahrefs pull will fix.

## Status check against the live guides (substitute for a direct read)
`WebFetch` to `https://toronto-charities.ca/guides/` failed again this
session — `getaddrinfo ENOTFOUND` — the identical egress fault logged as
R-187 (15 Oct), R-192 (16 Oct) and R-193 (18 Oct onward). This is the third
researcher session in a row to hit it (19 Oct, 26 Oct, now 2 Nov). Used
`content/published/*.json` as the record of what is live, same substitute
as the prior two packs: still exactly four guides — #1, #4, #5, #7 —
nothing has published since the 13 Oct gate. `research/editlog/EDITLOG.md`'s
own tail (through 30 Oct, twelve consecutive "NOTHING TO REVIEW"/"NOTHING
DRAFTED" runs across writer, designer and gate roles) confirms this
independently; no later entry exists in that file as of this pull.

## Genuine gaps
None new. The six-seed-group pull returned no parent_topic outside the
clusters already on `QUEUE.md`, the fourth pull in a row with this result.

## Cannibalisation risks
None triggered. Every cluster this pull touched maps to a row already
marked published/ready/hold/covered on `QUEUE.md`; nothing recommends a page
`CLIENT.md`'s map excludes.

## Repairs
Not a keyword repair, but the same two structural blockers flagged since 19
Oct are both still open and now worse by elapsed time:
- **Egress fault (R-187/R-192/R-193).** Twelve weekday sessions now (15,
  16, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30 Oct, per EDITLOG.md) have hit
  the identical `getaddrinfo ENOTFOUND` / proxy 403. Zero drafts, zero
  gate reviews, zero publishes in nineteen calendar days. The two `ready`
  evergreen clusters (#6, #10) have sat recommissioned-but-undrafted since
  15/20 Oct, and #9 now joins them as a third ready-but-blocked cluster.
- **R-170 (category-page mapping).** Still open per
  `attribute-brain/todo/toronto-charities.md`, still means no guide may
  link any category page but `/category/social-services/`.
- **R-193/R-213 (Neon quota).** Also still open; recurred again 1 Nov per
  the todo file's own 1 Nov update. Not a researcher-side concern directly
  (this pull touches no live DB query), noted because it compounds the same
  egress/credential picture above.
None of the three is a researcher-side fix; all are already on
`attribute-brain/todo/toronto-charities.md` awaiting Richard's decision.
Restating because they are the actual reason this week's "what to write
next" answer is short on volume even though it gained one upgraded cluster:
there is still nowhere for a writer session to land a draft.

## What Richard said
Nothing new this week specific to this site. Checked every `raw/` file
dated 17 Oct through 1 Nov; none name toronto-charities. Standing
instructions (13 Oct go-ahead on evergreen #1–10, undecided third evergreen
track on `hold`) are unchanged and already folded into `CLIENT.md`/
`QUEUE.md`.

## What NOT to write
- **Do not commission anything new from the matching-terms pull itself.**
  It produced zero genuine gaps and zero cannibalisation risks — the only
  real move this week came from checking a caveat, not from new keywords.
- **Do not promise #9 (donate-furniture-toronto) as a guaranteed quick
  win.** It is genuinely winnable organically now, but the AI
  Overview/local-pack/PAA stack above it will cap clicks below what KD0
  suggests. Commission it as "winnable, modest traffic ceiling," not as
  "easy 60/mo."
- **Do not un-fold #2, #3 or #8** ("toronto volunteer opportunities,"
  "volunteer opportunities toronto," "food bank volunteer toronto") back
  into standalone pages. Same reader and answer as #1 and #5; nothing this
  pull argues against the fold.
- **Do not chase "where to donate books in toronto" or "where to donate
  clothes downtown toronto" as their own pages.** Same parent_topic and
  same answer as the published guides; a separate page would compete with
  our own content, not add to it.
- **Do not read "one cluster upgraded" as "the pipeline is healthy."** The
  single highest-value action available right now is still fixing the
  egress/credential block, not writing. Nineteen days of zero output from a
  five-stage pipeline is a bigger loss than any one evergreen guide is a
  gain, and this pull's upgrade just adds a third ready cluster to the pile
  nothing can currently draft.
