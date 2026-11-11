# Toronto Charities: the client file

Everything a writer needs about this site, and nothing about how to write. How
to write is Quill's own brief at `~/github/workforce/agents/quill.md`. What a
page of a given type must contain is the page standards in
`~/github/attribute-brain/wiki/standards/`. The reusable publishing process is
`~/github/attribute-brain/wiki/processes/content-engine.md`. What is written here
is only what is true of toronto-charities.ca, plus the surface knowledge the two
weekly tracks have produced. Decided with Richard on 13 October 2026; reshaped to the
client-file order on 10 November 2026.

## The business

toronto-charities.ca, a free public directory of the 12,758 CRA-registered
charities in the Toronto area, with their events. Built May 2026 and run by
Attribute Media, with Toronto Property credited in one footer line at 70%
opacity. There is no client to sign anything off: Richard approves the brief and
the first issue of each track.

Guides are at `/guides/<slug>/`, rendered by `app/guides/[slug]/page.tsx` from
the `guides` table (slug, path, title, dek, content, status, published_at) and
listed on the hub at `/guides/`. The meta description is the guide's `dek`. Four
are published: volunteering in Toronto, soup kitchens and food banks, where to
donate clothes, where to donate books (`content/published/`).

Publishing runs from `.github/workflows/publish-approved-guides.yml`: it inserts
into `guides` from `content/approved/`, then POSTs the EVENTS_BUILD_HOOK so the
static pages rebuild. Its guards, per `content-engine.md`: duplicate slug check,
live-URL check after the build, hub link check, and a failure opens an issue.

Its job in the fleet is authority. The site is the DR 32 hub the cross-site link
plan passes value from, and the test bed for the outreach workers. Content
exists to give a charity a reason to link and share, to give Google a reason to
index the directory, and to put outbound links to real outlets on a site that
otherwise has none.

## Who is reading

Someone in Toronto looking for what is on this week, which charity to give to or
volunteer with, or what happened to a charity they know. Also the charity's own
staff, who will share a page that names them.

The market is Canada, Toronto and the GTA. Canadian spelling and vocabulary: not
rubbish, programme, car park, jumper or flat.

What they actually search for is not "charities". It is volunteering and giving
things away: volunteer toronto 2,800 a month at difficulty 2, volunteer
opportunities toronto 1,800, where to donate clothes toronto, where to donate
books toronto, donate furniture toronto (Ahrefs, Canada, 13 October 2026).

## How they sound

A local reporter listing what is on. Plain, dated, specific. No "vibrant", no
"heartwarming", no adjectives about the cause.

Dates in full, with the year, because an issue is a record. No commentary and no
filler between entries.

## The owner's decisions, kept

The site is ours, so there is no owner to quote. What stands in that place is
what Richard decided on 13 October 2026, kept in his own order.

> "A local reporter listing what is on. Plain, dated, specific."

What a win looks like, in order:

1. A charity shares or links the page that names it. Each issue names 20 to 40
   charities, so each issue is 20 to 40 outreach openings for the workers.
2. The hub and the issues get indexed and bring the profile pages in with them.
3. "charity events toronto" (100 a month, difficulty 1) and the events page
   rank.

The reason the tracks exist: the directory has 12,758 same-shaped profile pages
and Google has indexed about sixty (61 of 3,528 checked URLs on 12 October
2026). Nothing on the site changes week to week except the events table. Two
weekly tracks give the site dated, changing, link-rich pages.

## The figures

No `facts.yml` in this repo. Two sources, and a writer uses no other:

- The database. Every event comes from the `events` table and every charity from
  its profile row. A figure about the directory is counted, never estimated.
- `~/github/attribute-brain/wiki/clients/toronto-charities.md`, which has the
  standing counts with the date each was checked: 12,758 charities, 5,531 with a
  website, 2,371 with an email found, 21 claimed listings, DR 32 with 453
  referring domains, 1,014 charity logos held (16 October 2026).

Website truth, from the same page: every charity row has `website_status`,
`checked_at` and `redirects_to`. A dead address is never published as a dead
charity. The page says a charity has no current site only after a search found
none.

## What this site does not claim

- Nothing a researcher cannot cite to an outlet. No outlet, no item.
- No invented belief about the reader. "Most people picture a soup ladle" was
  cut: nobody said that. Never open by telling the reader what they assume.
- No unsourced superlative, which turns up most often in the sentence above a
  list: largest, best known, the one people think of first. If no facts row says
  it, it goes.
- No invented number or comparison. Costs, waiting times, counts of roles, "the
  shortest commitment of any charity here". Every figure comes from a facts row
  or it does not appear.
- No claim about our own site that has not been checked. The events page does
  not list book sales, and the category pages are wrong (below). Check our own
  pages like any other source.
- No charity profile link that was guessed. The writer checks the slug is in the
  sitemap; a charity whose slug is missing is named without a link.

These faults came out of four drafts, four editor passes and 149 sentence edits
on 13 October 2026. A writer who avoids them saves a pass. One of the five is
about shape rather than truth: an H2 that restates the FAQ question below it.
Read the headings as a list before handing over, and if two say the same thing,
one goes.

## What we do not know yet

- **Nothing has published since 13 October 2026.** The scheduled routines fire
  and the agents read, decide and log correctly, but the cloud sessions have no
  network: WebFetch gets `ENOTFOUND` on every host, our own site included. Four
  consecutive researcher sessions hit it (`QUEUE.md`, 9 November 2026; brain
  page, todo R-187 and R-192). A writer working here cannot check a live URL and
  has to say so.
- Which evergreen cluster comes next, and whether a row's difficulty has drifted
  enough to change the order. `QUEUE.md` is re-ranked against Ahrefs on each
  researcher run and is the only answer to that; it holds the status of every
  cluster, and Richard said go on the queue on 13 October 2026.

---

The rest of this file is the surface specification for the two tracks: what each
issue contains, what it links, and the quirks of this site. It is machinery, not
writing.

## The two tracks (weekly, both)

### Track 1: this week's charity events in Toronto

Published Monday morning. Source: the `events` table, every approved event starting in the next seven
days (110 upcoming as of 13 Oct; 54 of them matched to a charity profile, the
rest name the organiser as given). Each event: date, time, place, what it is,
cost, the Eventbrite link, the charity's profile link. Grouped by day. No
commentary, no filler between entries. Title pattern: "Toronto charity events,
week of 20 October 2026". Slug: charity-events-toronto-week-of-2026-10-20.
Image: the Eventbrite image of the lead event (every upcoming event has one).

### Track 2: Toronto charity news this week

Published Friday. Source: Google News RSS for Toronto charity, nonprofit, food bank, fundraiser, foundation,
plus the outlets' own feeds (Toronto Star, CBC Toronto, CP24, Globe, BlogTO,
Toronto Life, The Philanthropist, Future of Good, CharityVillage). Each item:
one or two sentences saying what happened, a link to the outlet, a link to
the charity's profile. Five to twelve items. Nothing the researcher cannot
cite to an outlet is written. Title pattern: "Toronto charity news, 17 October
2026".

An event found anywhere else goes to the events source list, never into an
issue.

### Track 3: the evergreen guides

Richard said go on 13 October 2026, and four are published. The shape: one page
per cluster, either volunteering by cause or donating a particular thing, each
listing the charities that take it with a link to every profile named. Each
carries one figure drawn from its own facts file and a strip of the charities it
names (brain page, 16 October 2026). The clusters, their keywords and their
status are in `QUEUE.md`, which the researcher re-ranks against Ahrefs on every
run.

## Links

| | |
|---|---|
| Internal link targets | 1. the charity's profile /profile/<slug>/ (every mention of a charity, no exceptions) 2. the event's page /listing/<slug>/ 3. the category page /category/<slug>/ 4. /charity-events-toronto/ |
| Outbound links | required, not optional: the news outlet for every story, Eventbrite for every event, the charity's own site where it has one. This site must read as a real publication, see wiki/projects/cross-site-link-plan.md (outbound section). |
| Sister sites | torontoproperty.ca (neighbourhood pages, when an event is tied to a place), attribute.media (About only). Never a client site unless the client is in the story. |

## Do NOT target — the cannibalisation map
- Profile pages: never write an article about one charity that would compete
  with its profile. Name it, link it, move on.
- The events page /charity-events-toronto/ owns "charity events toronto"
  as the evergreen term; the weekly issues are dated and support it.
- torontoproperty.ca owns neighbourhood and housing topics; the housing
  guides there link TC's housing category, not the other way round.

## Category pages are wrong, do not link them (13 Oct 2026)

Six of eight category pages list charities from an unrelated cause: housing
shows animal rescues, animal-welfare shows synagogues, food-hunger shows
environmental groups. The May import guessed the CRA code mapping. Only
`/category/social-services/` is verified correct. Until the remap runs
(attribute-brain todo R-170) the only category link allowed is that one.

## Imagery

Track 1 uses the Eventbrite image of the lead event; no generated hero.
Track 2: one Canva image per issue from the brand kit, plain, dated, no stock
photos of hands or hearts. 1,014 charity logos are held, each taken from the
charity's own domain (brain page, 16 October 2026).

## Known site quirks
- Static pages are cached for a week; nothing appears until the build hook
  fires. The publish leg must call it and then verify the live URL.
- Netlify's ignore rule skips builds for `.md`-only pushes, so drafts and this
  file never trigger a deploy.
- The outreach function is off (RESEND_API_KEY removed). Charities named in an
  issue are handed to the outreach workers, not emailed from here.
- The editor checks words and images together (`content-engine.md` step 5).
