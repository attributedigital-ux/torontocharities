# Commissions — 27 October 2026 (Tuesday)

Written by the editor, commissioning run. Tuesday is not a fixed-track day —
per CLIENT.md/content-engine.md today commissions one or two guides from
`QUEUE.md`, not either weekly track.

## Connectivity, checked this session

`curl` to `toronto-charities.ca` got `CONNECT tunnel failed, response 403`;
the proxy's own status endpoint logs it `connect_rejected` and reports the
policy as non-selective (`"selective": false`) — a blanket block for this
session type, not a per-host rule. `env` carries neither `DATABASE_URL` nor
`ANTHROPIC_API_KEY`. Both identical to every confirmation since 21 Oct. This
is the ninth weekday session to hit the fault (15, 16, 19, 20, 21, 22, 23,
26, 27 Oct) — two calendar weeks, no writer run producing a draft since 13
Oct. Not re-escalating: `attribute-brain/todo/toronto-charities.md` R-192
and R-193 already carry the open question (provision egress, provision
`DATABASE_URL`, or both) and a tenth log entry restating it would change
nothing. Filed as today's data point only.

**This means both commissions below inherit the same block every commission
since 15 Oct has logged.** Per `content-writer.md`'s own hard rule, the
writer drafts nothing against either commission until a live fetch or a DB
query actually returns data, and logs which route it tried rather than
re-describing the fault.

## Commission 1

**Slug:** `volunteer-opportunities-toronto-students`
**Working title:** Where Toronto students can get volunteer hours
**Cluster:** `QUEUE.md` #6, "volunteer opportunities toronto for students" —
Vol 200/mo, KD 8, Score 22. Standalone cluster, not folded into #1
(`volunteer-toronto`, published). Recommissioned 20 Oct, undrafted since,
blocked on the fault above — picked up again unchanged, per the 26 Oct
commission's own note that the next non-Monday, non-Friday run would.
**Intent tier:** Decision-adjacent informational — a student with a fixed
requirement (hours) looking for where to actually go, not a browser.

**Angle (one sentence):** A Toronto student who needs volunteer hours —
most often Ontario's mandatory 40 community-involvement hours for the OSSD
— gets the actual rule, sourced, plus specific charities in our own
directory that take student volunteers and what each one needs from them.

**What it must answer:**
1. What is Ontario's community-involvement-hours requirement, in the
   ministry's own terms, with a link to the actual policy — not a
   paraphrase from memory?
2. Which charities in our directory confirm (on their own site) that they
   take student or teen volunteers, and what do they ask for — minimum
   age, parental consent, a school-issued hours form?
3. How does a student actually apply — direct to the charity, or through a
   volunteer-matching tool?
4. What should a student expect on time commitment during the school term
   (evenings, weekends, school breaks)?
5. Where does a student look if none of the charities named here fit their
   schedule or location?

**Links it must earn:**
- The profile `/profile/<slug>/` for every charity named — no exception,
  checked against the sitemap/DB before linking; unresolved, name without a
  link.
- `/category/social-services/` only if the charities covered actually sit
  in that category — the one category page R-170 clears for linking.
- Ontario's own community-involvement-hours policy page (ontario.ca) —
  required authority outbound per CLIENT.md's "every fleet site links out
  to authority sites in its niche."
- A cross-link to the published `/guides/volunteer-toronto/` guide, since
  this piece's reader overlaps it — this piece is the student-specific
  narrowing, not a restatement of it.
- No `/charity-events-toronto/` link; this is not an events piece.

**Facts needed, and where from:**
- The 40-hour figure and its terms: ontario.ca's own OSSD community
  involvement policy page, fetched live, not recalled.
- Charities suited to student volunteers: a live DB query or site read
  against our own directory — the exact thing blocked this run. No charity
  is named from memory or a prior guide's list.
- Any age/consent/paperwork requirement per charity: that charity's own
  site, fetched live, not inferred.

**Do not claim (binding):**
- No charity named as taking students unless its own site confirms it.
- No number of required hours beyond Ontario's own stated figure, cited
  with a source.
- No invented process promise ("they'll sign your form the same day")
  unless the charity's own site says so.
- No unsourced superlative ("the best charity for students," "the easiest
  way to get your hours").
- No duplication of `/guides/volunteer-toronto/`'s own territory.
- No bare "real"/"genuine(ly)"/"actually"/"actual" filler; no "where"
  pivots; no object-as-actor construction.
- Canadian spelling throughout.

## Commission 2

**Slug:** `donate-hair-toronto`
**Working title:** How to donate hair in Toronto
**Cluster:** `QUEUE.md` #10, "donate hair toronto" — Vol 90/mo, KD 1,
Score 45. Recommissioned 20 Oct, undrafted since, blocked on the same
fault — picked up again unchanged, same basis as Commission 1.
**Intent tier:** Decision-adjacent informational — someone who has already
decided to donate and wants the actual steps.

**Angle (one sentence):** Someone in Toronto who wants to donate hair gets
the real, current requirements of the organisations that accept it and an
honest account of which model applies — a Toronto drop-off versus a
mail-in national programme — named only where a charity's own site
confirms it.

**What it must answer:**
1. Which organisations actually accept hair donations, confirmed on their
   own sites, and is any of them a Toronto charity in our own directory or
   a national programme donors here mail into?
2. What are the current minimum-length and condition requirements (no
   major chemical treatment, dry vs. clean, etc.), stated per organisation
   rather than as one blanket rule?
3. How should the hair be prepared and sent — cut, bundled, packaged?
4. What does the organisation do with donated hair, stated only where its
   own site says so?
5. Is there a Toronto salon or charity that facilitates collection locally,
   rather than a straight mail-in?

**Links it must earn:**
- The profile `/profile/<slug>/` for any charity in our directory that is
  actually involved — no exception.
- Outbound to each named programme's own site (authority source,
  required) — written only once the writer has verified, live, which
  programmes genuinely operate for Canadian/Toronto donors.
- `/category/social-services/` only if a named charity genuinely sits
  there.

**Facts needed, and where from:**
- Each programme's current requirements: fetched live from that
  programme's own site. No programme is named from memory — this is
  exactly the kind of claim 2026-10-18's "unsourced superlative" ruling and
  the facts audit both treat as needing a source.
- Which programmes operate in/for Toronto versus mail-in only: confirmed
  from the programme's own site, not assumed.
- Any Toronto charity's own involvement: our own directory, live query.

**Do not claim (binding):**
- No charity or programme named as collecting in person in Toronto unless
  its own site says so.
- No minimum length or condition stated without a source; where
  organisations differ, say so per organisation rather than averaging them
  into one rule.
- No claim about what happens to donated hair beyond what the organisation
  states.
- No unsourced superlative ("the easiest way to donate hair in Toronto").
- No bare "real"/"genuine(ly)"/"actually"/"actual" filler; no "where"
  pivots.
- Canadian spelling throughout.

## Held, not commissioned today

`donate-furniture-toronto` (#9) stays held, same reasoning as every run
since 13 Oct: no new supply into a pipeline that has drafted nothing in
fourteen calendar days, and per `EVIDENCE.md`'s standing caveat (three
pulls now, 13/19/26 Oct) its parent_topic is literally "furniture bank," a
real single-charity incumbent — still unchecked at the SERP, so it is not
promised as an easy score to whoever eventually commissions it. Today's two
commissions (above) satisfy the day's "one or two guides" instruction
without adding a third item to the undrafted backlog.

`toronto-charity-news-2026-10-16` and `charity-events-toronto-week-of-
2026-10-19` remain the two earlier fixed-track issues that never drafted;
this week's events issue (`charity-events-toronto-week-of-2026-10-26`,
commissioned 26 Oct) supersedes the 19 Oct one rather than stacking behind
it, unchanged from 26 Oct's note.

## For Richard

Nothing new needs his input from this run specifically. R-192 (writer/
gate/researcher/commissioning egress) and R-193 (`DATABASE_URL` absence,
Neon quota) already carry the operational blocker; today adds one data
point (confirmed independently this session, ninth weekday session, two
full weeks) to that record, logged above, not re-filed. No new
`[NEEDS RICHARD]` item. R-170 (category-page mapping) and R-213 (Neon
backup-skip recurrence) remain open on the same todo file, unaffected by
today's run.
