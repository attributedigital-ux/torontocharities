/**
 * Find the current website for a charity whose stored address no longer works.
 *
 * The CRA address file is from 2023. George Brown College's gbrownc.on.ca
 * stopped resolving years ago; the college is very much alive at georgebrown.ca
 * (found 14 Oct 2026). A broken address means our record is stale far more
 * often than it means the charity is gone, so we look before we say anything.
 *
 * A candidate is accepted only when its domain is named after the charity AND
 * the page itself names the charity. Directories and social profiles are never
 * accepted: they are somebody else's page about the charity, not its website.
 * Nothing found leaves website_status 'none_found', which is the only state the
 * profile page will speak about.
 *
 * Usage: npx tsx scripts/find-current-site.ts [--limit 50] [--workers 4] [--dry]
 */
import { appendFileSync, existsSync, writeFileSync } from 'node:fs';
import { db } from '../db';
import { charities } from '../db/schema';
import { eq, sql } from 'drizzle-orm';

const KEY = process.env.SERPER_API_KEY;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const args = process.argv.slice(2);
const num = (f: string, d: number) => Number(args.find((a) => a.startsWith(`--${f}=`))?.split('=')[1] ?? d);
const limit = num('limit', 20000), workers = num('workers', 4);
const dry = args.includes('--dry');
const slugArg = args.find((a) => a.startsWith('--slugs='))?.split('=')[1];

const NOT_A_WEBSITE = [
  'opengovca', 'charitiesglobal', 'foundationcenter', 'fconline', 'infobel', 'canadahelps',
  'charityvillage', 'charitydata', 'charityintelligence', 'cra-arc', 'canada.ca', 'linkedin',
  'facebook', 'instagram', 'twitter', 'x.com', 'youtube', 'yelp', 'bbb.org', 'guidestar',
  'yellowpages', 'ourcommunitybook', 'wikipedia', 'crunchbase', 'glassdoor', 'indeed',
  'eventbrite', 'gofundme', 'zoominfo', 'apollo.io', 'bizapedia', 'cylex', 'goldenpages',
  'torontoservicedirectory', 'toronto-charities',
];

const REVIEW = 'research/sites-to-review.tsv';
const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };
const STOP = ['the', 'and', 'inc', 'incorporated', 'ltd', 'limited', 'of', 'for', 'in', 'canada', 'canadian', 'ontario', 'toronto', 'charitable', 'charity', 'organization', 'organisation'];
const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 3 && !STOP.includes(w));

async function serper(q: string) {
  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'X-API-KEY': KEY!, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q, num: 8 }),
  });
  if (!res.ok) return { organic: [], kg: null as any };
  const d: any = await res.json();
  return { organic: (d.organic ?? []) as Array<{ title?: string; link?: string; snippet?: string }>, kg: d.knowledgeGraph ?? null };
}

async function page(url: string): Promise<string | null> {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 15000);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: c.signal, redirect: 'follow' });
    if (!r.ok) return null;
    return (await r.text()).toLowerCase().replace(/<[^>]*>/g, ' ');
  } catch { return null; } finally { clearTimeout(t); }
}

(async () => {
  if (!KEY) { console.error('SERPER_API_KEY not set'); process.exit(2); }
  const rows = await db.select({ slug: charities.slug, name: charities.display_name, old: charities.website_url })
    .from(charities)
    .where(slugArg
      ? sql`slug in (${sql.join(slugArg.split(',').map((x) => sql`${x}`), sql`, `)})`
      : sql`website_status in ('dead','redirected')`)
    .orderBy(charities.id).limit(limit);
  console.log(`${rows.length} charities with a broken address, ${workers} at a time`);

  let found = 0, none = 0, review = 0, i = 0;
  async function worker() {
    while (i < rows.length) {
      const r = rows[i++];
      const key = words(r.name);
      if (key.length === 0) { none++; continue; }
      const { organic, kg } = await serper(`"${r.name}" Toronto`);
      const candidates: string[] = [];
      if (kg?.website) candidates.push(kg.website);
      for (const o of organic) if (o.link) candidates.push(o.link);

      let hit: string | null = null, conf = 0, pageScore = 0;
      for (const c of candidates) {
        const h = host(c);
        if (!h || NOT_A_WEBSITE.some((b) => h.includes(b))) continue;
        const bare = h.replace(/[^a-z0-9]/g, '');
        // The domain has to be made of this charity's name, not merely contain a
        // word of it: elmsdalechurchofthenazarene matched a charity in Oakville
        // on 'church' and 'nazarene' alone (14 Oct 2026).
        const covered = key.filter((w) => bare.includes(w)).reduce((n, w) => n + w.length, 0);
        const cov = covered / bare.length;
        if (cov < 0.65) continue;
        const text = await page(`https://${h}/`);
        if (!text) continue;
        const hits = key.filter((w) => text.includes(w)).length / key.length;
        if (hits < 0.5) continue;                               // and the page names the charity
        hit = `https://${h}/`; conf = cov; pageScore = hits;
        break;
      }

      if (hit && conf >= 0.8 && pageScore >= 0.6) {
        // Confident: the domain is this charity's name and the page says so.
        console.log(`  + ${r.slug}: ${r.old} -> ${hit}`);
        if (!dry) await db.update(charities)
          .set({ website_url: hit, website_status: 'live', website_redirects_to: null, website_checked_at: new Date() })
          .where(eq(charities.slug, r.slug));
        found++;
      } else if (hit) {
        // Plausible but not certain: a branch can match its parent body's site
        // (John Howard Society of Peel Halton Dufferin matched johnhoward.on.ca,
        // 14 Oct 2026). Park it for a human rather than publish it.
        const line = `${r.slug}\t${r.name}\t${r.old ?? ''}\t${hit}\tdomain ${conf.toFixed(2)} page ${pageScore.toFixed(2)}\n`;
        if (!existsSync(REVIEW)) writeFileSync(REVIEW, 'slug\tname\told_url\tfound_url\tscores\n');
        appendFileSync(REVIEW, line);
        console.log(`  ? ${r.slug}: ${hit} (needs review)`);
        review++;
      } else {
        // No domain carries the charity's name. Often a rebrand or a merger:
        // Ontario Association of Food Banks is Feed Ontario, Toronto
        // Rehabilitation Institute is part of UHN, Houselink and Mainstay is
        // Neighbours Community Homes (all 14 Oct 2026). The top result is
        // usually right, but a guess must never reach a public page, so the
        // suggestion is parked for a person.
        const suggestion = candidates.find((c) => {
          const h = host(c);
          return h && !NOT_A_WEBSITE.some((b) => h.includes(b));
        });
        if (suggestion) {
          if (!existsSync(REVIEW)) writeFileSync(REVIEW, 'slug\tname\told_url\tfound_url\tscores\n');
          appendFileSync(REVIEW, `${r.slug}\t${r.name}\t${r.old ?? ''}\t${suggestion}\tpossible rebrand, top result\n`);
        }
        console.log(`  x ${r.slug}: no match${suggestion ? `, suggestion ${host(suggestion)}` : ''}`);
        if (!dry) await db.update(charities)
          .set({ website_status: 'none_found', website_checked_at: new Date() })
          .where(eq(charities.slug, r.slug));
        none++;
      }
    }
  }
  await Promise.all(Array.from({ length: workers }, worker));
  console.log(`done: ${found} applied, ${review} parked for review in ${REVIEW}, ${none} nothing found`);
  process.exit(0);
})().catch((e) => { console.error('error', e); process.exit(1); });
