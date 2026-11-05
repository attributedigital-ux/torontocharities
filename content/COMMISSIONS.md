# Commissions — 5 November 2026 (Thursday)

Written by the editor, commissioning run. Thursday is not a fixed-track day
(Monday = events, Friday = news), so today commissions from `QUEUE.md` per
`CLIENT.md`/`content-engine.md`.

## Connectivity, checked this session

`curl -m 10` to `https://toronto-charities.ca/charity-events-toronto/`,
`https://toronto-charities.ca/` and `https://www.cbc.ca/` all returned
`000`/exit 56 (connection never completed, not a non-200). The proxy status
endpoint logs the identical `connect_rejected`/"gateway answered 403 to
CONNECT" shape against the same wide, unrelated spread of hosts seen every
session since 21 Oct (mcp.notion.com, mcp.hubspot.com, mcp.zapier.com,
mcp.slack.com, mcp.figma.com, mcp.apollo.io and others), policy
`"selective": false` — a blanket block for this session type, not a
per-host rule. `DATABASE_URL`, `ANTHROPIC_API_KEY`, `RESEND_API_KEY`,
`CF_ACCOUNT_ID` and `CF_API_TOKEN` all confirmed absent (presence-only
`test -n` check, no value materialized; a direct `env` read was refused by
the harness's credential-materialization guard).

**One underlying cause did clear since the last commissioning run.**
`attribute-brain/todo/toronto-charities.md` shows R-193 and R-213 (the Neon
compute-quota exhaustion) both **closed by check 2026-11-05**: `tc-backup.yml`
ran its "Dump and commit" step `success` on three consecutive scheduled
runs (2, 3, 4 Nov). That is good news for the ~12,640 on-demand charity
profile pages, but it does not touch the fault that actually blocks this
pipeline — the session-type egress block (R-192) and the absent
`DATABASE_URL` credential in writer/editor sessions specifically — both
re-confirmed above, unchanged. This is now the **twenty-first** consecutive
weekday session across the fleet's three roles to hit it (15, 16, 19, 20,
21, 22, 23, 26, 27, 28, 29, 30 Oct, 2 Nov, three sessions on 3 Nov, three on
4 Nov, now this one) — twenty-four calendar days, no writer run producing a
draft since 13 October. Not re-escalating as a new item: R-192 already
carries this, and it is Richard's decision, not something a commission can
fix. Noting the R-193/R-213 closure here because it is genuinely new
information since the last run, not because it changes today's answer.

This block is the writer's problem, not the editor's — a commission is a
brief, not a draft, and does not itself need live egress. It does mean no
commission below can clear its facts-needed section until the block lifts,
exactly as every commission since 13 October has not.

## Researcher pull and queue since the last commissioning run

No new pull since 2 Nov (`research/EVIDENCE.md`, `content/QUEUE.md`
unchanged). All three `ready` evergreen clusters are already commissioned
in full and sit unexecuted, blocked on the fault above:

- **#6 `volunteer-opportunities-toronto-students`** — commissioned 4 Nov.
- **#9 `donate-furniture-toronto`** — commissioned 3 Nov.
- **#10 `donate-hair-toronto`** — commissioned 3 Nov.

No fourth cluster exists to commission: every row left on `QUEUE.md` is
either `published` (#1, #4, #5, #7), folded into a published guide (#2, #3,
#8), or `covered` by an existing page (#11, #12). The "evergreen, not
decided" third track in `CLIENT.md` (donate-furniture/donate-hair's
siblings, volunteer-sector pages) stays on `hold` pending Richard — nothing
there is `ready` to promote without his go-ahead. **Nothing new to
commission today.** Per content-engine.md's cost discipline and this file's
own "do not duplicate reading" convention (used 4 Nov for #9/#10), the three
standing commissions are carried forward below rather than re-typed in full.

## Carried forward, not re-detailed today

- **#6 `volunteer-opportunities-toronto-students`** — full commission in
  4 Nov's `COMMISSIONS.md` (git history, commit on that date). Angle: the
  student-specific process (minor consent, screening, whether hours count
  toward Ontario's 40-hour requirement), not a second list of #1's
  charities. Standing "do not claim" list unchanged: no charity named as
  taking student volunteers unless its own page says so live; no hours
  stated as counting toward the 40-hour requirement without the charity's
  page or ontario.ca confirming it; no unsourced superlative.
- **#9 `donate-furniture-toronto`** and **#10 `donate-hair-toronto`** — full
  commissions in 3 Nov's `COMMISSIONS.md` (git history). #9 is WINNABLE NOW
  per 2 Nov's live SERP re-check, but commission it as "winnable, modest
  traffic ceiling" (AI Overview + local pack + PAA above organic), never as
  an easy win — EVIDENCE.md 2 Nov, "What NOT to write."
- The two fixed-track backlogs (events weeks of 19/26 Oct, 2 Nov; news weeks
  of 16/23/30 Oct) remain superseded by whichever issue of each track drafts
  first once the block lifts — not reissued here, per CLIENT.md's
  dated-record rule.

## Standing rules for all three commissions above

Unchanged since 4 Nov, restated once rather than re-typed per brief:
- CLIENT.md's five faults (invented reader beliefs, unsourced superlatives,
  invented numbers/comparisons, FAQ-restating H2s, unchecked claims about
  our own site) apply directly.
- Bare-intensifier family ("real"/"genuine(ly)"/"actually"/"actual") deleted
  as filler, never reworded, unless the sentence draws an explicit contrast.
- GRAMMAR.md's object-as-actor rule (RULINGS 2026-10-18, 2026-11-03): no
  page "says", no search "wants", no table "shows" in the sense of deciding
  what to include — name the person, or use has/is in/shows (plain sense).
- No adjectives about the cause. Canadian spelling throughout.
- Only `/category/social-services/` among category pages, verified for that
  specific charity, never guessed (R-170 still open, per `todo/
  toronto-charities.md`, unchanged since prior runs).
- Every charity named gets its profile link, checked against the
  sitemap/DB before linking; unresolved slugs are named without a link.
- A category, label or taxonomy is a claim (RULINGS 2026-11-01): no
  eligibility stated without a source that actually defines it.

## For Richard

No new `[NEEDS RICHARD]` item from this run. R-193 and R-213 closed
themselves on the check already written into the todo file — nothing for
Richard to action there. The standing operational blocker (R-192 egress;
the writer/editor session type's missing `DATABASE_URL`) is now
twenty-four calendar days old across twenty-one consecutive weekday
sessions with zero drafts produced since 13 October, and remains his
decision alone: either this session type gets general web egress, or
`DATABASE_URL` is provisioned to it, or both. Restating the number here
because it is now materially larger than the seventeen/twenty logged on
3–4 Nov, not because the fault itself is new. R-170 (category-page mapping)
remains open on the same todo file, unaffected by today's run.
