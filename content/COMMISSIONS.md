# Commissions — 23 October 2026 (Friday)

Written by the editor, commissioning run. Friday is a fixed track day per
`content-engine.md`/CLIENT.md: today commissions only "Toronto charity news
this week," no guides from the queue.

**No new researcher run since 19 Oct.** `research/EVIDENCE.md` is unchanged
(SEO/keyword pull only — it has never covered weekly news sourcing, which is
this track's own job per CLIENT.md Track 2). `content/QUEUE.md` is
unchanged since 20 Oct. Nothing in either file bears on today's commission
beyond what is already folded into CLIENT.md.

## Connectivity, checked this session (new information, not a new escalation)

`WebFetch` to `https://toronto-charities.ca/guides/` failed
(`getaddrinfo ENOTFOUND`) and to `https://www.thestar.com/news/gta/` failed
separately ("unable to fetch") — the same fault R-187/R-192/R-193 log for
writer and gate sessions, now confirmed in a commissioning session too,
which had not been tested before. `WebSearch`, by contrast, worked and
returned results. `DATABASE_URL` and `ANTHROPIC_API_KEY` are both absent
from `env`, matching every prior session back to R-193. This matters for
today's commission specifically: Track 2 depends on `WebFetch` to each
outlet's own article and to each named charity's profile for the
slug-and-claim check, not on search results alone — the same route the
writer has failed on nine days running. Not filing a new item: R-192/R-193
already carry the underlying fault; this is the "now also confirmed for
commissioning sessions" line those items ask for, filed there, not here.

## Commission

**Slug:** `toronto-charity-news-2026-10-23`
**Working title:** Toronto charity news, 23 October 2026
**Track:** Fixed weekly, Track 2 (Friday) — not a QUEUE.md cluster, no
intent-tier scoring applies.

**Angle (one sentence):** A reader who wants to know what actually happened
to a Toronto-area charity, food bank, foundation or fundraiser this week —
funding, a closure, a new programme, an award, a controversy — gets five to
twelve short, dated items, each one anchored to a named outlet's own report
and, where the subject is a registered charity in our database, a link to
its profile.

**Reader:** Someone scanning for what moved in the local charity sector this
week — a donor, a charity's own staff checking if they were covered, a
reporter or funder doing a quick scan. Not a general-interest reader; they
want the fact and the source, not scene-setting.

**What it must answer:** for each of the five to twelve items —
1. What happened, stated as fact, in one or two sentences?
2. Which outlet reported it, and does the outbound link go to that outlet's
   own article (not a homepage or a section front)?
3. Which charity is this about, and does it have a profile in our database?
4. When did this happen — this calendar week, dated in the item?
5. Is there anything in the source that contradicts or qualifies the
   headline fact (a "pending" grant, a disputed figure) that the item must
   carry rather than smooth over?

**Links it must earn, every item:**
- The outlet's own article (outbound, required — CLIENT.md: "No outlet, no
  item"). Not the outlet's homepage, not a syndicated wire copy if the
  original is findable.
- The charity's profile `/profile/<slug>/` where the subject is a
  CRA-registered charity in our database — the writer checks the slug
  resolves before linking (sitemap or direct DB check); name without a link
  if it does not resolve. A subject that is not itself a registered charity
  (a city programme, a government funder, a corporate donor) is named
  without a profile link, never linked to a guessed slug.
- `/category/social-services/` only if a named charity is actually filed
  there — verified, not assumed, same restriction as every other commission
  while R-170 (category mapping) is open. No other category page.
- No link to `/charity-events-toronto/` unless an item is itself about an
  event listed there and the writer has read the live page that session and
  confirmed it — do not imply a connection otherwise.

**Facts needed, and where they come from:**
- Each item's fact comes from Google News RSS (Toronto charity, nonprofit,
  food bank, fundraiser, foundation) and the named outlets' own feeds
  (Toronto Star, CBC Toronto, CP24, Globe and Mail, BlogTO, Toronto Life,
  The Philanthropist, Future of Good, CharityVillage), per CLIENT.md Track
  2 — no other source substitutes.
- Five to twelve items, this calendar week only (17–23 Oct 2026). If fewer
  than five genuine, sourced items exist this week, say so in the issue
  rather than padding with an older or thinner story — CLIENT.md sets a
  range, not a quota to hit regardless of supply.
- Charity-to-profile matching: check the charity's name against our
  database before asserting a profile exists; a close-but-not-exact name
  match is not a match.

**Do not claim (binding):**
- No item without a named, linked outlet — a claim sourced only to a social
  post, a press release reproduced without independent coverage, or the
  writer's own paraphrase of a headline with no article behind it.
- No invented detail filling a gap the outlet's own article leaves open (an
  amount, a reason, a quote) — state what the source states, no more.
- No charity profile link on a guessed or unverified slug.
- No commentary or editorialising between items — CLIENT.md: "no
  commentary, no filler." One or two sentences of fact per item, nothing
  framing the week as a trend unless the sources themselves say so.
- No bare "real"/"genuine(ly)"/"actually"/"actual" as filler (RULINGS
  2026-10-10/16/18); no verb requiring intention or judgement given to a
  report, a page or a programme instead of the person or organisation
  behind it (RULINGS 2026-10-18, GRAMMAR.md object-as-actor rule).
- No category-page link other than `/category/social-services/`.
- Canadian spelling throughout.

## Held, not commissioned today

`donate-hair-toronto` (#10) and `volunteer-opportunities-toronto-students`
(#6) stay held exactly as 20–22 Oct left them — commissioned 15 Oct,
undrafted since, blocked on the same WebFetch/credential fault above, not
an editorial issue. They are not re-commissioned today because today is a
fixed-track day, not because the hold has changed; the next non-Monday,
non-Friday commissioning run picks them up again unchanged.
`donate-furniture-toronto` (#9) stays deliberately uncommissioned for the
same reason as the last three runs — no new supply into a pipeline that has
drafted nothing since 13 October.

## For Richard

Nothing new needs his input from this run specifically. R-192 (writer/gate
egress) and R-193 (`DATABASE_URL` absence, Neon quota exhaustion) already
carry the operational blocker; today adds one data point to that record —
the fault now confirmed in a commissioning session too, where only
`WebFetch` fails and `WebSearch` still works — logged above, not re-filed
as a new item. No new `[NEEDS RICHARD]` item.
