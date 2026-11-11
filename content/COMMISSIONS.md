# Commissions — 11 November 2026 (Wednesday)

Written by the editor, commissioning run. Wednesday is not a fixed-track day
(`CLIENT.md`: Monday is events, Friday is news) — per the standing
instruction, an "other day" commissions one or two guides from
`content/QUEUE.md`.

## Connectivity, checked this session

`curl -m 10` to `https://toronto-charities.ca/guides/` and
`https://www.cbc.ca/` both returned `HTTP 000` — a connection-level failure
(`CONNECT tunnel failed, response 403`), not a non-200. The proxy status
endpoint (`$HTTPS_PROXY/__agentproxy/status`, checked directly this session,
timestamp 2026-11-11T11:31:45Z) logs the identical `connect_rejected`/
"gateway answered 403 to CONNECT" shape against a wide, unrelated spread of
hosts in the same window (mcp.klaviyo.com, mcp.zapier.com, mcp.linear.app,
mcp.slack.com, mcp.intercom.com and others), policy `"selective": false` —
the same blanket block logged every session since 21 Oct. Presence-only
check: `DATABASE_URL`, `ANTHROPIC_API_KEY`, `RESEND_API_KEY`,
`CF_ACCOUNT_ID`, `CF_API_TOKEN` all absent. Cross-checked
`attribute-brain/todo/toronto-charities.md` directly rather than trusting
yesterday's note: R-192 (general web egress for this session type, opened
16 Oct) and R-170 (category-page mapping, opened 13 Oct) are both still open,
word for word the same entries as 10 November. `research/editlog/
EDITLOG.md`'s 10 November GATE entry puts the fault at "at least the
thirtieth" consecutive weekday session with zero drafts since 13 October —
29 calendar days as of today. Checked `attribute-brain/raw/` for anything
dated 7–11 November naming this site: nothing does (the week's dictated
sessions concern Collingwood, FreshBooks, Quill's build, a 21-day ad sweep
and the Cassar build — none of them this site). A commission is a brief, not
a draft, and is written below in full regardless, but no commission below
can clear its facts-needed section until the block lifts.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked the tail through 10 November: every one of the last ten entries is a
WRITER/DESIGNER/GATE run finding nothing to review or nothing to draft,
because nothing has drafted since 13 October. There is no new prose fault to
add this run. The five standing faults, the category-link restriction and the
bare-intensifier/personification bans are in `CLIENT.md` and `RULINGS.md` and
restated in full below rather than re-derived, since the writer has not had a
chance to act on them since they were written.

## Commission: Volunteer opportunities in Toronto for students

**Slug:** `volunteer-opportunities-toronto-students`
**Cluster / intent tier:** `QUEUE.md` #6 (volunteer opportunities toronto for
students, 200/mo, KD 8, score 22). Evergreen, first commissioned 15 Oct,
recommissioned 20 Oct, carried forward without full re-detail on 10 Nov while
that run's two picks (#9, #10) got the full write-up — re-commissioned in
full today as this run's pick from the queue, since it is the highest-scoring
undrafted cluster that has not had a fresh brief in three weeks.

**The angle, in one sentence:** which Toronto charities offer volunteer roles
that count toward Ontario's mandatory 40 hours of community involvement for
the OSSD, what each role actually involves, the minimum age and supervision
each charity requires, and how the student gets the hours signed off —
because the charity does the volunteering, but the school's own form is what
actually certifies the hours, and a guide that blurs that line misleads the
one reader group it is written for.

**Who it is for:** an Ontario secondary student in Toronto (or a parent
helping them) looking for a volunteer placement that will count toward
graduation, usually under real time pressure near a school deadline.

**What it must answer:**
1. What Ontario's community-involvement requirement actually is: 40 hours,
   completed any time between the summer before grade 9 and graduation, with
   the activities list and the sign-off process set by the Ministry of
   Education and administered by the student's own school — stated from
   ontario.ca directly, not from memory of how the rule is generally
   described.
2. Which Toronto charities have a volunteer programme that explicitly
   welcomes students doing community-involvement hours, by name.
3. What each role actually is, and the minimum age or grade each charity
   states for it.
4. Whether a parent/guardian signature or school form is part of that
   charity's own intake process, and whether the charity signs the student's
   official community-involvement form itself or simply confirms hours by
   letter — these are different processes and the guide states which one
   each charity uses, never assumed.
5. Whether a one-off shift or an ongoing commitment is on offer, since a
   deadline-driven reader needs to know which roles can produce hours
   quickly.
6. Which of these charities has a profile on this site, so the reader can
   read more before applying.

**Links every organisation must carry:**
- Its own volunteer or youth-volunteer page (the outbound source the claim
  comes from).
- `ontario.ca`'s own community-involvement-requirement page, as the
  authority for the 40-hour rule itself — never restated as fact without
  this link.
- Its profile `/profile/<slug>/` on this site, checked against the sitemap or
  `DATABASE_URL` before linking. An organisation not found in the charities
  table is named without a link, never linked to a guessed URL — `CLIENT.md`'s
  rule.
- `/category/social-services/` once, if and only if it is the category at
  least one named organisation actually sits in, verified live first — no
  other category page may be linked at all (R-170 still open).

**Facts needed and where they come from:**
- Ontario's community-involvement requirement in full: total hours, the
  eligibility window, the categories of ineligible activity (paid work, a
  requirement of a course, time that is also a punishment), and how a
  school's own form moves through the process — read in full from ontario.ca's
  own graduation-requirements page, not summarised from general knowledge of
  "volunteer hours for high school."
- The identity of Toronto charities with a stated student or youth volunteer
  programme — found by live search, then read in full on each charity's own
  volunteer page, not assumed from name recognition. `research/facts/
  volunteer-toronto.md` (the published sibling guide's own facts file)
  already has sixteen Toronto volunteer-charity sources re-fetched 13 Oct;
  check it first for any that already cover student eligibility before
  re-fetching from scratch.
- Each charity's minimum age, supervision requirement, and sign-off process
  for community-involvement hours specifically — quoted or closely
  paraphrased from that charity's own page, with the URL and fetch date
  recorded as a numbered row in `research/facts/
  volunteer-opportunities-toronto-students.md`, same format as the four
  published guides' facts files.
- A live slug check against the sitemap or `DATABASE_URL` for every named
  charity, to confirm whether it has a profile on this site.
All four routes are live-fetch or DB-query dependent and are confirmed
blocked this session (see Connectivity above). Nothing here may be drafted
from memory or general knowledge of the OSSD requirement or of these
charities until the block lifts — a claim without a facts row does not ship.

**Do not claim:**
- No detail of Ontario's 40-hour requirement from memory; the figure, the
  eligibility window and the ineligible-activity list all come from
  ontario.ca itself, fetched this cycle, with a facts row. This is the
  single most consequential figure on the page — a wrong number here sends
  a student toward missing their own graduation requirement, not just a
  wrong fact about a charity.
- No claim that any charity "signs the 40 hours" or "certifies the
  requirement" — only the student's own school certifies the requirement;
  a charity at most confirms the hours it supervised. State this
  distinction plainly rather than letting the two blur, the same "convention
  written as if it were law" failure `content-editor.md` already names for
  this site.
- No organisation's intake rules, minimum age, or sign-off process from
  memory or general familiarity; every term comes from that organisation's
  own page, fetched this cycle, with a facts row.
- No organisation named without a live slug check; an unresolved slug is
  named, never linked to a guess.
- No unsourced superlative ("the easiest hours to get in Toronto," "the most
  popular student programme") — `CLIENT.md` fault #2.
- No invented number (how long an application takes to process, how many
  students a programme accepts per term) — `CLIENT.md` fault #3.
- No invented belief about the reader ("Most students leave this to the last
  minute") — `CLIENT.md` fault #1.
- No claim that every Toronto school board follows an identical process;
  if ontario.ca's page and a board's own page disagree on a procedural
  detail (how the form is submitted, who signs it), state what each source
  says and date it, rather than flattening the two into one rule.
- No category-page link except `/category/social-services/`, and only once
  verified for the specific organisation named near it.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No personification: nothing a page or organisation "carries," "holds," or
  "shows" in the sense of deciding what to include (RULINGS 2026-11-03).
- Canadian spelling throughout (programme, organisation, not program,
  organization — this file's own spelling).

**[NEEDS RICHARD]:** none new. The standing blocker (R-192 egress /
`DATABASE_URL`) already covers why this cannot be drafted; it is not a
per-piece question, per `content-editor.md`'s rule against one `@richard`
item per piece.

## Carried forward, not re-detailed today

`QUEUE.md` #9 `donate-furniture-toronto` and #10 `donate-hair-toronto` were
each commissioned in full yesterday (10 Nov) and remain unchanged: no new
Ahrefs pull, no new SERP check, and the egress/`DATABASE_URL` block that
stopped the writer on both is identical to today's. Re-typing either brief
verbatim would be ceremony, not a new commission — full detail for both is in
`COMMISSIONS.md`'s 10 November version (commit `16ab7f9`) and stands as this
run's commission for them too. The Monday events-track and Friday news-track
backlogs (every week since 19 Oct for events, 16 Oct for news) remain
superseded by whichever issue of each track drafts first once the block
lifts, per `CLIENT.md`'s dated-record rule — not reissued here.

## Standing rules for every commission above

Unchanged since 4–10 Nov, restated once rather than per brief:
- `CLIENT.md`'s five faults (invented reader beliefs, unsourced
  superlatives, invented numbers/comparisons, FAQ-restating H2s, unchecked
  claims about our own site) apply directly.
- Bare-intensifier family ("real"/"genuine(ly)"/"actually"/"actual")
  deleted as filler, never reworded, unless the sentence draws an explicit
  contrast.
- `GRAMMAR.md`'s object-as-actor rule (RULINGS 2026-10-18, 2026-11-03): no
  page "says" in the sense of deciding, no table "shows" beyond its plain
  contents — name the person, or use has/is in/shows plainly.
- No adjectives about the cause. Canadian spelling throughout.
- Only `/category/social-services/` among category pages, verified for that
  specific organisation, never guessed (R-170 still open).
- Every organisation named gets its profile link if it has one, checked
  against the sitemap/`DATABASE_URL` before linking; unresolved or
  unlisted organisations are named without a link.
- A category, label or taxonomy is a claim (RULINGS 2026-11-01): no
  eligibility stated without a source that actually defines it.

## For Richard

No new `[NEEDS RICHARD]` item from this run. The standing operational
blocker (R-192 egress; this session type's missing general web access and
`DATABASE_URL`) is now 29 calendar days old with zero drafts produced since
13 October, across every weekday session this fleet has run in that window,
and remains his decision alone: either this session type gets general web
egress, or `DATABASE_URL` is provisioned to it, or both. R-170
(category-page mapping) remains open on the same todo file, unaffected by
today's run.
