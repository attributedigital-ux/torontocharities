/**
 * Hero image generator. Cloudflare Workers AI (Flux) over plain HTTPS, which
 * returns raw bytes, unlike Canva MCP which can generate but cannot export
 * (attribute-brain wiki/agents/content-designer.md). Free tier: 10,000 neurons
 * a day, reset daily.
 *
 * Needs CF_ACCOUNT_ID and CF_API_TOKEN (token scope: Workers AI, Read).
 * Usage: npx tsx scripts/generate-hero.ts <slug> "<prompt>" [--model flux|sdxl]
 *        npx tsx scripts/generate-hero.ts --manifest      (every PENDING row)
 *
 * Writes public/images/guides/<slug>-hero.jpg at 1200px and records the row in
 * content/images/MANIFEST.md. Look at the result before accepting it: the
 * failure modes are baked-in text, deformed people and a hyperreal sheen.
 */
import { writeFileSync, existsSync, readFileSync, appendFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const DIR = 'public/images/guides';
const MANIFEST = 'content/images/MANIFEST.md';
const MODELS = {
  flux: '@cf/black-forest-labs/flux-1-schnell',
  sdxl: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
} as const;

const NEGATIVE =
  'no text, no lettering, no watermark, no logo, no signage, no faces in close detail, ' +
  'no hyperreal gloss, no 3D render look, no stock-photo cliche';

async function generate(prompt: string, model: keyof typeof MODELS): Promise<Buffer> {
  const acct = process.env.CF_ACCOUNT_ID;
  const token = process.env.CF_API_TOKEN;
  if (!acct || !token) throw new Error('CF_ACCOUNT_ID and CF_API_TOKEN must be set');
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${acct}/ai/run/${MODELS[model]}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(
        model === 'flux'
          ? { prompt: `${prompt}. ${NEGATIVE}`, steps: 8 }
          : { prompt, negative_prompt: NEGATIVE, width: 1024, height: 576 },
      ),
    },
  );
  if (!res.ok) throw new Error(`Cloudflare ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const type = res.headers.get('content-type') ?? '';
  if (type.startsWith('image/')) return Buffer.from(await res.arrayBuffer());
  const json = await res.json();
  const b64 = json?.result?.image;
  if (!b64) throw new Error(`no image in response: ${JSON.stringify(json).slice(0, 300)}`);
  return Buffer.from(b64, 'base64');
}

async function one(slug: string, prompt: string, model: keyof typeof MODELS) {
  mkdirSync(DIR, { recursive: true });
  const raw = `${DIR}/.raw-${slug}.png`;
  const out = `${DIR}/${slug}-hero.jpg`;
  writeFileSync(raw, await generate(prompt, model));
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '74', '-Z', '1200', raw, '--out', out], { stdio: 'ignore' });
  const kb = Math.round(readFileSync(out).length / 1024);
  mkdirSync('content/images', { recursive: true });
  if (!existsSync(MANIFEST)) writeFileSync(MANIFEST, '# Image manifest\n\n| Date | Slug | File | Generator | Prompt |\n|---|---|---|---|---|\n');
  appendFileSync(MANIFEST, `| ${new Date().toISOString().slice(0, 10)} | ${slug} | /images/guides/${slug}-hero.jpg | cloudflare ${MODELS[model]} | ${prompt.replace(/\|/g, '/')} |\n`);
  console.log(`${out} (${kb} KB) — look at it before accepting`);
}

(async () => {
  const args = process.argv.slice(2);
  const model = (args.includes('--model') ? args[args.indexOf('--model') + 1] : 'flux') as keyof typeof MODELS;
  const rest = args.filter((a) => a !== '--model' && a !== model);
  if (rest[0] === '--manifest') {
    const briefs = existsSync('content/images/PENDING.md') ? readFileSync('content/images/PENDING.md', 'utf8') : '';
    const rows = [...briefs.matchAll(/^\|\s*([a-z0-9-]+)\s*\|\s*(.+?)\s*\|\s*$/gm)];
    if (rows.length === 0) { console.log('nothing pending'); process.exit(0); }
    for (const [, slug, prompt] of rows) await one(slug, prompt, model);
  } else {
    const [slug, prompt] = rest;
    if (!slug || !prompt) { console.error('usage: generate-hero.ts <slug> "<prompt>" [--model flux|sdxl]'); process.exit(2); }
    await one(slug, prompt, model);
  }
  process.exit(0);
})().catch((e) => { console.error(String(e)); process.exit(1); });
