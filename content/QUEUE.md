# Queue — toronto-charities.ca

Weekly tracks run on a schedule, not from this queue. The queue holds
evergreen clusters only, `ready` since Richard said go on 13 Oct 2026.
Head-term data: Ahrefs matching-terms, country CA, 13 Oct 2026 (terms=all).
Score = volume ÷ (KD+1). Re-ranked 16 Nov 2026 against
`research/ahrefs/clusters.json` (terms=questions pull, same six seed groups,
sixth pull on this cache — 13 Oct all-terms, 19 Oct questions, 26 Oct
questions, 2 Nov questions, 9 Nov questions, this one; see EVIDENCE.md) and
against `content/published/` (live-guides check: no `research/gsc/` snapshot
exists yet and WebFetch to `toronto-charities.ca/guides/` was not attempted
by this role this run — the egress fault is a writer-side block (R-192),
confirmed separately in `content/COMMISSIONS.md`'s 13 Nov run; "published"
below is read from the repo's own `content/published/*.json`, unchanged
since 19 Oct, nothing has published since 13 Oct).

No row's Status or Score changes this pull. Row #9's WINNABLE NOW call (2
Nov live SERP re-check) is independently confirmed a third consecutive
pull — its question-phrased exact-match keyword held at difficulty 0 and
volume 70 again. Row #4's difficulty-4 drift (first seen 9 Nov) held for a
second consecutive pull — settled, not still drifting. Row #7's head term
rose volume 90→100 at unchanged difficulty 6 (no table change: published
rows are not rescored on a terms=questions drift, per the row #4
convention — see EVIDENCE.md). Rows #1, #5, #6, #8, #10 were not in today's
six seed groups and are carried forward unchanged.

| # | Cluster (primary keyword) | Slug | Vol/mo | KD | Score | Status |
|---|---|---|---|---|---|---|
| 1 | volunteer toronto (+ toronto volunteer 400, volunteer in toronto 90) | volunteer-toronto | 2,800 | 2 | 933 | **published** |
| 2 | toronto volunteer opportunities (+ volunteer toronto opportunities 70, summer 80) | folded into #1: same reader, same answer; the sector pages of the volunteer tool take the long tail | 500 | 0 | 500 | hold — folded into #1 |
| 3 | volunteer opportunities toronto | folded into #1 | 1,800 | 11 | 150 | hold — folded into #1 |
| 4 | where to donate clothes toronto | where-to-donate-clothes-toronto | 90 | 0 | 90 | **published** |
| 5 | soup kitchen volunteer toronto (+ #8 food bank volunteer toronto 200) | soup-kitchen-volunteer-toronto | 100 | 0 | 100 | **published** |
| 6 | volunteer opportunities toronto for students | volunteer-opportunities-toronto-students | 200 | 8 | 22 | recommissioned 20 Oct, **re-commissioned in full 11 Nov** (see COMMISSIONS.md) — still **undrafted, blocked**: same egress/`DATABASE_URL` fault (R-187/R-192/R-193); see EDITLOG.md for the current run count. Not re-verified by the researcher (writer/gate territory, not a keyword question) |
| 7 | where to donate books toronto | where-to-donate-books-toronto | 90 | 6 | 12.86 | **published** |
| 8 | food bank volunteer toronto | folded into #5: same reader, same answer; the guide covers food banks, meal programmes and drop-ins together | 200 | 19 | 10 | hold — folded into #5 |
| 9 | donate furniture toronto (+ where to donate furniture toronto 70) | donate-furniture-toronto | 70 | 7 | 9 | **commissioned 3 Nov, re-commissioned in full 17 Nov** (see COMMISSIONS.md) — still blocked on egress/`DATABASE_URL` for the writer; WINNABLE NOW, independently confirmed a third consecutive pull (2 Nov SERP check, 9 Nov and 16 Nov both held KD 0 / vol 70) — but expect lower click-through than KD0 alone implies (AI Overview + local pack + PAA above organic) |
| 10 | donate hair toronto | donate-hair-toronto | 90 | 1 | 45 | **commissioned 3 Nov, re-commissioned in full 17 Nov** (see COMMISSIONS.md) — still blocked on egress/`DATABASE_URL` for the writer, same fault as #6/#9 |
| 11 | charities in toronto / toronto charities | covered by / and /toronto-charities-list/ | 180 | 58 | — | covered |
| 12 | charity events toronto | covered by /charity-events-toronto/ | 100 | 1 | — | covered |

No new cluster surfaced this pull: every question-phrased term under the six
seed groups maps to a parent_topic already on this table (see
clusters.json), the sixth pull running with this result. No row's status
changed. Row #9 strengthened (independent third confirmation of WINNABLE
NOW); row #4's KD4 drift (first seen 9 Nov) held, read as settled; row #7's
head term rose volume 90→100 at unchanged difficulty 6, no status or score
consequence (see EVIDENCE.md).
