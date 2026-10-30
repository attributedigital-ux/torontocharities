# Commissions — 30 October 2026 (Friday)

Written by the editor, commissioning run. Friday is a fixed-track day: per
`CLIENT.md`/`content-engine.md`, today commissions only "Toronto charity
news this week" (Track 2), not a guide from `QUEUE.md`. The fixed tracks
take priority over the queue on their own day.

## Connectivity, checked this session

`curl -m 10` to `https://toronto-charities.ca/charity-events-toronto/`
returned `000` (connection never completed). The proxy's own status
endpoint logs the identical `connect_rejected` shape ("gateway answered 403
to CONNECT") against unrelated hosts in the same window (api.ahrefs.com,
mcp.atlassian.com, mcp.docusign.com, mcp.zapier.com, mcp.linear.app),
confirming — as every session since 21 Oct has — that this is a blanket
block for the session type (`"selective": false`), not a dead page.
`DATABASE_URL` and `ANTHROPIC_API_KEY` are both confirmed absent (presence
check). This is the **twelfth** weekday session to hit the fault (15, 16,
19, 20, 21, 22, 23, 26, 27, 28, 29, 30 Oct) — seventeen calendar days, no
writer run producing a draft since 13 October.

**This means today's commission inherits the same block every commission
since 15 Oct has logged.** Per `content-writer.md`'s own hard rule, the
writer drafts nothing until a live fetch (Google News RSS, the named
outlet feeds) actually returns data, and logs which route it tried rather
than re-describing the fault. Not re-escalating as a new item:
`attribute-brain/todo/toronto-charities.md` R-192 (egress) and R-193
(`DATABASE_URL`/Neon quota) already carry the open question, unchanged
since 27 Oct; a thirteenth log entry restating it would change nothing.
R-213 (Neon backup skips) and R-170 (category-page mapping) are also
unchanged. All four remain Richard's decisions.

## No new researcher run since 26 Oct

`research/EVIDENCE.md` is still the 26 Oct pull; `content/QUEUE.md` is
unchanged since. The next researcher pull is due 2 Nov (Monday). Not
relevant to today's commission anyway — the weekly tracks run on schedule,
not from the queue (`QUEUE.md` line 3).

## Fixed-track backlog, carried forward

Reading the fixed tracks the way `CLIENT.md`'s dated-record rule says they
work — a newer issue supersedes the older one of the same track:
- `toronto-charity-news-2026-10-16` and `-10-23` — both stale, both
  undrafted, both superseded by today's issue below.
- `charity-events-toronto-week-of-2026-10-19` and `-10-26` — the latter is
  **current**, undrafted, same block; the next Monday issue (2 Nov) will
  supersede it if it ever drafts first.
- The two guide commissions held since 15/20 Oct
  (`volunteer-opportunities-toronto-students`, `donate-hair-toronto`) are
  not re-issued today — today is a fixed-track day, not a queue day — and
  pick back up on the next non-Monday/Friday commissioning run.

## Standing rules for the commission below

The five faults from `CLIENT.md` ("What the editors kept catching") apply
directly: invented reader beliefs, unsourced superlatives, invented
numbers/counts not matching a facts row, an H2 restating its own FAQ
question (not applicable to this surface's format, but the heading-list
check still applies to any subheads used), and any claim about this site's
own pages (events, category) not checked live this session.

- **The bare-intensifier family includes "actually"/"actual"** alongside
  "real"/"genuine(ly)" (RULINGS 2026-10-10, 2026-10-16, 2026-10-18) — delete
  as filler, never reword, unless the sentence draws an explicit contrast.
- **GRAMMAR.md's object-as-actor rule** (RULINGS 2026-10-18): no verb that
  needs intention, judgement or perception attached to a thing that cannot
  do it.
- No adjectives about the cause ("heartwarming", "vital", "inspiring") —
  `CLIENT.md`'s voice line: a local reporter listing what happened, not
  endorsing it.
- Only `/category/social-services/` among category pages, same restriction
  as every other commission until R-170 lands. Canadian spelling throughout.

## Commission: Friday news issue

**Slug:** `toronto-charity-news-2026-10-30`
**Working title:** Toronto charity news, 30 October 2026
**Track / intent tier:** Fixed Track 2 (`CLIENT.md`), weekly, Friday. Dated
news-roundup, not keyword-driven — not a `QUEUE.md` cluster. Reader intent:
someone checking what happened this week in Toronto's charity sector, or a
charity's own staff checking whether their organisation was covered.

**Angle (one sentence):** Five to twelve things that genuinely happened
this week involving a Toronto-area charity, food bank, fundraiser or
foundation, each one sourced to the outlet that actually reported it and
linked to that charity's profile on this site wherever the charity is in
our own directory.

**What it must cover (the per-item bar, in place of FAQ-style questions —
this surface has no FAQ):**
1. Did a named outlet (Toronto Star, CBC Toronto, CP24, Globe and Mail,
   BlogTO, Toronto Life, The Philanthropist, Future of Good, CharityVillage,
   or a hit from Google News RSS on "Toronto charity" / "nonprofit" /
   "food bank" / "fundraiser" / "foundation") actually publish this story
   this week? No item without a fetched, re-readable source.
2. Which charity is the story about, and does that charity's slug resolve
   in our own directory? Named with a profile link if it does; named
   without one if it does not — never a guessed URL.
3. What exactly did the outlet say — one or two sentences, restating the
   outlet's own facts, not the writer's gloss on them?
4. Is there a date on the story (published this week, or reporting
   something that happened this week)? An older story re-surfacing does not
   qualify.
5. Where the story concerns money, a closure, a controversy or a dispute,
   does the summary state only what the outlet printed, with no added
   verdict, sympathy, or editorial colour?
6. If fewer than five outlet-sourced items turn up this week, does the
   draft say so and publish what it has, rather than padding to the
   five-item floor with something uncited?

**Links it must earn:**
- The reporting outlet, linked, for every single item — no exception. An
  item with no outlet link does not ship.
- The charity's own profile `/profile/<slug>/` for every charity named,
  checked against the sitemap/DB before linking — unresolved, name without
  a link, never guess the slug.
- `/category/social-services/` only where a named charity genuinely sits in
  that category (the only category page `CLIENT.md` confirms is correctly
  mapped).
- No `/charity-events-toronto/` link unless an item is itself about an
  event on that page — this is the news track, not the events track.
- No link to a sister site unless the story itself concerns a place
  (torontoproperty.ca) or is about Attribute Media's own operations
  (attribute.media, which should not apply here).

**Facts needed, and where from:**
- Every item: Google News RSS for the five seed terms, plus the nine named
  outlets' own feeds, fetched live this run — not recalled from a prior
  week's issue or from training data.
- Each charity's directory slug: our own sitemap/DB, live query, not a
  guess based on the charity's name.
- Nothing else — this track carries no evergreen research dependency.

**Do not claim (binding):**
- No item invented or paraphrased from memory to fill the five-to-twelve
  count; an honest shorter issue beats a padded one.
- No charity named as the subject of a story unless the outlet's own piece
  names it.
- No profile link to an unresolved or guessed slug.
- No adjective about the cause, no "heartwarming"/"vital"/"inspiring", no
  editorial verdict on a controversy, closure or dispute beyond what the
  outlet printed.
- No claim about our own site's events or category pages not checked live
  this session.
- No bare "real"/"genuine(ly)"/"actually"/"actual" filler; no "where"
  pivots; no object-as-actor construction.
- Canadian spelling throughout.

## For Richard

No new `[NEEDS RICHARD]` item from this run. The standing operational
blocker (R-192 egress, R-193 `DATABASE_URL`/Neon quota) is now seventeen
calendar days old across twelve consecutive weekday sessions with zero
drafts produced since 13 October — carried forward above, not re-filed as
a new item, per the already-open todo entries. R-170 (category-page
mapping) and R-213 (Neon backup-skip recurrence) remain open on the same
todo file, unaffected by today's run.
