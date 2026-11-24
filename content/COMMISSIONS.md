# Commissions — 24 November 2026 (Tuesday)

Written by the editor, commissioning run. Tuesday is not a fixed-track day
per `CLIENT.md` — Monday (events) and Friday (news) are the only fixed
days — so today's commission comes from `QUEUE.md`. Row #6 was last fully
re-detailed 18 November (commit `2d6fed4`); rows #9 and #10 were last fully
re-detailed 19 November (commit `22c1f70`). Monday (23 Nov) and Friday (20
Nov) both carried all three forward unchanged rather than re-detailing.
Row #6 is now the most due for a fresh full detail, so it is re-detailed
in full below; #9 and #10 carry forward unchanged, nothing on either has
moved since 19 November.

## Connectivity, checked this session

Independently re-verified rather than trusted from the 23 Nov entry:
`git fetch origin && git checkout -B main origin/main` (routine startup
rule) landed clean at `d69a20a`, working tree clean, nothing to commit.
`curl -sS -m 10 https://toronto-charities.ca/` and
`https://toronto-charities.ca/guides/` both returned `CONNECT tunnel
failed, response 403` (exit 56) — a destination-not-allowed refusal, not a
timeout or a non-200, the identical blanket block logged every weekday
session since 21 October (R-192). A presence check (no value printed) found
`DATABASE_URL`, `ANTHROPIC_API_KEY` and `RESEND_API_KEY` all absent from
the environment this session — so the events-table route to the same data
is equally closed, not only the live-fetch route. `ls content/drafts
content/approved content/images` — none of the three exist. `ls
research/facts/` still shows exactly the four rows behind the four
published guides, no row for #6, #9, #10, or for either weekly track.

Checked `attribute-brain/todo/toronto-charities.md` directly: R-192
(egress/`DATABASE_URL`) and R-170 (category mapping) both still open,
unchanged. Checked `attribute-brain/raw/` for anything dated after 19
November naming this site: nothing does — the 18–23 November files concern
a gym ad account, a Lucie Mé sale bar, Household Co, an AI valuation guide,
an inbox cleanup and an owner lookup, all unrelated clients. `RULINGS.md`'s
tail through 23 Nov (no-AI-credit rule, the sits/holds/carries ban
reinforced a third time the same day, scraped-email addresses used as
found with no verifier, a Copy button for paste blocks, GHL-tagged
prospect loads) does not change this site's brief, scoring method or
cannibalisation map; the sits/holds/carries ban was already folded into
this file's standing rules on 21 November and is restated below unchanged.

This is at least the forty-third calendar day with no draft produced
since 13 October, per `research/editlog/EDITLOG.md`'s unbroken run of
"NOTHING DRAFTED"/"NOTHING TO REVIEW" entries through the 23 November gate
run. A commission is a brief, not a draft, and does not itself need live
egress, so today's commission is written in full regardless; it cannot
clear its facts-needed section until the block lifts.

## Commission: Volunteer opportunities in Toronto for students

**Slug:** `volunteer-opportunities-toronto-students`
**Working title:** Volunteer opportunities in Toronto for students
**Cluster / intent tier:** `QUEUE.md` row #6, evergreen Track 3
(volunteering, by audience rather than by cause). Vol 200, KD 8, score 22 —
unchanged across every pull since 13 October. Commissioned 4 Nov,
re-commissioned in full 11 and 18 Nov; due again today.

**The angle, in one sentence:** every GTA charity that currently takes
student volunteers, with the age floor, typical time commitment and
sign-up step each one actually requires, so a student who needs hours
gets a finished, linkable list rather than the general pitch already on
`volunteer-toronto` (#1, published) — which this page must not duplicate
or compete with.

**Who it is for:** a Toronto high-school or university student (or a
parent signing up on their behalf) who needs volunteer hours and wants to
know which charities will actually take a student, under what conditions
— not a general essay on why volunteering matters.

**What it must answer:**
1. Which Toronto-area charities currently accept student volunteers?
2. What is the minimum age for each, and does a younger volunteer need a
   parent or guardian's consent?
3. What is the typical time commitment, and is remote or virtual
   volunteering available for any of them?
4. How does a student sign up — an online application, an in-person
   interview, a signed consent form?
5. Does the charity itself state that it can sign off on hours toward a
   school or institutional requirement — never asserted by this page
   unless the charity's own site says so (see Do not claim).
6. Which of these charities have a profile on this site?

**Links it must earn:**
- `/profile/<slug>/` for every charity named, checked against the
  sitemap/`DATABASE_URL` before linking. A charity whose slug does not
  resolve is named without a link, per `CLIENT.md`'s rule.
- The charity's own website, where it has one (outbound, required per
  `CLIENT.md`'s links table) — only after `website_status` confirms the
  address is live.
- `/category/social-services/` only where that specific charity is
  verified in that category; no other category page (R-170 still open).
- One figure drawn from this guide's own facts file, and a strip of the
  charities it names, per `CLIENT.md`'s Track 3 shape.

**Facts needed and where they come from:**
- Which charities accept student volunteers, the age floor, and the
  sign-up step for each: not in the CRA bulk-import data (name, address,
  CRA number, category) and cannot be written from the directory alone.
  Requires a live read of each named charity's own site, or an equivalent
  verified source, confirming the student-volunteer programme in its own
  words. Category B/C per `GUIDE_ARTICLE_SPEC.md` — verify before writing
  or omit.
- Whether a charity's programme counts toward any school or institutional
  volunteer-hour requirement: state only what that charity's own site
  says about signing off on hours; never assert or imply a specific
  requirement (hour count, eligible age range, institution) belongs to
  any outside body unless cited to that body's own page.
- The one figure the guide carries (e.g. a count of directory charities
  with a documented student-volunteer programme) comes from a
  `DATABASE_URL` query over charities with a live website, cross-checked
  against what each site actually states — not estimated.
- Every charity's slug: checked against the sitemap/DB, never assumed
  from the name.
All three routes are DB-query or live-fetch dependent and confirmed
blocked this session (see Connectivity above). Nothing here can be
drafted until the block lifts.

**Do not claim:**
- No charity named as accepting student volunteers unless its own site
  (or an equivalent verified source) says so — a category or label is
  itself a claim (RULINGS 2026-11-01), not something to infer from the
  CRA cause category or from "social services" generally.
- No invented age floor, consent requirement, time commitment or sign-up
  step. State only what is confirmed; leave anything unconfirmed unstated
  (RULINGS 2026-11-10).
- No assertion that any charity's hours count toward a specific school
  board's, school's, or province's volunteer-hour requirement unless that
  exact claim is sourced to the charity's own site or the requiring
  body's own page.
- No unsourced superlative ("the best charity for student volunteers in
  Toronto," "the easiest way to get hours") — `CLIENT.md` fault #2.
- No invented count of student volunteers served, hours logged, or
  similar — fault #3.
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
- Must not overlap or compete with `volunteer-toronto` (#1, published) —
  the cannibalisation map: this page is the student-specific list, not a
  second general volunteering pitch. If the honest list of charities with
  a documented student programme is short, publish that short list and
  say so — never pad it with a charity that has no stated student
  programme.

## Carried forward, not re-detailed today (standing evergreen commissions, still blocked)

- **#9 `donate-furniture-toronto`** — fully re-detailed 19 November
  (commit `22c1f70`), full brief there, unchanged since. `QUEUE.md`'s 23
  Nov re-rank independently confirms its question-phrased exact-match term
  holding difficulty 0 / volume 70 for a fourth consecutive pull, the
  strongest-confirmed WINNABLE NOW call on the board. If the writer's
  block lifts and only one of the three queued evergreen clusters can be
  drafted first, prioritise this one.
- **#10 `donate-hair-toronto`** — fully re-detailed 19 November (commit
  `22c1f70`), unchanged since.

The prior Monday events-track backlog (weeks of 19/26 Oct, 2/9/16/23 Nov)
and Friday news-track backlog (weeks of 16/23/30 Oct, 6/13/20 Nov) remain
superseded by whichever issue of each track drafts first once the block
lifts, per `CLIENT.md`'s dated-record rule — not reissued here.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked `research/editlog/EDITLOG.md`'s tail through the 23 November gate
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

Unchanged since 4–23 November, restated once rather than per brief:
- `CLIENT.md`'s five faults (invented reader beliefs, unsourced
  superlatives, invented numbers/comparisons, FAQ-restating H2s, unchecked
  claims about our own site) apply directly.
- Bare-intensifier family ("real"/"genuine(ly)"/"actually"/"actual")
  deleted as filler, never reworded, unless the sentence draws an
  explicit contrast.
- GRAMMAR.md's verb-on-object rule (RULINGS 2026-10-18, 2026-11-03,
  2026-11-21, reinforced a third time 21 Nov): nothing a page, event,
  charity or table "sits," "holds," "carries," "earns," "decides,"
  "wants," "shows" or "tells" — only a person earns, and rarely. Name the
  person, or use has/is/lists plainly.
- No adjectives about the cause. Canadian spelling throughout.
- Only `/category/social-services/` among category pages, verified for
  that specific charity, never guessed (R-170 still open).
- Every charity named gets its profile link, checked against the
  sitemap/DB before linking; unresolved slugs are named without a link.
- A category, label or taxonomy is a claim (RULINGS 2026-11-01): no
  eligibility stated without a source that actually defines it.
- A failed probe is "I could not reach it," never "it does not exist"
  (RULINGS 2026-11-16) — applies directly to today's commission: a
  charity's student-volunteer programme not yet checked is unconfirmed,
  not absent.
- No credit line naming the tooling, per RULINGS 2026-11-21: this is the
  agency's work, written in its own voice.

## For Richard

No new `[NEEDS RICHARD]` item on the content itself from this run.

**The operational blocker (R-192) reaches its six-calendar-week mark
today, with zero drafts produced in that entire window.** The egress/
`DATABASE_URL` gap was first logged 15 October; today, 24 November, is
exactly six weeks (42 calendar days) later, and this is at least the
forty-third calendar day of this specific stall with no writer run
producing a single draft — the Monday events track and Friday news track
have each missed six consecutive issues, and all three ready evergreen
clusters (#6, #9, #10) remain exactly where they were a month ago. The 23
Nov commission flagged this date as the next natural point to re-raise if
the block still stood; it still stands, unchanged since 21 October, so
this is that re-raise. The decision is unchanged too: either this session
type gets general web egress, or `DATABASE_URL` is provisioned to it, or
both. Nothing else in the fleet can close this from inside a session.
R-170 (category-page mapping) and R-335 (Neon monthly compute) remain
separately open on the same todo file, both unaffected by today's run.
