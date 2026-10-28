# Editlog — toronto-charities.ca

One entry per editor pass: slug, date, what was bounced or fixed, the rule it broke.

---

## soup-kitchen-volunteer-toronto — 13 October 2026 — APPROVED with fixes

36 sentence-level edits applied by the editor. Every source re-fetched: Daily
Bread (individual and group pages), North York Harvest, Second Harvest, The
Stop, Scott Mission, Ontario food handler, Toronto Public Health, TDIN,
Who's Hungry 2025. All 31 links returned 200 after the fixes below; all eleven
profile slugs resolve. `prose_gate.py` exits 0. FAQ answers 214 to 250 words,
answer in sentence one. JSON-LD FAQPage now matches the visible text
character for character.

**What broke, and the rule, so it does not come back:**

1. **You wrote a count you had not counted.** The lede and the first FAQ both
   said Daily Bread lists "five individual volunteer roles" and named five.
   The page lists six (Sorting, Picking, Prepping, Assisting, Special Events,
   Food Bank) and your own facts row 2 lists all six. A number in a sentence
   is a claim; count it against the row, not against the sentence you just
   wrote. Fixed to six, and "four happen out of sight" to five.

2. **You broke your own NOT-claimed list three times.** The facts file says
   "No claim that any charity is currently short of volunteers", and the first
   FAQ opened "the roles that go unfilled are sorting, picking, driving and
   dishwashing". The NOT-claimed section is not a disclaimer, it is a list of
   sentences you may not write. Also removed: "wash up" and "dishwashing",
   which appear on none of the eleven pages.

3. **Invented economics, in three places.** "six applications produce five
   wasted conversations", "the application cost falls on the charity and a
   volunteer who stops after two weeks is a loss", and "the screening,
   references and trial shifts the regular roles require cost the charity
   more than a single shift returns". No charity publishes any of this. A
   number or a cost you reasoned your way to is an invented statistic
   (HOW_TO_WRITE 4, COPY_STANDARD truth rule).

4. **Invented scenes and invented beliefs.** "the person washing lettuce
   beside the certified staff member", "a long-serving supervising
   volunteer", "everyone holding a knife", "a pallet truck in sight",
   "Neither is a demonstration kitchen", "the one-off is rarer than people
   expect", "most people searching for a soup kitchen shift want the
   one-off". Never invent a belief in order to correct it, and never add a
   detail because it makes the picture clearer.

5. **Unsourced superlatives.** "the deepest version of that in Toronto",
   "the cleanest version of that in Toronto", "the job nobody else volunteers
   for", "Sorting is the role the most Toronto food charities list" (also
   ungrammatical). If you cannot point at the row that ranks them, do not
   rank them.

6. **One claim contradicted by your own next paragraph.** "the big ones
   barely see the public at all", two paragraphs above Daily Bread's own
   client check-in and check-out role.

7. **A dead internal link and a wrong one.**
   `/guides/volunteer-toronto/` returns 404, that guide is not written yet.
   `/category/food-hunger/` returns 200 but lists 46 charities that are
   almost entirely environmental (10,000 Trees For the Rouge, Oceana Canada,
   Friends of the Rouge Watershed); Daily Bread, North York Harvest, Second
   Harvest and The Stop are not in it. The anchor read "every registered food
   and hunger charity in the Toronto area", false twice over. Both links
   removed; the social services category (1,394 organisations, verified) now
   carries the sentence, dated. A 200 is not proof a link is right: open the
   page and check it holds what the anchor says it holds.

8. **Two figures from the same site, used inconsistently.** Daily Bread's
   individual page says the public food sorts happen "three or four times a
   year"; its group page says "three ... each year". The draft used both. Where
   a source contradicts itself, use one figure and drop it where it is not
   load-bearing. Also fixed: "11 or lower" as an age floor, which no page gives.

9. **Small accuracy slips.** "phones both of your references" (Scott Mission
   says contacts); "cannot sell you one" (the City's programme is closed, not
   priced); "has stopped taking individual volunteers" (St. Felix says "at
   this time"); "needs a licence rather than a shift pattern" (no page says
   it); "The Stop's kitchen shifts run three to five hours" (that is all its
   shifts); "counted 4.1 million ... in Who's Hungry 2025" (reported).

10. **Markup the writer left unfinished.** No table of contents and no anchor
    ids on the H2s (GUIDE_ARTICLE_SPEC section 3), both added. The meta
    description carried no target term; rewritten to 146 characters leading
    with the answer, and the Article JSON-LD description synced to it.

11. **Headings read as a list.** Four H2s were index labels that restated
    their matching FAQ question ("How old you have to be" over "What age do
    you have to be to volunteer at a food bank in Toronto?"). H2s are now the
    answer, FAQ H3s stay as the question.

**For Richard:** the `/category/food-hunger/` mapping is broken in the
database, not in this draft. Until it is fixed, no guide can link a reader to
the food charities by category, and the category page itself is wrong for
anyone who lands on it from search. Already in the facts file and in
attribute-brain `todo/toronto-charities.md`.

---

## where-to-donate-books-toronto — 13 October 2026 — APPROVED with fixes

29 sentence-level edits. Sources re-fetched and read in full this session: TPL,
Friends of TPL, Children's Book Bank, Trinity (both the donating-books page and
the sale page), Victoria, Diabetes Canada, Salvation Army, Book Clubs for
Inmates, Correctional Service of Canada. All 27 links checked: 25 return 200 to
curl, and the two that refuse it (trinity.utoronto.ca, Cloudflare 403;
canada.ca, 000 on redirect) were read in full through the fetch tool, which is
the standing exception the facts file already names. Eight profile slugs resolve.
`prose_gate.py` exits 0, 5 warns, each a defining clause, not a verdict. FAQ
answers 205 to 213 words, answer in sentence one. FAQPage JSON-LD regenerated
from the edited visible text and verified character for character.

**What broke, and the rule, so it does not come back:**

1. **You attributed one organisation's rules to another's page.** "its
   education programs page lists what institutional libraries want: ... Books
   must not be markedly old, must have no CD-ROMs attached, and must not be
   textbooks." Those three criteria are published by Book Clubs for Inmates.
   The canada.ca page carries the accepted-materials list and the
   violence/hate-speech refusal, nothing else; I re-fetched it to be sure. Your
   own rows 40 and 42 to 44 are each right, the sentence merged them. You also
   dropped BCFI's qualifier "with the exception of classic literature", which
   changes the rule. Where two rows share a subject, the sentence names the
   source that published the words in it.

2. **Four claims with no row behind them.** "Half an hour sorting the boxes at
   home saves two trips across town." "Every organisation in the city that
   accepts books draws the line somewhere different" (your own NOT-claimed list
   says four Toronto literacy charities were never checked). "Book Clubs for
   Inmates is the Toronto charity people think of first for this." "This is the
   right home for six good novels and the wrong home for sixty." A number you
   reasoned your way to is an invented statistic; so is a claim about what
   people think. All four cut.

3. **A claim about our own site that is not true today.** "Several of these
   organisations tie their intake dates to a sale or a drive, and those turn up
   on our Toronto charity events page as they're announced." I read the live
   events page: 0 of the listings mention a book sale. Link our own pages for
   what they hold, not for what we hope they will hold.

4. **Unsourced superlatives and invented detail, the same fault as the
   soup-kitchen draft.** "the plainest [test] published by anybody", "the series
   children actually queue for", "A bound set has effectively no resale value",
   "A book box that a volunteer cannot lift off a trolley is a box that sits in
   a corridor", "A full box gets rained into and the steward clears it out".
   This is now twice in one night. Before a ranking or a consequence, point at
   the row.

5. **Generalised from one year to every year.** "Trinity alone puts more than
   50,000 books on tables for five days every October". The row is the 2026
   sale. Now "More than 50,000 books go out over the five days of the 2026
   Trinity sale."

6. **A quoted figure, in the json only, that contradicts the source.** The
   `hub_blurb` said Trinity and Victoria take boxes "for their October sales".
   Victoria's sale runs in September. The hub blurb is copy and gets the same
   check as the body.

7. **Headings read as a list and four of eight were built the same way.**
   "BOOKEnds takes...", "The college book sales will take...", "Thrift shops
   take...", "Little Free Libraries take...". Three rewritten. Also gone:
   "Where to donate books in Toronto when they're children's books", a heading
   bent round the keyword until it stopped being English, now "Where to donate
   children's books in Toronto".

8. **Two sentences that announce rather than say** (HOW_TO_WRITE 16): "One
   change matters to anyone who last checked a few years ago: as of 1 January
   2026..." and "None of these limits is arbitrary." State the fact.

9. **A broken sentence and two unclear referents** (HOW_TO_WRITE 3, 20): "Do
   not carry books to the Regent Park storefront at 585 Dundas St E, which the
   organisation asks for in writing" (the verb takes no object), "is part of a
   bill the charity puts at roughly $200,000 a year cleaning up around them",
   and an answer opening "Yes, two of them do" with no antecedent.

10. **Markup the writer left unfinished.** No table of contents, though the H2
    ids were already there and the sibling clothes draft has one
    (GUIDE_ARTICLE_SPEC section 3). Added. The meta description carried no
    target term and used "take" three times in 150 characters; rewritten to 145
    characters leading with the keyword. Trinity's sale page supplied rows 22
    and 23 and was not linked anywhere; it is now the anchor on "book sale".

11. **For me, not the writer.** My own first pass at fix 8 wrote "Victoria
    College gives the reason on its own page" two sentences after "Victoria
    College asks for banker's boxes ... so its volunteers can lift them", and
    fix 5 left "puts its takings" beside "puts more than 50,000 books". Caught
    by reading every rewritten sentence in its paragraph after the scripts went
    green, per RULINGS 2026-10-13. Do that read every time.

**Nothing for Richard to decide on this piece.** Three rows added to the facts
file (52 to 54) and a note that the Victoria page is JavaScript-rendered: curl
returns an empty shell, the content is at
`library.vicu.utoronto.ca/friends/blog/index.php?rest_route=/wp/v2/pages/2413`.

---

## where-to-donate-clothes-toronto — 13 October 2026 — APPROVED with fixes

43 sentence-level edits. Sources re-fetched and read this session: New Circles,
Evangel Hall Mission, Dress for Success Toronto, Sistering, Goodwill (the donate
page and the Toronto location data), Salvation Army thriftstore.ca, Double Take,
Diabetes Canada (the FAQ and the pick-up page), Furniture Bank, the City's permit
page, the City's by-law enforcement page, and backgroundfile-146525.pdf. The
City's PDF is a scanned-stream file the fetch tool cannot read; text extracted
locally with pypdf and every figure quoted verbatim into the facts file.
dressforsuccesstoronto.org and furniturebank.org refuse curl with a Cloudflare
403 and were read in full through the fetch tool, the standing exception. All 25
links otherwise return 200; all seven profile slugs resolve. `prose_gate.py`
exits 0, one warn, a defining clause not a verdict. FAQ answers 211 to 236 words,
answer in sentence one. FAQPage and Article JSON-LD regenerated from the edited
visible text and verified character for character.

**What broke, and the rule, so it does not come back:**

1. **A 200 is not proof the anchor is right, and this is now the third night
   running.** The closing read "the charities named here sit under social
   services and community services". Diabetes Canada is categorised
   `arts-culture` in the database and the Salvation Army `religion`. The same
   sentence also said "the ones running a fundraiser this month appear on our
   page of charity events in Toronto"; I read the live events page, and none of
   the nine organisations in this guide is on it. Rewritten to name which
   charity sits in which category and to say only that the events page lists the
   dates we have. Open our own page and read it before you describe it.

2. **A seasonal restriction written as a standing rule.** "Nothing unscheduled
   is accepted after noon." Evangel Hall's page says "our schedule is
   particularly busy during November and December. As a result, we are unable to
   accept unscheduled donations after 12 pm on any given day." A rule with a
   season attached loses its meaning when you drop the season. This is the
   "convention written as if it were law" failure the editor brief names.

3. **A drop-off route stated as the opposite of what the page says.** "Donations
   are routed through partners rather than the boutique itself." Dress for
   Success Toronto's page lists the boutique at 5150 Yonge Street, Unit C29,
   Thursdays 1pm to 2pm by appointment, as one of three routes. The page says
   donations cannot go to the main office, which is not the boutique. The caveat
   that followed, "the page has carried conflicting drop-off instructions this
   year", was a hedge and is now the dated fact: on 13 October 2026 the Gibson's
   block still read "PAUSED Until July 6". Write what the page said and on what
   date; never summarise a contradiction as a mood.

4. **A location that has not opened yet, listed as running.** 5454 Dundas Street
   West is tagged `comingSoon: Opening Fall 2026` in Goodwill's own location
   data, and your facts row 14 says so. Three open centres, not four. The same
   sentence put Etobicoke outside Toronto.

5. **A count you did not count, twice.** "names two urgent needs" (the page
   lists three: men's shoes, women's underwear, shampoo) and, in the json
   `hub_blurb`, "Nine registered charities in Toronto take clothing" when two of
   the nine named take none, Sistering by its own statement and Furniture Bank
   by omission. Seven do. A number in a sentence is a claim; count it against
   the rows.

6. **An item on the refusal list written as accepted.** FAQ 3 said the Diabetes
   Canada crew takes "bedding". The pick-up page lists beds and bedding parts
   under NOT accepted.

7. **Three details with no row behind them.** "or changing careers" (Dress for
   Success), "in Regent Park" (where YSM's programmes run; row 21 says only that
   proceeds go to YSM community programmes), and "the sales fund Salvation Army
   programmes from food banks to children's camps". All cut.

8. **A dated figure stated as current in the two places readers see first.** The
   opening paragraph and the json `hub_blurb` both gave the 600-box count and
   the one-third business share with no date, while the body and the FAQ dated
   both to the City's 2020 report. Your own NOT-claimed list says neither may be
   claimed as current. The lede and the hub blurb are copy and get the same
   check as the body.

9. **Nine Britishisms on a Toronto page.** rubbish (x4), programme (x14),
   organis- (x4), car park, flat, jumper. The City of Toronto writes garbage and
   program; so does every source quoted here. Write the word the reader uses
   (HOW_TO_WRITE 18).

10. **Seven sentences gave a thing a person's action** (HOW_TO_WRITE 1): "Where
    you donate clothes decides", "the one you want decides", "the Sistering
    donations page says so rather than taking the bag", "Everywhere else expects
    you to arrive", "two other routes handle a clear-out". And five announced
    that a fact mattered (HOW_TO_WRITE 16): "worth reading before you post a
    bag", "worth reading twice", "strict enough to lose a collection", "two
    other routes matter", "One to know about before you load the car".

11. **Two H2s restated their own FAQ question.** "Which Toronto donation bins
    belong to a charity" over "Do Toronto clothing donation bins actually go to
    a charity?", and "Clothes nobody can wear" over "What should I do with
    clothes that are too worn out to donate?". The H2 describes what the section
    holds; the FAQ H3 is the reader's query. The free/sold H2 pair was kept:
    those two carry the page's structure and only read as a pair.

12. **Smaller slips.** "both" after a list of three (Salvation Army addresses);
    "either" pointing back across a section break (Goodwill); "and they mean
    it"; a comma splice in FAQ 3; "the same pot as the research", a metaphor;
    "current hours and current list"; a 45-word address sentence split into
    three; and the Diabetes Canada paragraph ending on a clause that repeated
    the volume-payment fact from two sentences earlier.

13. **Markup.** The Article JSON-LD description was a 178-character third
    version of the meta description; both now carry the same 147-character text
    with the target term in front. The target term had also dropped out of the
    opening sentence during my own first rewrite of it, and was put back.
    Furniture Bank was the one charity named with no outbound link, which
    CLIENT.md requires of every charity that has a site.

14. **For me, not the writer.** My own rewrites introduced "Which one you pick
    sets which address", a heading whose "it" had no antecedent, "location data"
    as reader-facing jargon, and "Plenty of clothing reaches the garbage that
    should not" with the relative clause dangling. Caught by reading every
    rewritten sentence in its own paragraph after the scripts went green, per
    RULINGS 2026-10-13. That read is not optional.

**For Richard, one item, and it is the same one the soup-kitchen pass raised:**
the category mapping in the database is wrong for at least two charities in this
guide. Diabetes Canada is filed under `arts-culture` and the Salvation Army under
`religion`. Until that is fixed no guide can point a reader at a cause category
and be accurate about who is in it, and the category pages themselves mislead
anyone arriving from search. Added to attribute-brain `todo/toronto-charities.md`
alongside the `food-hunger` mapping.

---

## volunteer-toronto — 13 October 2026 — APPROVED with fixes

41 sentence-level edits. Sixteen sources re-fetched and read in full this
session: Toronto Police record checks, ontario.ca police record checks,
ontario.ca graduation requirements, Covenant House, Sunnybrook, The Stop,
YMCA GTA, Toronto Humane Society, Toronto Wildlife Centre (FAQ), Volunteer
Toronto, Daily Bread, FoodShare, Furniture Bank, High Park Nature Centre,
Yonge Street Mission, Big Brothers Big Sisters, Second Harvest. 63 links
checked: 57 return 200 to curl; four hosts refuse curl behind Cloudflare
(tps.ca, covenanthousetoronto.ca, torontowildlifecentre.com,
volunteertoronto.ca, five URLs) and every one was loaded and read in the work
Chrome this session; `/guides/soup-kitchen-volunteer-toronto/` is the one
not-yet-live link, the approved sibling guide. All 26 profile slugs resolve.
`prose_gate.py` exits 0, three warns, each a defining clause. FAQ answers 249
to 289 words, answer in sentence one. FAQPage JSON-LD regenerated from the
edited visible text and verified character for character; Article description
and the json meta description now the same string; TOC text and anchors match
the H2s.

**The fee spine holds.** Toronto Police list the volunteer vulnerable sector
check at $26.72 against $71.72 for employment, the criminal record check and
CRJMC free to volunteers with a signed letter on organisation letterhead, the
$25.00 fingerprint fee waived for bona fide volunteers, vulnerable sector
applications of 30 September being processed on 13 October, and no rush
service. Every figure on the page is right. Read the whole fee table, not the
first block: the page prints the same "Employment/Other $26.72 / Volunteer no
charge" table three times before the vulnerable sector table, and a partial
read of it would have reported the page's central claim as invented.

**What broke, and the rule, so it does not come back:**

1. **Six wrong category links, not one.** The soup-kitchen pass found
   `/category/food-hunger/` lists environmental charities. I opened all eight
   you linked. `housing` lists animal rescues, `animal-welfare` lists
   synagogues, `environment` lists Buddhist and Sikh organisations, `health`
   lists international relief agencies, `youth-children` lists disability
   sports clubs, `food-hunger` lists environmental charities. Only
   `social-services` holds what its name says. All seven wrong links removed,
   `social-services` kept with the verified count of 1,394. The rule from the
   soup-kitchen pass stands and is now proven at scale: a 200 is not proof a
   link is right, so open the page and read the first twenty names before you
   put an anchor on it.

2. **Invented beliefs, three of them, opening the page.** "Most people who
   decide to volunteer in Toronto expect to turn up and start. Almost nowhere
   works that way." "One-off shifts exist, but they sit under names you would
   never think to search for." "The commitments on ongoing roles run longer
   than a first-time volunteer expects." Nobody published any of this. Never
   invent what the reader thinks in order to correct it. The page now opens on
   the route itself, which is the fact, and names the keyword in the first
   sentence.

3. **Seven unsourced superlatives, six of them in the section intros you
   wrote to introduce lists.** "Food work has the shortest route in for a
   first-time volunteer and the widest choice of shifts." "These roles carry
   the heaviest screening in the city and the most useful training."
   "Fostering is where the shortage is." "the strictest health requirements of
   any category here." "The longest commitments in the city, and the ones
   where a single volunteer makes the clearest difference." "Daily Bread's
   three public sorting events a year are the other reliable drop-in option in
   the city." "the easiest way to do it." That is the third draft in a row
   with this fault. If you cannot point at the row that ranks them, do not
   rank them, and a section intro is not a licence to editorialise because it
   sits above a list.

4. **A ranking that was checkable and wrong.** "Fred Victor asks for one
   month, the shortest commitment of any charity listed below." Yonge Street
   Mission's In-a-Pinch shifts and Habitat's one-time roles ask for no
   commitment at all, and you wrote about both three paragraphs later. Count
   it against the list, not against the sentence you just wrote.

5. **Two invented queue comparisons, the same claim twice.** "the queue at a
   neighbourhood agency is nothing like the queue at the Humane Society" and
   "the queue at Dixon Hall or New Circles looks nothing like the queue at the
   Humane Society". Neither Dixon Hall nor New Circles publishes anything
   about a wait. Both replaced with what Covenant House, Toronto Wildlife
   Centre and Scott Mission actually say, which makes the same practical point
   and is true.

6. **A count that did not count, and a count whose third example did not
   support it.** "at all four organisations checked here it carries a price"
   named three; The Stop charges too and was missing, so the four are now
   named. "Three of the best-known charities here say on their own pages that
   they have more applicants than places" then offered Toronto Humane Society,
   Toronto Wildlife Centre and Red Door, and Red Door says it has no openings,
   which is a different fact. Now two, and Red Door stands on its own with its
   date.

7. **A perishable homepage snapshot read as a published figure.** Volunteer
   Toronto "posted four new openings on 13 October 2026 alone". Their homepage
   module shows four recent opportunities; it does not say four were posted
   that day. A feed count is not a fact about the organisation, and RULINGS
   2026-10-11 keeps perishable numbers out of page prose. Cut.

8. **Four H2s were index labels restating their own FAQ question** ("How old
   you have to be" above "How old do you have to be to volunteer in
   Toronto?"), the identical fault logged on the soup-kitchen draft this
   morning. H2s are now the answer, FAQ H3s stay as the question.

9. **Seven section intros built to one pattern**, one short sentence plus
   "See the X category". With six of the seven category links gone the pattern
   had to go anyway; four intros now carry a fact the rows do not, one was
   cut, and the shapes vary.

10. **Smaller slips.** "the fingerprint step catches people out" (a claim
    about people); "the calendar, not the paperwork, sets the pace" (a
    metaphor, and the inference appended after the fact); "Ontario makes the
    first two free ... as long as you attach a signed letter" (Ontario says a
    service *may* require one, Toronto Police require it, so the sentence now
    says which); "real training" (the bare intensifier, RULINGS 2026-10-10);
    "the large one may take six months to answer" (six months is how long
    Covenant House *keeps* an application, not how long it takes to answer);
    "Yonge Street Mission puts it most directly"; "Check whether applications
    are even open"; "Read the actual role description"; a repeated sentence
    inside FAQ 1; and the FoodShare photo release form, in the FAQ but not in
    the body.

11. **Markup.** The TOC carried no `class="toc"`, unlike the three approved
    siblings. The meta description carried no form of the target term;
    rewritten to 139 characters opening with it, and the Article JSON-LD
    description synced to it. The json `hub_blurb` said "how long the wait
    really is"; the intensifier is gone.

12. **For me, not the writer.** My own fix to 6 left "The Toronto Humane
    Society" opening two consecutive sentences, and my first parks intro began
    "Both run to a season" with the antecedent only in the list below it. Both
    caught by reading every rewritten sentence in its paragraph after the gate
    went green, per RULINGS 2026-10-13.

**For Richard, one decision and one bug.**

The decision: this page links out to volunteertoronto.ca, the site it is
written to outrank for "volunteer toronto" (2,800/mo). The 12 Oct ruling says
every fleet site links out to authority sites in its niche we do not own, the
page would read as evasive without the city's actual volunteer centre on it,
and Yonge Street Mission's own volunteer page points there. CLIENT.md names no
competitor ban. Kept, with the City of Toronto link beside it. Say if you want
it out.

The bug, now measured: the charity-to-category mapping is broken across the
site, not only for `food-hunger`. Six of the eight category pages I opened
list charities from an unrelated cause. Every one of the fifteen category
pages is a live, indexable page that misleads anyone who lands on it from
search, and no guide can send a reader to a cause category until it is fixed.
Already in attribute-brain `todo/toronto-charities.md`.

## GATE run — 15 October 2026 — NOTHING TO REVIEW

`content/drafts/` does not exist; no draft files anywhere outside
`content/published/`. Today's two commissions (donate-hair-toronto,
volunteer-opportunities-toronto-students, COMMISSIONS.md 15 Oct) have no
`research/facts/<slug>.md` row and no draft yet — the writer has not run
against them. Per content-editor.md cost discipline ("Nothing in
content/drafts/? Stop in one line"), stopping here rather than reviewing
`content/published/` work already gated on 13 October.

## GATE run — 16 October 2026 — NOTHING TO REVIEW

`content/drafts/` still does not exist; no draft files anywhere outside
`content/published/`. Today's only commission (toronto-charity-news-2026-10-16,
COMMISSIONS.md Friday Track 2) has no `research/facts/<slug>.md` row and no
draft: `attribute-brain/todo/toronto-charities.md` R-192 (16 Oct) records the
writer's session failing on the same egress fault as R-187 (15 Oct) — WebFetch
DNS failures and proxy 403s on every outlet/profile host tried — and correctly
drafting nothing rather than substituting search-snippet paraphrase. The
donate-hair-toronto and volunteer-opportunities-toronto-students commissions
from 15 Oct (R-187) are still undrafted too. Per content-editor.md cost
discipline, stopping here; `content/published/` work stays as gated 13 October.

**For Richard:** this is two consecutive scheduled writer runs (15 and 16
Oct) blocked by the identical unresolved egress fault, not an empty queue —
R-187 asked 15 Oct whether this session type's network policy allows general
web egress and why destinations get a 403 instead of a consistent DNS
failure or timeout; R-192 asks the same question again today, still
unanswered. Three commissions now sit undrafted behind it.

## GATE run — 19 October 2026 — NOTHING TO REVIEW

`content/drafts/` still does not exist; no draft files anywhere outside
`content/published/`. Today's only commission (COMMISSIONS.md, Monday Track
1: `charity-events-toronto-week-of-2026-10-19`) has no
`research/facts/<slug>.md` row and no draft. `attribute-brain/todo/
toronto-charities.md` R-193 (updated 19 Oct) records the writer session
failing on both routes the commission itself proposed: `DATABASE_URL` is not
set in this session at all (not a quota or timeout — the credential is
absent), and WebFetch to `charity-events-toronto/` failed the same
`getaddrinfo ENOTFOUND` as R-187 (15 Oct) and R-192 (16 Oct). Correctly
nothing was drafted rather than a cached or remembered event list
substituted. The 15 Oct commissions (donate-hair-toronto,
volunteer-opportunities-toronto-students, R-187) and the 16 Oct commission
(toronto-charity-news-2026-10-16, R-192) remain undrafted too — four
commissions now undrafted behind this fault. Per content-editor.md cost
discipline, stopping here; `content/published/` work stays as gated 13
October.

**For Richard, escalating per content-editor.md's own rule ("when the same
fault appears three times, stop logging it and escalate"):** this is the
third consecutive scheduled writer run blocked by egress/credential gaps
(15, 16, 19 Oct — no writer run has produced a draft since 13 Oct), and the
pattern has widened, not narrowed: R-187/R-192 asked whether this session
type gets general web egress at all, unanswered twice; today adds that the
DB-query workaround COMMISSIONS.md itself proposed also has no credential
provisioned. Neither fallback route works. This needs a decision, not
another logged instance: either provision `DATABASE_URL` for writer-type
sessions, confirm/fix the egress policy, or both. Until one lands, the
Monday and Friday fixed tracks cannot run and the queue guides stay frozen
at 13 October's four.

## GATE run — 20 October 2026 — NOTHING TO REVIEW

`content/drafts/` still does not exist; no draft files anywhere outside
`content/published/`. Checked after `git fetch` + fast-forward to 952f480
(QUEUE.md 20 Oct). Today's recommissioned clusters (donate-hair-toronto,
volunteer-opportunities-toronto-students, COMMISSIONS.md 20 Oct) have no
`research/facts/<slug>.md` rows and no draft: the writer session logged the
same run (LOG.md, attribute-brain, 2026-10-20) hit both failure modes
together — `WebFetch` DNS-failed on toronto-charities.ca, ontario.ca and a
plain google.com, and `curl` through the proxy got a 403 on the CONNECT
tunnel to the same hosts — confirming this is not site-specific and not a
transient timeout. QUEUE.md rows #6/#10 record the block. Per
content-editor.md cost discipline ("Nothing in content/drafts/? Stop in one
line"), stopping here; `content/published/` work stays as gated 13 October.

This is the fourth consecutive GATE run finding nothing to review (15, 16,
19, 20 Oct), behind the fourth consecutive writer block on the same
unresolved infrastructure gap. The decision request is already filed and
unanswered: `attribute-brain/todo/toronto-charities.md` R-193 (updated 20
Oct) asks Richard to provision general web egress for this session type,
provision `DATABASE_URL` for writer-type sessions, or both. Not re-filing a
new escalation here — this is an access/infrastructure gap, not a content
fault, so it belongs on R-193, not as a new RULINGS entry or CLIENT.md line.
Five commissions now sit undrafted: donate-hair-toronto and
volunteer-opportunities-toronto-students (15 Oct), toronto-charity-news-
2026-10-16, charity-events-toronto-week-of-2026-10-19, and the two
recommissioned 20 Oct clusters. No writer run has produced a draft since 13
October.

## GATE run — 21 October 2026 — NOTHING TO REVIEW

`content/drafts/` still does not exist; no draft files anywhere outside
`content/published/`. `content/approved/` also does not exist. Confirmed
independently this session rather than trusting prior logs: `curl` to
`toronto-charities.ca` and `www.ontario.ca` both got `CONNECT tunnel failed,
response 403`; the proxy's own status endpoint logs both as
`connect_rejected` ("gateway answered 403 to CONNECT"), the exact signal
content-editor.md's egress-blocked fallback names, confirming this is the
session's egress, not a dead page. `DATABASE_URL` and `ANTHROPIC_API_KEY`
are both absent from `env`, same as R-193's 21 Oct writer-run finding.
`attribute-brain/todo/toronto-charities.md` R-193 already logged a fifth
consecutive writer block this same day (donate-hair-toronto,
volunteer-opportunities-toronto-students, COMMISSIONS.md 21 Oct) on the
identical fault. Per content-editor.md cost discipline ("Nothing in
content/drafts/? Stop in one line"), stopping here; `content/published/`
work stays as gated 13 October.

This is the fifth consecutive GATE run finding nothing to review (15, 16,
19, 20, 21 Oct). Not re-escalating as a new item — R-193 already carries
this and already asks Richard to provision general web egress for
writer/editor-type sessions, provision `DATABASE_URL`, or both; a sixth log
entry restating the same unanswered question changes nothing. Five
commissions now sit undrafted: donate-hair-toronto and
volunteer-opportunities-toronto-students (15, 20, 21 Oct holds),
toronto-charity-news-2026-10-16, and charity-events-toronto-week-of-2026-10-19.
`donate-furniture-toronto` (#9, QUEUE.md) stays deliberately uncommissioned
behind the same block, per COMMISSIONS.md. No writer run has produced a
draft since 13 October.

## GATE run — 22 October 2026 — NOTHING TO REVIEW

`content/drafts/` still does not exist; no draft files anywhere outside
`content/published/`. `content/approved/` also does not exist. Confirmed
independently this session: `curl` to `toronto-charities.ca` and
`www.ontario.ca` both got `CONNECT tunnel failed, response 403`, the proxy
logging both as `connect_rejected` — the identical signal as the 21 October
confirmation. `DATABASE_URL` and `ANTHROPIC_API_KEY` are both absent from
`env`, same as every prior run back to R-193's first finding. Per
content-editor.md cost discipline ("Nothing in content/drafts/? Stop in one
line"), stopping here; `content/published/` work stays as gated 13 October.

This is the sixth consecutive GATE run finding nothing to review (15, 16,
19, 20, 21, 22 Oct), behind the sixth consecutive writer block on the
identical unresolved fault (COMMISSIONS.md 22 Oct: donate-hair-toronto and
volunteer-opportunities-toronto-students held again, both still undrafted
since 15 Oct). Not re-escalating as a new item — R-193/R-192 already carry
this and already ask Richard to provision general web egress for
writer/editor-type sessions, provision `DATABASE_URL`, or both; a seventh
log entry restating the same unanswered question would change nothing. No
writer run has produced a draft since 13 October: nine calendar days, four
commissions sitting undrafted (donate-hair-toronto,
volunteer-opportunities-toronto-students, toronto-charity-news-2026-10-16,
charity-events-toronto-week-of-2026-10-19), and the weekly Monday/Friday
fixed tracks have not run at all since the 13 Oct guides. Separately,
`attribute-brain/todo/toronto-charities.md` R-213 (added 22 Oct) now also
logs three consecutive skipped daily DB backups on the same Neon quota
exhaustion as R-193 — a second, independent decision now waiting on
Richard alongside the egress/credential one, both P1, both unresolved
across multiple days.

## GATE run — 23 October 2026 — NOTHING TO REVIEW

`content/drafts/` still does not exist; no draft files anywhere outside
`content/published/`. `content/approved/` also does not exist. Confirmed
independently this session: `curl` to `toronto-charities.ca` and
`www.ontario.ca` both got `CONNECT tunnel failed, response 403`, the proxy
logging both as `connect_rejected` — the identical signal as every
confirmation back to 21 October. `DATABASE_URL` and `ANTHROPIC_API_KEY` are
both absent from `env`, same as every prior run back to R-193's first
finding. Per content-editor.md cost discipline ("Nothing in content/drafts/?
Stop in one line"), stopping here; `content/published/` work stays as gated
13 October.

This is the seventh consecutive GATE run finding nothing to review (15, 16,
19, 20, 21, 22, 23 Oct). `attribute-brain/todo/toronto-charities.md` R-193
(opened 18 Oct) and R-192 (16 Oct) remain open and unanswered — ten
calendar days now with no writer run producing a draft since 13 October, and
no decision yet on provisioning general web egress or `DATABASE_URL` for
writer/editor-type sessions. Not re-escalating as a new item; R-193 already
carries the open question. Separately, R-213 (Neon quota, three-plus
consecutive skipped daily backups) also remains open, unrelated code fix
available to either fleet role — both are account-level decisions waiting on
Richard.

## GATE run — 26 October 2026 — NOTHING TO REVIEW

`content/drafts/` still does not exist; no draft files anywhere outside
`content/published/`. `content/approved/` also does not exist. Confirmed
independently this session rather than trusting prior logs: `curl` to
`toronto-charities.ca` got `CONNECT tunnel failed, response 403`, the proxy's
own status endpoint logging it as `connect_rejected` ("gateway answered 403
to CONNECT"), the identical signal as every confirmation back to 21 October;
the status endpoint also reports the policy as non-selective
(`"selective": false`), so this is a blanket egress block for the session
type, not a per-host rule. `env` carries neither `DATABASE_URL` nor
`ANTHROPIC_API_KEY`, same as every prior run back to R-193's first finding.
Cross-checked `attribute-brain/todo/toronto-charities.md` directly rather
than assuming from this log alone: R-192, R-193, R-213 and R-170 are all
still open with no new update since the 22–23 Oct entries already cited
here. Today's COMMISSIONS.md (26 Oct, Monday events track) independently
confirms the same block for the writer's commission
(`charity-events-toronto-week-of-2026-10-26`) and logs it as the eighth
weekday session to hit this fault. Per content-editor.md cost discipline
("Nothing in content/drafts/? Stop in one line"), stopping here;
`content/published/` work stays as gated 13 October.

This is the eighth consecutive GATE run finding nothing to review (15, 16,
19, 20, 21, 22, 23, 26 Oct) — thirteen calendar days, nine weekday sessions
since 13 October with no writer run producing a draft. Not re-escalating as
a new item: R-192/R-193 already carry the open egress/`DATABASE_URL`
question and a ninth log entry restating it changes nothing; R-213 (Neon
backup skips) and R-170 (category mapping) are unrelated and also already
open. All four remain Richard's decisions, not something either fleet role
can fix from inside a session.

## DESIGNER run — 27 October 2026 — NOTHING TO REVIEW

`content/drafts/` still does not exist, confirmed independently this
session (`ls` fails: no such directory), and neither does `content/images/`
or `content/approved/`. No draft carries imagery work because no draft
exists anywhere outside `content/published/`, where the four published
guides already got their drawn figures on 13–14 Oct (volunteer-toronto's
police-check-fee timeline, soup-kitchen-volunteer-toronto's Daily Bread
shift timeline, the clothes and books guides' donation-use/sale-proceeds
figures) — nothing new to add there and no fifth guide has shipped since.
Independently re-verified rather than trusted from COMMISSIONS.md: `curl`
to `toronto-charities.ca` got the identical `CONNECT tunnel failed,
response 403`, proxy status endpoint logging `connect_rejected`, policy
`"selective": false` — same blanket block as every confirmation since 21
Oct. Cross-checked `attribute-brain/todo/toronto-charities.md` directly:
R-192, R-193, R-213 and R-170 are all still open, last updated 26 Oct, no
new entry since. Today's `COMMISSIONS.md` (27 Oct) independently confirms
the same fault blocking both of today's commissions
(`volunteer-opportunities-toronto-students`, `donate-hair-toronto`) before
either reaches a writer draft. No PENDING.md entry to add either: no draft
names a charity, so no logo lookup is owed. Per content-designer.md's own
cost discipline ("No draft missing a hero? Stop in one line") and the
sibling GATE log's established pattern, stopping here rather than
generating anything.

This is the ninth consecutive weekday session (15, 16, 19, 20, 21, 22, 23,
26, 27 Oct) to find no writer output at all — fourteen calendar days since
13 October. Not re-escalating: R-192/R-193 already carry the open egress/
`DATABASE_URL` question and a tenth log entry restating it changes nothing;
R-213 and R-170 are unrelated and also already open. All remain Richard's
decisions.

## GATE run — 27 October 2026 — NOTHING TO REVIEW

`content/drafts/` does not exist (`ls` fails: no such directory), nor does
`content/approved/`; no draft exists anywhere outside `content/published/`,
where the four already-published guides were gated 13 October and nothing
has moved since. Independently re-verified rather than trusted from today's
`COMMISSIONS.md` or the DESIGNER run's log entry above: `curl` to
`toronto-charities.ca` got `CONNECT tunnel failed, response 403`, the proxy
status endpoint logging it `connect_rejected` ("gateway answered 403 to
CONNECT"), policy `"selective": false` — the identical blanket block as
every confirmation since 21 Oct. `env` carries neither `DATABASE_URL` nor
`ANTHROPIC_API_KEY`. Cross-checked `attribute-brain/todo/toronto-charities.md`
directly: R-192, R-193 and R-213 are all still open, unchanged since the
26 Oct entries. Today's `COMMISSIONS.md` independently confirms the same
fault blocking both of today's commissions
(`volunteer-opportunities-toronto-students`, `donate-hair-toronto`) before
either reaches a writer draft, and the DESIGNER run logged above confirms
it a second way the same day. Per content-editor.md's own cost discipline
("Nothing in content/drafts/? Stop in one line"), stopping here.

This is the ninth consecutive GATE run finding nothing to review (15, 16,
19, 20, 21, 22, 23, 26, 27 Oct) — fourteen calendar days, no writer run
producing a draft since 13 October. Not re-escalating as a new item:
R-192/R-193 already carry the open egress/`DATABASE_URL` question and an
eleventh log entry restating it would change nothing; R-213 and R-170 are
unrelated and also already open. All remain Richard's decisions, not
something this session can fix from inside.

## WRITER run — 28 October 2026 — NOTHING DRAFTED

Read `CLIENT.md`, `QUEUE.md`, `COMMISSIONS.md` (both commissions:
`volunteer-opportunities-toronto-students`, `donate-hair-toronto`) and the
last ten EDITLOG entries before touching anything. Independently
re-verified the block rather than trusting COMMISSIONS.md's own check:
`curl -m 10` to `https://toronto-charities.ca/` returned no response
(`HTTP 000`, connection never completed); the proxy's own status endpoint
confirms the same `connect_rejected` shape logged every session since
21 Oct, policy `"selective": false` — a blanket block, not a per-host rule.
`env` carries neither `DATABASE_URL` nor `ANTHROPIC_API_KEY`. Both
commissions require a live fetch or DB query for every load-bearing fact
(Ontario's OSSD hours policy, which directory charities confirm taking
student volunteers, which hair-donation programmes serve Toronto) — per
content-writer.md's own hard rule, a claim without a facts row does not
ship, so nothing was drafted against either commission. Cross-checked
`attribute-brain/todo/toronto-charities.md`: R-192, R-193, R-213 and R-170
are all still open, unchanged since 26 Oct.

This is the tenth weekday session to hit the fault (15, 16, 19, 20, 21, 22,
23, 26, 27, 28 Oct) — fifteen calendar days, no writer run producing a
draft since 13 October — and the first WRITER-specific entry in this log
rather than a GATE or DESIGNER one finding nothing behind it. Not
re-escalating: R-192/R-193 already carry the open egress/`DATABASE_URL`
question and a further log entry restating it would change nothing.
`content/drafts/`, `content/images/` and QUEUE.md's two blocked rows (#6,
#10) stay exactly as they were; nothing to commit there this run beyond
this entry.

## DESIGNER run — 28 October 2026 — NOTHING TO REVIEW

Read `content-designer.md` and `content/CLIENT.md` per the routine prompt
before touching anything. Independently re-verified rather than trusted
from today's `COMMISSIONS.md` or the WRITER run's log entry above:
`ls content/drafts content/approved content/images` — none of the three
exist. `curl -m 10` to `https://toronto-charities.ca/` got `CONNECT tunnel
failed, response 403`; the proxy's own status endpoint logs it
`connect_rejected`, "gateway answered 403 to CONNECT (policy denial or
upstream failure)", policy `"selective": false` — the identical blanket
block logged every session since 21 Oct. `DATABASE_URL` and
`ANTHROPIC_API_KEY` both confirmed absent (presence check, not a direct
read). Cross-checked `attribute-brain/todo/toronto-charities.md` directly:
R-192, R-193, R-213 and R-170 all still open, unchanged since 27 Oct.

No draft exists anywhere to give imagery to: the writer run logged above
drafted nothing against either of today's commissions for the same reason.
There is therefore no figure to draw (Richard's 13 Oct ruling: a figure
traces to a facts row in a draft's own research file — there is no draft
and no new facts row to trace to) and no charity name to add to a
`content/images/PENDING.md` that itself does not exist. The four guides in
`content/published/` already carry their drawn figures and real logos from
13 to 14 Oct; nothing new to add there. Per content-designer.md's own cost
discipline ("No draft missing a hero? Stop in one line"), stopping here.

This is the tenth consecutive DESIGNER-or-equivalent run finding nothing to
review (15, 16, 19, 20, 21, 22, 23, 26, 27, 28 Oct) — sixteen calendar days,
no writer run producing a draft since 13 October. Not re-escalating:
R-192/R-193/R-213/R-170 already carry the open questions and a further log
entry restating them would change nothing. All remain Richard's decisions.
