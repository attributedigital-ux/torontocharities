# Evidence — toronto-charities.ca, 16 Nov 2026

Researcher pack for the commissioning editor. Sources: Ahrefs
`keywords-explorer-matching-terms` (country CA, `terms=questions`, pulled
today, cached to `research/ahrefs/clusters.json`), `content/QUEUE.md`
(re-ranked today), `content/published/*.json`, `content/COMMISSIONS.md`'s
13 Nov run, `attribute-brain/wiki/clients/toronto-charities.md`, and
`attribute-brain/raw/` (checked for anything new since 14 Oct — nothing
found; see "What Richard said" below).

## Striking distance

No pack this week. `research/gsc/snapshot.md` does not exist in this repo
— Search Console has never been committed here, so there is no measured
position data to read "5 to 20" from. This is not the egress fault
(R-192, writer-side): it's that the GSC→repo pipeline this process assumes
(`content-engine.md`'s "GSC snapshot (CI)") was never stood up for this
client. Flagging it rather than guessing: until a snapshot lands, this
section of every pack will read "no data" and that is the honest answer,
not a gap in this researcher's work.

## Ranking without clicks

Same gap, same reason: no GSC snapshot. Nothing to report.

## Genuine gaps

Sixth consecutive `terms=questions` pull against the same six seed groups,
and the sixth with no new `parent_topic` outside the five clusters already
on `QUEUE.md` (#1/#4/#7/#9/#10, plus the folded #2/#3/#5/#6/#8). The
evergreen demand for this site's seeds reads as fully mapped at this
question-phrase depth — further weekly pulls of the *same* seeds are
confirmation, not discovery. If the queue needs a seventh genuine cluster,
it will have to come from a new seed group (a cause not yet searched —
e.g. toy donations, food drive volunteering by season) rather than another
pull of these eight terms.

Two pieces of real movement inside the existing clusters, both reported to
the editor but **not** changing any row's Status or table Score (published
rows aren't rescored on a `terms=questions` drift; see
`clusters.json`'s delta):
- **Row #7** (where-to-donate-books-toronto, published): head term volume
  90→100, difficulty held at 6. Recomputed score would be 14.29 vs the
  table's standing 12.86 — directionally better, doesn't change its
  already-published status.
- **Row #9** (donate-furniture-toronto, commissioned, blocked): its
  question-phrased exact-match term held at difficulty 0 / volume 70 for a
  third consecutive pull. This is now the most independently-confirmed
  WINNABLE NOW call on the board — if the editor is choosing which of the
  three blocked commissions (#6, #9, #10) to prioritise the moment the
  writer's egress block lifts, #9 has the strongest, most-repeated
  evidence behind it.

## Cannibalisation risks

- **"where to donate furniture in toronto"** (vol 10, KD 8, `parent_topic`
  "furniture bank") sits next to Furniture Bank Toronto's own brand
  territory. The 2 Nov SERP check (carried forward, re-confirmed by three
  pulls of no movement since) found furniturebank.org does **not** hold an
  organic top-10 slot even for the exact-match head term — its visibility
  there comes from an AI Overview citation and the local pack, not a page
  we'd be competing against directly. No cannibalisation of our own pages;
  the risk is writing *about* Furniture Bank as an organisation rather than
  linking its profile the way `CLIENT.md` requires. Guide #9 should stay
  on the generic "where to donate furniture" angle and name Furniture Bank
  once, linked, among the options.
- No change to the standing map: profile pages, `/charity-events-toronto/`,
  and torontoproperty.ca's neighbourhood/housing territory are all
  unaffected by this pull — none of the six seed groups touch them.

## Repairs

None identified from keyword data this pull. The real repair on this site
right now is not a broken link — it's operational, and it's the same one
`content/COMMISSIONS.md` flagged on its 13 Nov run: three clusters (#6, #9,
#10) have been commissioned or re-commissioned since 3 Nov and the writer
still cannot draft any of them (egress/`DATABASE_URL` block, R-192), now
over a month running. The honest recommendation is not more content and
not a fourth commission — it's fixing R-192 before anything else, since a
fourth ready cluster would just extend the same blocked queue. This
researcher pack does not need to re-flag R-192 itself (COMMISSIONS.md's 13
Nov run already did, and nothing has changed since), but a new commission
this week would be ceremony against a queue that already can't be drafted.

## What Richard said

Nothing new. `attribute-brain/raw/` holds no Toronto Charities dictation
later than `session-2026-10-14-toronto-charities-content-and-logos.md`.
Everything cited in prior packs (the 13 Oct brief decisions, the 12 Oct
rebuild, the 14 Oct content/logos session) still stands and is carried in
`CLIENT.md` and `wiki/clients/toronto-charities.md`; nothing from him
changes this week's ranking.

## What NOT to write

- **"where to donate furniture in toronto" as its own page or as an
  article about Furniture Bank specifically.** Volume 10, and the demand
  it does carry is answered by linking Furniture Bank's profile inside
  guide #9, not by writing about the organisation. Chasing the variant
  volume on its own would duplicate #9's own angle.
- **"how to volunteer in toronto"** (`parent_topic` "volunteering
  ontario", vol 10, KD 0). Reads cheap on KD alone, but the volume is too
  thin to justify a dedicated page and the parent topic is province-wide,
  not Toronto-specific — the generic intent is already served by the
  published volunteer-toronto guide. Writing a second page for this
  phrasing would be near-duplicate content competing with our own guide.
- **A fourth evergreen commission this week.** Three are already
  commissioned and blocked on the writer-side egress fault (#6, #9, #10).
  Queueing a fourth ready cluster doesn't move anything forward while that
  block stands — it only grows the backlog COMMISSIONS.md has to carry
  forward.
