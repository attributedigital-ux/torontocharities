# Queue — toronto-charities.ca

Weekly tracks run on a schedule, not from this queue. The queue holds
evergreen clusters only, `ready` since Richard said go on 13 Oct 2026.
Head-term data: Ahrefs matching-terms, country CA, 13 Oct 2026 (terms=all).
Score = volume ÷ (KD+1). Re-ranked 2 Nov 2026 against
`research/ahrefs/clusters.json` (terms=questions pull, same six seed groups,
fourth pull on this cache — 13 Oct all-terms, 19 Oct questions, 26 Oct
questions, this one; see EVIDENCE.md) and against `content/published/`
(live-guides check: WebFetch to `toronto-charities.ca/guides/` failed again
this run — `getaddrinfo ENOTFOUND`, the same egress fault as
R-187/R-192/R-193, now confirmed for a third consecutive researcher session
— so "published" below is still read from the repo's own
`content/published/*.json`, not a live fetch; unchanged since 19 Oct,
nothing has published since 13 Oct).

Vol/KD/Score below updates row #9 with a live SERP re-check (see EVIDENCE.md
and clusters.json `serp_checks`) that resolves a caveat carried unverified
across the prior three pulls. Rows #4 and #7 reappeared in this pull with no
material change. Rows #1, #5, #6, #8, #10 were not in today's six seed
groups and are carried forward unchanged.

| # | Cluster (primary keyword) | Slug | Vol/mo | KD | Score | Status |
|---|---|---|---|---|---|---|
| 1 | volunteer toronto (+ toronto volunteer 400, volunteer in toronto 90) | volunteer-toronto | 2,800 | 2 | 933 | **published** |
| 2 | toronto volunteer opportunities (+ volunteer toronto opportunities 70, summer 80) | folded into #1: same reader, same answer; the sector pages of the volunteer tool take the long tail | 500 | 0 | 500 | hold — folded into #1 |
| 3 | volunteer opportunities toronto | folded into #1 | 1,800 | 11 | 150 | hold — folded into #1 |
| 4 | where to donate clothes toronto | where-to-donate-clothes-toronto | 90 | 0 | 90 | **published** |
| 5 | soup kitchen volunteer toronto (+ #8 food bank volunteer toronto 200) | soup-kitchen-volunteer-toronto | 100 | 0 | 100 | **published** |
| 6 | volunteer opportunities toronto for students | volunteer-opportunities-toronto-students | 200 | 8 | 22 | recommissioned 20 Oct — **undrafted, blocked**: twelve consecutive writer/gate sessions (15, 16, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30 Oct, per EDITLOG.md) have hit the same egress/credential fault (R-187/R-192/R-193), nothing drafted. Not re-verified by the researcher (writer/gate territory, not a keyword question) |
| 7 | where to donate books toronto | where-to-donate-books-toronto | 90 | 6 | 12.86 | **published** |
| 8 | food bank volunteer toronto | folded into #5: same reader, same answer; the guide covers food banks, meal programmes and drop-ins together | 200 | 19 | 10 | hold — folded into #5 |
| 9 | donate furniture toronto (+ where to donate furniture toronto 60) | donate-furniture-toronto | 70 | 7 | 9 | ready — **UPGRADED 2 Nov**: the exact question-phrase keyword's parent_topic changed off "furniture bank" for the first time in four pulls; a live SERP re-check confirms no organic top-10 result is furniturebank.org (best organic incumbent DR66). Now WINNABLE NOW, not borderline — but the top of the SERP is an AI Overview, a 3-pack local pack and a PAA box, so expect lower click-through than KD0 alone implies. See EVIDENCE.md |
| 10 | donate hair toronto | donate-hair-toronto | 90 | 1 | 45 | recommissioned 20 Oct — **undrafted, blocked**: same egress/credential fault as #6 |
| 11 | charities in toronto / toronto charities | covered by / and /toronto-charities-list/ | 180 | 58 | — | covered |
| 12 | charity events toronto | covered by /charity-events-toronto/ | 100 | 1 | — | covered |

No new cluster surfaced this pull: every question-phrased term under the six
seed groups maps to a parent_topic already on this table (see
clusters.json). One row (#9) was promoted from borderline to WINNABLE NOW on
a live SERP re-check; nothing else changed status or rank.
