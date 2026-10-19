# Commissions — 19 October 2026 (Monday)

Written by the editor, commissioning run. Monday is a fixed-track day
(CLIENT.md, "the two tracks"): the weekly events roundup takes priority over
any queue guide, so this is today's only commission.

`research/EVIDENCE.md` (this week's pull) says the site's real constraint is
pipeline, not content supply — zero pages have published in five days, two
evergreen commissions (#6, #10) have sat undrafted since 15 Oct behind an
egress fault, and the honest recommendation is "do not treat this week as
write more guides." That reinforces, rather than overrides, CLIENT.md's own
fixed-track rule: Monday and Friday run regardless of queue state, so the
events issue is commissioned below; no queue guide is commissioned alongside
it today.

`research/editlog/EDITLOG.md` has six entries, four evergreen gates (13 Oct,
all APPROVED with fixes) and two NOTHING-TO-REVIEW gate runs (15, 16 Oct);
none yet on either weekly track, so there is no track-specific editor
feedback to carry forward. The five standing faults from CLIENT.md ("What
the editors kept catching") apply here as much as to a guide and are written
into this commission below: invented reader beliefs, unsourced superlatives,
invented numbers, an H2 restating its own FAQ question, and unchecked claims
about our own site. Two faults specific to the 13 Oct gates carry forward
too: the bare intensifier family ("real"/"genuine"/"actually"/"actual") and
RULINGS 2026-10-11's ban on restating a perishable homepage/feed snapshot
("four new openings... 13 October alone") as a published fact — an events
issue is built entirely from snapshot data, so this one applies directly:
state what each event's record says, not a count of how many appear "as of
today."

**Operational flag, carried forward and reconfirmed this session, not a new
finding:** WebFetch to `https://toronto-charities.ca/charity-events-toronto/`
failed this run — `getaddrinfo ENOTFOUND` — the identical fault logged as
R-187 (15 Oct) and R-192 (16 Oct) for the writer, and separately hit the
researcher's own session this week (EVIDENCE.md, 19 Oct). Both open items
already ask a person whether this session type's network policy allows
general web egress at all; nothing here changes that question or needs a
third copy of it.

**This commission routes around it rather than waiting on it.** CLIENT.md
already names the real source as "the `events` table," not the rendered
page — the page itself is only a view onto `events` joined to `charities`
(confirmed by reading `app/charity-events-toronto/page.tsx` and
`db/schema.ts` directly, both in this repo). The writer should query the
database directly rather than depend on a page fetch that has failed on
every session that has tried it this week. Query shape, matching the live
page's own filter exactly:

```
select events.slug, events.title, events.starts_at, events.ends_at,
       events.location_name, events.cost_text, events.registration_url,
       events.source_url, charities.display_name, charities.slug as charity_slug
from events left join charities on events.charity_id = charities.id
where events.status = 'approved' and events.starts_at >= now()
order by events.starts_at;
```

`registration_url` is the Eventbrite link wherever it is set (the page falls
back to `source_url` only when `registration_url` is empty — same rule
applies here). Run it with `DATABASE_URL` from `.env`, same connection every
other repo script uses.

**Second operational flag, open and unresolved, check before relying on the
DB either:** `attribute-brain/todo/toronto-charities.md` R-193 (18 Oct, open,
@richard): Neon's monthly compute allowance alert fired again 17 Oct. The
static rebuild (R-158) means most of the site doesn't touch Neon per view,
and the backup workflow's dump still succeeded this morning at the time R-193
was logged — not confirmed down — but a query made today could still fail.
If the query above fails or times out, that is this same open item surfacing
again, not a new fault: stop, do not substitute a cached or remembered event
list, and add one line to R-193 rather than opening a fresh item.

---

## Commission 1

**Slug:** `charity-events-toronto-week-of-2026-10-19`
**Working title:** Toronto charity events, week of 19 October 2026

**Cluster / intent tier:** Fixed weekly track (CLIENT.md Track 1), not an
Ahrefs cluster. Runs every Monday regardless of queue state. Purpose is
authority and outreach, not keyword ranking: dated, link-rich content the
static directory otherwise lacks, and every named charity is a fresh reason
it might link back once the outreach workers reach it (R-173).

**Angle (one sentence):** A reader who wants to know what's on in Toronto's
charity sector this week gets every approved event starting in the next
seven days, grouped by day, each one stating what it is, where, when, what
it costs, and linking straight to the Eventbrite page and the charity's own
profile on this site — no commentary, no filler between entries.

**Reader:** Someone deciding what to go to this week — a donor, a volunteer,
someone who follows a specific charity, or the charity's own staff checking
whether their event is listed correctly and might share the page that names
them. Not a reader who wants recommendations ranked or events editorialised;
this is a schedule, not a preview piece.

**What it must answer (3–6):**
1. What is happening, where, and when — every approved event with a start
   date in the next seven days from publish, grouped by day in date order.
2. What does it cost — the record's own `cost_text`, verbatim or lightly
   tidied, never inferred or rounded ("Free," a stated price, or "see
   Eventbrite" when the record has no figure).
3. Which charity is it, and does our database have a resolving profile for
   them? Every event has a `charity_id` or it doesn't — state the organiser
   as given either way, link the profile only when one resolves.
4. Where does the reader register or find out more — `registration_url`
   (the Eventbrite link) wherever the record has one, `source_url` only as
   a fallback when it doesn't.
5. Is this the full list this week, or a subset — if the query returns more
   events than the issue can reasonably list, say so and name the count
   rather than silently dropping entries.

**Links it must earn, every event:**
- The event's Eventbrite page via `registration_url` (outbound, required
  wherever the field is set — CLIENT.md Track 1: "the Eventbrite link"). Use
  `source_url` only when `registration_url` is empty, and say nothing if
  neither exists rather than linking a guessed URL.
- The charity's profile at `/profile/<charity_slug>/` wherever `charity_id`
  resolves to a charity — check the slug actually exists in the query result
  before linking; an event with no matched charity names the organiser as
  given, unlinked, never guessed.
- `/listing/<slug>/` for the event's own page on this site, alongside the
  Eventbrite link, not instead of it — the live page itself links each card
  to `/listing/<slug>/`, and CLIENT.md's brief for this track asks for both
  the Eventbrite link and the charity profile per event; the event's own
  listing page is additional, not a substitute for either.
- `/charity-events-toronto/` once, as the hub link for "see the full list" or
  equivalent — the evergreen page this dated issue supports (CLIENT.md: "the
  weekly issues are dated and support it").
- No category page at all. CLIENT.md: six of eight category pages list the
  wrong charities (R-170, still open); this track has no reason to link one
  in the first place, so the question doesn't arise, but the gate should
  check anyway.

**Facts needed, and where they come from:**
- Every field in the query above, read from the `events` and `charities`
  tables directly via `DATABASE_URL` — not retyped from memory of what the
  live page showed on an earlier visit, and not estimated from the egress
  fault's absence of a fetch.
- The published count of events and charities in the hub page's own
  metadata (`generateMetadata` in `app/charity-events-toronto/page.tsx`) is
  a live count, not this issue's to restate as a fixed figure — RULINGS
  2026-10-11's perishable-snapshot ban applies to our own data as much as a
  charity's homepage module.
- Nothing about an event beyond what its own row states. No attendance
  estimate, no "popular," no "don't miss" — CLIENT.md: "No commentary, no
  filler between entries."

**Do not claim (binding):**
- Do not open by stating what the reader expects, pictures or assumes about
  the week ahead — no invented reader belief (CLIENT.md fault 1).
- Do not call any event or charity "the biggest," "the must-see," "a
  highlight" or similar without a row/source that states it — CLIENT.md
  fault 2; an events list is exactly the place a "don't miss this one"
  aside creeps in as transition filler.
- Do not invent or round a figure the record doesn't give — no attendance
  count, no donation target, no cost not literally in `cost_text` (fault 3).
- Do not restate this week's live event count or charity count as if it were
  a fixed fact rather than a snapshot at time of writing (RULINGS
  2026-10-11; see "facts needed" above).
- Do not write an H2 (day-of-week groupings) that restates the date already
  stated inline in each entry under it — fault 4's shape applies to this
  track's own structure, not just an FAQ.
- Do not claim a category page, the events hub's description, or any other
  page on this site says something without checking it this run — fault 5.
- Do not link `registration_url` when the field is empty, and do not guess
  an Eventbrite URL from the event's title — no link beats a wrong one.
- Do not editorialise on cost, cause or format ("a great way to give back")
  — state what the event is, not a verdict on attending it.
- Canadian spelling and vocabulary throughout; no "vibrant," "heartwarming,"
  or adjectives about the cause (CLIENT.md voice).
- Title and dek carry the full date, year included — this issue is a record
  (CLIENT.md: "Dates in full, with the year").
- The bare intensifier family — "real," "genuine(ly)," "actually," "actual"
  — as filler with no genuine contrast (RULINGS 2026-10-10, 2026-10-16):
  delete, don't reword.

---

## For Richard

Nothing in today's commission needs his input beyond what is already open.
R-193 (Neon compute allowance, 18 Oct) decides whether today's DB query is
reliable; this commission flags it as a risk to this issue specifically, not
a new ask. R-187/R-192 (egress) already ask whether writer-type sessions get
general web access; this run reconfirms the same block on a commissioning
session and routes around it via direct DB query rather than asking the
question a third time. No new `[NEEDS RICHARD]` item.
