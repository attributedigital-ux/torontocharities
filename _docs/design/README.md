# Handoff: Toronto Charities — Homepage

## Overview

Toronto Charities is a community directory of Toronto-area charities and their events, operated as a community resource by Toronto Property. The site eventually folds into `torontoproperty.ca/toronto-charities/` via a 301 redirect.

This handoff covers **the homepage only**. Other templates (directory, category, profile, event, guide) will follow in separate briefs once this aesthetic lands.

The visual system is inherited from Toronto Property — same fonts, same paper / ink / navy / amber palette — with one differentiator: a sage green `#6B7F5C` token used sparingly on Toronto Charities (verified badges, claim CTA, footer eyebrows).

## About the design files

The files in this bundle are **design references created in HTML** — a prototype showing intended look and behavior, not production code to copy directly. Your task is to **recreate this design in the target codebase** (Next.js — see "Stack" below) using its established patterns and component libraries.

Treat the HTML as authoritative for:
- Layout, spacing, type scale, color usage
- Section ordering and content
- Hover behavior and animation timing

Do not copy:
- The inline `<style>` block (port to your CSS/Tailwind/styled solution)
- Hardcoded mock numbers (247 charities, 18 events, 22 causes) — these come from the database, see "Functional requirements"
- The placeholder image blocks — these are clearly-tagged "real photo goes here" markers

## Fidelity

**High-fidelity.** The mock has final colors, typography, spacing, hover states, and section structure. Match it pixel-close. Treat any deviation as an opinion that needs to be justified.

The exception is **photography**: every image in the design is a tagged warm-beige placeholder (e.g. `PHOTO · COVENANT HOUSE · INTAKE HALL`). Real documentary photography of each charity / event / cause will be supplied separately. The placeholder's monospace caption describes the intended subject.

## Stack target

- **Next.js (App Router)** — homepage becomes `app/page.tsx` as a server component
- **All numbers and lists rendered server-side** — no client-side fetch flash on first paint
- **Client JS is for two things only**: the search submit and the nav scroll state. Everything else is HTML+CSS.
- **No client framework on the homepage** beyond what Next.js gives you. No state management, no SWR/React Query on this page.

## Design tokens

The following tokens come from `colors_and_type.css` (included in this handoff). They are inherited from Toronto Property — do not invent new ones.

### Colors

```css
--tp-paper:   #FAFAF8   /* Card / paper surface — just above page bg */
--tp-bg:      #F2EFE8   /* Page background — warm beige */
--tp-ink:     #1A1A1A   /* Body text — near-black, never pure black */
--tp-blue:    #2C3D55   /* Headings, links, primary accent — deep navy */
--tp-amber:   #A07830   /* Eyebrow labels, event dates — aged brass */
--tp-amber-d: #7A5C20   /* Amber hover */
--tp-muted:   #999999   /* Secondary text */
--tp-hint:    #C8C8C4   /* Placeholders, fine print */
--tp-rule:    #E2E2DF   /* Dividers, borders */
--tp-bgrule:  #D8D4CC   /* Search-zone borders */

/* Toronto Charities only: */
--tc-sage:    #6B7F5C   /* Verified badges, claim CTA button, footer column eyebrows */
--tc-sage-d:  #57684B   /* Sage hover */
```

**Sage budget: ~5% of visual weight.** It appears in exactly these spots — verified badge on charity cards, the "FOR LISTED CHARITIES" eyebrow + button in the claim CTA, the "BROWSE / FOR CHARITIES / ABOUT" eyebrows in the footer, and the "For charities" outlined button in the nav. Don't extend it elsewhere.

**Banned colors**: nonprofit-pink, charity-aubergine, hopeful-yellow, sympathetic-teal, gradients, any color not in the list above.

### Typography

```css
--font-display: 'Playfair Display', Georgia, serif;  /* H1, H2, H3, eyebrow numbers */
--font-body:    'Inter', system-ui, sans-serif;      /* Everything else */
--font-mono:    ui-monospace, 'SF Mono', Menlo, Consolas, monospace;  /* placeholder captions only */
```

Load from Google Fonts: Playfair Display weights 400, 500, italic 400 (NEVER 600+); Inter weights 300, 400, 500.

#### Type scale (desktop, 1280+)

| Role | Size / line | Weight | Family | Color |
|---|---|---|---|---|
| Hero H1 | 60px / 1.05 | 500 | Playfair | `--tp-blue` |
| Section H2 | 40px / 1.15 | 500 | Playfair | `--tp-blue` |
| Card H3 (charity) | 24px / 1.25 | 500 | Playfair | `--tp-blue` |
| Card H3 (event, cause, guide) | 22px / 1.25 | 500 | Playfair | `--tp-blue` |
| Guide H3 | 28px / 1.2 | 500 | Playfair | `--tp-blue` |
| Hero lede | 18px / 1.6 | 400 | Inter | `--tp-ink` @ 80% |
| Body | 16px / 1.6 | 400 | Inter | `--tp-ink` |
| Body small | 15px / 1.6 | 400 | Inter | `--tp-ink` |
| Meta / caption | 13px / 1.5 | 400 | Inter | `--tp-ink` @ 60% |
| Eyebrow label | 12px / 1.0 | 500 | Inter | `--tp-amber` (or `--tc-sage`); uppercase; letter-spacing 0.12em |
| Verified badge | 11px / 1.0 | 500 | Inter | `--tc-sage`; uppercase; 0.12em |
| Nav links | 14px | 400 | Inter | `--tp-ink` |
| Footer link | 14px | 400 | Inter | `--tp-bg` @ 70% (hover 100%) |
| Date added | 12px | 400 | Inter | `--tp-ink` @ 40% |

**Rules:**
- **Sentence case for ALL headings.** No Title Case. No ALL CAPS except eyebrow labels.
- **Never font-weight 600+ on Playfair.** Use 500 at most.
- **Italic Playfair** appears only inside H1 — wrapping the dynamic charity count number (`<span class="n">`). Do not extend italic serif elsewhere.

### Spacing & layout

- **Max content width**: 1200px
- **Container padding**: 32px desktop, 20px mobile
- **Major section padding (band)**: 96px top + 96px bottom on desktop, 64/64 on mobile
- **Card padding**: 28px (event), 32px (charity body), 28px (cause), 40px (guide)
- **Grid gaps**: 12–24px between cards
- **Card image aspect ratio**: 4:3 for event + charity, 1:1 for cause tile

### Borders & radii

- **Border radius**: **zero** anywhere on the homepage. Editorial = sharp corners.
- **Hair line dividers**: `1px solid rgba(44,61,85,0.12)` on stats-style separators; `1px solid rgba(44,61,85,0.08)` on list rows
- **No drop shadows. No glows. No inner shadows.** Depth is via background-color shifts only.

### Motion

- **One global easing**: `all 600ms ease` on every hover, scroll-state transition, and color shift.
- **No bounce, no spring, no parallax, no scroll-triggered animation** beyond the nav background-fade on scroll.
- **No carousels.** No animated counters. (We had stats with animated counters at one point — they were removed deliberately.)

## Page structure (top to bottom)

### 0. Document head — schema markup

Add JSON-LD for:
- `Organization` for Toronto Charities itself
- `WebSite` with a `SearchAction` pointing at `/toronto-charities-list/?q={search_term_string}`
- `CollectionPage` for the homepage as a whole

### 1. Nav

- Sticky at top
- **Transparent background at scroll position 0**, transitions to `--tp-bg` background + 1px `--tc-blue-12` bottom border once scrolled past 4px (600ms ease)
- Container: `max-w-[1200px]` centered, 22px vertical + 32px horizontal padding
- Three groups, `justify-between`:

**Left — Logo lockup** (see "Logo lockup" below)

**Center — Nav links** (Inter 14px / weight 400 / `--tp-ink`, hover → `--tp-blue`, gap 36px)
- Browse charities → `/toronto-charities-list/`
- Events → `/events/`
- Guides → `/guides/`
- About → `/about/`

**Right — Outlined sage button** "For charities" → `/charity/claim/`
- Transparent bg, 1px `--tc-sage` border, `--tc-sage` text, 10×18 padding
- Hover: fill `--tc-sage`, text `--tp-bg`

### 2. Logo lockup (critical — used in nav AND footer)

The logo is structured to match Toronto Property's TP monogram lockup, with **TC** as the monogram.

```
[ 56px × 56px hairline square ]   Toronto       ← Playfair 17px / 400 / --tp-ink
[       TC  inside, centered  ]   Charities     ← Playfair 22px / 500 / --tp-ink
[       Playfair 24px / 500   ]   BY TORONTO PROPERTY  ← Inter 9px / uppercase / 0.16em / --tp-muted, linked
[       1px --tp-ink border   ]                        Toronto Property is a link to https://torontoproperty.ca
[       2px amber bar inside, 18px wide, 8px from bottom, centered ]
```

**HTML structure — DO NOT NEST `<a>` TAGS.** The outer `.logo` must be a `<span>`, not an `<a>`. Inner `.logo-main` is the home link wrapping mark + main wordmark. The "By Toronto Property" line is a separate sibling with its own anchor for "Toronto Property".

```html
<span class="logo">
  <a class="logo-main" href="/" aria-label="Toronto Charities — home">
    <span class="logo-mark">
      <span class="mono">TC</span>
      <span class="bar"></span>
    </span>
    <span class="logo-word">
      <span class="top">Toronto</span>
      <span class="bot">Charities</span>
    </span>
  </a>
  <span class="logo-by">By <a href="https://torontoproperty.ca">Toronto Property</a></span>
</span>
```

In the footer, the logo flips dark-on-light to light-on-dark — same structure, but `--tp-bg` border on the square, `--tp-bg` text on the wordmark. See `Toronto Charities.html` for exact overrides.

### 3. Hero

- Band background `--tp-bg`, 96px vertical padding
- Two-column grid, columns `7fr 5fr`, gap 56px, `align-items: stretch`
- **Left column (type)**, vertically centered:
  - Eyebrow "Toronto Community Directory" in `--tp-amber`
  - H1 (Playfair 60px / 500 / `--tp-blue`): _"A directory of {N} Toronto charities and the work they do."_ — the number is wrapped in `<span class="n">` which renders italic Playfair. **N is server-rendered from the DB.**
  - Lede (Inter 18px / `--tp-ink` 80%, max 56ch): _"Find local charities by cause, browse upcoming events, and discover how Toronto-area organizations are working in your community. Free for everyone, free for charities."_
  - **Search form** — submits to `/toronto-charities-list/?q={value}`. Height 64px, `--tp-paper` background, 1px `--tp-blue` 12% border, NO border-radius. Placeholder _"Search by charity name or cause"_. Right-side magnifier (Lucide search at 1.5 stroke, 20px).
  - Three text links separated by `·` dots (Inter 14px, `--tp-ink` 60%, hover → `--tp-blue` with underline): "Browse all charities", "Browse by cause", "Submit a charity".
- **Right column (photo)**: full-height portrait photo, min-height 540px, aspect-ratio fills. **Real documentary photography of a featured charity.** In the mock this is a tagged warm-beige placeholder.

### 4. Upcoming events ("This week in Toronto")

- Band background `--tp-bg`, 96px vertical padding (top), 96px bottom
- Section head: eyebrow "This week in Toronto" + H2 "Upcoming charity events"; right link "View all events →" → `/events/`
- Grid: 3 columns desktop, 2 tablet, 1 mobile; gap 24px
- **Show 6 events** where `starts_at >= now() AND starts_at < now() + interval '7 days' AND status = 'approved'`, ordered `starts_at asc`

**Event card spec:**
- Background `--tp-paper`, no border, no radius, hover → background `--tp-bg` (600ms ease)
- Whole card is `<a>` to event detail
- **Top: 4:3 photo header** — real event photo, placeholder in mock with caption like _"Event · Soup night · Daily Bread warehouse"_
- **Body** (padding `22px 28px 28px`):
  - Date eyebrow (Inter 12px / 500 / `--tp-amber` / uppercase / 0.12em): "SAT · JUN 14"
  - Title (Playfair 22px / 500 / `--tp-blue`, max 2 lines)
  - Host (Inter 14px): _"by " (60%)_ + charity name (100%, hover underline). Charity name links to its profile.
  - Meta block (Inter 13px / 60%, margin-top: auto): location row with a Lucide map-pin icon, then time + cost ("6:30 PM · Free entry")

### 5. Browse by cause ("Explore the directory")

- Band background `--tp-paper`, 96px vertical padding
- Section head: eyebrow "Explore the directory" + H2 "Browse charities by cause". No "view all" link — every cause is shown.
- Grid: 4 columns desktop, 2 mobile; gap 12px
- **Show all 22 causes** (categories table)

**Cause tile spec (neighbourhood-photo style):**
- 1:1 aspect ratio
- Background: documentary photo of work for that cause (placeholder in mock)
- Bottom gradient overlay: `linear-gradient(180deg, transparent 35%, rgba(26,26,26,0.70) 100%)` — darkens on hover to `rgba(26,26,26,0.82)` from 20%
- Text bottom-left (22px left/right inset, 20px bottom):
  - Cause name (Playfair 22px / 500 / `--tp-bg`, line-height 1.15)
  - Cause count (Inter 11px / uppercase / 0.12em / `--tp-bg` 85%): "26 charities"

Causes list (slug, display name, sample count):
mental-health "Mental health", food-security "Food security", housing-homelessness "Housing & homelessness", youth-children "Youth & children", newcomers-refugees "Newcomers & refugees", animal-welfare "Animal welfare", seniors "Seniors", arts-culture "Arts & culture", environment "Environment", education "Education", health-medical "Health & medical", disability "Disability", lgbtq "LGBTQ+ communities", indigenous "Indigenous communities", women-gender "Women & gender equity", legal-aid "Legal aid", employment-skills "Employment & skills", crisis-trauma "Crisis & trauma", community "Community development", interfaith "Religious & interfaith"

(20 causes shown in mock; brief calls for ~22 — confirm with content owner what the final list is.)

### 6. Featured charities ("Featured this month")

- Band background `--tp-bg`, 96px vertical padding
- Section head: eyebrow "Verified charities" + H2 "Featured this month"; right link "Browse all charities →" → `/toronto-charities-list/`
- Grid: 3 columns desktop, 1 column mobile (NO 2-column intermediate); gap 24px
- **Show 6 charities.** Server-side deterministic-per-day rotation: pull 6 from `charities WHERE is_featured = true AND claimed = true` first, fill remaining slots from `is_featured = true` regardless of claimed.

**Charity card spec:**
- Background `--tp-paper`, no border, no radius, hover → background `--tp-bg`
- Whole card is `<a>` to charity profile
- **Top: 4:3 photo** (placeholder in mock, real charity photo in prod)
- **Body** (padding `28px 32px 32px`):
  - Verified badge (only if `claimed = true`): Lucide check icon 12px + "Verified" in Inter 11px / 500 / `--tc-sage` / uppercase / 0.12em, gap 6px, margin-bottom 14px
  - H3 charity name (Playfair 24px / 500 / `--tp-blue`)
  - Tags (Inter 12px / `--tp-ink` 60%): up to 2 categories separated by ` · `
  - Dek (Inter 15px / `--tp-ink`, ~3 lines, `flex: 1` so cards equalize)
  - "Visit profile →" link (Inter 14px / `--tp-blue`, hover underline)
- **No logos. No "donate now" buttons.** This is editorial.

### 7. Claim CTA band

- Background `--tp-blue`, 112px vertical padding (this is the ONLY dark band on the page — keep it that way)
- Centered content, max-width 720px, text-align center
- Eyebrow "For listed charities" in `--tc-sage`
- H2 (Playfair 40px / 500 / `--tp-bg`): _"Already listed? Claim your profile."_
- Body (Inter 18px / `--tp-bg` 80%): _"If your charity is in our directory, you can claim your profile to post your own events, update your description, and get a 'Featured on Toronto Charities' badge for your website. The only thing we ask is a link from your site to your profile, so visitors can find related charities in the GTA."_
- Two buttons, gap 14px, centered, sharp corners:
  - **Primary (sage)** "Claim your profile" → `/charity/claim/`: solid `--tc-sage` bg, `--tp-bg` text, 16×28 padding, Inter 14px / 500, hover → `--tc-sage-d`
  - **Secondary (ghost on dark)** "How claiming works" → `/charity/how-claiming-works/`: transparent bg, 1px `--tp-bg` 40% border, `--tp-bg` text, hover → border 100%

### 8. Recently added (list, NOT cards)

- Background `--tp-bg`, 64px vertical padding (deliberately less than the 96px band — this is a utility section)
- Section head: eyebrow "New to the directory" + H2 "Recently added charities"
- Grid: 2 columns desktop, 1 column mobile; column-gap 64px, row-gap 0
- **8 most recent** charities where `published = true`, ordered by `created_at desc`

**Row spec:**
- Each row is a 2-column grid (`1fr auto`), align-items baseline, padding 20px 0, bottom border `1px solid rgba(44,61,85,0.08)`
- Left: charity name (Inter 16px / 500 / `--tp-blue`, mb 4px) + 1-line description (Inter 14px / `--tp-ink` 60%, line-height 1.5)
- Right: "Added May 22" (Inter 12px / `--tp-ink` 40%, white-space nowrap)
- Hover: row background → `--tp-paper`, padding-left/right shift 12px (600ms ease)

This is deliberately list-style, not cards. Recently-added is a feed, not editorial curation.

### 9. From the guides

- Band background `--tp-paper`, 96px vertical padding
- Section head: eyebrow "Editorial" + H2 "Guides for giving in Toronto"; right link "All guides →"
- Grid: 2 columns desktop, 1 column mobile; gap 24px
- **Show 4 guides** (manual curation, no DB query — these are editorial picks). Schema TBD; for now hardcode in the page.

**Guide card spec:**
- Background `--tp-bg`, padding 40px, no border, no radius, hover → background `--tp-paper`
- Whole card is `<a>`
- Eyebrow (Inter 12px / 500 / `--tp-amber` / uppercase / 0.12em): "Giving guide" or "Volunteer guide"
- H3 (Playfair 28px / 500 / `--tp-blue`, max 2 lines)
- Dek (Inter 15px / `--tp-ink`, ~3 lines, `flex: 1`)
- Read time (Inter 12px / `--tp-ink` 60%): "8 min read"
- **No image, no read-more button.**

### 10. Footer

- Background `--tp-blue`, 96px top + 64px bottom padding
- Grid: 4 columns `1.5fr 1fr 1fr 1fr` desktop, stacked mobile; gap 64px

**Column 1 — Logo + tagline + credit:**
- Footer-variant logo (transparent square, `--tp-bg` border, `--tp-bg` text)
- Tagline (Inter 14px / `--tp-bg` 70%, max-width 320px): _"A community directory of Toronto-area charities and the events they run."_
- Footer credit (Inter 13px / `--tp-bg` 60%): _"A community resource by [Toronto Property](https://torontoproperty.ca)."_ — link underlined with `--tp-bg` 40%, hover → 100%

**Columns 2–4 — link lists**, each with eyebrow header in `--tc-sage`:
- **Browse**: All charities, By cause, Upcoming events, This month
- **For charities**: Claim your profile, How it works, Submit a charity, Embeddable badge
- **About**: About us, Contact, Privacy, Terms

Links: Inter 14px / `--tp-bg` 70%, hover → 100%, margin-bottom 12px each.

**Bottom strip** (max-w 1200, padding 24px 32px 0, 64px margin-top, top border 1px `--tp-bg` 15%):
- Left: _"© 2026 Toronto Charities. A community resource by Toronto Property."_
- Right: _"Directory last updated May 27, 2026"_ — date is dynamic, server-rendered.
- Inter 12px / `--tp-bg` 50%

## Functional requirements

- **Search bar** submits to `/toronto-charities-list/?q={value}` via standard form GET. No JS needed.
- **All counts are server-rendered** from the DB:
  - `{N}` in the hero = count of `charities WHERE published = true`
  - Cause counts on each tile = `count(*) GROUP BY cause WHERE published = true`
  - Recently added list = top 8 by `created_at desc`
  - Upcoming events = next 7 days, max 6
- **Featured charities rotation** is deterministic per UTC date (so same visitor sees same charities on each refresh that day, refresh-rotates on UTC midnight). Implement as: hash `(date.toISOString().slice(0,10))` to seed the order, then pick 6 from the eligible set.
- **All numbers rounded.** No `1,247.0` ever. No comma-1000 separators below 1000.
- **Nav scroll state** — small client-side script that adds `.scrolled` to the nav wrapper when `window.scrollY > 4`. This is the ONLY client-side JS on the page besides the search submit (which is just a `<form action method=get>`).

## Interactions & behavior

- **Every hover and color change uses `transition: all 600ms ease`.** Do not vary the easing.
- **No transform animations** anywhere — no scale, translate (except a tiny `translateX(4px)` for the recently-added row hover), no rotate.
- **Cards do not lift on hover.** No shadow appears. Hover is signaled by a background-color shift only.
- **Nav background** fades from transparent to `--tp-bg` at scrollY > 4 (600ms ease).
- **Reduced motion**: respect `prefers-reduced-motion: reduce` by setting transitions to 0ms.

## Imagery & placeholders

The mock uses tagged warm-beige photo placeholders that are clearly NOT final design — they have a monospace caption in the top-left describing the intended subject. In production:

- **Hero**: one large, full-height documentary photo of a featured Toronto charity at work
- **Event cards** (6): one photo per event, supplied by the hosting charity at event submission
- **Cause tiles** (~20): one Toronto-photographed image per cause, commissioned or licensed
- **Charity cards** (6): one documentary photo per charity, supplied by the charity at claim

**No stock photography.** No "smiling diverse volunteers". No charity-sector clichés. If a real photo isn't available, leave the slot empty or revert to a type-only treatment for that one card — don't fake it.

**Image format**: prefer WebP, fallback JPEG. Aspect ratios are locked (see Card specs). Lazy-load anything below the hero.

## Assets included in this handoff

- `Toronto Charities.html` — the homepage prototype (the design source of truth)
- `colors_and_type.css` — design tokens as CSS custom properties + base element defaults
- `DESIGN-SYSTEM-locked.md` — the full Toronto Property locked spec these tokens come from (read this for any edge case the homepage doesn't cover)
- `brief.md` — the original product brief (longer rationale + competitor refs + ban list)

## Files in the prototype project to reference

If you have access to the prototype project:
- `ui_kits/charities/Toronto Charities.html` — the live prototype
- `colors_and_type.css` (project root) — the imported token sheet
- `DESIGN-SYSTEM-locked.md` (project root) — the locked Toronto Property spec
- `ui_kits/website/` — the Toronto Property homepage prototype, useful as a visual cousin

## Open questions to confirm with the content owner

1. Final canonical list of causes (mock has 20; brief mentions "~20" and "22") — and the count for each
2. Source of charity photography — supplied by charity at claim, or in-house shoot?
3. Schema for `guides` — currently hardcoded in mock; needs a CMS or DB table before launch
4. Eligibility rules for the verified badge — `is_featured = true` AND `claimed = true`, or different?
5. Locale of dates — currently displayed as "May 27, 2026" (US-ish) — confirm CA-EN format
