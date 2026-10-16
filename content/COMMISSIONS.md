# Commissions — 16 October 2026 (Friday)

Written by the editor, commissioning run. Friday is a fixed-track day
(CLIENT.md, "the two tracks"): the weekly news roundup takes priority over
any queue guide, so this is today's only commission.

No `research/EVIDENCE.md` exists yet — the researcher has not run — same
position as the 15 Oct commissioning run: a missing pack never blocks
commissioning, and it does not block this piece anyway, since the news
track is sourced live from outlets each week, not from Ahrefs evidence.
`content/QUEUE.md` itself says weekly tracks run on a schedule, not from the
queue, so nothing there changes today's pick.

`research/editlog/EDITLOG.md` has five entries, all evergreen guides; none
yet on either weekly track. The five standing faults from CLIENT.md ("What
the editors kept catching") apply here as much as to a guide and are
written into this commission below: invented reader beliefs, unsourced
superlatives, invented numbers, an H2 restating its own FAQ question, and
unchecked claims about our own site.

One operational flag, not a content one: `attribute-brain/todo/
toronto-charities.md` R-187 (15 Oct) recorded the writer's session that day
losing all live-fetch access (WebFetch DNS failures, proxy 403s on curl) and
drafting nothing rather than drafting unverified. This piece is entirely
built from live fetches (RSS feeds, outlet pages, our own events/profile
pages) — if the writer's session hits the same egress failure, it must stop
and log it the same way R-187 did, not substitute search-snippet
paraphrase for a read outlet page.

---

## Commission 1

**Slug:** `toronto-charity-news-2026-10-16`
**Working title:** Toronto charity news, 16 October 2026
**Cluster / intent tier:** Fixed weekly track (CLIENT.md Track 2), not an
Ahrefs cluster. Runs every Friday regardless of queue state. Purpose is
authority and outreach, not keyword ranking: dated, link-rich content the
static directory otherwise lacks, and 20–40 named charities handed to the
outreach workers (R-173) as a fresh reason each one might link back.

**Angle (one sentence):** A reader who wants to know what happened this
week in Toronto's charity and nonprofit sector gets five to twelve short,
plainly stated items, each one naming the charity involved, saying what
happened, and linking straight to the outlet that reported it and to the
charity's own profile on this site.

**Reader:** Someone scanning for what is new in the sector this week —
donors, charity staff checking what is being said about peers, and the
charities named, who may share or link the page that names them. Not a
reader who wants commentary or analysis; this is a record of the week, not
an op-ed.

**What it must answer (3–6):**
1. What concretely happened this week, dated, at each named charity or
   funder — a grant, a closure, a fundraising result, a programme launch, a
   leadership change, a report or a controversy — not a general mention.
2. Which outlet reported it, so the reader can read the full story.
3. Which of our own charity profiles does this item belong to, if the
   named organisation is in our 12,758-charity database?
4. Where the story involves a number (dollars raised, people served, a
   grant size), what exact figure did the outlet itself state, with its own
   date?
5. Is this story still live and accurate as of publication, or has it been
   updated or corrected since the outlet first ran it?

**Links it must earn, every item:**
- The outlet's own article (outbound, required, no exceptions — CLIENT.md:
  "no outlet, no item"). Toronto Star, CBC Toronto, CP24, the Globe,
  BlogTO, Toronto Life, The Philanthropist, Future of Good, CharityVillage,
  or the Google News RSS source story itself if one of those doesn't carry
  it.
- The named charity's profile at `/profile/<slug>/` — check the slug
  resolves in the live sitemap/database before linking; if the charity is
  not in our database (a funder, a government body, an umbrella group with
  no CRA registration here), name it without a link rather than guessing a
  URL.
- `/category/social-services/` only, and only where a named charity is
  actually filed there in the database — every other category page is
  wrong (CLIENT.md, "Category pages are wrong, do not link them", R-170
  still open) and stays unlinked from this piece.
- No link to `/charity-events-toronto/` or any event page unless the writer
  has read that live page this week and the story is actually about an
  event listed on it — do not imply a connection that doesn't exist.

**Facts needed, and where they come from:**
- The stories themselves: Google News RSS searched for "Toronto charity",
  "Toronto nonprofit", "Toronto food bank", "Toronto fundraiser", "Toronto
  foundation", plus a direct check of each named outlet's own site/feed
  for the same week. Five to twelve items, drawn from whichever actually
  ran stories this week — do not pad to twelve by loosening what counts as
  a Toronto charity story, and do not cut below five without checking every
  outlet first.
- Every charity name mentioned in a candidate story, checked against our
  charities table for a CRA registration and a resolving profile slug
  before it is linked or called "a Toronto charity."
- Any dollar figure, headcount or percentage: the outlet's own stated
  number, with the outlet's own date, quoted or closely paraphrased — never
  rounded up, combined across stories, or restated as a different unit
  (e.g. turning "meals" into "dollars" by assuming a cost per meal nobody
  stated).
- Whether a named charity's event this week also appears on our own
  `/charity-events-toronto/` page: check the live page itself, do not
  assume from the news story alone.

**Do not claim (binding):**
- Do not open any item by stating what the reader assumes, expects or
  pictures — no invented reader belief (CLIENT.md fault 1).
- Do not call any charity "the best known," "the largest," "a leading" or
  similar without a row/source that states it — CLIENT.md fault 2, and a
  roundup item is exactly the place this creeps in as filler before the
  real sentence.
- Do not invent or round a number not stated by the outlet — no donation
  total, attendance count or "the biggest fundraiser this quarter"
  invented or inferred (fault 3).
- Do not write an item for a story the researcher cannot cite to a named
  outlet — CLIENT.md is explicit: "Nothing the researcher cannot cite to an
  outlet is written."
- Do not claim an event, programme or page exists on toronto-charities.ca
  (our events page, a category page, a profile) without checking it live
  that day — fault 5, and specifically: do not link any category page
  other than social-services.
- Do not editorialise on a charity's conduct, controversy or closure
  beyond what the outlet itself reported — report what happened, not a
  verdict on it.
- Canadian spelling and vocabulary throughout (CLIENT.md voice: no
  "vibrant," "heartwarming," or adjectives about the cause).
- Title and dek carry the full date, year included — this issue is a
  record, not an evergreen page (CLIENT.md: "Dates in full, with the
  year").

---

## For Richard

Nothing in today's commission needs his input. The piece is a straight
application of the Track 2 brief Richard already approved (CLIENT.md, 13
Oct), and its one open structural risk — the category-page mapping, R-170
— is handled the same way the 15 Oct guide commissions handled it:
`/category/social-services/` only. No new `[NEEDS RICHARD]` item this run.
