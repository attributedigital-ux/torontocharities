/**
 * Logos by image search. Richard, 14 Oct 2026: "why do you need the sites
 * themselves for the logo? Just use google images for CHARITY NAME LOGO."
 * Right: one Serper call beats visiting the site, works when the site is
 * blocked, dead or was never recorded, and runs in parallel.
 *
 * A result is only accepted when it is plausibly this charity's own mark:
 * the image sits on the charity's own domain, or its title or page carries
 * enough of the charity's name. Otherwise we would file a stranger's logo.
 *
 * Usage: npx tsx scripts/logos-via-search.ts [--limit 50] [--offset 0]
 *                                            [--only-missing] [--workers 6]
 */
import { writeFileSync, existsSync, mkdirSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { db } from '../db';
import { charities } from '../db/schema';
import { eq, isNull, sql } from 'drizzle-orm';

const DIR = 'public/images/charities';
const MIN_PX = 64, MAX_PX = 160;
const KEY = process.env.SERPER_API_KEY;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

const args = process.argv.slice(2);
const num = (f: string, d: number) => Number(args.find((a) => a.startsWith(`--${f}=`))?.split('=')[1] ?? d);
const limit = num('limit', 20000), offset = num('offset', 0), workers = num('workers', 6);
const onlyMissing = args.includes('--only-missing');

const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };
const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/)
  .filter((w) => w.length > 3 && !['the', 'inc', 'incorporated', 'foundation', 'society', 'association', 'canada', 'canadian', 'toronto', 'ontario', 'centre', 'center', 'community', 'charitable', 'charity', 'corporation'].includes(w));

/** Does this result belong to THIS charity? Only one signal is safe enough to
 *  use across 12,758 public pages: the image, or the page carrying it, sits on
 *  the charity's own domain. Everything looser filed real mistakes on 14 Oct
 *  2026 (Brad Pitt's Make It Right logo on a Toronto charity of the same name;
 *  a service directory's own logo on one of its listings; a community land
 *  trust's logo on a private family trust that merely shares the words land
 *  and trust). A charity whose domain we do not hold gets no logo from search:
 *  the claim form is how that one arrives.
 *  Search still earns its keep, because it finds the logo on a site that
 *  refuses to let us crawl it. */
function trust(_name: string, ownSite: string | null, r: { title?: string; link?: string; imageUrl?: string }): boolean {
  if (!ownSite) return false;
  const own = host(ownSite);
  if (!own) return false;
  const img = host(r.imageUrl ?? ''), page = host(r.link ?? '');
  const match = (h: string) => h === own || h.endsWith('.' + own) || own.endsWith('.' + h);
  return (!!img && match(img)) || (!!page && match(page));
}

async function search(q: string) {
  const res = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': KEY!, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q, num: 8 }),
  });
  if (!res.ok) return [];
  const d: any = await res.json();
  return (d.images ?? []) as Array<{ title?: string; link?: string; imageUrl?: string; source?: string }>;
}

async function grab(url: string): Promise<{ type: string; buf: Buffer } | null> {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 15000);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: c.signal, redirect: 'follow' });
    if (!r.ok) return null;
    const type = (r.headers.get('content-type') ?? '').toLowerCase();
    if (!type.startsWith('image/')) return null;
    return { type, buf: Buffer.from(await r.arrayBuffer()) };
  } catch { return null; } finally { clearTimeout(t); }
}

function save(slug: string, type: string, buf: Buffer): string | null {
  if (type.includes('svg')) {
    const svg = buf.toString('utf8');
    const fills = [...svg.matchAll(/fill\s*[:=]\s*["']?(#[0-9a-fA-F]{3,6}|white)/g)].map((m) => m[1].toLowerCase());
    if (fills.length && fills.every((f) => ['#fff', '#ffffff', 'white'].includes(f))) return null;
    const out = `${DIR}/${slug}.svg`; writeFileSync(out, buf); return `/images/charities/${slug}.svg`;
  }
  const tmp = `${DIR}/.tmp-${slug}`;
  writeFileSync(tmp, buf);
  let w = 0, h = 0;
  try {
    const o = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', tmp], { encoding: 'utf8' });
    w = Number(/pixelWidth:\s*(\d+)/.exec(o)?.[1]); h = Number(/pixelHeight:\s*(\d+)/.exec(o)?.[1]);
  } catch { unlinkSync(tmp); return null; }
  if (!w || !h || Math.max(w, h) < MIN_PX) { unlinkSync(tmp); return null; }
  const out = `${DIR}/${slug}.png`;
  const scale = Math.max(w, h) > MAX_PX ? ['-Z', String(MAX_PX)] : [];
  try { execFileSync('sips', ['-s', 'format', 'png', ...scale, tmp, '--out', out], { stdio: 'ignore' }); }
  catch { unlinkSync(tmp); return null; }
  unlinkSync(tmp);
  return `/images/charities/${slug}.png`;
}

(async () => {
  if (!KEY) { console.error('SERPER_API_KEY not set'); process.exit(2); }
  mkdirSync(DIR, { recursive: true });
  const rows = await db.select({ slug: charities.slug, name: charities.display_name, site: charities.website_url })
    .from(charities)
    .where(onlyMissing ? sql`logo_url is null and website_url is not null and website_url <> ''` : sql`website_url is not null and website_url <> ''`)
    .orderBy(charities.id).limit(limit).offset(offset);
  console.log(`${rows.length} charities, ${workers} at a time`);

  let ok = 0, no = 0, i = 0;
  async function worker() {
    while (i < rows.length) {
      const r = rows[i++];
      if (existsSync(`${DIR}/${r.slug}.png`) || existsSync(`${DIR}/${r.slug}.svg`)) continue;
      const results = await search(`${r.name} Toronto logo`);
      let done = false;
      for (const cand of results) {
        if (!cand.imageUrl || !trust(r.name, r.site, cand)) continue;
        const got = await grab(cand.imageUrl);
        if (!got || got.buf.length < 500) continue;
        const url = save(r.slug, got.type, got.buf);
        if (!url) continue;
        await db.update(charities).set({ logo_url: url }).where(eq(charities.slug, r.slug));
        console.log(`  + ${r.slug} <- ${host(cand.imageUrl)}`);
        ok++; done = true; break;
      }
      if (!done) { console.log(`  x ${r.slug}: nothing trustworthy`); no++; }
    }
  }
  await Promise.all(Array.from({ length: workers }, worker));
  console.log(`done: ${ok} saved, ${no} without`);
  process.exit(0);
})().catch((e) => { console.error('error', e); process.exit(1); });
