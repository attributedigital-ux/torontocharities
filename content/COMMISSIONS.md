# Commissions — 19 November 2026 (Thursday)

Written by the editor, commissioning run. Thursday is not a fixed-track day
per `CLIENT.md` — Monday (events) and Friday (news) are the only fixed days —
so today's commission comes from `QUEUE.md`. `COMMISSIONS.md`'s 18 November
entry fully re-detailed row #6; rows #9 and #10 were last fully re-detailed
17 November (commit `d992e79`). Nothing has changed on any of the three
since, so today rotates back to #9 and #10 for full detail, and #6 carries
forward unchanged.

## Connectivity, checked this session

Independently re-verified rather than trusted from yesterday's entry:
`curl -sS -m 10 https://toronto-charities.ca/` and `/guides/` both returned
`CONNECT tunnel failed, response 403` (exit 56); the agent-proxy status
endpoint confirms `connect_rejected` ("gateway answered 403 to CONNECT"),
policy still `"selective": false` — a blanket block, the identical shape
logged every weekday session since 21 October, with the same recent-failure
list spanning a wide, unrelated spread of hosts (klaviyo, linear, clickup,
slack, asana) in this same window, confirming it is not site-specific.
Presence checks (not direct reads): `DATABASE_URL`, `ANTHROPIC_API_KEY` and
`RESEND_API_KEY` all absent. `git log` shows the working tree at `da5362d`
(18 Nov gate run), clean, no new commits since; `ls content/drafts
content/approved content/images` — none of the three exist; `ls
research/facts/` still shows exactly the four rows behind the four published
guides, no row for #6, #9 or #10.

Checked `attribute-brain/todo/toronto-charities.md` directly: R-192 (egress/
`DATABASE_URL`) and R-170 (category mapping) both still open, unchanged.
Checked `attribute-brain/raw/` for anything dated after 16 November naming
this site: nothing — the 18 and 19 November files are a gym ad-spend page
and a Lucie Mé sale bar, both unrelated clients. Checked `RULINGS.md`'s tail
through 17 November (a client-site credit-line wording for a different
client; an inbox-filing rule): neither bears on this site's brief, scoring
or cannibalisation map.

This is at least the thirty-seventh calendar day with no draft produced
since 13 October, per `research/editlog/EDITLOG.md`'s unbroken run of
"NOTHING DRAFTED"/"NOTHING TO REVIEW" entries, cross-checked against
`research/EVIDENCE.md`'s 9 November pack and `QUEUE.md`'s 16 November
re-rank. A commission is a brief, not a draft, and does not itself need live
egress, so both commissions below are written in full regardless; neither
can clear its facts-needed section until the block lifts.

## Commission: Where to donate furniture in Toronto

**Slug:** `donate-furniture-toronto`
**Cluster / intent tier:** `QUEUE.md` row #9, evergreen Track 3 (donating a
particular thing). Vol 70, KD 0 (exact-match "where to donate furniture
toronto"), score 9. WINNABLE NOW, independently confirmed a third
consecutive pull (2 Nov live SERP check, 9 Nov and 16 Nov both holding KD 0 /
vol 70 on the plain matching-terms read) — commission it as winnable with a
modest traffic ceiling, never as an easy 70/mo: an AI Overview, a 3-pack
local pack and a PAA box all sit above position 1 organic.

**The angle, in one sentence:** every GTA charity that currently takes
furniture donations, what condition and type it accepts, whether it offers
pickup, and how a Toronto resident doing a clear-out actually gets a sofa or
a table out of their home and to a charity that wants it — not a general
donation essay.

**Who it is for:** someone in Toronto clearing out a home — moving,
downsizing, a bereavement, a renovation — who has furniture to give away and
needs to know which charity will take it, in what condition, and whether
they have to drive it there themselves.

**What it must answer:**
1. Which Toronto-area charities currently accept furniture donations?
2. What condition must it be in, and what do they refuse (torn upholstery,
   stains, missing parts, mattresses, particleboard flat-pack)?
3. Does the charity offer pickup, and under what conditions (minimum item
   count, postal code range, a fee, a wait time)?
4. What has to happen before pickup or drop-off — photos submitted online,
   a phone call, a scheduled appointment?
5. Which of these charities have a profile on this site, and which also run
   a retail/thrift operation the furniture is resold through (relevant to
   what the reader should expect to happen to their donation)?

**Links it must earn:**
- `/profile/<slug>/` for every charity named, checked against the
  sitemap/`DATABASE_URL` before linking. A charity whose slug does not
  resolve is named without a link, per `CLIENT.md`'s rule.
- The charity's own website, where it has one (outbound, required per
  `CLIENT.md`'s links table) — only after `website_status` confirms the
  address is live. Furniture Bank specifically must carry an outbound link
  if named (the clothes-guide gate caught this charity named with no link,
  EDITLOG 13 Oct) — do not repeat that omission.
- `/category/social-services/` only where that specific charity is verified
  in that category; no other category page (R-170 still open).
- One figure drawn from this guide's own facts file, and a strip of the
  charities it names, per `CLIENT.md`'s Track 3 shape.

**Facts needed and where they come from:**
- Which charities take furniture, accepted/refused condition and item list,
  and pickup terms for each: not in the CRA bulk-import data and cannot be
  written from the directory alone. Requires a live read of each named
  charity's own site (Furniture Bank is the obvious anchor; others to be
  identified by the same route), confirming the programme in its own words.
  Category B/C per `GUIDE_ARTICLE_SPEC.md` — verify before writing or omit.
- The one figure the guide carries comes from a `DATABASE_URL` query over
  charities with a live website, cross-checked against what each site
  actually states — not estimated.
- Every charity's slug: checked against the sitemap/DB, never assumed from
  the name.
Both routes are DB-query or live-fetch dependent and confirmed blocked this
session (see Connectivity above). Nothing here can be drafted until the
block lifts.

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
- No category-page link besides `/category/social-services/`, and only once
  verified for the specific charity named (R-170).
- No charity profile link not checked live against the sitemap/DB first; an
  unresolved slug is named, never linked to a guess.
- No claim about this site's own pages not checked live first — fault #5.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No personification: nothing a page or charity "carries," "holds," or
  "shows" in the sense of deciding what to include (RULINGS 2026-11-03).
- Do not promise this as a guaranteed quick win, and do not treat the vol
  60→70 reading as licence to oversell it: the AI Overview/local-pack/PAA
  stack above organic position 1 caps clicks below what KD0 suggests on its
  own (per EVIDENCE.md, 9 Nov and 16 Nov). Write "winnable, modest traffic
  ceiling," never "easy 70/mo."
- Canadian spelling throughout. No adjectives about the cause.

## Commission: Where to donate hair in Toronto

**Slug:** `donate-hair-toronto`
**Cluster / intent tier:** `QUEUE.md` row #10, evergreen Track 3 (donating a
particular thing). Vol 90, KD 1, score 45 — unchanged across every pull
since 13 October.

**The angle, in one sentence:** every hair-donation programme that actually
serves Toronto donors, the length and condition each one requires, and the
step before cutting — not a general essay on wig charities.

**Who it is for:** someone in Toronto who is about to cut a significant
length of hair and wants to know which programme will take it, exactly how
long it has to be, and whether it has to be virgin/untreated hair before
they book the haircut.

**What it must answer:**
1. Which hair-donation programmes currently accept donations from a Toronto
   donor — directly, or through a participating local salon?
2. What is the minimum length required, measured how (ponytail length
   before cutting, not "inches of hair")?
3. Does the programme accept treated, coloured or grey hair, or only
   virgin/untreated hair?
4. How does a donor actually send or deliver the hair — mail, a
   participating salon, a specific drop-off point?
5. Which of these are registered charities with a profile on this site, and
   which are programmes run by a for-profit wig manufacturer with no
   charity status (a distinction the page must state plainly, not blur)?

**Links it must earn:**
- `/profile/<slug>/` for every registered charity named, checked against
  the sitemap/`DATABASE_URL` before linking. A programme that is not a
  registered charity on this directory is named without a profile link and
  the page must say so rather than imply it is one.
- The programme's own website — only after `website_status` confirms the
  address is live, for any entry that has a directory profile; for a
  non-directory programme, link its own site directly as the outbound
  source for the claim.
- `/category/social-services/` only where that specific charity is verified
  in that category; no other category page (R-170 still open).
- One figure drawn from this guide's own facts file, and a strip of the
  charities it names, per `CLIENT.md`'s Track 3 shape.

**Facts needed and where they come from:**
- Which programmes accept donations from Toronto, minimum length, condition
  rules, and the delivery method for each: not in the CRA bulk-import data.
  Requires a live read of each programme's own site. Category B/C per
  `GUIDE_ARTICLE_SPEC.md` — verify before writing or omit.
- Which named programmes are CRA-registered charities with a profile on this
  directory, versus a commercial wig maker's donation scheme: checked
  against the DB, never assumed from a familiar name.
- The one figure the guide carries comes from a `DATABASE_URL` query,
  cross-checked against what each site states — not estimated.
Both routes are DB-query or live-fetch dependent and confirmed blocked this
session (see Connectivity above). Nothing here can be drafted until the
block lifts.

**Do not claim:**
- No programme named as a "charity" unless it is CRA-registered and
  confirmed in the DB — a commercial donation scheme is named as what it
  is, not folded into the same language as a registered charity (RULINGS
  2026-11-01: a category or label is itself a claim).
- No invented minimum length, condition rule or delivery method. State only
  what is confirmed; leave anything unconfirmed unstated (RULINGS
  2026-11-10).
- No unsourced superlative ("the most trusted hair-donation charity in
  Toronto") — `CLIENT.md` fault #2.
- No invented count of donations received, wigs made, or similar — fault
  #3.
- No category-page link besides `/category/social-services/`, and only
  once verified for the specific charity named (R-170).
- No charity profile link not checked live against the sitemap/DB first; an
  unresolved slug is named, never linked to a guess.
- No claim about this site's own pages not checked live first — fault #5.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No personification: nothing a page or charity "carries," "holds," or
  "shows" in the sense of deciding what to include (RULINGS 2026-11-03).
- Canadian spelling throughout. No adjectives about the cause.

## Carried forward, not re-detailed today (standing evergreen commission, still blocked)

- **#6 `volunteer-opportunities-toronto-students`** — fully re-detailed 18
  November (commit `2d6fed4`), full brief there, unchanged since. Not
  re-detailed today to avoid restating the same brief twice in two days.

The prior Monday events-track backlog (weeks of 19/26 Oct, 2/9/16 Nov) and
Friday news-track backlog (weeks of 16/23/30 Oct, 6/13 Nov) remain superseded
by whichever issue of each track drafts first once the block lifts, per
`CLIENT.md`'s dated-record rule — not reissued here.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked `research/editlog/EDITLOG.md`'s tail (through the 18 November gate
run). Every entry since 2 November is a WRITER/DESIGNER/GATE run finding
nothing to review, because nothing has drafted since 13 October — there is
no new prose fault to add this run. The standing lessons remain the five
faults in `CLIENT.md`, the category-link restriction (R-170), and the
general-ledger rules folded into "Standing rules" below, carried from the
four 13 October gate passes (soup-kitchen, books, clothes, volunteer-toronto):
unsourced superlatives, invented beliefs about the reader, invented
numbers/comparisons, a 200 response treated as proof an anchor is right, and
FAQ-restating H2s.

## Standing rules for every commission above

Unchanged since 4–18 November, restated once rather than per brief:
- `CLIENT.md`'s five faults (invented reader beliefs, unsourced superlatives,
  invented numbers/comparisons, FAQ-restating H2s, unchecked claims about our
  own site) apply directly.
- Bare-intensifier family ("real"/"genuine(ly)"/"actually"/"actual") deleted
  as filler, never reworded, unless the sentence draws an explicit contrast.
- GRAMMAR.md's object-as-actor rule (RULINGS 2026-10-18, 2026-11-03): no page
  "says" in the sense of deciding, no table "shows" beyond its plain
  contents — name the person, or use has/is in/shows plainly.
- No adjectives about the cause. Canadian spelling throughout.
- Only `/category/social-services/` among category pages, verified for that
  specific charity, never guessed (R-170 still open).
- Every charity named gets its profile link, checked against the sitemap/DB
  before linking; unresolved slugs are named without a link.
- A category, label or taxonomy is a claim (RULINGS 2026-11-01): no
  eligibility stated without a source that actually defines it.
- A failed probe is "I could not reach it," never "it does not exist"
  (RULINGS 2026-11-16) — applies directly to both commissions above: a
  programme's rules not yet checked are unconfirmed, not absent.

## For Richard

No new `[NEEDS RICHARD]` item from this run. The standing operational
blocker (R-192 egress; the writer/editor session type's missing general web
access and `DATABASE_URL`) is now at least thirty-seven calendar days old
with zero drafts produced since 13 October, across every weekday session
this fleet has run in that window, and remains his decision alone: either
this session type gets general web egress, or `DATABASE_URL` is provisioned
to it, or both. Not pushing a fresh notification today — the last one fired
at the four-calendar-week mark (10 Nov WRITER run) and nothing has changed
since. R-170 (category-page mapping) remains open on the same todo file,
unaffected by today's run.
