# Commissions — 10 November 2026 (Tuesday)

Written by the editor, commissioning run. Tuesday is not a fixed-track day
(`CLIENT.md`: Monday is events, Friday is news) — per the standing
instruction, an "other day" commissions one or two guides from
`content/QUEUE.md`.

## Connectivity, checked this session

`curl -m 10` to `https://toronto-charities.ca/charity-events-toronto/` and
`https://toronto-charities.ca/guides/` both returned `HTTP 000` — a
connection-level failure (`CONNECT tunnel failed, response 403`), not a
non-200. The proxy status endpoint (`$HTTPS_PROXY/__agentproxy/status`,
checked directly this session, timestamp 2026-11-10T11:31:48Z) logs the
identical `connect_rejected`/"gateway answered 403 to CONNECT" shape against
a wide, unrelated spread of hosts in the same window (mcp.slack.com,
mcp.similarweb.com, mcp.asana.com, mcp.atlassian.com, mcp.egnyte.com),
policy `"selective": false` — the same blanket block logged every session
since 21 Oct (R-192). Cross-checked `attribute-brain/todo/toronto-charities.md`
directly: R-192 (general web egress for this session type) and R-170
(category-page mapping) are both still open. `research/editlog/EDITLOG.md`'s
9 November GATE entry puts the fault at its 28th consecutive weekday session
with zero drafts since 13 October — 28 calendar days as of today. A
commission is a brief, not a draft, and is written below in full regardless,
but no commission below can clear its facts-needed section until the block
lifts.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked the tail: every entry since 2 November is a WRITER/DESIGNER/GATE run
finding nothing to review, because nothing has drafted since 13 October.
There is no new prose fault to add. The five standing faults and the
category-link restriction are in `CLIENT.md` and restated in full below
rather than re-derived, since the writer has not had a chance to act on them
since they were written.

## Commission: Where to donate furniture in Toronto

**Slug:** `donate-furniture-toronto`
**Cluster / intent tier:** `QUEUE.md` #9 (donate furniture toronto + where to
donate furniture toronto, 70/mo, KD 7, score 9). Evergreen, commissioned
3 Nov, re-commissioned in full today as this run's pick from the queue.
**Status of the keyword call:** WINNABLE NOW, independently confirmed a
second consecutive Ahrefs pull (9 Nov: KD held at 0 on the question-phrased
exact match, vol 60→70) after 2 Nov's live SERP check found no organic
top-10 incumbent stronger than DR66. Caveat that travels with the call: an
AI Overview, a 3-pack local pack and a PAA box all sit above position 1
organic — commission this as "winnable, modest traffic ceiling," never as
an easy 70/mo (`EVIDENCE.md`'s own "What NOT to write").

**The angle, in one sentence:** which Toronto organisations take a donated
sofa, table, mattress or other furniture item, what each one actually
accepts and refuses, and how a resident gets it there — pickup, drop-off, or
neither — with every organisation that has a profile on this site linked to
it.

**Who it is for:** someone in Toronto with furniture to give away, deciding
where it can actually go before they haul it to the curb.

**What it must answer:**
1. Which organisations in Toronto take donated furniture, by name.
2. What condition and type of item each one accepts, and what each refuses
   (most charities that take furniture have a specific no-list: stained
   upholstery, broken frames, particleboard, mattresses without a clean
   fire-safety tag).
3. Does each one offer a pickup, and if so what it costs or what it requires
   (a minimum number of items, a address within a service area, notice
   period) — or is drop-off the only route.
4. Does the donor get a tax receipt, and under what condition.
5. Which of these organisations has a profile on this site, so the reader
   can read more about the charity itself.

**Links every organisation must carry:**
- Its own donation page (the outbound source the claim comes from).
- Its profile `/profile/<slug>/` on this site, checked against the sitemap
  or `DATABASE_URL` before linking. An organisation not found in the
  charities table is named without a link, never linked to a guessed URL —
  `CLIENT.md`'s rule.
- `/category/social-services/` once, if and only if it is the category at
  least one named organisation actually sits in, verified live first — no
  other category page may be linked at all (R-170 still open; every other
  category page misattributes charities to the wrong cause).

**Facts needed and where they come from:**
- The identity of Toronto furniture-donation organisations: Furniture Bank,
  Habitat for Humanity GTA ReStore, Diabetes Canada's clothing/furniture
  pickup, Salvation Army Thrift Store, and any other charity with a live
  furniture-donation programme — found by live search and then read in full
  on each organisation's own donation page, not assumed from name
  recognition.
- Each organisation's accepted/refused item list, pickup terms, and receipt
  policy — quoted or closely paraphrased from that page, with the URL and
  fetch date recorded as a numbered row in `research/facts/
  donate-furniture-toronto.md`, same format as `research/facts/
  where-to-donate-books-toronto.md`.
- A live slug check against the sitemap or `DATABASE_URL` for every named
  organisation, to confirm whether it has a profile on this site.
All three routes are live-fetch or DB-query dependent and are confirmed
blocked this session (see Connectivity above). Nothing here may be drafted
from memory or general knowledge of these organisations until the block
lifts — a claim without a facts row does not ship.

**Do not claim:**
- No organisation's donation terms from memory or general familiarity; every
  term comes from that organisation's own page, fetched this cycle, with a
  facts row.
- No organisation named without a live slug check; an unresolved slug is
  named, never linked to a guess.
- No unsourced superlative ("the biggest furniture charity in Toronto," "the
  easiest pickup") — `CLIENT.md` fault #2.
- No invented number (wait times for pickup, how many items counts as a
  truckload, how often a route runs) — `CLIENT.md` fault #3.
- No invented belief about the reader ("Most people think furniture
  donation means a truck shows up for free") — `CLIENT.md` fault #1.
- No claim that this guide is an "easy win" or that 70/mo is a reliable
  traffic estimate — the AI Overview/local-pack/PAA stack above organic
  caps it; state the keyword opportunity nowhere in the reader-facing copy
  at all, this caveat is for the commission, not the page.
- No category-page link except `/category/social-services/`, and only once
  verified for the specific organisation named near it.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No personification: nothing a page or organisation "carries," "holds," or
  "shows" in the sense of deciding what to include (RULINGS 2026-11-03).
- Canadian spelling throughout (programme, not program, where "programme"
  is the word in play; organisation, not organization, per this file's own
  spelling).

**[NEEDS RICHARD]:** none new. The standing blocker (R-192 egress /
`DATABASE_URL`) already covers why this cannot be drafted; it is not a
per-piece question, per `content-editor.md`'s rule against one `@richard`
item per piece.

## Commission: Where to donate hair in Toronto

**Slug:** `donate-hair-toronto`
**Cluster / intent tier:** `QUEUE.md` #10 (donate hair toronto, 90/mo, KD 1,
score 45 — the highest score of any undrafted ready cluster). Evergreen,
commissioned 3 Nov, re-commissioned in full today as this run's second pick.

**The angle, in one sentence:** which organisations serving Toronto accept
donated hair for wigs, what each one requires (minimum length, no colour
treatment or chemical processing, how it must be bundled and sent), and how
a donor sends it, since every organisation in this space works by mail
rather than a Toronto drop-off.

**Who it is for:** someone in Toronto who has had their hair cut for
donation, or is about to, deciding which organisation to send it to and
whether their hair qualifies.

**What it must answer:**
1. Which organisations accept hair donations that a Toronto resident can use
   — national or international programmes with no local office are still
   the honest answer if that is what exists; the guide does not need a
   Toronto-specific recipient to be useful, only Toronto-relevant framing.
2. What minimum length each requires.
3. What condition each requires (grey, chemically treated, coloured hair —
   each programme differs and some explicitly accept what others refuse).
4. How the hair must be bundled (braided or ponytailed before cutting) and
   shipped, and what it costs the donor to send it.
5. Does the donor get anything back (a tax receipt; most hair-donation
   charities are mail-in and do not issue one — confirm per organisation,
   do not assume either way).
6. Which, if any, of these organisations has a profile on this site.

**Links every organisation must carry:**
- Its own donation page (the source of its requirements).
- Its profile `/profile/<slug>/` if it has one, checked against the
  sitemap/`DATABASE_URL` first. Most hair-donation charities are
  wig-focused medical charities (Angel Hair for Kids, Wigs for Kids Canada,
  Hairdressers with Hearts) that may or may not be in the CRA-registered
  charities table this site is built from — if an organisation named is not
  a registered charity in the table, it is named without a profile link,
  stated plainly as not listed on this site, never linked to a guess.
- `/category/social-services/` only if verified live for the specific
  organisation, same restriction as every other commission (R-170).

**Facts needed and where they come from:**
- The identity of hair-donation programmes relevant to a Toronto reader —
  found by live search, then each organisation's own donation-requirements
  page read in full, not assumed from name recognition.
- Minimum length, condition rules, bundling/shipping instructions and
  receipt policy per organisation, quoted or closely paraphrased with URL
  and fetch date recorded as a numbered row in `research/facts/
  donate-hair-toronto.md`, same format as the furniture commission above.
- A live slug check against the sitemap or `DATABASE_URL` for every
  organisation named, to confirm whether it is a registered charity with a
  profile on this site.
All three routes are confirmed blocked this session (see Connectivity
above). Nothing here may be drafted from memory until the block lifts.

**Do not claim:**
- No minimum length, condition rule or shipping instruction from memory;
  every one comes from that organisation's own current page, fetched this
  cycle, with a facts row — these programmes change their rules and a
  stale minimum-length figure would be actively harmful to a reader who
  cuts their hair to a number that turns out wrong.
- No organisation named without a live slug check against this site's own
  charity table; state plainly where an organisation is not listed here
  rather than linking a guess.
- No invented tax-receipt claim either way — confirm per organisation or
  say it is unconfirmed.
- No unsourced superlative ("the most trusted wig charity") — `CLIENT.md`
  fault #2.
- No invented belief about the reader ("Most people think any length of
  hair works") — `CLIENT.md` fault #1.
- No invented number (how many wigs a single donation makes, how long
  processing takes) — `CLIENT.md` fault #3.
- No category-page link except `/category/social-services/`, verified for
  the specific organisation.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No personification (RULINGS 2026-11-03).
- Canadian spelling throughout.

**[NEEDS RICHARD]:** none new, same standing blocker as above.

## Carried forward, not re-detailed today

`QUEUE.md` #6, `volunteer-opportunities-toronto-students` (score 22,
recommissioned 20 Oct), remains open and blocked on the same fault; full
detail in git history rather than re-typed here, since today's two picks
above are this run's commissions from the queue per the "one or two"
instruction. The Monday events-track and Friday news-track backlogs (every
week since 19 Oct for events, 16 Oct for news) remain superseded by whichever
issue of each track drafts first once the block lifts, per `CLIENT.md`'s
dated-record rule — not reissued here.

## Standing rules for every commission above

Unchanged since 4–9 Nov, restated once rather than per brief:
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
`DATABASE_URL`) is now 28 calendar days old with zero drafts produced since
13 October, across every weekday session this fleet has run in that window,
and remains his decision alone: either this session type gets general web
egress, or `DATABASE_URL` is provisioned to it, or both. R-170
(category-page mapping) remains open on the same todo file, unaffected by
today's run.
