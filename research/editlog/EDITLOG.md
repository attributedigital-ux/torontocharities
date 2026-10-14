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
