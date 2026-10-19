# Evidence — toronto-charities.ca, 19 October 2026

Ahrefs matching-terms (country CA, terms=questions) pulled once this run for
the seven standing seeds, cached to `research/ahrefs/clusters.json` (1,452
units). GSC: no snapshot exists. `content/CLIENT.md` names
`research/gsc/snapshot.md`/`.json`, committed by CI, as an input; that CI job
was never built — the field is still `[BUILD]`. The only Search Console
numbers on record are the 12 Oct manual check in
`attribute-brain/wiki/clients/toronto-charities.md`: 61 of 3,528 checked URLs
indexed, 2,867 discovered-not-indexed, ~0 organic users/week. Raw/: no new
dictation from Richard about this site since 16 Oct.

## Striking distance / ranking without clicks
Not assessable. Both need query-level position and impression data from
Search Console; none exists, live or cached. With ~0 organic users/week and
61/3,528 pages indexed, nothing on the site has enough visibility to be "at
position 5–20" in the first place — the honest read is that the site has no
striking-distance pages yet, not that the researcher is withholding them.
**Flag, not content:** R-161 (standing todo) already asks for a GSC/Ahrefs
re-pull on 20 Oct; the GSC half needs the CI snapshot job built, not another
manual read, or this section stays empty every week.

## Status check against the live guides (substitute for a direct read)
WebFetch to `https://toronto-charities.ca/guides/` failed —
`getaddrinfo ENOTFOUND toronto-charities.ca` — the same per-session egress
fault logged as R-187 (15 Oct) and R-192 (16 Oct) for the writer; it now
also blocks this researcher session, which is new information (previously
only the writer and WebSearch/WebFetch combination had been tested; this
confirms it isn't writer-specific). Used `content/published/*.json` as the
record of what is actually live instead: four guides exist there, matching
exactly QUEUE.md clusters #1, #4, #5, #7, all gated 13 Oct per
`research/editlog/EDITLOG.md`. QUEUE.md re-ranked and marked `published`
below; nothing has published since, which lines up with
`wiki/clients/toronto-charities.md`'s "producing nothing" note.

## Genuine gaps
None new. The seven-seed pull returned no parent_topic outside the six
already on QUEUE.md. One re-scored: `furniture bank` / `where to donate
furniture toronto` (#9, the only `ready`-not-yet-commissioned cluster) —
volume reads 60 this pull against 70 on 13 Oct, score ~7.5–9 either way. SERP
note: the parent_topic is literally "furniture bank," which reads as a
single strong incumbent (Furniture Bank Toronto's own site) rather than a
thin SERP — KD 7 alone would call it WINNABLE, but the parent_topic naming
the likely #1 result is the downgrade signal seo-researcher.md asks for.
Commission it as borderline, not a guaranteed quick win, and check the live
SERP before promising it as this week's easy pick.

## Cannibalisation risks
None triggered. Every cluster pulled this run maps to a cluster already on
QUEUE.md's covered/hold list; nothing recommends a page CLIENT.md's map
excludes.

## Repairs
Not a keyword repair but the same category: two commissioned clusters (#6
`volunteer-opportunities-toronto-students`, #10 `donate-hair-toronto`) have
sat undrafted since 15 Oct behind the egress fault above — that is two
weeks of the only `ready` evergreen work the pipeline has, blocked on
something no editorial fix touches. Also standing: R-170 (category-page
mapping wrong on 6 of 8 pages) still blocks linking any category page but
`/category/social-services/` from any guide, evergreen or weekly — unchanged
this run, still binding on whoever writes #9.

## What Richard said
Nothing new this week. Standing instructions already folded into
CLIENT.md/QUEUE.md: the 13 Oct go-ahead on evergreen guides 1–10, and the
undecided third "evergreen" track (volunteer-by-cause / donate-your-X pages)
still sits at `hold` — no new signal either way this run.

## What NOT to write
- Do **not** un-fold clusters #2, #3 or #8 back into standalone pages —
  "toronto volunteer opportunities," "volunteer opportunities toronto" and
  "food bank volunteer toronto" are the same reader and answer as #1 and #5;
  this pull found no new question-level evidence that the fold was wrong.
- Do **not** commission a dedicated page for "where to donate books in
  toronto" (the preposition variant) on its own — same cluster as the
  published guide, KD 23 against the head term's KD 3, a scoring artefact
  from one low-volume variant, not a second opportunity.
- Do **not** treat this week's honest recommendation as "write more guides."
  The site's real constraint right now is pipeline, not content supply:
  zero pages have published in five days because of the egress fault, and
  the indexing/traffic numbers (61/3,528, ~0 users/week) say the bottleneck
  is crawl and visibility, not a shortage of evergreen clusters to write
  about. Fixing R-187/R-192 is worth more this week than a new commission.
