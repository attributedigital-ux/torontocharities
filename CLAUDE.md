# CLAUDE.md — Toronto Charities

Operating rules for Claude Code on this project. Read this file before touching anything.

## What this project is

A community directory of Toronto-area charities and their events, operated as a community resource by Toronto Property. Site eventually folds into `torontoproperty.ca/toronto-charities/` via a 301 redirect.

- Domain: `toronto-charities.ca`
- Live data: ~2,500–3,500 GTA charities from CRA bulk import, ~100–300 events at any time from automated ingestion, ~10 editorial guides
- Web app + Postgres reads on Netlify (serverless functions, static where possible)
- Cron-driven worker on a $6–12/month DigitalOcean VPS handles CRA import + event ingestion + linkback verification

## Stack

```
Next.js 16 App Router + React 19 + Tailwind 4
Drizzle ORM + Neon (serverless Postgres, pg_trgm enabled)
NextAuth (Auth.js v5) + @auth/drizzle-adapter + Resend magic links
Anthropic SDK — Haiku 4.5 for both pipelines (Batches API for the CRA one-shot, prompt caching everywhere)
Plausible analytics
Netlify (web) + DigitalOcean VPS (worker)
```

Source-of-truth specs:
- `_docs/specs/00_MAIN_BUILD_SPEC.md` — stack, schema, routes, auth, phasing
- `_docs/specs/SEO_FOUNDATIONS_SPEC.md` — middleware, sitemap, robots, schema markup, meta tags, redirects
- `_docs/specs/CRA_IMPORT_SPEC.md` — bulk import + description generation pipeline
- `_docs/specs/EVENT_INGESTION_SPEC.md` — event source registry + ingestion pipeline + cron schedule
- `_docs/design/` — homepage design handoff (the only template with a design brief; all others infer from this system)

## Where the agency-wide standards live

Cross-cutting writing, design, banned words, content thinking, research rules, copy standard, guide page standard, design stage workflow, lessons learned, post-launch GMB checklist all live in:

```
~/Documents/GitHub/attribute-media/_docs/standards/
```

Read from there. Never duplicate any of those files into this repo.

## The two Claude pipelines — cost rules are non-negotiable

This project calls the Claude API in two places. Both follow the same rules so costs stay predictable.

### Rule 1 — Always Haiku 4.5

```typescript
const MODEL = 'claude-haiku-4-5-20251001';
```

Never use Sonnet or Opus in either pipeline. Both tasks (charity description writing, event enrichment) are pattern work, not reasoning work. Haiku handles them. If a quality-review pass flags Haiku as failing — and only then — discuss promoting to Sonnet. Never silently upgrade the model.

### Rule 2 — Batches API for one-shot bulk jobs

The CRA description pipeline is a one-shot 2,500–3,500 call job with no urgency. Use `client.messages.batches.create()`. 50% discount on every token. 24-hour SLA is fine.

Event enrichment runs daily on ~10–50 events — too small for Batches. Run inline.

### Rule 3 — Prompt caching on the static portion

Both prompts have a substantial static portion (style rules, format spec, banned words list, JSON schema for the response). Move that into the `system` parameter with `cache_control: { type: 'ephemeral' }`. Variable portion (per-charity or per-event data) goes in the user message.

```typescript
const response = await client.messages.create({
  model: MODEL,
  max_tokens: 600,
  system: [
    { type: 'text', text: STATIC_INSTRUCTIONS, cache_control: { type: 'ephemeral' } },
  ],
  messages: [{ role: 'user', content: buildVariablePrompt(charity) }],
});
```

### Rule 4 — Strict `max_tokens` budgets

- Charity description: `max_tokens: 600` (target output 80–150 words ≈ 300 tokens; 600 covers retries)
- Event enrichment: `max_tokens: 800` (JSON object with multiple fields)

Never raise these without measuring why an output is truncating. Truncation usually means the prompt is wrong, not the budget.

### Rule 5 — No verification-with-second-call patterns

Do not call Claude a second time to verify the first call's output. Trust the model; sample-review human-side.

### Expected costs (back of envelope)

| Job | Volume | Model | Optimizations | Estimate |
|---|---|---|---|---|
| CRA descriptions (one-shot) | 2,500 calls | Haiku 4.5 | Batches + caching | ~$8 |
| Event enrichment (recurring) | 50/week | Haiku 4.5 | Caching | ~$0.50/week |

If a run exceeds the estimate by more than 2×, stop and investigate before continuing.

## Banned words / writing rules

Cross-cutting copy standard: `~/Documents/GitHub/attribute-media/_docs/standards/COPY_STANDARD.md`.
Cross-cutting banned words: `~/Documents/GitHub/attribute-media/_docs/standards/BANNED_WORDS.md`.

Both Claude pipelines must paste the banned-words list verbatim into their prompts (per `attribute-media` Rule). Spot examples — never use these in any generated copy:

`seamless, comprehensive, top-notch, tailored, bespoke, cutting-edge, peace of mind, rest assured, world-class, committed to, dedicated to, passionate about, tirelessly, making a difference`

No em dashes anywhere. No rhetorical negation. No contrastive identity statements. No generic openers. Use the cross-cutting BANNED_WORDS as the canonical list.

## Things not to build without explicit instruction

- Payment processing (this is a directory, not a fundraising platform)
- User accounts for end users / donors (only charity owners + admins have accounts)
- Multi-language support (English only)
- Native mobile apps

## Phasing (per main spec §7)

- **Phase 0** — scaffold (this session): Next.js, Drizzle schema, design system port, deploy config
- **Phase 1** — directory shell: directory + category + profile templates, CRA structural import, auth scaffolding, SEO foundations §1–3, §5
- **Phase 2** — content fill: CRA description generation (Claude pipeline), first guides, SEO §4 and §6, featured selection
- **Phase 3** — events: VPS provisioned, worker deployed, all ingestion sources active
- **Phase 4** — launch prep: page speed audit, admin views, daily summary email, verification checklist

## Build hygiene

- Netlify free tier has 300 build minutes/month — don't push to main repeatedly during dev. Push deliberately, test locally first.
- Push via GitHub Desktop (HTTPS not configured in terminal per agency global rule)
- One logical change per commit. Use the format `[area]: what changed and why` (per seo-page-factory CLAUDE.md convention)
- Never edit anything on a deployed site server-side without committing back to git the same session

## Working principles

- Edit, don't rewrite — targeted Edits over Writes for existing files
- Read only what you need — don't grep the whole codebase to orient
- Plan before acting on multi-step work
- Use the Server Component default; mark `'use client'` only where required (forms, search, dashboard interactions)
- No third-party UI libraries (shadcn etc.) unless a real component need justifies the dependency cost
