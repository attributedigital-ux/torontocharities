# Commissions — 3 November 2026 (Tuesday)

Written by the editor, commissioning run. Tuesday is not a fixed-track day
(Monday = events, Friday = news), so today commissions from `QUEUE.md`
per `CLIENT.md`/`content-engine.md`.

## Connectivity, checked this session

`curl -m 10` to `https://toronto-charities.ca/charity-events-toronto/` and
`/guides/` both returned `000` (connection never completed). The proxy
status endpoint logs the identical `connect_rejected`/"gateway answered 403
to CONNECT" shape against a wide, unrelated spread of hosts in the same
window (mcp.box.com, mcp.canva.com, mcp.notion.com, mcp.linear.app,
mcp.apollo.io, mcp.slack.com and others), policy `"selective": false` —
the same blanket block logged every session since 21 Oct. `DATABASE_URL`
and `ANTHROPIC_API_KEY` are both confirmed absent (env check). This is now
the **fifteenth** consecutive weekday session to hit the fault — twenty-one
calendar days, no writer run producing a draft since 13 October. Not
re-escalating as a new item: `attribute-brain/todo/toronto-charities.md`
R-192 (egress) and R-193 (`DATABASE_URL`/Neon quota) already carry this;
R-213 and R-170 are also unchanged. All four remain Richard's decisions.

This block is the writer's problem, not the editor's — a commission is a
brief, not a draft, and does not itself need live egress. It does mean the
writer cannot clear this commission's own facts-needed section (below)
until the block lifts, exactly as it has for twenty-one days.

## Researcher pull since the last commissioning run

No new pull since 2 Nov (`research/EVIDENCE.md`, `content/QUEUE.md`
unchanged). Three evergreen clusters are ready and held: #6
(`volunteer-opportunities-toronto-students`), #9
(`donate-furniture-toronto`, upgraded to WINNABLE NOW on 2 Nov's live SERP
check), #10 (`donate-hair-toronto`). Per today's one-or-two-guides rule,
commissioning #9 and #10 below; #6 carries forward again (see below).

## Standing rules for both commissions below

The five faults from `CLIENT.md` ("What the editors kept catching") apply
directly: invented reader beliefs, unsourced superlatives, invented
numbers/comparisons not matching a facts row, headings that restate the
FAQ question below them, and any claim about this site's own pages not
checked live this session.

- The bare-intensifier family — "real"/"genuine(ly)"/"actually"/"actual" —
  deleted as filler, never reworded, unless the sentence draws an explicit
  contrast (RULINGS 2026-10-10, 2026-10-16, 2026-10-18).
- GRAMMAR.md's object-as-actor rule (RULINGS 2026-10-18): no verb needing
  intention, judgement or perception attached to a thing that cannot do it.
- No adjectives about the cause ("heartwarming", "vital", "inspiring") —
  CLIENT.md's voice: a local reporter, not an endorser.
- Only `/category/social-services/` among category pages, and only where
  the named charity's category is verified correct this session — never
  guessed from the charity's name or cause.
- Canadian spelling throughout.
- Every charity named gets its profile `/profile/<slug>/` link, checked
  against the sitemap/DB before linking (CLIENT.md). A charity that cannot
  be resolved is named without a link, never linked to a guessed slug.
- Where the charity has its own site, link it too — this guide's entire
  job is to send the reader to go do the thing (drop off, book a pickup,
  mail something), and `CLIENT.md`'s outbound-links rule treats "the
  charity's own site where it has one" as required, not optional.

## Commission: donate-furniture-toronto

**Slug:** `donate-furniture-toronto`
**Working title:** Where to donate furniture in Toronto
**Cluster / intent tier:** QUEUE.md #9, "donate furniture toronto" + "where
to donate furniture toronto" (vol 70+60, KD 0→7 avg, Score 9). Evergreen
guide, transactional — someone with furniture to get rid of, deciding where
it goes and how.

**Angle (one sentence):** A plain list of Toronto charities that take
furniture donations, what each one actually accepts and how pickup or
drop-off works, sourced from each charity's own current page — written as
genuinely winnable now that the organic SERP has no single strong
incumbent, but without promising the easy click-through the raw KD/volume
numbers imply, since an AI Overview, a three-pack local pack and a PAA box
all sit above the first organic result (EVIDENCE.md, 2 Nov).

**Questions it must answer:**
1. Which Toronto charities accept furniture donations, and does each one
   offer free pickup, drop-off only, or both?
2. What condition must the furniture be in to be accepted?
3. Are there items each charity will not take (this is only stated if the
   charity's own current page says so — never inferred from the item type)?
4. How does a donor actually book a pickup or arrange drop-off, and roughly
   how long is the wait where the charity's own page states one?
5. Is a tax receipt available, and does getting one ever depend on the
   furniture's value or condition?

**Links it must earn:**
- `/profile/<slug>/` for every charity named, checked against the sitemap
  first.
- The charity's own website, specifically the page covering furniture
  donation/pickup if one exists, so the reader can act immediately.
- `/category/social-services/` only where that specific charity's category
  is verified correct this session — optional, not required.

**Facts needed, and where from:**
- Which charities take furniture, their acceptance rules, and their pickup
  process: each charity's own current website, fetched live this session.
  Nothing here comes from training data or a prior draft — none exists.
- Each charity's profile slug: the sitemap/DB, live, not guessed from the
  org name.
- Nothing else; no Ahrefs or GSC dependency beyond what EVIDENCE.md already
  resolved.

**Do not claim (binding):**
- Do not present this as an easy win — state plainly that an AI Overview,
  local pack and PAA sit above the organic results, so expect lower
  click-through than the raw volume/difficulty numbers alone would suggest.
- No acceptance rule, item exclusion, pickup wait time, or tax-receipt
  condition not sourced from that charity's own current page, fetched live
  this session.
- No unsourced superlative ("the largest", "the most popular", "best
  known") about any charity in this space.
- No charity named as accepting furniture unless its own page says so this
  session — never carried over from memory or assumed from its category.
- No category link besides `/category/social-services/`, and only where
  verified for that specific charity.
- No adjective about the cause; no bare "real"/"genuine(ly)"/"actually"/
  "actual" filler; no "where" pivots; no object-as-actor construction.
- Canadian spelling throughout.

## Commission: donate-hair-toronto

**Slug:** `donate-hair-toronto`
**Working title:** Where to donate hair in Toronto
**Cluster / intent tier:** QUEUE.md #10, "donate hair toronto" (vol 90, KD
1, Score 45 — the highest-scoring ready cluster on the queue).
Recommissioned 20 Oct, held since; evergreen guide, transactional —
someone deciding where and how to donate cut hair, usually for wigs.

**Angle (one sentence):** A plain list of organisations that accept hair
donations reachable from Toronto (mail-in or local drop-off), what each
one actually requires — minimum length, condition, colour treatment — and
what the donated hair is used for, since not every programme makes wigs
from what it collects and that distinction matters to a donor choosing
where to send it.

**Questions it must answer:**
1. Which organisations accepting hair donations are based in or reachable
   from Toronto (local drop-off, a partnering salon, or mail-in)?
2. What is the minimum length required, and does it vary by organisation?
3. Must the hair be uncoloured/untreated, or do some organisations accept
   treated hair?
4. How is the donation actually sent — mailed, dropped at a salon, given
   at an event — and is there a cost to the donor for shipping?
5. Does the organisation make wigs directly from donated hair, or sell/
   process it to fund a wig programme — stated only where the
   organisation's own page says which, never assumed?

**Links it must earn:**
- `/profile/<slug>/` for every charity named, checked against the sitemap
  first.
- The organisation's own website, specifically its donation-instructions
  page where one exists.
- `/category/social-services/` only where verified correct for that
  specific charity this session.

**Facts needed, and where from:**
- Each organisation's acceptance rules and donation process: its own
  current website, fetched live this session — no prior draft exists to
  draw from.
- Each charity's profile slug: the sitemap/DB, live, not guessed.
- Nothing else.

**Do not claim (binding):**
- No minimum length, colour-treatment rule, or shipping cost not sourced
  from that organisation's own current page, fetched live this session.
- Do not state or imply an organisation makes wigs from donated hair unless
  its own page says so — several hair-donation programmes sell or process
  donated hair to fund wig programmes rather than using it directly, and
  conflating the two is a factual claim about what happens to the donor's
  hair.
- No unsourced superlative ("the most trusted", "the best known") about any
  organisation in this space.
- No category link besides `/category/social-services/`, and only where
  verified for that specific charity.
- No adjective about the cause; no bare "real"/"genuine(ly)"/"actually"/
  "actual" filler; no "where" pivots; no object-as-actor construction.
- Canadian spelling throughout.

## Carried forward, not commissioned today

- **#6 `volunteer-opportunities-toronto-students`** (Score 22, recommissioned
  20 Oct) — held again under today's one-or-two-guides limit. Picks up on
  the next non-Monday/Friday commissioning run. No change to its brief from
  the 20 Oct commission.
- The two fixed-track backlogs (events weeks of 19/26 Oct/2 Nov; news weeks
  of 16/23/30 Oct) remain superseded by whichever issue of each track
  drafts first once the block lifts — not reissued here, per CLIENT.md's
  dated-record rule.

## For Richard

No new `[NEEDS RICHARD]` item from this run — nothing in these two
commissions needs a judgement call only Richard can make; both are
mechanical research-and-link pieces once egress is restored. The standing
operational blocker (R-192 egress, R-193 `DATABASE_URL`/Neon quota) is
twenty-one calendar days old across fifteen consecutive weekday sessions
with zero drafts produced since 13 October — carried forward above, not
re-filed as a new item. R-170 (category-page mapping) and R-213 (Neon
backup-skip recurrence) remain open on the same todo file, unaffected by
today's run.
