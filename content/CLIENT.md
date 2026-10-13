# Client config — toronto-charities.ca content engine

The portable agents live in attribute-brain (`wiki/agents/content-writer.md`,
`content-editor.md`, `content-researcher.md`, `content-designer.md`); the
reusable process is `wiki/processes/content-engine.md`. This file holds ONLY
what is specific to this site. Decided with Richard 13 Oct 2026.

| Key | Value |
|---|---|
| Site | toronto-charities.ca — directory of 12,758 CRA-registered charities in the Toronto area, with their events |
| Owner | Attribute Media (ours). No client sign-off; Richard approves the brief and the first issue of each track. |
| Reader | Someone in Toronto looking for what is on this week, which charity to give to or volunteer with, or what happened to a charity they know. Also the charity's own staff, who will share a page that names them. |
| Country / market | Canada (ca), Toronto and the GTA |
| Articles live at | /guides/<slug>/ from the `guides` table (slug, path, title, dek, content, status, published_at). [BUILD] The route `app/guides/[slug]/page.tsx` does not exist yet; only the hub does. |
| Hub page | /guides/ — lists every published guide |
| Meta description | the guide's `dek` |
| Publish mechanism | [BUILD] a GitHub Actions workflow in this repo that inserts into `guides` from `content/approved/`, then POSTs the EVENTS_BUILD_HOOK so the static pages rebuild. Guards per content-engine.md: duplicate slug check, live-URL check after the build, hub link check, failure opens an issue. |
| Internal link targets | 1. the charity's profile /profile/<slug>/ (every mention of a charity, no exceptions) 2. the event's page /listing/<slug>/ 3. the category page /category/<slug>/ 4. /charity-events-toronto/ |
| Outbound links | required, not optional: the news outlet for every story, Eventbrite for every event, the charity's own site where it has one. This site must read as a real publication, see wiki/projects/cross-site-link-plan.md (outbound section). |
| Sister sites | torontoproperty.ca (neighbourhood pages, when an event is tied to a place), attribute.media (About only). Never a client site unless the client is in the story. |
| Voice | A local reporter listing what is on. Plain, dated, specific. No "vibrant", no "heartwarming", no adjectives about the cause. HOW_TO_WRITE.md governs every sentence. |

## The brief — what this site is for

**Commercial goal:** authority. The site is the DR 32 hub the cross-site link
plan passes value from, and the test bed for the outreach workers (every
charity in the city linking to us, todo R-166). Content exists to give
charities a reason to link and share, to give Google a reason to index the
directory (61 of 3,528 checked URLs indexed on 12 Oct), and to put outbound
links to real outlets on a site that otherwise has none.

**What a win looks like, in order:**
1. A charity shares or links the page that names it. Each issue names 20 to 40
   charities, so each issue is 20 to 40 outreach openings for the workers.
2. The hub and the issues get indexed and bring the profile pages in with them.
3. "charity events toronto" (100/mo, difficulty 1) and the events page rank.

**Strategic context:** the directory has 12,758 same-shaped profile pages and
Google has indexed about sixty. Nothing on the site changes week to week except
the events table. The two weekly tracks give the site dated, changing,
link-rich pages, which is what the directory lacks.

## The two tracks (weekly, both)

**Track 1: This week's charity events in Toronto.** Published Monday morning.
Source: the `events` table, every approved event starting in the next seven
days (110 upcoming as of 13 Oct; 54 of them matched to a charity profile, the
rest name the organiser as given). Each event: date, time, place, what it is,
cost, the Eventbrite link, the charity's profile link. Grouped by day. No
commentary, no filler between entries. Title pattern: "Toronto charity events,
week of 20 October 2026". Slug: charity-events-toronto-week-of-2026-10-20.
Image: the Eventbrite image of the lead event (every upcoming event has one).

**Track 2: Toronto charity news this week.** Published Friday. Source: Google
News RSS for Toronto charity, nonprofit, food bank, fundraiser, foundation,
plus the outlets' own feeds (Toronto Star, CBC Toronto, CP24, Globe, BlogTO,
Toronto Life, The Philanthropist, Future of Good, CharityVillage). Each item:
one or two sentences saying what happened, a link to the outlet, a link to
the charity's profile. Five to twelve items. Nothing the researcher cannot
cite to an outlet is written. Title pattern: "Toronto charity news, 17 October
2026".

**Evergreen (not decided).** Ahrefs says the search demand around this site is
volunteering and giving things, not "charities": volunteer toronto 2,800/mo
(difficulty 2), volunteer opportunities toronto 1,800, where to donate clothes
toronto, where to donate books toronto, donate furniture toronto. If Richard
wants a third track it is volunteer-opportunities pages by cause and donate-
your-X pages, each listing the charities that take it with profile links.
Queue in QUEUE.md, status `hold`.

## Do NOT target — the cannibalisation map
- Profile pages: never write an article about one charity that would compete
  with its profile. Name it, link it, move on.
- The events page /charity-events-toronto/ owns "charity events toronto"
  as the evergreen term; the weekly issues are dated and support it.
- torontoproperty.ca owns neighbourhood and housing topics; the housing
  guides there link TC's housing category, not the other way round.

## Rules that are specific to this site
- Every charity named gets its profile link. The writer checks the slug exists
  in the sitemap before linking; a missing charity is named without a link,
  never linked to a guessed URL.
- Every event comes from the table. The writer never adds an event found
  elsewhere; it goes to the events source list instead.
- Every news item links its outlet. No outlet, no item.
- Dates in full, with the year. The issue is a record.
- The editor checks words and images together (content-engine.md step 5).

## Imagery (for the designer agent)
Track 1 uses the Eventbrite image of the lead event; no generated hero.
Track 2: one Canva image per issue from the brand kit, plain, dated, no stock
photos of hands or hearts. Charity logos do not exist yet (todo R-164).

## Known site quirks
- Static pages are cached for a week; nothing appears until the build hook
  fires. The publish leg must call it and then verify the live URL.
- Netlify's ignore rule skips builds for `.md`-only pushes, so drafts and this
  file never trigger a deploy.
- The outreach function is off (RESEND_API_KEY removed). Charities named in an
  issue are handed to the outreach workers, not emailed from here.
