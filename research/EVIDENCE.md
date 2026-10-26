# Evidence — toronto-charities.ca, 26 October 2026

Ahrefs matching-terms (country CA, terms=questions) pulled once this run for
the six standing seed groups (eight keyword strings: volunteer toronto,
volunteer opportunities toronto, where to donate clothes/books/furniture
toronto, charity events toronto, charities in toronto, food bank toronto),
1,452 units, cached to `research/ahrefs/clusters.json`. Third pull on this
cache (13 Oct all-terms, 19 Oct questions, this one). GSC: still no snapshot
— `content/CLIENT.md` names `research/gsc/snapshot.md`/`.json`, committed by
CI, as an input; that CI job is still `[BUILD]`, unchanged since 19 Oct. No
new dictation from Richard about this site in `raw/` since 16 Oct.

## Headline: no change worth acting on in the keyword picture

Every parent_topic this pull returned already sits on `QUEUE.md`. Three rows
(#4 where-to-donate-clothes-toronto, #7 where-to-donate-books-toronto, #9
donate-furniture-toronto) got fresh volume/difficulty numbers; the only
move bigger than normal estimate drift is "where to donate books in
toronto" (the preposition variant) dropping from KD 23 to KD 6 — still the
same cluster as the published guide and still not worth a standalone page,
per the 19 Oct ruling, which this pull does not disturb. See
`clusters.json`'s `delta_vs_19_oct_pull` for the full list. Per cost
discipline, this is the honest "no change this week" run.

## Striking distance / ranking without clicks
Still not assessable. The GSC snapshot job remains unbuilt and no live GSC
read exists; ~0 organic users/week and 61/3,528 indexed (12 Oct manual
check, unchanged) means the site has no pages with real position/impression
data to report on yet. This has been true every pack since 19 Oct — it is a
pipeline gap (R-161), not something a fourth Ahrefs pull will fix.

## Status check against the live guides (substitute for a direct read)
`WebFetch` to `https://toronto-charities.ca/guides/` failed again this
session — `getaddrinfo ENOTFOUND` — the identical egress fault logged as
R-187 (15 Oct), R-192 (16 Oct) and R-193 (18 Oct onward) for writer, gate
and (19 Oct) researcher sessions. This is the second researcher session in
a row to hit it (19 Oct, now 26 Oct), confirming it is not a one-off for
this session type. Used `content/published/*.json` as the record of what
is live, same substitute as 19 Oct: still exactly four guides — #1, #4, #5,
#7 — nothing has published since the 13 Oct gate. `research/editlog/
EDITLOG.md`'s own tail (through 23 Oct, seven consecutive "NOTHING TO
REVIEW" gate runs) confirms this independently.

## Genuine gaps
None new, same finding as 19 Oct. The six-seed-group pull returned no
parent_topic outside the clusters already on `QUEUE.md`.

## Cannibalisation risks
None triggered. Every cluster this pull touched maps to a row already
marked published/ready/hold/covered on `QUEUE.md`; nothing recommends a page
`CLIENT.md`'s map excludes.

## Repairs
Not a keyword repair, but the same two structural blockers flagged 19 Oct
are both still open and now worse by elapsed time, not better:
- **Egress fault (R-187/R-192/R-193).** Eight weekday sessions now (15, 16,
  19, 20, 21, 22, 23, and today 26 Oct) have hit the identical
  `getaddrinfo ENOTFOUND` / proxy 403. Zero drafts, zero gate reviews, zero
  publishes in thirteen calendar days. The two `ready` evergreen clusters
  (#6, #10) have sat recommissioned-but-undrafted since 15/20 Oct.
- **R-170 (category-page mapping).** Still open, still means no guide may
  link any category page but `/category/social-services/`.
Neither is a researcher-side fix; both are already on
`attribute-brain/todo/toronto-charities.md` awaiting Richard's decision
(provision egress, provision `DATABASE_URL`, or both; approve the CRA
category remap). Restating them here because they are the actual reason
this week's "what to write next" answer is short: there is nothing broken
in the keyword evidence for a new commission to fix.

## What Richard said
Nothing new this week. Standing instructions (13 Oct go-ahead on evergreen
#1–10, undecided third evergreen track on `hold`) are unchanged and already
folded into `CLIENT.md`/`QUEUE.md`.

## What NOT to write
- **Do not commission anything new from this pack.** The six seed groups
  produced zero genuine gaps and zero cannibalisation risks to react to —
  writing something because a pack was due would be inventing work the
  evidence does not support.
- **Do not un-fold #2, #3 or #8** ("toronto volunteer opportunities,"
  "volunteer opportunities toronto," "food bank volunteer toronto") back
  into standalone pages. Same reader and answer as #1 and #5, confirmed
  again this pull — "where can i volunteer in toronto" (the one question
  variant under this fold) dropped in score from 10 to 0.53 on a KD jump
  from 0 to 18, which argues harder for keeping the fold, not against it.
- **Do not chase "where to donate books in toronto" as its own page.** Its
  KD fell from 23 to 6 this pull, which could look like a newly winnable
  opportunity; it is the same parent_topic and same answer as the published
  guide, so a separate page would compete with our own content, not add to
  it.
- **Do not treat "donate furniture toronto" as a confirmed quick win.**
  Three pulls running now (13, 19, 26 Oct) all show the same parent_topic —
  "furniture bank" / "furniture bank toronto" — meaning the #1 result is
  almost certainly Furniture Bank Toronto's own site. KD 7 alone reads
  WINNABLE; the SERP has to be checked before this is promised as an easy
  score to whoever commissions it.
- **Do not read this week's "nothing new" as nothing to do.** The single
  highest-value action available right now is fixing the egress/credential
  block, not writing. Thirteen days of zero output from a five-stage
  pipeline is a bigger loss than any one evergreen guide would be a gain,
  and no amount of further keyword research changes that arithmetic.
