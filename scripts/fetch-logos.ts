/**
 * Fetch a logo for each charity that has a website, save it under
 * public/images/charities/<slug>.<ext>, and set charities.logo_url.
 * Order of preference: apple-touch-icon, og:image, an <img> whose src/alt/class
 * says logo, then /favicon.ico. Skips anything already on disk.
 * Usage: npx tsx scripts/fetch-logos.ts [--slugs a,b,c] [--limit 50]
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { db } from '../db';
import { charities } from '../db/schema';
import { eq, inArray, isNotNull, and, ne } from 'drizzle-orm';

const DIR = 'public/images/charities';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const args = process.argv.slice(2);
const slugArg = args.find((a) => a.startsWith('--slugs='))?.split('=')[1];
const limit = Number(args.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? 500);

function abs(href: string, base: string): string | null {
  try { return new URL(href, base).toString(); } catch { return null; }
}

function pick(html: string, base: string): string[] {
  const out: string[] = [];
  const push = (u: string | null) => { if (u && !out.includes(u)) out.push(u); };
  const attr = (tag: string, re: RegExp) => {
    for (const m of html.matchAll(re)) {
      const t = m[0];
      const href = /(?:href|content|src)\s*=\s*["']([^"']+)["']/i.exec(t)?.[1];
      if (href) push(abs(href, base));
    }
  };
  attr('apple', /<link[^>]+rel=["'][^"']*apple-touch-icon[^"']*["'][^>]*>/gi);
  attr('og', /<meta[^>]+property=["']og:image["'][^>]*>/gi);
  attr('logoimg', /<img[^>]+(?:src|alt|class)=["'][^"']*logo[^"']*["'][^>]*>/gi);
  attr('icon', /<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi);
  push(abs('/favicon.ico', base));
  return out;
}

async function get(url: string, timeoutMs = 12000): Promise<Response | null> {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), timeoutMs);
  try { return await fetch(url, { headers: { 'User-Agent': UA }, signal: c.signal, redirect: 'follow' }); }
  catch { return null; } finally { clearTimeout(t); }
}

(async () => {
  mkdirSync(DIR, { recursive: true });
  const where = slugArg
    ? inArray(charities.slug, slugArg.split(','))
    : and(isNotNull(charities.website_url), ne(charities.website_url, ''));
  const rows = await db.select({ slug: charities.slug, name: charities.display_name, site: charities.website_url })
    .from(charities).where(where).limit(limit);
  console.log(`${rows.length} charities to try`);

  let ok = 0, skip = 0, fail = 0;
  for (const r of rows) {
    if (!r.site) { skip++; continue; }
    const base = r.site.startsWith('http') ? r.site : `https://${r.site}`;
    const res = await get(base);
    if (!res || !res.ok) { console.log(`  x ${r.slug}: site ${res?.status ?? 'unreachable'}`); fail++; continue; }
    const html = await res.text();
    let saved = false;
    for (const cand of pick(html, res.url).slice(0, 6)) {
      const img = await get(cand);
      if (!img || !img.ok) continue;
      const type = (img.headers.get('content-type') ?? '').toLowerCase();
      if (!type.startsWith('image/') || type.includes('svg')) continue;
      const buf = Buffer.from(await img.arrayBuffer());
      if (buf.length < 900) continue;
      const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : type.includes('x-icon') || type.includes('vnd.microsoft') ? 'ico' : 'jpg';
      const tmp = `${DIR}/.tmp-${r.slug}.${ext}`;
      writeFileSync(tmp, buf);
      const out = `${DIR}/${r.slug}.jpg`;
      try {
        execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '72', '-Z', '320', tmp, '--out', out], { stdio: 'ignore' });
      } catch { continue; }
      await db.update(charities).set({ logo_url: `/images/charities/${r.slug}.jpg` }).where(eq(charities.slug, r.slug));
      console.log(`  + ${r.slug} <- ${cand.slice(0, 70)}`);
      ok++; saved = true; break;
    }
    if (!saved) { console.log(`  x ${r.slug}: no usable image`); fail++; }
  }
  console.log(`done: ${ok} saved, ${fail} failed, ${skip} skipped`);
  process.exit(0);
})().catch((e) => { console.error('error', e); process.exit(1); });
