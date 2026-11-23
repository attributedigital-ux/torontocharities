# Evidence — toronto-charities.ca, 23 Nov 2026

Researcher pack for the commissioning editor. Sources: Ahrefs
`keywords-explorer-matching-terms` (country CA, `terms=questions`, pulled
today, cached to `research/ahrefs/clusters.json`), `content/QUEUE.md`
(re-ranked today), `content/published/*.json`, `content/COMMISSIONS.md`'s
20 Nov run, `research/editlog/EDITLOG.md`'s own tail, `attribute-brain/
wiki/clients/toronto-charities.md`, `attribute-brain/RULINGS.md` (checked
through the 23 Nov entry), and `attribute-brain/raw/` (every file dated 15
Oct through 21 Nov checked by filename and date; none names
toronto-charities — see "What Richard said" below).

A live-guides check against `https://toronto-charities.ca/guides/` was
attempted this run, not skipped: WebFetch failed with `getaddrinfo
ENOTFOUND toronto-charities.ca`, the identical fault this fleet has logged
on every weekday session since 15 Oct (R-192, still open per
`attribute-brain/todo/toronto-charities.md`). "Covered" below is read from
`content/published/*.json` instead, the same stand-in this pack has used
since the fault first appeared.

## Striking distance

No pack this week. `research/gsc/snapshot.md` does not exist in this repo
— Search Console has never been committed here, so there is no measured
position data to read "5 to 20" from. This is not the egress fault
(R-192, writer-side): the GSC→repo pipeline this process assumes
(`content-engine.md`'s "GSC snapshot (CI)") was never stood up for this
client. Flagging it rather than guessing: until a snapshot lands, this
section of every pack reads "no data," and that is the honest answer, not
a gap in this researcher's own work.

## Ranking without clicks

Same gap, same reason: no GSC snapshot. Nothing to report.

## Genuine gaps

Seventh consecutive `terms=questions` pull against the same eight seed
keywords, and the seventh with no new `parent_topic` outside the five
clusters already on `QUEUE.md` (#1/#4/#7/#9/#10, plus the folded
#2/#3/#5/#6/#8). The evergreen demand for this site's seeds reads as fully
mapped at this question-phrase depth — a further weekly pull of the *same*
seeds is confirmation, not discovery. A seventh genuine cluster, if the
queue needs one, has to come from a new seed group (a cause not yet
searched — e.g. toy donations, food drive volunteering by season) rather
than another pull of these eight terms.

One real movement this pull, reported to the editor but **not** changing
any row's Status or table Score, because it is not a scored row at all:
- **"how to volunteer in toronto"** (inside row #1/#3's fold, under the
  published volunteer-toronto guide): difficulty jumped 0 → 24,
  `parent_topic` reassigned from "volunteering ontario" to "volunteer
  opportunities toronto." Every prior drift on this seed set has moved by
  single digits; this is the largest jump this cache has logged. Because
  the keyword is already inside a fold the published guide answers, the
  jump changes no row, status or score — but a drift this size on an
  otherwise-settled term is worth a second look next pull before reading
  it as noise. See `clusters.json`'s delta for the full entry.

Row #9 (donate-furniture-toronto, commissioned, blocked) strengthened
again rather than moved: its question-phrased exact-match term stayed at
difficulty 0 / volume 70 for a fourth consecutive pull, the most
independently-confirmed WINNABLE NOW call on the board. If the editor
chooses which of the three blocked commissions (#6, #9, #10) to draft
first the moment the writer's egress block lifts, #9's evidence is the
strongest and the most repeated.

## Cannibalisation risks

- **"where to donate furniture in toronto"** (vol 10, KD 8, `parent_topic`
  "furniture bank") is next to Furniture Bank Toronto's own brand
  territory — flagging the overlap, not a page we would compete against:
  the 2 Nov SERP check (re-confirmed by four pulls of no movement since)
  found furniturebank.org has no organic top-10 slot even for the
  exact-match head term; its visibility there comes from an AI Overview
  citation and the local pack, not a page of its own. No cannibalisation of
  our own pages. The real risk is writing *about* Furniture Bank as an
  organisation rather than linking its profile the way `CLIENT.md`
  requires: guide #9 should stay on the generic "where to donate furniture"
  angle and name Furniture Bank once, linked, among the options.
- No change to the standing map: profile pages, `/charity-events-toronto/`,
  and torontoproperty.ca's neighbourhood/housing territory are all
  unaffected by this pull — none of the eight seed keywords touch them.

## Repairs

None identified from keyword data this pull. The real repair on this site
right now is not a broken link — it is operational, and it is the same one
`content/COMMISSIONS.md` and `research/editlog/EDITLOG.md` both logged on
their 20 Nov runs: three clusters (#6, #9, #10) have been commissioned or
re-commissioned since 3 Nov and the writer still cannot draft any of them
(egress/`DATABASE_URL` block, R-192), now at least forty calendar days
running per EDITLOG's own count. The honest recommendation stays unchanged
from every pack since 16 Nov: fix R-192 before anything else. A fourth
ready cluster would only extend a queue that already cannot be drafted.
This pack does not re-flag R-192 as new — COMMISSIONS.md and EDITLOG.md
both already log it on their own schedule, and nothing has changed this
week.

## What Richard said

Nothing new. Checked `attribute-brain/raw/` by filename and date from 15
Oct through 21 Nov (the window since the last Toronto-Charities-specific
file); none names toronto-charities. Everything cited in prior packs (the
13 Oct brief decisions, the 12 Oct rebuild, the 14 Oct content/logos
session) still stands and is already in `CLIENT.md` and `wiki/clients/
toronto-charities.md`; nothing from him changes this week's ranking.

`RULINGS.md`'s entries since 16 Nov (checked in full through 23 Nov) are
all general writing/process rulings from other clients' work (GSC-snapshot
freshness, "quote the line," the sits/holds/carries/decides/shows/tells
ban, the TorontoProperty actor-check gap) — none names toronto-charities or
changes this site's brief, scoring method or cannibalisation map. The
object-as-actor ban is followed in this pack's own prose.

## What NOT to write

- **A fourth evergreen commission this week.** Three are already
  commissioned and blocked on the writer-side egress fault (#6, #9, #10).
  A fourth ready cluster would not move anything forward while that block
  stands — it would only make the backlog already logged in COMMISSIONS.md
  longer.
- **"where to donate furniture in toronto" as its own page, or as an
  article about Furniture Bank specifically.** Volume 10, and the demand
  behind it is answered by linking Furniture Bank's profile inside guide
  #9, not by writing about the organisation on its own.
- **"how to volunteer in toronto" as a new or separate page**, despite
  this pull's difficulty jump. The volume (10) is still too thin to
  justify a dedicated page, the parent topic reads as province-wide rather
  than Toronto-specific, and the generic intent is already answered by the
  published volunteer-toronto guide. A second page for this phrasing would
  be near-duplicate content competing with our own guide — watch the
  difficulty number next pull, but do not commission anything from it yet.
- **Do not read this pull's one large drift as the evergreen demand
  picture changing.** Seven consecutive pulls with no new genuine cluster
  is the real signal; one keyword's difficulty number moving inside an
  already-folded, already-published topic is not new demand.
