# Commissions — 20 October 2026 (Tuesday)

Written by the editor, commissioning run. Tuesday is neither Monday nor
Friday, so today is one or two guides from the queue per `content-engine.md`.

**No new researcher run since 19 Oct.** `research/EVIDENCE.md` is still
yesterday's pull; nothing in it has changed overnight, so this run reads it
rather than re-deriving anything.

## What today commissions, and what it deliberately does not

`content/QUEUE.md` has exactly one `ready`-not-yet-commissioned cluster,
`donate-furniture-toronto` (#9), and two `ready`, already-commissioned,
still-undrafted clusters sitting behind the egress/credential fault below:
`volunteer-opportunities-toronto-students` (#6) and `donate-hair-toronto`
(#10), both commissioned 15 Oct.

**This run recommissions #6 and #10, and does not commission #9.** Two
reasons, not one:

1. `COMMISSIONS.md` replaces, it does not append — confirmed from git history
   (15 Oct's commissions for #6/#10 were overwritten by 16 Oct's Friday-track
   file, then 19 Oct's Monday-track file). The angle, questions, links and
   do-not-claim list the writer needs for #6 and #10 currently exist nowhere
   in the live repo, only in a five-day-old commit. That is a real gap, not a
   status note in QUEUE.md's table — a writer session reading this file today
   would find nothing to act on for either. Restoring them is this run's main
   job.
2. EVIDENCE.md is explicit: *"Do not treat this week's honest recommendation
   as 'write more guides.' The site's real constraint right now is pipeline,
   not content supply... Fixing R-187/R-192 is worth more this week than a
   new commission."* #9 would be new supply into a pipeline that has drafted
   nothing since 13 Oct; #6 and #10 are not new supply, they are restoring
   work already committed to. `donate-furniture-toronto` stays `ready` in
   QUEUE.md, untouched, for the first commissioning run after the pipeline is
   unblocked — EVIDENCE.md's own SERP caveat on it (parent_topic reads as a
   single strong incumbent, borderline WINNABLE not a guaranteed quick win)
   still holds and should be checked fresh whenever that run happens, not
   assumed from 19 Oct.

## Operational flags, carried forward, not re-litigated

`attribute-brain/todo/toronto-charities.md` R-187 (15 Oct) and R-192 (16 Oct)
asked whether writer-type sessions get general web egress at all; neither has
been answered. R-193 (18 Oct, updated 19 Oct) adds that `DATABASE_URL` is
also absent in at least one writer session, so the DB-query fallback the 19
Oct events commission proposed has no guaranteed path either. No fallback
exists for #6 or #10 the way there was for the events track: both need live
fetches to charity, outlet and ontario.ca pages, which a DB query cannot
substitute for. If the writer hits the same fault again, that is this same
open item surfacing a fourth and fifth time, not a new one — add one line to
R-192/R-193 rather than opening a fresh item, exactly as EDITLOG's 19 Oct
entry already asks.

## Standing rules for both commissions below

The five faults from CLIENT.md ("What the editors kept catching") apply
directly — every one of the four published guides broke one or more of them:
invented reader beliefs, unsourced superlatives, invented numbers/counts not
matching a facts row, an H2 restating its own FAQ question, and any claim
about this site's own pages (events, category) not checked live that session.

Two items added to the standing list since these were last commissioned 15
Oct, both binding on this run:

- **The bare-intensifier family now includes "actually"/"actual"** alongside
  "real"/"genuine(ly)" (RULINGS 2026-10-10, 2026-10-16, 2026-10-18) — delete
  as filler, never reword, unless the sentence draws an explicit contrast.
- **GRAMMAR.md's object-as-actor rule** (RULINGS 2026-10-18, `wiki/standards/
  GRAMMAR.md`, read before HOW_TO_WRITE): no verb that needs intention,
  judgement or perception attached to a thing that cannot do it — a page does
  not "solve" anything, a guide does not "notice," a requirement does not
  "decide." A document loading, a table listing, a figure rising are fine; a
  document meaning or deciding is not.

Both commissions link only `/category/social-services/` among category
pages — the one page CLIENT.md confirms is correctly mapped; every other
category page lists the wrong charities and stays banned until R-170 lands.
Canadian spelling throughout.

---

## Commission 1

**Slug:** `donate-hair-toronto`
**Working title:** Where to donate hair in Toronto
**Status:** Recommissioned — first commissioned 15 Oct, undrafted since,
blocked on the egress fault above, not an editorial issue.
**Cluster / intent tier:** donate hair toronto (90/mo, KD 1) — WINNABLE NOW,
long-tail, effectively no competing difficulty.

**Angle (one sentence):** A Toronto reader who has decided to cut and donate
their hair needs to know, before they book the appointment, which named
organisations actually make wigs from donated hair, what each requires
(minimum length, no colour/no grey, how it ships, whether a salon has to be
involved), and that this is a different, smaller list than general clothing
or donation charities.

**Reader:** Someone who has already decided to donate, mid-decision on
where, not someone being sold on the idea. They want the requirements, not
encouragement.

**Questions it must answer (3–6):**
1. Which Toronto-connected charities make wigs from donated hair, by name?
2. What minimum ponytail length and condition (colour, grey, perm) does each
   one actually require, per their own published guidelines?
3. Does the hair need to be cut by a stylist, or can the reader cut it
   themselves and mail it in?
4. Is there a cost to the reader (shipping, a salon fee) at any step?
5. What happens to hair that does not meet the requirements?
6. Is this the same as giving to a charity that *sells* hair/wigs for
   revenue (a different model — must not be conflated with donating hair for
   a wig made for someone who needs one)?

**Links it must earn:**
- Every named organisation's charity profile (`/profile/<slug>/`) where it
  has one in our database — check the slug resolves before linking; name
  without a link if it does not.
- `/category/social-services/`, only if a named charity is actually filed
  there — verify in the database, do not assume.
- The organisation's own site for its donation instructions (outbound,
  required per CLIENT.md).
- No link to `/charity-events-toronto/` unless the writer has read the live
  page that session and found an actual hair-donation drive listed on it —
  do not claim or imply one exists otherwise.

**Facts needed, and where they come from:**
- Starting candidate list, each to be verified independently before being
  named as a Toronto option, not asserted from this list: Angel Hair for
  Kids (Canadian), Chai Lifeline Canada, the Canadian Cancer Society's
  wig/Look Good Feel Better programme. Pantene Beautiful Lengths is a brand
  programme, not itself a charity — if used, name the charity it actually
  donates the hair to, never the brand.
- Each organisation's own current donation-requirements page is the only
  source for length/condition/shipping rules — no secondary source, no
  inference from "most wig charities require X."
- Cross-check every named organisation against our charities table for a CRA
  registration and a profile slug before treating it as "a Toronto
  charity"; where it has no CRA registration, say so plainly rather than
  implying registered-charity status.

**Do not claim (binding):**
- Do not state a minimum hair length without quoting the organisation's own
  current page — lengths vary by organisation and change.
- Do not claim any organisation "always" or "currently" needs donations —
  some pause intake; state only what the source says today, dated.
- Do not invent a reason people donate hair ("most people donate after
  chemotherapy affects someone they love") — no invented reader belief.
- Do not rank organisations ("the easiest," "the most popular") without a
  row that supports it.
- Do not claim a hair-donation drive appears on our events page unless
  checked live that session.
- Do not link any category page other than social-services.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler; no verb
  requiring intention or judgement given to an organisation's page, policy
  or requirement instead of the organisation itself.

---

## Commission 2

**Slug:** `volunteer-opportunities-toronto-students`
**Working title:** Volunteer opportunities for students in Toronto
**Status:** Recommissioned — first commissioned 15 Oct, undrafted since,
blocked on the egress fault above, not an editorial issue.
**Cluster / intent tier:** volunteer opportunities toronto for students
(200/mo, KD 8) — WINNABLE NOW.

**Cannibalisation guard:** `/guides/volunteer-toronto/` already exists and is
published (comprehensive, adult-oriented, includes the vulnerable-sector-check
process). This piece must NOT repeat that guide's ground. Its sole job is the
part specific to students: Ontario's mandatory 40 hours of community
involvement for the high school diploma (OSSD), what counts, what does not,
age minimums that exclude a vulnerable-sector check, and which Toronto
charities specifically take under-18 volunteers. Link to `/guides/
volunteer-toronto/` once, for a reader who turns out to be 18+ or wants the
general picture, and do not re-explain what that guide already covers.

**Angle (one sentence):** A Toronto high school student (or a parent) needs
to know which charities will actually let someone under 18 volunteer, how
the mandatory 40 community-involvement hours work under the Ontario diploma
requirement, and which roles need a parent's signature or have an age floor
that rules a student out.

**Reader:** A student (roughly 14–18) or a parent, searching close to a
deadline, who needs hours that count and an organisation that will take them
at their age — not a general volunteering article.

**Questions it must answer (3–6):**
1. What exactly is the Ontario 40-hour community involvement requirement,
   and from what grade can a student start logging hours?
2. What kinds of activities are excluded from counting, per ontario.ca?
3. Which named Toronto charities explicitly accept volunteers under 18, and
   at what minimum age?
4. Does a parent need to sign anything, and does the charity need proof of
   enrolment or a school's own form?
5. Which common adult volunteer roles (covered in `/guides/
   volunteer-toronto/`) are closed to a student because of the vulnerable
   sector check or an age floor?
6. Where can a student find a short, one-off role rather than an ongoing
   weekly commitment?

**Links it must earn:**
- `/guides/volunteer-toronto/` once, as the general resource for an 18+
  reader or anyone wanting the full picture (per the cannibalisation guard
  above — do not duplicate its content).
- Every named charity's `/profile/<slug>/`, slug-checked before linking.
- `/category/social-services/` only, same rule as Commission 1.
- ontario.ca's own community-involvement-requirement page (outbound,
  authority source, required).
- `/charity-events-toronto/` only if the writer has read the live page that
  session and found an actual one-off, under-18-eligible event listed.

**Facts needed, and where they come from:**
- The 40-hour requirement, eligible grades, and excluded-activity list:
  ontario.ca's own community involvement page. `research/facts/
  volunteer-toronto.md` already cites "ontario.ca graduation requirements" —
  re-check it is still current before reusing; do not assume a five-day-old
  fetch still holds.
- Minimum volunteering age per organisation: each charity's own volunteer
  page, not inferred from the adult guide. Candidates to verify independently
  (do not carry the adult guide's list over unexamined — several of its
  roles are specifically the ones closed to a student by the vulnerable
  sector check): Toronto Humane Society, Toronto Wildlife Centre, High Park
  Nature Centre, Daily Bread, FoodShare, Second Harvest's youth programmes
  if any.
- Whether each organisation requires parental consent or a school form: that
  organisation's own under-18 policy page, if published; if unpublished, say
  the reader should ask, not invent a policy.

**Do not claim (binding):**
- Do not restate the vulnerable-sector-check fee table from `/guides/
  volunteer-toronto/` — link to it instead.
- Do not claim a charity accepts under-18 volunteers unless its own page
  says so; absence of a stated age floor is not evidence it is open to
  minors.
- Do not invent a reason students look for these hours ("most students
  leave it to the last minute") — no invented reader belief.
- Do not claim the 40-hour count resets or changes year to year without a
  current ontario.ca citation dated in the piece.
- Do not rank charities by ease or popularity without a supporting row.
- Do not link any category page other than social-services.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler; no verb
  requiring intention or judgement given to a requirement, a page or a
  policy instead of the organisation or the ministry that states it.

---

## For Richard

Nothing new needs his input this run. The operational blocker (R-187/
R-192/R-193: writer-session egress and `DATABASE_URL` provisioning) is
already open and already his to decide; this run reconfirms it applies to
both recommissioned guides and routes nothing around it, because unlike the
events track there is no DB-query substitute for a live charity/outlet/
ontario.ca fetch. `donate-furniture-toronto` (#9) is deliberately held, not
commissioned — see "What today commissions" above — pending the pipeline
fix, not a question for him. No new `[NEEDS RICHARD]` item.
