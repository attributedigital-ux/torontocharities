# Commissions — 25 November 2026 (Wednesday)

Written by the editor, commissioning run. Wednesday is not a fixed-track
day per `CLIENT.md` — Monday (events) and Friday (news) are the only fixed
days — so today's commission comes from `QUEUE.md`. Row #6 was last fully
re-detailed 24 November (commit `f391111`); rows #9 and #10 were last fully
re-detailed 19 November (commit `22c1f70`), now six calendar days stale
against #6's one. So today rotates back to #9 and #10 for full detail, and
#6 carries forward unchanged, same rotation as 18→19 November.

## Connectivity, checked this session

Independently re-verified rather than trusted from yesterday's entry:
`git fetch origin && git checkout -B main origin/main` landed clean at
`89a4cab` (yesterday's editor gate run), working tree clean, nothing to
commit. `curl -sS -m 10 https://toronto-charities.ca/`,
`https://toronto-charities.ca/guides/` and
`https://toronto-charities.ca/charity-events-toronto/` all returned
`CONNECT tunnel failed, response 403` (exit 56) — a destination-not-allowed
refusal, not a timeout or a non-200, the identical blanket block logged
every weekday session since 21 October (R-192). A presence check (no value
printed) found `DATABASE_URL`, `ANTHROPIC_API_KEY` and `RESEND_API_KEY` all
absent from the environment this session — the events-table/DB route is
equally closed, not only the live-fetch route. `ls content/drafts
content/approved content/images` — none of the three exist. `ls
research/facts/` still shows exactly the four rows behind the four
published guides, no row for #6, #9, #10, or for either weekly track.

Checked `attribute-brain/todo/toronto-charities.md` directly: R-192
(egress/`DATABASE_URL`) and R-170 (category mapping) both still open,
unchanged since the 24 November re-raise. Checked `attribute-brain/raw/`
for anything dated after 23 November naming this site: nothing does.
`RULINGS.md`'s tail through 23 November (the sits/holds/carries ban's
missing TorontoProperty script coverage, scraped-address no-verifier
ruling, a paste-block Copy button, GHL-tagged prospect loads) does not
change this site's brief, scoring method or cannibalisation map; nothing
in that tail is dated 24 or 25 November.

This is at least the forty-fourth calendar day with no draft produced
since 13 October, per `research/editlog/EDITLOG.md`'s unbroken run of
"NOTHING DRAFTED"/"NOTHING TO REVIEW" entries through yesterday's gate run.
A commission is a brief, not a draft, and does not itself need live
egress, so both commissions below are written in full regardless; neither
can clear its facts-needed section until the block lifts.

## Commission: Where to donate furniture in Toronto

**Slug:** `donate-furniture-toronto`
**Working title:** Where to donate furniture in Toronto
**Cluster / intent tier:** `QUEUE.md` row #9, evergreen Track 3 (donating a
particular thing). Vol 70, KD 0 (exact-match "where to donate furniture
toronto"), score 9. WINNABLE NOW, independently confirmed a fourth
consecutive pull (2 Nov live SERP check, 9 Nov, 16 Nov and 23 Nov all
holding KD 0 / vol 70) — the strongest-confirmed WINNABLE NOW call on the
board. Commission it as winnable with a modest traffic ceiling, never as
an easy 70/mo: an AI Overview, a 3-pack local pack and a PAA box all sit
above position 1 organic.

**The angle, in one sentence:** every GTA charity that currently takes
furniture donations, what condition and type it accepts, whether it offers
pickup, and how a Toronto resident doing a clear-out actually gets a sofa
or a table out of their home and to a charity that wants it — not a
general donation essay.

**Who it is for:** someone in Toronto clearing out a home — moving,
downsizing, a bereavement, a renovation — who has furniture to give away
and needs to know which charity will take it, in what condition, and
whether they have to drive it there themselves.

**What it must answer:**
1. Which Toronto-area charities currently accept furniture donations?
2. What condition must it be in, and what do they refuse (torn upholstery,
   stains, missing parts, mattresses, particleboard flat-pack)?
3. Does the charity offer pickup, and under what conditions (minimum item
   count, postal code range, a fee, a wait time)?
4. What has to happen before pickup or drop-off — photos submitted online,
   a phone call, a scheduled appointment?
5. Which of these charities have a profile on this site, and which also
   run a retail/thrift operation the furniture is resold through (relevant
   to what the reader should expect to happen to their donation)?

**Links it must earn:**
- `/profile/<slug>/` for every charity named, checked against the
  sitemap/`DATABASE_URL` before linking. A charity whose slug does not
  resolve is named without a link, per `CLIENT.md`'s rule.
- The charity's own website, where it has one (outbound, required per
  `CLIENT.md`'s links table) — only after `website_status` confirms the
  address is live. Furniture Bank specifically must carry an outbound link
  if named (the clothes-guide gate caught this charity named with no link,
  EDITLOG 13 Oct) — do not repeat that omission.
- `/category/social-services/` only where that specific charity is
  verified in that category; no other category page (R-170 still open).
- One figure drawn from this guide's own facts file, and a strip of the
  charities it names, per `CLIENT.md`'s Track 3 shape.

**Facts needed and where they come from:**
- Which charities take furniture, accepted/refused condition and item
  list, and pickup terms for each: not in the CRA bulk-import data and
  cannot be written from the directory alone. Requires a live read of each
  named charity's own site (Furniture Bank is the obvious anchor; others
  to be identified by the same route), confirming the programme in its own
  words. Category B/C per `GUIDE_ARTICLE_SPEC.md` — verify before writing
  or omit.
- The one figure the guide carries comes from a `DATABASE_URL` query over
  charities with a live website, cross-checked against what each site
  actually states — not estimated.
- Every charity's slug: checked against the sitemap/DB, never assumed
  from the name.
Both routes are DB-query or live-fetch dependent and confirmed blocked
this session (see Connectivity above). Nothing here can be drafted until
the block lifts.

**Do not claim:**
- No charity named as accepting furniture unless its own site (or an
  equivalent verified source) says so — a category or label is itself a
  claim (RULINGS 2026-11-01), not something to infer from cause category.
- No invented condition rule, pickup fee, wait time or service area. State
  only what is confirmed; leave anything unconfirmed unstated (RULINGS
  2026-11-10).
- No unsourced superlative ("the easiest way to get rid of a sofa in
  Toronto," "the most generous pickup radius") — `CLIENT.md` fault #2.
- No invented count of items collected, households served, or similar —
  fault #3.
- No category-page link besides `/category/social-services/`, and only
  once verified for the specific charity named (R-170).
- No charity profile link not checked live against the sitemap/DB first;
  an unresolved slug is named, never linked to a guess.
- No claim about this site's own pages not checked live first — fault #5.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No verb on an object or process (RULINGS 2026-10-18, 2026-11-03,
  2026-11-21): nothing a page or charity "sits," "holds," "carries,"
  "decides," "shows" or "tells" — name the person, or state the fact
  plainly.
- Do not promise this as a guaranteed quick win, and do not treat the vol
  60→70 reading as licence to oversell it: the AI Overview/local-pack/PAA
  stack above organic position 1 caps clicks below what KD0 suggests on
  its own (per EVIDENCE.md). Write "winnable, modest traffic ceiling,"
  never "easy 70/mo."
- Canadian spelling throughout. No adjectives about the cause.

## Commission: Where to donate hair in Toronto

**Slug:** `donate-hair-toronto`
**Working title:** Where to donate hair in Toronto
**Cluster / intent tier:** `QUEUE.md` row #10, evergreen Track 3 (donating
a particular thing). Vol 90, KD 1, score 45 — unchanged across every pull
since 13 October.

**The angle, in one sentence:** every hair-donation programme that
actually serves Toronto donors, the length and condition each one
requires, and the step before cutting — not a general essay on wig
charities.

**Who it is for:** someone in Toronto who is about to cut a significant
length of hair and wants to know which programme will take it, exactly how
long it has to be, and whether it has to be virgin/untreated hair before
they book the haircut.

**What it must answer:**
1. Which hair-donation programmes currently accept donations from a
   Toronto donor — directly, or through a participating local salon?
2. What is the minimum length required, measured how (ponytail length
   before cutting, not "inches of hair")?
3. Does the programme accept treated, coloured or grey hair, or only
   virgin/untreated hair?
4. How does a donor actually send or deliver the hair — mail, a
   participating salon, a specific drop-off point?
5. Which of these are registered charities with a profile on this site,
   and which are programmes run by a for-profit wig manufacturer with no
   charity status (a distinction the page must state plainly, not blur)?

**Links it must earn:**
- `/profile/<slug>/` for every registered charity named, checked against
  the sitemap/`DATABASE_URL` before linking. A programme that is not a
  registered charity on this directory is named without a profile link
  and the page must say so rather than imply it is one.
- The programme's own website — only after `website_status` confirms the
  address is live, for any entry that has a directory profile; for a
  non-directory programme, link its own site directly as the outbound
  source for the claim.
- `/category/social-services/` only where that specific charity is
  verified in that category; no other category page (R-170 still open).
- One figure drawn from this guide's own facts file, and a strip of the
  charities it names, per `CLIENT.md`'s Track 3 shape.

**Facts needed and where they come from:**
- Which programmes accept donations from Toronto, minimum length,
  condition rules, and the delivery method for each: not in the CRA
  bulk-import data. Requires a live read of each programme's own site.
  Category B/C per `GUIDE_ARTICLE_SPEC.md` — verify before writing or
  omit.
- Which named programmes are CRA-registered charities with a profile on
  this directory, versus a commercial wig maker's donation scheme: checked
  against the DB, never assumed from a familiar name.
- The one figure the guide carries comes from a `DATABASE_URL` query,
  cross-checked against what each site states — not estimated.
Both routes are DB-query or live-fetch dependent and confirmed blocked
this session (see Connectivity above). Nothing here can be drafted until
the block lifts.

**Do not claim:**
- No programme named as a "charity" unless it is CRA-registered and
  confirmed in the DB — a commercial donation scheme is named as what it
  is, not folded into the same language as a registered charity (RULINGS
  2026-11-01: a category or label is itself a claim).
- No invented minimum length, condition rule or delivery method. State
  only what is confirmed; leave anything unconfirmed unstated (RULINGS
  2026-11-10).
- No unsourced superlative ("the most trusted hair-donation charity in
  Toronto") — `CLIENT.md` fault #2.
- No invented count of donations received, wigs made, or similar — fault
  #3.
- No category-page link besides `/category/social-services/`, and only
  once verified for the specific charity named (R-170).
- No charity profile link not checked live against the sitemap/DB first;
  an unresolved slug is named, never linked to a guess.
- No claim about this site's own pages not checked live first — fault #5.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No verb on an object or process (RULINGS 2026-10-18, 2026-11-03,
  2026-11-21): nothing a page or charity "sits," "holds," "carries,"
  "decides," "shows" or "tells" — name the person, or state the fact
  plainly.
- Canadian spelling throughout. No adjectives about the cause.

## Carried forward, not re-detailed today (standing evergreen commission, still blocked)

- **#6 `volunteer-opportunities-toronto-students`** — fully re-detailed 24
  November (commit `f391111`), full brief there, unchanged since. Not
  re-detailed today to avoid restating the same brief twice in two days.

The prior Monday events-track backlog (weeks of 19/26 Oct, 2/9/16/23 Nov)
and Friday news-track backlog (weeks of 16/23/30 Oct, 6/13/20 Nov) remain
superseded by whichever issue of each track drafts first once the block
lifts, per `CLIENT.md`'s dated-record rule — not reissued here.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked `research/editlog/EDITLOG.md`'s tail through yesterday's (24
November) gate run. Every entry since 2 November is a WRITER/DESIGNER/GATE
run finding nothing to review, because nothing has drafted since 13
October — there is no new prose fault to add this run. The standing
lessons remain the five faults in `CLIENT.md`, the category-link
restriction (R-170), and the general-ledger rules folded into "Standing
rules" below, carried from the four 13 October gate passes (soup-kitchen,
books, clothes, volunteer-toronto): unsourced superlatives, invented
beliefs about the reader, invented numbers/comparisons, a 200 response
treated as proof an anchor is right, and FAQ-restating H2s.

## Standing rules for every commission above

Unchanged since 4–24 November, restated once rather than per brief:
- `CLIENT.md`'s five faults (invented reader beliefs, unsourced
  superlatives, invented numbers/comparisons, FAQ-restating H2s, unchecked
  claims about our own site) apply directly.
- Bare-intensifier family ("real"/"genuine(ly)"/"actually"/"actual")
  deleted as filler, never reworded, unless the sentence draws an
  explicit contrast.
- GRAMMAR.md's verb-on-object rule (RULINGS 2026-10-18, 2026-11-03,
  2026-11-21): nothing a page, event, charity or table "sits," "holds,"
  "carries," "earns," "decides," "wants," "shows" or "tells" — only a
  person earns, and rarely. Name the person, or use has/is/lists plainly.
- No adjectives about the cause. Canadian spelling throughout.
- Only `/category/social-services/` among category pages, verified for
  that specific charity, never guessed (R-170 still open).
- Every charity named gets its profile link, checked against the
  sitemap/DB before linking; unresolved slugs are named without a link.
- A category, label or taxonomy is a claim (RULINGS 2026-11-01): no
  eligibility stated without a source that actually defines it.
- A failed probe is "I could not reach it," never "it does not exist"
  (RULINGS 2026-11-16) — applies directly to both commissions above: a
  programme's rules not yet checked are unconfirmed, not absent.
- No credit line naming the tooling, per RULINGS 2026-11-21: this is the
  agency's work, written in its own voice.

## For Richard

No new `[NEEDS RICHARD]` item on the content itself from this run.

The operational blocker (R-192, egress/`DATABASE_URL`) is unchanged since
yesterday's six-calendar-week re-raise in the 24 November COMMISSIONS.md
"For Richard" section. Not re-raising a second day running — that would be
noise per this ledger's own standing practice (escalate at a milestone,
reconfirm quietly otherwise), and nothing about the block has changed in
the last 24 hours: same `curl` refusal, same absent environment variables,
same absent `content/drafts/`. The decision remains his alone: either this
session type gets general web egress, or `DATABASE_URL` is provisioned to
it, or both. R-170 (category-page mapping) and R-335 (Neon monthly
compute) remain separately open on the same todo file, both unaffected by
today's run.
