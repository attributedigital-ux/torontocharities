# Commissions — 12 November 2026 (Thursday)

Written by the editor, commissioning run. Thursday is not a fixed-track day
(`CLIENT.md`: Monday is events, Friday is news) — per the standing
instruction, an "other day" commissions one or two guides from
`content/QUEUE.md`.

## Connectivity, checked this session

`curl -m 10` to `https://toronto-charities.ca/` and `https://www.cbc.ca/`
both returned `HTTP 000` — a connection-level failure (`connect_rejected`,
"gateway answered 403 to CONNECT"), not a non-200. The proxy status endpoint
(`$HTTPS_PROXY/__agentproxy/status`, checked directly this session,
timestamp 2026-11-12T11:32:17Z) logs the identical shape against a wide,
unrelated spread of hosts in the same window (mcp.asana.com, mcp-server.
egnyte.com, mcp.slack.com, mcp.apollo.io, mcp.klaviyo.com, mcp.linear.app,
mcp.hubspot.com, mcp.docusign.com, mcp.zapier.com, mcp.similarweb.com,
mcp.monday.com, mcp.supermetrics.com and others), policy `"selective":
false` — the same blanket block logged every session since 21 Oct.
Presence-only check this session: `DATABASE_URL`, `ANTHROPIC_API_KEY`,
`RESEND_API_KEY`, `CF_ACCOUNT_ID`, `CF_API_TOKEN` all absent; no `.env`
file. Cross-checked `attribute-brain/todo/toronto-charities.md` directly
rather than trusting yesterday's note: R-192 (general web egress for this
session type, opened 16 Oct) and R-170 (category-page mapping, opened 13
Oct) are both still open, word for word the same entries as 11 November.
Today is the **thirtieth calendar day** with no draft produced since 13
October (18 remaining days of October + 12 days of November); the exact
consecutive-weekday-session count is `EDITLOG.md`'s own tally to keep, not
re-derived here. Checked `attribute-brain/raw/` for anything dated 7–12
November naming this site: nothing does (the week's dictated sessions concern
Collingwood, the F45 ad sweep, Fathom/meeting-recap process, FreshBooks,
Professor Glitch's build lessons, Quill's writer model and the Cassar
staging decision — none of them this site). A commission is a brief, not a
draft, and `research/EVIDENCE.md`'s 9 November pull (the most recent) is
explicit: "Do not commission anything new from this pull" — no new genuine
gap, no cannibalisation risk, no status change on any `QUEUE.md` row.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked the tail through 11 November: every one of the last ten entries is a
WRITER/DESIGNER/GATE run finding nothing to review or nothing to draft,
because nothing has drafted since 13 October. There is no new prose fault to
add this run. The five standing `CLIENT.md` faults, the category-link
restriction and the bare-intensifier/personification/"is worth"-family bans
are restated in full under Standing rules below rather than re-derived,
since the writer has not had a chance to act on any of them since they were
written — there is still nothing in `content/drafts/`.

## Why today carries forward rather than re-detailing

`QUEUE.md` holds exactly three `ready`/`commissioned` evergreen clusters,
and all three already have a full, dated commission on record within the
last two days, each on roughly a weekly refresh cadence this run continues
rather than restarts:

- `#9` donate-furniture-toronto and `#10` donate-hair-toronto: full detail 3
  Nov, carried 4–9 Nov, full detail again **10 Nov** (commit `16ab7f9`).
- `#6` volunteer-opportunities-toronto-students: full detail 4 Nov, carried
  5–9 Nov, full detail again **11 Nov** (commit `df00eb1`).

No Ahrefs pull, SERP check, or `raw/` dictation has touched any of the three
since those write-ups, and the egress/`DATABASE_URL` block that stops the
writer on all three is identical to both prior sessions' (confirmed above,
this session). Re-typing any of the three briefs verbatim one or two days
after their last full detail would be ceremony, not a new commission — per
`wiki/processes/content-engine.md`'s own test ("what about this page is
actually uncertain? If the answer is nothing, the loop is ceremony"). This
Thursday mirrors 5 November's shape exactly: a carry-forward day the
weekday after a Tuesday/Wednesday pair of full refreshes, ahead of Friday's
news-track issue. Next full refresh due on this cadence: `#9`/`#10` around
17 Nov, `#6` around 18 Nov, each re-anchored to whatever `QUEUE.md` reads
that day rather than fixed in advance.

## Carried forward, unchanged

**`#9` donate-furniture-toronto** (donate furniture toronto + where to
donate furniture toronto, 70/mo, KD7, score 9, WINNABLE NOW — independently
confirmed a second consecutive Ahrefs pull, 9 Nov: KD held 0, vol 60→70,
expect lower click-through than KD0 alone implies, AI Overview + local pack
+ PAA sit above organic) and **`#10` donate-hair-toronto** (90/mo, KD1,
score 45) — full brief: angle, reader, six-point "must answer" list, link
and facts requirements, do-not-claim list — stands as written in
`content/COMMISSIONS.md`'s 10 November version, commit `16ab7f9`. Both
remain blocked on the identical egress/`DATABASE_URL` fault confirmed again
this session; neither has a facts row started in `research/facts/`.

**`#6` volunteer-opportunities-toronto-students** (volunteer opportunities
toronto for students, 200/mo, KD8, score 22) — full brief stands as written
in `content/COMMISSIONS.md`'s 11 November version, commit `df00eb1`,
including the OSSD 40-hour-requirement angle, the six-point "must answer"
list, and the do-not-claim list distinguishing a charity confirming hours
from a school certifying them. Same block, unchanged.

The Monday events-track and Friday news-track backlogs (every week since 19
Oct for events, 16 Oct for news) remain superseded by whichever issue of
each track drafts first once the block lifts, per `CLIENT.md`'s
dated-record rule — not reissued here; Friday's news-track issue is this
week's next fixed-track commission, due 13 November.

## Standing rules for every commission above

Unchanged since 4–11 Nov, restated once rather than per brief:
- `CLIENT.md`'s five faults (invented reader beliefs, unsourced
  superlatives, invented numbers/comparisons, FAQ-restating H2s, unchecked
  claims about our own site) apply directly.
- Bare-intensifier family ("real"/"genuine(ly)"/"actually"/"actual")
  deleted as filler, never reworded, unless the sentence draws an explicit
  contrast.
- `GRAMMAR.md`'s object-as-actor rule (RULINGS 2026-10-18, 2026-11-03): no
  page "says" in the sense of deciding, no table "shows" beyond its plain
  contents, nothing a page or organisation "carries" or "holds" — name the
  person, or use has/is in/shows plainly.
- No adjectives about the cause. Canadian spelling throughout (programme,
  organisation, not program, organization).
- Only `/category/social-services/` among category pages, verified for that
  specific organisation, never guessed (R-170 still open).
- Every organisation named gets its profile link if it has one, checked
  against the sitemap/`DATABASE_URL` before linking; unresolved or
  unlisted organisations are named without a link.
- A category, label or taxonomy is a claim (RULINGS 2026-11-01): no
  eligibility stated without a source that actually defines it.
- No merchant link needs an affiliate code on this site (RULINGS 2026-11-03
  applies to GoHighLevel specifically; no merchant relationship exists
  here) — noted only because it is a live standard elsewhere in the fleet,
  not because it changes anything on this repo.

## For Richard

No new `[NEEDS RICHARD]` item from this run. The standing operational
blocker (R-192 egress; this session type's missing general web access and
`DATABASE_URL`) is now 30 calendar days old with zero drafts produced since
13 October, across every weekday session this fleet has run in that window,
and remains his decision alone: either this session type gets general web
egress, or `DATABASE_URL` is provisioned to it, or both. Not re-pushing a
notification for this today — the four-calendar-week mark already triggered
one (10 Nov WRITER run) and nothing has changed since. R-170 (category-page
mapping) remains open on the same todo file, unaffected by today's run.
