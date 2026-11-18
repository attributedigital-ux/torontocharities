# Commissions — 18 November 2026 (Wednesday)

Written by the editor, commissioning run. Wednesday is not a fixed-track day
per `CLIENT.md` — Monday (events) and Friday (news) are the only fixed days —
so today's commission comes from `QUEUE.md`. The 17 November commission put
row #6 next due "around 18 Nov"; it is due today, so it is re-detailed in
full below. Rows #9 and #10 were just re-commissioned in full yesterday (17
Nov, commit `d992e79`) and nothing has changed on either since, so both are
carried forward unchanged.

## Connectivity, checked this session

Independently re-verified rather than trusted from prior entries: `ls
content/drafts content/approved content/images` — none of the three exist.
`ls research/facts/` shows exactly the same four rows as the four published
guides (`soup-kitchen-volunteer-toronto`, `volunteer-toronto`,
`where-to-donate-books-toronto`, `where-to-donate-clothes-toronto`) — no row
for #6, #9 or #10. `curl -m 10 https://toronto-charities.ca/` returned exit
56, "CONNECT tunnel failed, response 403"; the agent-proxy status endpoint
confirms `connect_rejected` ("gateway answered 403 to CONNECT," policy still
non-selective), the identical fault logged every weekday session since 21
Oct. A combined env check for `DATABASE_URL`/`ANTHROPIC_API_KEY` alongside
that curl was declined outright by this session's own tool-permission
layer, the same pattern the 17 November entry logged — not treated as new
information either way, since the structural evidence (no drafts, no
approved files, no new facts rows, git status clean, last commit the 17 Nov
gate run) already confirms the block independently of that one check.
`research/editlog/EDITLOG.md`'s unbroken run of "NOTHING DRAFTED"/"NOTHING
TO GATE" entries from 13 October through 17 November, cross-checked against
`research/EVIDENCE.md`'s 9 November pack and `QUEUE.md`'s 16 November
re-rank, all agree: this is at least the thirty-sixth calendar day with no
draft produced since 13 October. A commission is a brief, not a draft, and
does not itself need live egress, so the commission below is written in
full regardless, but it cannot clear its facts-needed section until the
block (R-192 egress / missing `DATABASE_URL`) lifts.
`attribute-brain/todo/toronto-charities.md` confirms R-192 and R-170
(category mapping) both still open.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked `research/editlog/EDITLOG.md`'s tail (through the 17 November gate
run). Every entry since 2 November is a WRITER/DESIGNER/GATE run finding
nothing to review, because nothing has drafted since 13 October — there is
no new prose fault to add. The standing lessons remain the five faults in
`CLIENT.md`, the category-link restriction (R-170), and the general-ledger
rules folded into "Standing rules" below. Checked `RULINGS.md` for anything
dated since 16 November: the two newest entries (17 Nov, a client-site
credit-line wording for a different client; 16 Nov, an inbox-filing rule)
change nothing about this site's brief, scoring method or cannibalisation
map.

## Commission: Volunteer opportunities in Toronto for students

**Slug:** `volunteer-opportunities-toronto-students`
**Cluster / intent tier:** `QUEUE.md` row #6, evergreen Track 3
(volunteering, by audience rather than by cause). Vol 200, KD 8, score 22 —
unchanged across every pull since 13 October. Commissioned 4 Nov,
re-commissioned in full 11 Nov; due again today.

**The angle, in one sentence:** every GTA charity that currently takes
student volunteers, with the age floor, typical time commitment and sign-up
step each one actually requires, so a student who needs hours gets a
finished, linkable list rather than the general pitch already on
`volunteer-toronto` (#1, published) — which this page must not duplicate or
compete with.

**Who it is for:** a Toronto high-school or university student (or a
parent signing up on their behalf) who needs volunteer hours and wants to
know which charities will actually take a student, under what conditions —
not a general essay on why volunteering matters.

**What it must answer:**
1. Which Toronto-area charities currently accept student volunteers?
2. What is the minimum age for each, and does a younger volunteer need a
   parent or guardian's consent?
3. What is the typical time commitment, and is remote or virtual
   volunteering available for any of them?
4. How does a student sign up — an online application, an in-person
   interview, a signed consent form?
5. Does the charity itself state that it can sign off on hours toward a
   school or institutional requirement — never asserted by this page unless
   the charity's own site says so (see Do not claim).
6. Which of these charities have a profile on this site?

**Links it must earn:**
- `/profile/<slug>/` for every charity named, checked against the
  sitemap/`DATABASE_URL` before linking. A charity whose slug does not
  resolve is named without a link, per `CLIENT.md`'s rule.
- The charity's own website, where it has one (outbound, required per
  `CLIENT.md`'s links table) — only after `website_status` confirms the
  address is live.
- `/category/social-services/` only where that specific charity is verified
  in that category; no other category page (R-170 still open).
- One figure drawn from this guide's own facts file, and a strip of the
  charities it names, per `CLIENT.md`'s Track 3 shape.

**Facts needed and where they come from:**
- Which charities accept student volunteers, the age floor, and the sign-up
  step for each: not in the CRA bulk-import data (name, address, CRA
  number, category) and cannot be written from the directory alone. It
  requires a live read of each named charity's own site, or an equivalent
  verified source, confirming the student-volunteer programme in its own
  words. Category B/C per `GUIDE_ARTICLE_SPEC.md` — verify before writing
  or omit.
- Whether a charity's programme counts toward any school or institutional
  volunteer-hour requirement: state only what that charity's own site says
  about signing off on hours; never assert or imply a specific requirement
  (hour count, eligible age range, institution) belongs to any outside body
  unless cited to that body's own page — this page is about which charities
  take students, not a guide to any school system's rules.
- The one figure the guide carries (e.g. a count of directory charities
  with a documented student-volunteer programme) comes from a
  `DATABASE_URL` query over charities with a live website, cross-checked
  against what each site actually states — not estimated.
- Every charity's slug: checked against the sitemap/DB, never assumed from
  the name.
All three routes are DB-query or live-fetch dependent and confirmed
blocked this session (see Connectivity above). Nothing here can be drafted
until the block lifts.

**Do not claim:**
- No charity named as accepting student volunteers unless its own site (or
  an equivalent verified source) says so — a category or label is itself a
  claim (RULINGS 2026-11-01), not something to infer from the CRA cause
  category or from "social services" generally.
- No invented age floor, consent requirement, time commitment or sign-up
  step. State only what is confirmed; leave anything unconfirmed unstated
  (RULINGS 2026-11-10).
- No assertion that any charity's hours count toward a specific school
  board's, school's, or province's volunteer-hour requirement unless that
  exact claim is sourced to the charity's own site or the requiring body's
  own page — never stated as a general fact about "Ontario students" or
  "high school" without that source, and never as something this page
  assumes the reader already knows.
- No unsourced superlative ("the best charity for student volunteers in
  Toronto," "the easiest way to get hours") — `CLIENT.md` fault #2.
- No invented count of student volunteers served, hours logged, or similar
  — fault #3.
- No category-page link besides `/category/social-services/`, and only
  once verified for the specific charity named (R-170).
- No charity profile link not checked live against the sitemap/DB first;
  an unresolved slug is named, never linked to a guess.
- No claim about this site's own pages not checked live first — fault #5.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No personification: nothing a page or charity "carries," "holds," or
  "shows" in the sense of deciding what to include (RULINGS 2026-11-03).
- Canadian spelling throughout. No adjectives about the cause.
- Must not overlap or compete with `volunteer-toronto` (#1, published) —
  the cannibalisation map: this page is the student-specific list, not a
  second general volunteering pitch. If the honest list of charities with a
  documented student programme is short, publish that short list and say so
  — never pad it with a charity that has no stated student programme.

## Carried forward, not re-detailed today (standing evergreen commissions, still blocked)

- **#9 `donate-furniture-toronto`** and **#10 `donate-hair-toronto`** —
  both re-commissioned in full 17 November (commit `d992e79`), full detail
  there. Nothing has changed on either since: still undrafted, blocked on
  the same egress/`DATABASE_URL` fault as #6 above. Not re-detailed today
  to avoid restating the same brief twice in two days.

The prior Monday events-track backlog (weeks of 19/26 Oct, 2/9/16 Nov) and
Friday news-track backlog (weeks of 16/23/30 Oct, 6/13 Nov) remain
superseded by whichever issue of each track drafts first once the block
lifts, per `CLIENT.md`'s dated-record rule — not reissued here.

## Standing rules for every commission above

Unchanged since 4–17 Nov, restated once rather than per brief:
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
  (RULINGS 2026-11-16) — applies directly to today's commission: a
  charity's student-volunteer programme not yet checked is unconfirmed, not
  absent.

## For Richard

No new `[NEEDS RICHARD]` item from this run. The standing operational
blocker (R-192 egress; the writer/editor session type's missing general web
access and `DATABASE_URL`) is now at least thirty-six calendar days old
with zero drafts produced since 13 October, across every weekday session
this fleet has run in that window, and remains his decision alone: either
this session type gets general web egress, or `DATABASE_URL` is
provisioned to it, or both. Not pushing a fresh notification today — the
four-calendar-week mark already triggered one (10 Nov WRITER run) and
nothing has changed since. R-170 (category-page mapping) remains open on
the same todo file, unaffected by today's run.
