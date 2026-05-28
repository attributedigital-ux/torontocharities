# CLAUDE.md — [CLIENT NAME] SEO Page Factory
# ============================================================
# Operating rules for Claude Code on this project.
# Read this file before touching anything.
# Fill in every [PLACEHOLDER] before starting any work.
# ============================================================

## What This Project Is

SEO Page Factory for [CLIENT NAME] — [brief description of trade/service].
Serving [PRIMARY REGION], [OTHER REGIONS].

Platform: Static HTML deployed on Netlify
CRM & lead tools: Go High Level (GHL) hybrid
Repo: attributedigital-ux/[repo-name]
Live site: https://[client-domain].com
Netlify URL: https://[netlify-site-name].netlify.app

[N] pages total: [N] hub pages + [N] landing pages + homepage + contact

---

## Client Details

```
Business:   [CLIENT NAME]
Owner(s):   [OWNER NAME]
Phone:      [PHONE]
Email:      [EMAIL]
Address:    [ADDRESS]
Colour:     [HEX] ([colour description])
```

---

## Tracking & Analytics

```
GA4 Measurement ID:   G-[XXXXXXXXXX]
GTM Container ID:     GTM-[XXXXXXX]
GHL Location ID:      [LOCATION ID]
GHL Chat Widget ID:   [WIDGET ID]
GHL Quote Form ID:    [FORM ID]
```

**GTM is injected via Netlify Snippet Injection — NOT in any HTML file.**
Never add GTM or GA4 tags directly to HTML files.
If tracking needs updating: Netlify → Site Settings → Build & Deploy → Snippet Injection.

Google account managing all tracking: attributereporting@gmail.com
Client's Google account added as Editor on GA4 and GTM: [CLIENT GOOGLE EMAIL]

---

## The Four Script Files

| File | Purpose |
|------|---------|
| `Scripts/sitemap.py` | All business details, services, regions, tier logic. Single source of truth. |
| `Scripts/service_questions.py` | All FAQ, buying guide, troubleshooting questions. Never invent questions. |
| `Scripts/prompts.py` | Builds system + user prompts for Claude API. CSS travels in system prompt. |
| `Scripts/generate.py` | CLI runner. Calls API, writes files, logs cost, auto-resumes. |

---

## CLI Commands

```bash
python3 Scripts/generate.py --list                       # preview all pages (no API calls)
python3 Scripts/generate.py --limit 1                    # test: first page only
python3 Scripts/generate.py --limit 3                    # test: 3 pages
python3 Scripts/generate.py --service [service-slug]     # all pages for one service
python3 Scripts/generate.py --hub-only                   # hub pages only
python3 Scripts/generate.py --land-only                  # landing pages only
python3 Scripts/generate.py                              # full batch (skips completed)
```

---

## Generator Rules — Non-Negotiable

### RULE 1 — max_tokens MUST be 64000
```python
max_tokens=64000,  # ALWAYS — never lower
```
Pages need ~10,000 output tokens. Budget must be there or pages truncate.

### RULE 2 — Always use streaming
```python
with client.messages.stream(
    model=MODEL,
    max_tokens=64000,
    system=system,
    messages=[{"role": "user", "content": prompt}]
) as stream:
    for text in stream.text_stream:
        html += text
    final = stream.get_final_message()
```
Never use `client.messages.create()` — API times out on long pages.

### RULE 3 — CSS lives in the system prompt
CSS is extracted from the template and injected into the system prompt.
Never move it. If CSS is not in the system prompt, Claude invents class names
and the design breaks completely.

### RULE 4 — Test before every full run
```bash
python3 Scripts/generate.py --limit 1
# Open output file in browser — verify all sections present
# Check terminal — no truncation warning (stop_reason must be end_turn)
# ONLY THEN run full batch
```

### RULE 5 — Never change slugs after pages are live
The `slug` field in `sitemap.py` determines the URL.
Changing a slug after Google has indexed the page loses all ranking.
If a service name changes: change the display name only, never the slug.

### RULE 6 — generation_log.json enables safe resume
Do not delete this file mid-batch.
To regenerate one page: remove its entry from the log, re-run with `--service` filter.

### RULE 7 — Never hardcode tracking tags in HTML
GTM and GA4 are delivered via Netlify Snippet Injection.
Never add `<script>` tags for GTM, GA4, or any analytics tool to HTML files.
Never include them in the generation prompt either.
All tracking changes go through Netlify Snippet Injection — zero HTML edits needed.

### RULE 8 — encoding declaration required
All Python files must start with:
```python
# -*- coding: utf-8 -*-
```

---

## Deployment

```bash
# After generation — copy output contents to repo root
cp -r Scripts/output/ ./
git add .
git commit -m "Generate [N] pages — [description] — [date]"
git push
```

Netlify auto-deploys on every push. No manual deploy step needed.

**Before regenerating any live page:**
- Check Google Search Console — does the page have impressions?
- If yes: edit the HTML file directly. Do not regenerate.
- If no: safe to regenerate.

---

## Page Architecture

```
URL structure:
  /[service]/               → hub page (service authority)
  /[service]/[region]/      → landing page (geo + service)
  /                         → homepage
  /contact/                 → contact page

File structure in repo root:
  [service]/index.html
  [service]/[region]/index.html
  index.html
  contact/index.html
  sitemap.xml
  robots.txt
```

**Services:** [list service slugs]
**Regions:** [list region slugs]
**Tier logic:** Tier 1 = all regions | Tier 2 = key regions | Tier 3 = hub only

---

## Content Rules

1. Minimum 1,200 visible words per page
2. Exactly 6 service cards per page — never fewer
3. FAQ answers minimum 80 words each — specific, not filler
4. Pricing in body copy: broad only ("we work within any budget")
5. Pricing in FAQ: specific range + factors affecting cost + free quote link
6. 3 review cards per page — different names, different vocabulary, different structure
7. Never invent questions — all questions come from `service_questions.py`
8. Max 2 neighbourhood names per section, never repeated
9. Every page must end with closing `</html>` — if it doesn't, it's truncated

---

## Banned Words — Never Use in Any Content

seamless, comprehensive, top-notch, tailored, bespoke, cutting-edge, state-of-the-art,
peace of mind, rest assured, look no further, second to none, world-class,
"We are committed to", "We pride ourselves on", "Our team of experts",
"years of experience" (use the actual number),
"fully qualified" (use specific licence number or credential instead),
"Whether you need X or Y, we have you covered",
"It depends on many factors" (without immediately listing the factors)

---

## GHL Integration

Contact form: GHL iframe embed on /contact/ page
Chat widget: GHL script tag on all pages (Widget ID: [WIDGET ID])
CRM: GHL sub-account (Location ID: [LOCATION ID])

**GHL handles:** forms, chat, CRM, automations, client dashboard, scheduled reports
**Netlify handles:** all SEO pages — never use GHL pages for anything that needs to rank

GHL sub-account dashboard: "[CLIENT NAME] — Live Performance"
Monthly report: scheduled to [CLIENT EMAIL] on 1st of each month

---

## DNS & Domain

Domain registered at: [REGISTRAR — GHL / GoDaddy / other]
DNS records pointing to Netlify:
  A record:     [domain].com → 75.2.60.5
  CNAME:        www → [netlify-site-name].netlify.app

SSL provisioned by Netlify automatically after DNS change.

---

## Search Console & Bing

Google Search Console: verified via Google Analytics
Sitemap submitted: https://[domain].com/sitemap.xml
Hub pages indexed: [date]

Bing Webmaster Tools: [verified Y/N]
Sitemap submitted to Bing: [Y/N]

---

## What Not To Do

- Never change a slug after pages are live
- Never edit generated HTML to fix design issues — fix the template, then regenerate
- Never run a full batch without testing `--limit 1` first
- Never set max_tokens below 64000
- Never use `client.messages.create()` — always stream
- Never move CSS out of the system prompt
- Never add GTM, GA4, or any tracking tags to HTML files — Netlify Snippet Injection only
- Never use your personal Gmail for GHL integrations — use attributereporting@gmail.com
- Never delete `generation_log.json` mid-batch
- Never regenerate a page that has Google impressions — edit the HTML file directly
- Never change DNS without client confirmation and agreed cutover time

---

## Checklist — Before First Generation

- [ ] All client details filled in above
- [ ] GA4 account and property created (attributereporting@gmail.com)
- [ ] GTM container created and GA4 tag published inside it
- [ ] GTM ID stored in sitemap.py as `"gtm_id"`
- [ ] sitemap.py complete — all services, regions, tiers, business details
- [ ] service_questions.py complete — 8 FAQ, 7 buying guide, 5 troubleshooting per service
- [ ] template_landing.html approved by client in writing
- [ ] All image URLs confirmed in generate.py
- [ ] Test run completed: `python3 Scripts/generate.py --limit 1`
- [ ] Test page opened in browser — all sections present, design correct
- [ ] No truncation warning in terminal output

---

## Checklist — After Deployment

- [ ] Netlify Snippet Injection confirmed active (GTM on all pages)
- [ ] GA4 DebugView shows pageview events on live site
- [ ] Domain DNS pointed to Netlify
- [ ] SSL certificate active (not just pending)
- [ ] Google Search Console verified and sitemap submitted
- [ ] Hub pages requested for indexing in GSC
- [ ] Bing Webmaster Tools verified and sitemap submitted
- [ ] GA4 connected to GHL sub-account
- [ ] GHL dashboard built and set as default
- [ ] Client added as Account User (restricted permissions)
- [ ] Monthly scheduled report configured
- [ ] Snapshot created from this sub-account
- [ ] POST_LAUNCH_GMB_CHECKLIST.md completed

---

*SEO Page Factory — New Client Template · March 2026*
*Attribute.Media · Copy this file to every new client repo and fill in all placeholders*
*attributereporting@gmail.com is the agency reporting Google account — use for all GA4/GTM connections*
