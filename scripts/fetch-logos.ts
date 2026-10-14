/**
 * Fetch a real logo for each charity and set charities.logo_url.
 *
 * Only a logo counts. An og:image is the page's social picture, usually a
 * photograph, and upscaling a 32px favicon gives a blurred smudge: both were
 * accepted on the first run of 13 Oct 2026 and both looked wrong on the page.
 * Order now: an SVG logo (served as-is, crisp at any size), an apple-touch-icon,
 * an <img> the markup calls a logo, then a favicon only if it is big enough.
 * Nothing is ever upscaled and nothing under 64px is kept.
 *
 * Sites that block a plain fetch (Cloudflare and friends answer 403) are read
 * through the work Chrome instead, which is a real browser with a real
 * profile: start it headless on port 9223 first (see
 * attribute-brain wiki/processes/claude-work-browser.md). One tab, reused for
 * every site, closed at the end. A 403 is not a wall.
 *
 * Usage: npx tsx scripts/fetch-logos.ts [--slugs a,b,c] [--limit 50] [--force]
 *                                       [--offset 0] [--no-browser]
 */
import { writeFileSync, existsSync, mkdirSync, unlinkSync, readFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { db } from '../db';
import { charities } from '../db/schema';
import { eq, inArray, isNotNull, and, ne } from 'drizzle-orm';

const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };
/** Same site, or a subdomain of it. A charity moving to a different domain
 *  entirely usually means the old one lapsed and someone else bought it. */
const sameSite = (a: string, b: string) => {
  const x = host(a), y = host(b);
  if (!x || !y) return false;
  return x === y || x.endsWith('.' + y) || y.endsWith('.' + x);
};

const DIR = 'public/images/charities';
const MIN_PX = 64;
const MAX_PX = 160;   // a 38px tile at 2x; 5,531 of these have to stay small
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

const args = process.argv.slice(2);
const slugArg = args.find((a) => a.startsWith('--slugs='))?.split('=')[1];
const force = args.includes('--force');
const limit = Number(args.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? 20000);
const offset = Number(args.find((a) => a.startsWith('--offset='))?.split('=')[1] ?? 0);
const useBrowser = !args.includes('--no-browser');

// ---- the work Chrome, one tab, opened on first need ----
let browser: any = null, tab: any = null;
async function chromeTab() {
  if (tab) return tab;
  if (!useBrowser) return null;
  try {
    browser = await puppeteer.connect({ browserURL: 'http://localhost:9223', defaultViewport: { width: 1280, height: 900 } });
    tab = await browser.newPage();
    await tab.setRequestInterception(true);
    tab.on('request', (req: any) => {
      // the markup is all we need; blocking media keeps a 2015 Mac usable
      const t = req.resourceType();
      if (t === 'image' || t === 'media' || t === 'font') req.abort().catch(() => {});
      else req.continue().catch(() => {});
    });
    return tab;
  } catch { console.log('  (work Chrome not reachable on :9223, carrying on without it)'); return null; }
}

/** Read a page and pull a file out of it from inside the browser, so the site
 *  sees an ordinary visitor rather than a script. */
async function viaChrome(url: string): Promise<{ html: string; fetchFile: (u: string) => Promise<{ type: string; b64: string } | null> } | null> {
  const p = await chromeTab();
  if (!p) return null;
  try {
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await new Promise((r) => setTimeout(r, 1200));
    const html = await p.content();
    const fetchFile = async (u: string) =>
      p.evaluate(async (target: string) => {
        try {
          const r = await fetch(target);
          if (!r.ok) return null;
          const b = await r.arrayBuffer();
          let s = '';
          const bytes = new Uint8Array(b);
          for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
          return { type: r.headers.get('content-type') || '', b64: btoa(s) };
        } catch { return null; }
      }, u);
    return { html, fetchFile };
  } catch { return null; }
}

const abs = (href: string, base: string) => { try { return new URL(href, base).toString(); } catch { return null; } };

function candidates(html: string, base: string): string[] {
  const out: string[] = [];
  const push = (u: string | null) => { if (u && !out.includes(u)) out.push(u); };
  const grab = (re: RegExp) => {
    const found: string[] = [];
    for (const m of html.matchAll(re)) {
      const href = /(?:href|src)\s*=\s*["']([^"']+)["']/i.exec(m[0])?.[1];
      if (href) found.push(href);
    }
    return found;
  };
  // 1. an SVG logo, in a link or an img
  for (const h of [...grab(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi), ...grab(/<img[^>]+>/gi)])
    if (/\.svg(\?|$)/i.test(h) && /logo|icon|brand/i.test(h)) push(abs(h, base));
  // 2. apple-touch-icon, almost always the square brand mark
  for (const h of grab(/<link[^>]+rel=["'][^"']*apple-touch-icon[^"']*["'][^>]*>/gi)) push(abs(h, base));
  // 3. an image the markup itself calls a logo
  for (const m of html.matchAll(/<img[^>]*>/gi))
    if (/logo|brand/i.test(m[0])) { const h = /src\s*=\s*["']([^"']+)["']/i.exec(m[0])?.[1]; if (h) push(abs(h, base)); }
  // 4. a favicon, kept only if it turns out to be big enough
  for (const h of grab(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)) push(abs(h, base));
  push(abs('/favicon.ico', base));
  return out;
}

async function get(url: string, ms = 12000): Promise<Response | null> {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  try { return await fetch(url, { headers: { 'User-Agent': UA }, signal: c.signal, redirect: 'follow' }); }
  catch { return null; } finally { clearTimeout(t); }
}

function dims(path: string): [number, number] | null {
  try {
    const o = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', path], { encoding: 'utf8' });
    const w = Number(/pixelWidth:\s*(\d+)/.exec(o)?.[1]);
    const h = Number(/pixelHeight:\s*(\d+)/.exec(o)?.[1]);
    return w && h ? [w, h] : null;
  } catch { return null; }
}

(async () => {
  mkdirSync(DIR, { recursive: true });
  const where = slugArg
    ? inArray(charities.slug, slugArg.split(','))
    : and(isNotNull(charities.website_url), ne(charities.website_url, ''));
  const rows = await db.select({ slug: charities.slug, site: charities.website_url }).from(charities).where(where).orderBy(charities.id).limit(limit).offset(offset);
  console.log(`${rows.length} charities to try`);
  let ok = 0, fail = 0;

  for (const r of rows) {
    if (!r.site) { fail++; continue; }
    if (!force && (existsSync(`${DIR}/${r.slug}.svg`) || existsSync(`${DIR}/${r.slug}.png`))) { continue; }
    const base = r.site.startsWith('http') ? r.site : `https://${r.site}`;
    let html = '', baseUrl = base, viaBrowser: Awaited<ReturnType<typeof viaChrome>> = null;
    const res = await get(base);
    if (res && res.ok) { html = await res.text(); baseUrl = res.url; }
    else {
      viaBrowser = await viaChrome(base);
      if (!viaBrowser) {
        await db.update(charities)
          .set({ website_status: 'dead', website_checked_at: new Date() })
          .where(eq(charities.slug, r.slug));
        console.log(`  x ${r.slug}: DEAD, site ${res?.status ?? 'unreachable'}, browser no help`);
        fail++; continue;
      }
      html = viaBrowser.html;
      baseUrl = base;
    }

    // Left its own domain: record where it goes and take nothing from it.
    if (!sameSite(base, baseUrl)) {
      await db.update(charities)
        .set({ website_status: 'redirected', website_redirects_to: baseUrl.slice(0, 500), website_checked_at: new Date() })
        .where(eq(charities.slug, r.slug));
      console.log(`  x ${r.slug}: REDIRECTED to ${host(baseUrl)}, nothing taken`);
      fail++; continue;
    }
    await db.update(charities)
      .set({ website_status: 'live', website_redirects_to: null, website_checked_at: new Date() })
      .where(eq(charities.slug, r.slug));
    let saved = false;

    for (const cand of candidates(html, baseUrl).slice(0, 8)) {
      let type = '', buf: Buffer | null = null;
      if (!viaBrowser) {
        const img = await get(cand);
        if (!img || !img.ok) continue;
        type = (img.headers.get('content-type') ?? '').toLowerCase();
        if (!type.startsWith('image/')) continue;
        buf = Buffer.from(await img.arrayBuffer());
      } else {
        const got = await viaBrowser.fetchFile(cand);
        if (!got) continue;
        type = got.type.toLowerCase();
        if (!type.startsWith('image/')) continue;
        buf = Buffer.from(got.b64, 'base64');
      }
      if (!buf || buf.length < 500) continue;

      if (type.includes('svg')) {
        if (buf.length > 400_000) continue;
        // A logo drawn entirely in white is made for a dark header and
        // disappears on our white tile (YMCA, 14 Oct 2026). Take the next one.
        const svg = buf.toString('utf8');
        const fills = [...svg.matchAll(/fill\s*[:=]\s*["']?(#[0-9a-fA-F]{3,6}|white)/g)].map((m) => m[1].toLowerCase());
        if (fills.length > 0 && fills.every((f) => f === '#fff' || f === '#ffffff' || f === 'white')) continue;
        const out = `${DIR}/${r.slug}.svg`;
        writeFileSync(out, buf);
        await db.update(charities).set({ logo_url: `/images/charities/${r.slug}.svg` }).where(eq(charities.slug, r.slug));
        console.log(`  + ${r.slug} svg`);
        ok++; saved = true; break;
      }

      const tmp = `${DIR}/.tmp-${r.slug}`;
      writeFileSync(tmp, buf);
      const d = dims(tmp);
      if (!d || Math.max(d[0], d[1]) < MIN_PX) { unlinkSync(tmp); continue; }
      const out = `${DIR}/${r.slug}.png`;
      const scale = Math.max(d[0], d[1]) > MAX_PX ? ['-Z', String(MAX_PX)] : [];
      try { execFileSync('sips', ['-s', 'format', 'png', ...scale, tmp, '--out', out], { stdio: 'ignore' }); }
      catch { unlinkSync(tmp); continue; }
      unlinkSync(tmp);
      await db.update(charities).set({ logo_url: `/images/charities/${r.slug}.png` }).where(eq(charities.slug, r.slug));
      console.log(`  + ${r.slug} ${d[0]}x${d[1]}`);
      ok++; saved = true; break;
    }
    if (!saved) { console.log(`  . ${r.slug}: live, no logo good enough`); }
  }
  if (tab) { await tab.close().catch(() => {}); }
  if (browser) { await browser.disconnect().catch(() => {}); }
  console.log(`done: ${ok} saved, ${fail} failed`);
  process.exit(0);
})().catch((e) => { console.error('error', e); process.exit(1); });
