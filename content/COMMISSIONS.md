# Commissions — 27 November 2026 (Friday)

Written by the editor, commissioning run. Friday is a fixed-track day per
`CLIENT.md`: "Toronto charity news this week" is due today (Track 2).
Monday (events) is the other fixed day; the queue rotation (#6, #9, #10)
is carried forward unchanged below, not re-detailed, since nothing on any
of the three has changed since 25-26 November.

## Connectivity, checked this session

Independently re-verified rather than trusted from yesterday's entry:
`git fetch origin && git checkout -B main origin/main` (routine startup
rule) landed clean at `113fcdd` (26 Nov gate run), working tree clean,
nothing to commit. `curl -sS -m 10 https://toronto-charities.ca/` and
`/charity-events-toronto/` both returned `CONNECT tunnel failed, response
403` (exit 56) — a destination-not-allowed refusal, not a timeout or a
non-200, the identical blanket block logged every weekday session since 21
October (R-192); `/root/.ccr/README.md`'s own "403/407 from the proxy"
section confirms this is a policy denial on the destination host, not
something to retry or route around. A presence check (no value printed)
found `DATABASE_URL`, `ANTHROPIC_API_KEY` and `RESEND_API_KEY` all absent
from this session's environment — the events-table/DB route is equally
closed, not only the live-fetch route. `ls content/drafts content/approved
content/images` — none of the three exist. `ls research/facts/` still
shows exactly the four rows behind the four published guides, no row for
#6, #9, #10, or for today's news issue.

Checked `attribute-brain/todo/toronto-charities.md` directly: R-192
(egress/`DATABASE_URL`) and R-170 (category mapping) both still open,
unchanged; R-335 (Neon monthly compute, added 19 Nov) remains a separate,
already-open account-level item this run does not touch. Checked
`attribute-brain/raw/` for anything dated after 26 November naming this
site: nothing does — the newest files (24-26 Nov) are Collingwood,
Therapy Oslo, Anchor Point and Lucie Mé, all unrelated clients.
`attribute-brain/RULINGS.md`'s tail is unchanged since 25 November (the
Therapy Oslo client-editor ruling and the Collingwood provenance-sweep
ruling, both already checked by yesterday's run) — nothing in it bears on
this site's brief, scoring method or cannibalisation map. `research/
EVIDENCE.md` is unchanged since the 9 November pull (last touched by
commit `171f1e9`); `content/QUEUE.md`'s own 23 November re-rank is the
fresher of the two and already reflected in the carry-forward note below.

This is at least the forty-seventh calendar day with no draft produced
since 13 October, per `research/editlog/EDITLOG.md`'s unbroken run of
"NOTHING DRAFTED"/"NOTHING TO REVIEW" entries through yesterday's (26
November) gate run. A commission is a brief, not a draft, and does not
itself need live egress, so today's fixed-track commission is written in
full below regardless; it cannot clear its facts-needed section until the
block lifts.

## Commission: Toronto charity news, 27 November 2026

**Slug:** `toronto-charity-news-2026-11-27`
**Cluster / intent tier:** Fixed weekly Track 2 (`CLIENT.md`). Published
Friday; a dated record, not an evergreen page — it supersedes no earlier
issue and is itself superseded by next Friday's. Per `CLIENT.md`'s
dated-record rule, the backlog of unpublished Friday issues since the
block began (weeks of 16/23/30 October, 6/13/20 November) is not
reissued; whichever issue drafts first once the block lifts is the live
one.

**The angle, in one sentence:** what actually happened this week at a GTA
charity, nonprofit, food bank, fundraiser or foundation, each item a fact
with a named outlet behind it, five to twelve items, no commentary between
them.

**Who it is for:** someone in Toronto — a donor, a charity's own staff
checking whether their organisation got covered, a reporter or researcher
scanning the week — who wants a dated list of what happened, not an essay
about the sector.

**What it must answer:**
1. What concrete thing happened this week — an announcement, a funding
   award, a closure, a leadership change, a campaign result, a controversy
   — at a specific GTA charity, nonprofit, food bank, fundraiser or
   foundation?
2. Which outlet reported it, and on what date, so the item can carry a
   working outbound link to the actual story (Toronto Star, CBC Toronto,
   CP24, Globe and Mail, BlogTO, Toronto Life, The Philanthropist, Future
   of Good, CharityVillage, or Google News RSS for the named search terms
   per `CLIENT.md`)?
3. Is the charity named one with a profile on this site, and does its slug
   resolve against the sitemap/`DATABASE_URL` before it is linked?
4. Is this genuinely new this week, not a story this issue or an earlier
   week's issue already carried?
5. Does the item belong here at all, or is it actually an event listing
   (which goes to the events source list for the Monday track and never
   into this issue, per `CLIENT.md`)?

**Links it must earn:**
- The reporting outlet, on every item, no exceptions — `CLIENT.md`'s
  outbound-link rule is not optional here.
- `/profile/<slug>/` for the charity named in every item, checked against
  the sitemap/`DATABASE_URL` first; a charity whose slug does not resolve
  is named without a link.
- `/category/social-services/` only where the specific charity named is
  verified in that category; no other category page (R-170 still open).
- No sister-site link unless an item is genuinely tied to a
  torontoproperty.ca neighbourhood (`CLIENT.md`'s sister-sites row) — do
  not force one in.

**Facts needed and where they come from:**
- Every item's substance: a live read of Google News RSS for "Toronto
  charity", "Toronto nonprofit", "Toronto food bank", "Toronto fundraiser",
  "Toronto foundation", plus the nine named outlets' own feeds. Nothing
  here is in the CRA bulk-import data or the database; it is this week's
  news, full stop.
- Every charity's slug and category: a `DATABASE_URL` query or a live
  sitemap check, never assumed from a familiar name.
Both routes are confirmed blocked this session (see Connectivity above).
Nothing here can be drafted until the block lifts.

**Do not claim:**
- No item without a story a researcher can cite to a named outlet —
  `CLIENT.md`'s first rule: "Nothing a researcher cannot cite to an
  outlet. No outlet, no item."
- No event description inside this issue. An event belongs in the Monday
  events track's source list, never here, even if it is the only thing
  found this week about a given charity.
- No invented reaction, quote, or motive attributed to a charity beyond
  what the outlet actually reported.
- No charity profile link not checked live against the sitemap/DB first;
  an unresolved slug is named, never linked to a guess.
- No unsourced superlative about any charity or story ("the biggest story
  this week," "the most generous donor") — `CLIENT.md` fault #2.
- No invented count, dollar figure, or comparison not stated by the outlet
  itself — fault #3.
- No category-page link besides `/category/social-services/`, and only
  once verified for the specific charity named (R-170).
- No claim about this site's own pages not checked live first — fault #5.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No verb on an object or process (RULINGS 2026-10-18, 2026-11-03,
  2026-11-21): nothing a page, story or charity "sits," "holds,"
  "carries," "decides," "shows" or "tells" — name the person, or state the
  fact plainly.
- A failed probe is "I could not reach it," never "it does not exist"
  (RULINGS 2026-11-16) — a story not yet checked is unconfirmed, not
  nonexistent.
- No adjectives about the cause. Canadian spelling throughout. Dates in
  full, with the year.

## Carried forward, not re-detailed today (standing evergreen commissions, still blocked)

All three unchanged since their last full detail; re-verified blocked
above, nothing new to add.

- **#9 `donate-furniture-toronto`** — fully re-detailed 25 November
  (commit `2decfd6`). `QUEUE.md`'s 23 Nov re-rank independently confirms
  its question-phrased exact-match term holding difficulty 0 / volume 70
  for a fourth consecutive pull, the strongest-confirmed WINNABLE NOW call
  on the board — but still expect a lower click-through than KD0 alone
  implies (an AI Overview, a local pack and a PAA box all sit above
  position 1 organic). If the writer's block lifts and only one of the
  three queued evergreen clusters can be drafted first, prioritise this
  one.
- **#10 `donate-hair-toronto`** — fully re-detailed 25 November (commit
  `2decfd6`), unchanged since.
- **#6 `volunteer-opportunities-toronto-students`** — fully re-detailed 26
  November (commit `b8f267f`), unchanged since.

Per `EVIDENCE.md`'s 9 Nov pack and `QUEUE.md`'s 23 Nov re-rank: no new
cluster has surfaced since, the seventh pull running with this result.
Do not add a fourth evergreen commission — a fourth ready-but-blocked
cluster would only extend a backlog that already cannot be drafted.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked `research/editlog/EDITLOG.md`'s tail through yesterday's (26
November) gate run. Every entry since 2 November is a WRITER/DESIGNER/GATE
run finding nothing to review, because nothing has drafted since 13
October — there is no new prose fault to add this run. The standing
lessons remain the five faults in `CLIENT.md`, the category-link
restriction (R-170), and the general-ledger rules folded into "Standing
rules" below, carried from the four 13 October gate passes (soup-kitchen,
books, clothes, volunteer-toronto): unsourced superlatives, invented
beliefs about the reader, invented numbers/comparisons, a 200 response
treated as proof an anchor is right, and FAQ-restating H2s. One further
note from the 25-26 November gate runs worth carrying, not
content-related: `main` still holds an unmerged `origin/static-rebuild`
branch (54 commits, last dated 13 October, superseded by the same four
guides already live on `main`), flagged for Richard to confirm safe to
delete — see "For Richard" below.

## Standing rules for every commission above

Unchanged since 4-26 November, restated once rather than per brief:
- `CLIENT.md`'s five faults (invented reader beliefs, unsourced
  superlatives, invented numbers/comparisons, FAQ-restating H2s, unchecked
  claims about our own site) apply directly.
- Bare-intensifier family ("real"/"genuine(ly)"/"actually"/"actual")
  deleted as filler, never reworded, unless the sentence draws an explicit
  contrast.
- GRAMMAR.md's verb-on-object rule (RULINGS 2026-10-18, 2026-11-03,
  2026-11-21): nothing a page, event, charity, story or table "sits,"
  "holds," "carries," "earns," "decides," "wants," "shows" or "tells" —
  only a person earns, and rarely. Name the person, or use has/is/lists
  plainly.
- No adjectives about the cause. Canadian spelling throughout.
- Only `/category/social-services/` among category pages, verified for
  that specific charity, never guessed (R-170 still open).
- Every charity named gets its profile link, checked against the
  sitemap/DB before linking; unresolved slugs are named without a link.
- A category, label or taxonomy is a claim (RULINGS 2026-11-01): no
  eligibility stated without a source that actually defines it.
- A failed probe is "I could not reach it," never "it does not exist"
  (RULINGS 2026-11-16).
- No credit line naming the tooling, per RULINGS 2026-11-21: this is the
  agency's work, written in its own voice.

## For Richard

No new `[NEEDS RICHARD]` item on the content itself from this run.

The operational blocker (R-192, egress/`DATABASE_URL`) is unchanged since
the 24 November six-calendar-week re-raise; 25 and 26 November's runs both
declined to repeat it, correctly. Not re-raising today either — the next
natural re-raise point is the seven-week mark (1 December), still four
days away, and nothing about the block has changed: same `curl` refusal,
same absent environment variables, same absent `content/drafts/`. The
decision remains his alone: either this session type gets general web
egress, or `DATABASE_URL` is provisioned to it, or both.

One separate item worth his eye, carried from the 25-26 November gate
runs, not an escalation: `origin/static-rebuild` (54 commits, forked and
last dated 13 October) sits unmerged in the repo and appears to be the
superseded original build of the same four guides already live in
`content/published/` on `main`. Confirm it is safe to delete.

R-170 (category-page mapping) and R-335 (Neon monthly compute) remain
separately open on the same todo file, both unaffected by today's run.
