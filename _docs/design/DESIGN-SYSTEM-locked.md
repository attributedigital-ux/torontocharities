# TORONTOPROPERTY.CA — LOCKED DESIGN SYSTEM

_Verbatim copy of the authoritative design spec from the Toronto Property theme repo
(`wp-content/themes/torontoproperty/DESIGN-SYSTEM.md`)._

This is the SOURCE OF TRUTH. Everything in this design-system project is derived from it.
The legacy live site (see `assets/site-screenshot-reference.png`) still uses the OLD
teal + orange palette — ignore it. Follow the rules below.

---

## FONTS

Load from Google Fonts:
- Playfair Display: weights 400, 500, italic 400
- Inter: weights 300, 400, 500

**Rules:**
- Playfair Display → ALL headings, addresses, prices, section titles, CTA button text, italic moments
- Inter → ALL body text, nav, labels, badges, meta, filter text, breadcrumbs, form elements
- NEVER use any other font
- NEVER use font-weight 600, 700, or bold on Playfair

---

## COLOURS

```
--tp-paper:   #FAFAF8   Page background
--tp-ink:     #1A1A1A   Headings, body text, masthead rule
--tp-blue:    #2C3D55   Badges, active nav, links, buttons
--tp-amber:   #A07830   CTAs ONLY — aged brass
--tp-muted:   #999999   Secondary text, inactive nav
--tp-hint:    #C8C8C4   Placeholders, fine print
--tp-rule:    #E2E2DF   Dividers, borders
--tp-white:   #FFFFFF   Card surfaces, inputs
--tp-bg:      #F2EFE8   Search zone background
--tp-bgrule:  #D8D4CC   Search zone borders
```

**Rules:**
- NEVER use teal — old design, must be replaced with `--tp-blue`
- NEVER use black (#000000) on any hover state
- NEVER use purple, green, red or any colour not in this list
- Amber `#A07830` is ONLY for CTA buttons and their hover states. Nothing else.

---

## TYPE SCALE — DESKTOP

| Role | Size | Family |
|---|---|---|
| Page headline | 56px | Playfair Display |
| Section titles | 28px | Playfair Display |
| Hero address | 40px | Playfair Display |
| Hero price | 38px | Playfair Display |
| Listing card address | 18px | Playfair Display |
| Listing card price | 20px | Playfair Display |
| Guide card title | 24px | Playfair Display |
| Neighbourhood name | 22px (featured 30px) | Playfair Display |
| Nav links | 15px | Inter, uppercase, letter-spacing 0.06em |
| Body / description | 16px | Inter |
| Guide description | 15px | Inter |
| Search input | 16px | Playfair Display italic |
| Search subline | 15px | Inter |
| Quick links label | 15px | Playfair Display |
| Section link | 15px | Playfair Display italic |
| Footer links | 14px | Inter |
| CTA buttons | 14–15px | Playfair Display italic |
| Breadcrumbs | 13px | Inter |
| Labels/badges/meta | 11px (MIN) | Inter |

**Hard rule: nothing visible below 13px. Labels/meta/badges minimum 11px. No exceptions.**

---

## HOVER SYSTEM — 600ms EVERYWHERE

```css
transition: all 600ms ease;
```

- Nav links: underline slides in from LEFT (width 0 → 100%), colour fades to `--tp-ink`. NEVER instant.
- Buttons (amber filled): background darkens to `#7A5C20`
- Buttons (ghost amber): fills to `#A07830`, text white
- Listing card images: `transform: scale(1.05)` at 800ms ease
- Neighbourhood photos: same scale + overlay darkens
- Footer links: colour fades to `rgba(255,255,255,0.85)`
- NEVER black on hover. NEVER 0ms. NEVER bounce/spring.

---

## BUTTONS

### Primary CTA
```css
background: #A07830;  color: #fff;
font: italic 15px 'Playfair Display', serif;
border-radius: 20px;  padding: 11px 26px;  border: none;
transition: all 600ms ease;
```
Hover: `background: #7A5C20`

### Ghost CTA
```css
background: transparent;  color: #A07830;
border: 1px solid #A07830;
font: italic 14px 'Playfair Display', serif;
border-radius: 20px;  padding: 9px 22px;
transition: all 600ms ease;
```
Hover: `background: #A07830; color: #fff`

### NEVER
- Never black/dark fill on hover
- Never pill radius (20px) on anything that isn't a CTA
- Never bold
- Never Inter on CTA — Playfair italic only

---

## MASTHEAD — LOCKED

- Logo: TORONTO / PROPERTY stacked wordmark
- Nav: Neighbourhoods · Buy · Rent · Sell (15px Inter uppercase)
- Underline slides in from left on hover, 600ms
- Right: date (11px Inter `#C8C8C4`) + "Work with us" ghost amber pill
- Bottom border: 2px solid `#1A1A1A`
- Background: `#FAFAF8`

---

## SEARCH BAR

### Homepage zone
- Background `#F2EFE8` (warmer cream)
- Headline "Find your perfect Toronto home"
- Buy · Rent mode selector above input
- Full-width input + Filters button + Search listings button
- NOT sticky — sits in page flow

### Internal pages
- Same visuals as homepage bar, background `#F2EFE8`
- Buy · Rent inline left
- `position: sticky; top: 57px` (below masthead)
- Old RealtyPress search bar hidden sitewide

### Input
```css
font: italic 16px 'Playfair Display', serif;
color: #1A1A1A;
border: 0.5px solid #D8D4CC;
border-radius: 2px;           /* NOT a pill */
height: 50px;  background: #fff;
```

### Filters button
```css
background: #fff;  border: 0.5px solid #D8D4CC;
border-radius: 2px;           /* NOT a pill */
font: 13px 'Inter', sans-serif;  color: #999;  height: 50px;
```
Hover: border-color & colour → `#2C3D55`

### Search / Go button
```css
background: transparent;  color: #A07830;
border: 1px solid #A07830;
border-radius: 2px;           /* NOT a pill on sticky */
font: italic 14px 'Playfair Display', serif;  height: 50px;
```
Hover: `background: #A07830; color: #fff`

### Filter panel
- Background `#fff`, 4 columns (Price, Bedrooms, Bathrooms, More)
- Preset chips: `border-radius: 12px; border: 0.5px solid #E2E2DF`
- Active chip: `background: #2C3D55; color: #fff`
- Apply filters: primary amber pill CTA
- Clear all: Playfair italic, `#999`

### NEVER on search
- Never pill on input
- Never pill on Filters button
- Never black hover
- Never teal

---

## SECTIONS

```
header padding: 14px 40px
header border-bottom: 0.5px solid #E2E2DF
flex, space-between
```
- Title: Playfair 28px `#1A1A1A`
- Sub: Inter 14px `#999`
- Link: Playfair italic 15px `#2C3D55`, underline slides in 600ms

---

## LISTING CARDS

```
border: 0.5px solid #E2E2DF (right + bottom)
background: #FAFAF8
image: height 200px, overflow hidden
image hover: transform scale(1.05) 800ms ease

Badge For Sale:  background #2C3D55, color #fff
Badge For Rent:  transparent, color #2C3D55, border 1px solid #2C3D55

body padding: 14px 16px 18px
Type label:    Inter 10px uppercase #C8C8C4
Address:       Playfair 18px #1A1A1A
Neighbourhood: Inter 11px #C8C8C4
Price:         Playfair 20px #1A1A1A
Meta row:      Inter 11px #999, padding-top 9px, border-top 0.5px solid #E2E2DF
```

---

## WHEN IN DOUBT

1. Homepage is the approved reference
2. Search bar on homepage == exact style on all internal pages
3. Section headers on homepage == exact style on all internal pages
4. Listing cards on homepage == exact style everywhere
5. If it's not on the homepage, ASK before inventing

---

## NEVER DO

- Invent new colours
- Invent new font pairings
- Add border-radius to inputs or filter buttons
- Use teal anywhere
- Use black on hover
- Make transitions faster than 600ms
- Change the masthead
- Redesign the search bar style
- Use font-weight bold or 600+ on Playfair
- Add drop shadows, gradients, or glow effects
