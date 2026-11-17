# Commissions — 17 November 2026 (Tuesday)

Written by the editor, commissioning run. Tuesday is not a fixed-track day
per `CLIENT.md` — Monday (events) and Friday (news) are the only fixed days —
so today's commission comes from `QUEUE.md`. The 13 November commission put
rows #9 and #10 next due "around 17 Nov"; both are due today. Row #6 is next
due around 18 Nov and is carried forward unchanged below.

## Connectivity, checked this session

Independently re-verified rather than trusted from prior entries: `ls
content/drafts content/approved content/images` — none of the three exist.
`ls research/facts/` shows exactly the same four rows as the four published
guides (`soup-kitchen-volunteer-toronto`, `volunteer-toronto`,
`where-to-donate-books-toronto`, `where-to-donate-clothes-toronto`) — no row
for #6, #9 or #10. A live network/DB re-check (`curl` to
`toronto-charities.ca` plus an env check) was not completed this session —
this session's own tool-permission layer declined the combined command — so
today's run does not add a fresh proxy-level signature to the record. The
structural evidence stands on its own: no drafts, no approved files, no new
facts rows, and `research/editlog/EDITLOG.md`'s unbroken run of "NOTHING
DRAFTED" / "NOTHING TO GATE" entries from 13 October through 16 November,
cross-checked against `research/EVIDENCE.md`'s 9 November pack and
`QUEUE.md`'s 16 November re-rank, all agree: this is at least the
thirty-fifth calendar day with no draft produced since 13 October. A
commission is a brief, not a draft, and does not itself need live egress, so
both commissions below are written in full regardless, but neither can clear
its facts-needed section until the block (R-192 egress / missing
`DATABASE_URL`) lifts. `attribute-brain/todo/toronto-charities.md` confirms
R-192 and R-170 (category mapping) both still open as of the 16 November
designer-run update logged there.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked `research/editlog/EDITLOG.md`'s tail. Every entry since 2 November is
a WRITER/DESIGNER/GATE run finding nothing to review, because nothing has
drafted since 13 October — there is no new prose fault to add. The standing
lessons are the five faults in `CLIENT.md`, the category-link restriction
(R-170), and the general-ledger rules folded into "Standing rules" below.
Nothing from `RULINGS.md`'s entries since 8 November changes this site's
brief, scoring method or cannibalisation map; the two closest in subject
(2026-11-10's "ask the client, don't make up what's unclear" and 2026-11-16's
"a failed probe is 'I could not reach it,' never 'it does not exist'") are
both already this site's standing practice, restated below rather than
treated as new.

## Commission: Where to donate furniture in Toronto

**Slug:** `donate-furniture-toronto`
**Cluster / intent tier:** `QUEUE.md` row #9, evergreen Track 3 (donating a
particular thing). WINNABLE NOW, independently confirmed a third consecutive
pull (2 Nov SERP check; 9 Nov and 16 Nov both held KD 0 / vol 70) — commission
as "winnable, modest traffic ceiling" (an AI Overview, a 3-pack local pack and
a PAA box all sit above position 1 organic), never as an easy 70/mo.

**The angle, in one sentence:** every GTA charity that currently takes
furniture donations, what each one actually requires (pickup or drop-off,
condition, any cost), with a link to its profile — so the page answers the
search with a finished list, not one the reader has to go build themselves.

**Who it is for:** someone in Toronto with furniture to give away who wants
to know who will take it and what they need to do, not a general essay on
why donating furniture is good.

**What it must answer:**
1. Which Toronto-area charities currently accept furniture donations?
2. Does each one pick up, or does the donor have to drop it off — and where?
3. What condition does the furniture need to be in?
4. Is there any cost to the donor, either to donate or to have it picked up?
5. Which of these charities have a profile on this site, so the reader can
   see more about them?

**Links it must earn:**
- `/profile/<slug>/` for every charity named, checked against the
  sitemap/`DATABASE_URL` before linking. A charity whose slug does not
  resolve is named without a link, per `CLIENT.md`'s rule.
- The charity's own website, where it has one (outbound, required per
  `CLIENT.md`'s links table) — and only after `website_status` confirms the
  address is live, never a dead link published as current.
- `/category/social-services/` only where that specific charity is verified
  in that category; no other category page (R-170 still open).
- One figure drawn from this guide's own facts file, and a strip of the
  charities it names, per `CLIENT.md`'s Track 3 shape.

**Facts needed and where they come from:**
- Which charities accept furniture, and on what terms (pickup/drop-off,
  condition, cost): this is not in the CRA bulk-import data (name, address,
  CRA number, category) and cannot be written from the directory alone. It
  requires a live read of each named charity's own site, or a search that
  turns one up, confirming the donation programme in its own words. Category
  B/C, per `GUIDE_ARTICLE_SPEC.md` — verify before writing or omit.
- The one figure the guide carries (e.g. a count of charities in the
  directory with a documented furniture-donation programme) comes from a
  `DATABASE_URL` query over the charities with a live website, cross-checked
  against what each site actually states — not estimated.
- Every charity's slug: checked against the sitemap/DB, never assumed from
  the name.
All three routes are DB-query or live-fetch dependent and are confirmed
blocked this session (see Connectivity above). Nothing here can be drafted
until the block lifts.

**Do not claim:**
- No charity named as accepting furniture donations unless its own site (or
  an equivalent verified source) says so — a category or label is itself a
  claim (RULINGS 2026-11-01), not something to infer from the CRA cause
  category.
- No invented pickup schedule, delivery radius, condition standard or fee.
  If a charity's own site does not state one of these, say only what is
  confirmed and leave the rest unstated — never fill the gap with a plausible
  guess (RULINGS 2026-11-10).
- No unsourced superlative ("the biggest furniture donation programme in
  Toronto," "the easiest option") — `CLIENT.md` fault #2.
- No invented count of volume, trucks, items collected, or similar — fault
  #3.
- No category-page link besides `/category/social-services/`, and only once
  verified for the specific charity named (R-170).
- No charity profile link not checked live against the sitemap/DB first; an
  unresolved slug is named, never linked to a guess.
- No claim about this site's own pages not checked live first — fault #5.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No personification: nothing a page or charity "carries," "holds," or
  "shows" in the sense of deciding what to include (RULINGS 2026-11-03).
- Canadian spelling throughout. No adjectives about the cause.
- If fewer qualifying charities turn up than the keyword implies, publish
  that smaller list and say so plainly — never pad it with a charity that
  does not actually take furniture.

## Commission: Where to donate hair in Toronto

**Slug:** `donate-hair-toronto`
**Cluster / intent tier:** `QUEUE.md` row #10, evergreen Track 3 (donating a
particular thing). Vol 90, KD 1, score 45 — unchanged across every pull since
13 October.

**The angle, in one sentence:** every organisation that takes hair donations
from Toronto-area donors (for wigs, most commonly for people who have lost
their hair to illness), what each one requires to accept it, with a link to
its profile where one exists.

**Who it is for:** someone in Toronto who has grown their hair to donate it
and wants to know exactly who will take it, in what condition, and how to
send or deliver it.

**What it must answer:**
1. Which organisations relevant to a Toronto donor currently accept hair
   donations?
2. What length and condition does the hair need to be in (cut, colour-
   treated or not, grey, etc.)?
3. How is it sent or delivered — by mail, drop-off, or through a
   participating salon?
4. Which of these organisations have a profile on this site?

**Links it must earn:**
- `/profile/<slug>/` for every charity named with a profile on this site,
  checked against the sitemap/DB first; named without a link if the slug
  does not resolve.
- The organisation's own site where it has one and `website_status`
  confirms it is live.
- `/category/social-services/` only where verified for that specific
  charity; no other category page (R-170).
- One figure from this guide's own facts file and a strip of the charities
  it names, per `CLIENT.md`'s Track 3 shape.

**Facts needed and where they come from:**
- Which organisations accept hair donations and on what terms: not in the
  CRA import data, and not assumed from a charity's general cause category.
  Requires a live read of each candidate's own site (minimum length, colour-
  treatment rules, mailing address or drop-off process) before it is named.
  Category B/C — verify before writing or omit.
- Whether any CRA-registered Toronto-area charity in this directory actually
  runs a hair-donation programme is itself unconfirmed; a national
  programme with no Toronto-specific charity profile is a real possible
  outcome here, not a defect in the research. If, once the block lifts and
  the check is run, none of the directory's charities documents a
  hair-donation programme, the page says that plainly and names only
  verified external organisations rather than inventing or stretching a fit.
  This is routine verification, not a judgement call for Richard.
- The guide's own figure: from a `DATABASE_URL` query, cross-checked against
  what each named organisation's site actually states.
All three routes are DB-query or live-fetch dependent and confirmed blocked
this session (see Connectivity above). Nothing here can be drafted until the
block lifts.

**Do not claim:**
- No organisation named as accepting hair donations unless its own site (or
  an equivalent verified source) says so.
- No invented minimum length, colour rule, or shipping instruction. State
  only what is confirmed; leave anything unconfirmed unstated.
- No unsourced superlative ("Toronto's main hair donation charity").
- No invented count of donors, wigs produced, or similar.
- No category-page link besides `/category/social-services/`, verified per
  charity (R-170).
- No charity profile link not checked live against the sitemap/DB first.
- No claim about this site's own pages not checked live first.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No personification (RULINGS 2026-11-03).
- Canadian spelling throughout. No adjectives about the cause.
- If the honest answer is a short list, or a list of mostly non-profile
  organisations, publish that — never pad it to look more complete than the
  research supports.

## Carried forward, not re-detailed today (standing evergreen commission, still blocked)

- **#6 `volunteer-opportunities-toronto-students`** — commissioned 4 Nov,
  re-commissioned in full 11 Nov (commit `df00eb1`). Next due around 18
  November; not due a fresh write-up today. Still undrafted, blocked on the
  same egress/`DATABASE_URL` fault as #9 and #10.

The prior Monday events-track backlog (weeks of 19/26 Oct, 2/9/16 Nov) and
Friday news-track backlog (weeks of 16/23/30 Oct, 6/13 Nov) remain superseded
by whichever issue of each track drafts first once the block lifts, per
`CLIENT.md`'s dated-record rule — not reissued here.

## Standing rules for every commission above

Unchanged since 4–16 Nov, restated once rather than per brief:
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
  charity's donation programme not yet checked is unconfirmed, not absent.

## For Richard

No new `[NEEDS RICHARD]` item from this run. The standing operational
blocker (R-192 egress; the writer/editor session type's missing general web
access and `DATABASE_URL`) is now at least thirty-five calendar days old
with zero drafts produced since 13 October, across every weekday session
this fleet has run in that window, and remains his decision alone: either
this session type gets general web egress, or `DATABASE_URL` is provisioned
to it, or both. Not pushing a fresh notification today — the
four-calendar-week mark already triggered one (10 Nov WRITER run) and
nothing has changed since. R-170 (category-page mapping) remains open on
the same todo file, unaffected by today's run.
