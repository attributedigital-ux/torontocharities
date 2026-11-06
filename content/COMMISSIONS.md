# Commissions — 6 November 2026 (Friday)

Written by the editor, commissioning run. Friday is a fixed-track day per
`CLIENT.md`: Track 2, "Toronto charity news this week," takes priority over
anything from `QUEUE.md`.

## Connectivity, checked this session

`curl -m 10` to `https://toronto-charities.ca/` and
`https://toronto-charities.ca/charity-events-toronto/` both returned `000`
(connection never completed, not a non-200). The proxy status endpoint logs
the identical `connect_rejected`/"gateway answered 403 to CONNECT" shape
against a wide, unrelated spread of hosts in the same window (mcp.monday.com,
mcp.amplitude.com, mcp.docusign.com, mcp-server.egnyte.com,
mcp.similarweb.com and others), policy `"selective": false` — the same
blanket block logged every session since 21 Oct. `DATABASE_URL` and
`ANTHROPIC_API_KEY` both confirmed absent (presence check). Cross-checked
`attribute-brain/todo/toronto-charities.md` directly: R-192 (egress) and
R-170 (category-page mapping) both still open, unchanged since the dates
cited in prior entries; R-193/R-213 (Neon quota) remain closed per 5 Nov's
check.

This is the twenty-fourth consecutive weekday session this fleet has hit the
fault across its roles (15, 16, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30 Oct,
2 Nov, three sessions on 3 Nov, three sessions on 4 Nov, three sessions on
5 Nov, now this one) — twenty-five calendar days, no writer run producing a
draft since 13 October. Not re-escalating as a new item: R-192/R-170 already
carry the open egress/`DATABASE_URL`/category-remap questions and a further
log entry restating them would change nothing. Both remain Richard's
decisions, not something a commission can fix. A commission is a brief, not
a draft, and does not itself need live egress — written below in full
regardless — but no commission below can clear its facts-needed section
until the block lifts, exactly as every commission since 13 October has not.

## What the last ten EDITLOG entries say the writer keeps getting wrong

Checked `research/editlog/EDITLOG.md`'s tail: every entry since 2 Nov is a
WRITER/DESIGNER/GATE run finding nothing to review, because nothing has
drafted since 13 October. There is no new prose fault to add — the only
standing lessons are the five faults and the category-link restriction
already in `CLIENT.md`, restated below rather than re-derived.

## Commission: Toronto charity news, 6 November 2026

**Slug:** `toronto-charity-news-2026-11-06`
**Cluster / intent tier:** fixed Track 2 (weekly news), not a `QUEUE.md`
cluster.
**Publish day:** Friday, 6 November 2026.

**The angle, in one sentence:** what actually happened this week to a
charity operating in Toronto, as five to twelve short items, each one
sourced to the outlet that reported it, with nothing written that the
outlet did not say.

**Who it is for:** someone in Toronto who wants to know what happened to a
charity they know, give to, or volunteer with — not a donor-appeal reader,
a news reader.

**What it must answer, per item:**
1. What happened (one or two sentences, stated plainly, no editorialising).
2. Which charity it concerns, and whether that charity has a profile on this
   site.
3. Where the reader can read the full story.

**Links every item must carry:**
- The outlet that reported it (Toronto Star, CBC Toronto, CP24, Globe and
  Mail, BlogTO, Toronto Life, The Philanthropist, Future of Good,
  CharityVillage, or the Google News RSS source story itself). No outlet
  link, no item — this is CLIENT.md's hard rule, not a style preference.
- The charity's profile `/profile/<slug>/`, checked against the sitemap/DB
  before linking. If the slug does not resolve, name the charity without a
  link; never guess the URL.

**Facts needed and where they come from:**
- Google News RSS for "Toronto charity," "Toronto nonprofit," "Toronto food
  bank," "Toronto fundraiser," "Toronto foundation."
- The outlets' own feeds, listed above.
- A live slug check against the site's sitemap or `DATABASE_URL` for every
  charity named.
All three routes are live-fetch or DB-query dependent and are confirmed
blocked this session (see Connectivity above). Nothing here can be drafted
until the block lifts.

**Do not claim:**
- No item without a named outlet carrying the story. A Google News RSS
  snippet alone is not a source; follow it to the outlet's own page before
  citing it.
- No charity named without its profile link checked live against the
  sitemap/DB first; an unresolved slug is named, never linked to a guess.
- No number, quote, or detail beyond what the outlet itself printed — no
  rounding up, no inferred cause, no invented spokesperson line.
- No adjective about the cause ("heartwarming," "vital," "beloved").
  CLIENT.md's voice rule: a local reporter listing what happened, not an
  appeal.
- No unsourced superlative ("the city's largest," "best known") unless the
  outlet's own story states it with its own attribution — then attribute it
  to the outlet, not to us.
- No category-page link except `/category/social-services/` (R-170 still
  open; every other category page misattributes charities to the wrong
  cause).
- No claim about this site's own pages (the events page, a category page)
  that is not checked live first — CLIENT.md fault #5.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler.
- No personification: nothing a page "carries," "holds," or "shows" in the
  sense of deciding what to include (RULINGS 2026-11-03).
- Dates in full, with the year. Canadian spelling throughout.
- If fewer than five genuine, outlet-sourced items turn up this week, publish
  that fewer number and say so in the facts file — never pad to five with a
  tangential or thin item.

**[NEEDS RICHARD]:** none new this run. The standing blocker (R-192 egress;
the writer/editor session type's missing `DATABASE_URL`) already covers why
this commission cannot be drafted; it is not a per-piece question and is not
being added as one, per content-editor.md's own rule against one
`@richard` item per piece.

## Carried forward, not re-detailed today (standing evergreen commissions, still blocked)

Friday is a fixed-track day, so no new `QUEUE.md` cluster is commissioned
today, per `CLIENT.md`/`content-engine.md`. The three standing evergreen
commissions remain open and blocked on the same fault, full detail in git
history rather than re-typed here:

- **#6 `volunteer-opportunities-toronto-students`** — commissioned 4 Nov.
- **#9 `donate-furniture-toronto`** — commissioned 3 Nov. WINNABLE NOW per
  2 Nov's live SERP re-check, but commission it as "winnable, modest traffic
  ceiling" (AI Overview + local pack + PAA above organic), never as an easy
  win.
- **#10 `donate-hair-toronto`** — commissioned 3 Nov.

The Monday events-track backlog (weeks of 19/26 Oct, 2 Nov) and the prior
Friday news-track backlog (weeks of 16/23/30 Oct) remain superseded by
whichever issue of each track drafts first once the block lifts, per
CLIENT.md's dated-record rule — not reissued here.

## Standing rules for every commission above

Unchanged since 4/5 Nov, restated once rather than per brief:
- CLIENT.md's five faults (invented reader beliefs, unsourced superlatives,
  invented numbers/comparisons, FAQ-restating H2s, unchecked claims about
  our own site) apply directly.
- Bare-intensifier family ("real"/"genuine(ly)"/"actually"/"actual") deleted
  as filler, never reworded, unless the sentence draws an explicit contrast.
- GRAMMAR.md's object-as-actor rule (RULINGS 2026-10-18, 2026-11-03): no
  page "says" in the sense of deciding, no table "shows" beyond its plain
  contents — name the person, or use has/is in/shows plainly.
- No adjectives about the cause. Canadian spelling throughout.
- Only `/category/social-services/` among category pages, verified for that
  specific charity, never guessed (R-170 still open).
- Every charity named gets its profile link, checked against the
  sitemap/DB before linking; unresolved slugs are named without a link.
- A category, label or taxonomy is a claim (RULINGS 2026-11-01): no
  eligibility stated without a source that actually defines it.

## For Richard

No new `[NEEDS RICHARD]` item from this run. The standing operational
blocker (R-192 egress; the writer/editor session type's missing
`DATABASE_URL`) is now twenty-five calendar days old across twenty-four
consecutive weekday sessions with zero drafts produced since 13 October,
and remains his decision alone: either this session type gets general web
egress, or `DATABASE_URL` is provisioned to it, or both. R-170
(category-page mapping) remains open on the same todo file, unaffected by
today's run.
