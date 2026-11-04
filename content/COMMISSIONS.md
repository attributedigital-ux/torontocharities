# Commissions — 4 November 2026 (Wednesday)

Written by the editor, commissioning run. Wednesday is not a fixed-track day
(Monday = events, Friday = news), so today commissions from `QUEUE.md` per
`CLIENT.md`/`content-engine.md`.

## Connectivity, checked this session

`curl -m 10` to `https://toronto-charities.ca/charity-events-toronto/`
returned `000`/exit 56 (connection never completed, not a non-200). The
proxy status endpoint logs the identical `connect_rejected`/"gateway
answered 403 to CONNECT" shape against a wide, unrelated spread of hosts in
the same window (mcp.notion.com, mcp.asana.com, mcp.intercom.com,
mcp.docusign.com, mcp.linear.app, mcp-server.egnyte.com, mcp.box.com,
mcp.apollo.io, mcp.hubspot.com, mcp.zapier.com, mcp.amplitude.com), policy
`"selective": false` — the same blanket block logged every session since
21 Oct. `DATABASE_URL`, `ANTHROPIC_API_KEY`, `RESEND_API_KEY`,
`CF_ACCOUNT_ID` and `CF_API_TOKEN` are all confirmed absent (presence-only
check, no value materialized). This is now the **seventeenth** consecutive
weekday session across the fleet's three roles to hit this fault (15, 16,
19, 20, 21, 22, 23, 26, 27, 28, 29, 30 Oct, 2 Nov, three sessions on 3 Nov
alone, now this one) — twenty-two calendar days, no writer run producing a
draft since 13 October. Not re-escalating as a new item:
`attribute-brain/todo/toronto-charities.md` R-192 (egress) and R-193
(`DATABASE_URL`/Neon quota) already carry this; R-213 and R-170 are also
unchanged, both confirmed still open directly in that file this session.
All four remain Richard's decisions.

This block is the writer's problem, not the editor's — a commission is a
brief, not a draft, and does not itself need live egress. It does mean no
commission below can clear its facts-needed section until the block lifts,
exactly as every commission since 13 October has not.

## Researcher pull since the last commissioning run

No new pull since 2 Nov (`research/EVIDENCE.md`, `content/QUEUE.md`
unchanged). Three evergreen clusters are ready and held: #6
(`volunteer-opportunities-toronto-students`), #9
(`donate-furniture-toronto`), #10 (`donate-hair-toronto`). #9 and #10 were
commissioned in full 3 Nov and remain open, unexecuted commissions — see
"Carried forward" below rather than re-detailed here. #6 was promised the
next non-Monday/Friday slot in 3 Nov's commissioning note; commissioning it
below fills that slot under today's one-or-two-guides rule.

## Standing rules for the commission below

The five faults from `CLIENT.md` ("What the editors kept catching") apply
directly: invented reader beliefs, unsourced superlatives, invented
numbers/comparisons not matching a facts row, headings that restate the
FAQ question below them, and any claim about this site's own pages not
checked live this session.

- The bare-intensifier family — "real"/"genuine(ly)"/"actually"/"actual" —
  deleted as filler, never reworded, unless the sentence draws an explicit
  contrast (RULINGS 2026-10-10, 2026-10-16, 2026-10-18).
- GRAMMAR.md's object-as-actor rule (RULINGS 2026-10-18, restated
  2026-11-03): no verb needing intention, judgement or perception attached
  to a thing that cannot do it — a page does not say, a search does not
  want, a table does not show in the sense of deciding what to include.
- No adjectives about the cause ("heartwarming", "vital", "inspiring") —
  CLIENT.md's voice: a local reporter, not an endorser.
- Only `/category/social-services/` among category pages, and only where
  the named charity's category is verified correct this session — never
  guessed from the charity's name or cause (R-170 still open).
- Canadian spelling throughout.
- Every charity named gets its profile `/profile/<slug>/` link, checked
  against the sitemap/DB before linking (CLIENT.md). A charity that cannot
  be resolved is named without a link, never linked to a guessed slug.
- A category, a label or a taxonomy in the piece is a claim (RULINGS
  2026-11-01): if no source defines a charity's eligibility for student
  volunteers specifically, that eligibility is not asserted.

## Commission: volunteer-opportunities-toronto-students

**Slug:** `volunteer-opportunities-toronto-students`
**Working title:** Volunteer opportunities in Toronto for students
**Cluster / intent tier:** QUEUE.md #6, "volunteer opportunities toronto for
students" (vol 200, KD 8, Score 22). Recommissioned 20 Oct, held since;
evergreen guide, transactional — a student (most often completing Ontario's
mandatory high-school community-involvement hours, some at the post-
secondary stage building a resume) deciding where to volunteer and how to
get started as a minor or first-time volunteer.

**Why this is a distinct piece, not a duplicate of the published
`volunteer-toronto` guide (#1):** that guide answers "where do I volunteer
in Toronto" generally. This one answers the question specific to a student
reader: which organisations commonly take on student or first-time
volunteers, what a minor needs (parental consent, a minimum age), whether
the hours count toward the Ontario 40-hour graduation requirement, and how
the application and screening process differs from an adult walking in
cold. A page that just re-lists #1's charities with "for students" in the
title would compete with #1, not add to it — the angle has to be the
process, not a second list of the same organisations.

**Questions it must answer:**
1. Which Toronto-area charities commonly accept student volunteers
   specifically (stated on the charity's own current page, not inferred
   from cause or category)?
2. What does a minor need to apply — a minimum age, a parent/guardian
   consent form, a parent attending with them — and does this vary by
   organisation?
3. Does the charity's volunteering count toward Ontario's mandatory 40
   hours of community involvement for a high school diploma, and if so,
   does the charity sign the province's own form, or does the student
   need to arrange that separately?
4. What is the typical screening or onboarding step (an orientation
   session, a police records check for some roles, an interview) and how
   long does it take before a student can start?
5. What is a realistic time commitment — a single shift, a weekly slot, a
   school-term placement — and does it fit around a school schedule?

**Links it must earn:**
- `/profile/<slug>/` for every charity named, checked against the sitemap
  first.
- The charity's own website, specifically its volunteer-application or
  youth-volunteer page where one exists.
- Ontario's own community-involvement-hours page (ontario.ca) as the
  outbound authority for the 40-hour requirement — required if that
  requirement is mentioned at all, per the outbound-links rule in
  CLIENT.md (a real publication links its sources).
- `/category/social-services/` only where that specific charity's category
  is verified correct this session — optional, not required.

**Facts needed, and where from:**
- Which charities accept student volunteers, their minor-consent rules,
  screening steps and typical time commitment: each charity's own current
  website, fetched live this session. Nothing here comes from training
  data or a prior draft — none exists.
- Whether and how a charity's hours count toward the Ontario 40-hour
  requirement, and the mechanics of the province's own form: ontario.ca's
  own current page, fetched live this session — never stated from memory,
  since the mechanics of the form are exactly the kind of "convention
  written as if it were law" the facts audit flags.
- Each charity's profile slug: the sitemap/DB, live, not guessed from the
  org name.
- Nothing else; no Ahrefs or GSC dependency beyond what EVIDENCE.md already
  resolved.

**Do not claim (binding):**
- Do not state that any charity's hours automatically count toward the
  Ontario 40-hour requirement without the charity's own page or ontario.ca
  confirming it — several organisations require the student to bring the
  province's own form rather than issuing one themselves, and conflating
  "they'll take a student volunteer" with "they'll sign your hours" is a
  factual claim about a process, not a convenience.
- No minimum age, consent requirement, or screening step not sourced from
  that charity's own current page, fetched live this session.
- No unsourced superlative ("the most popular with students", "the easiest
  to get started at") about any charity in this space.
- No charity named as taking student volunteers unless its own page says so
  this session — never carried over from memory or assumed from its cause.
- No category link besides `/category/social-services/`, and only where
  verified for that specific charity.
- No adjective about the cause; no bare "real"/"genuine(ly)"/"actually"/
  "actual" filler; no "where" pivots; no object-as-actor construction.
- Canadian spelling throughout.

## Carried forward, not re-detailed today

- **#9 `donate-furniture-toronto`** and **#10 `donate-hair-toronto`** —
  both commissioned in full 3 Nov (see that date's `COMMISSIONS.md` in git
  history), both still blocked and unexecuted. No change to either brief;
  standing until a writer session clears the block. Not re-typed here per
  content-engine.md's "do not duplicate reading" cost discipline — the
  full commission text is unchanged and already committed.
- The two fixed-track backlogs (events weeks of 19/26 Oct, 2 Nov; news
  weeks of 16/23/30 Oct) remain superseded by whichever issue of each
  track drafts first once the block lifts — not reissued here, per
  CLIENT.md's dated-record rule.

## For Richard

No new `[NEEDS RICHARD]` item from this run — nothing in today's commission
needs a judgement call only Richard can make; it is a mechanical
research-and-link piece, same as #9/#10, once egress is restored. The
standing operational blocker (R-192 egress, R-193 `DATABASE_URL`/Neon
quota) is twenty-two calendar days old across seventeen consecutive weekday
sessions with zero drafts produced since 13 October — carried forward
above, not re-filed as a new item. R-170 (category-page mapping) and R-213
(Neon backup-skip recurrence) remain open on the same todo file, unaffected
by today's run.
