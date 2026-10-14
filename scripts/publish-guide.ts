/**
 * Publish approved guides: content/approved/<slug>.html + <slug>.json -> guides table.
 * Guards: slug must not already be published with different content unless --update;
 * fires EVENTS_BUILD_HOOK; verifies the live URL returns 200 after the build.
 * Usage: npx tsx scripts/publish-guide.ts <slug> [<slug> ...] [--update]
 */
import { readFileSync, existsSync, renameSync, mkdirSync } from 'node:fs';
import { db } from '../db';
import { guides } from '../db/schema';
import { eq } from 'drizzle-orm';

const BASE = 'https://toronto-charities.ca';
const args = process.argv.slice(2);
const update = args.includes('--update');
const slugs = args.filter((a) => !a.startsWith('--'));
if (slugs.length === 0) { console.error('usage: publish-guide.ts <slug> [--update]'); process.exit(2); }

async function waitLive(url: string, tries = 20): Promise<boolean> {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { method: 'GET', cache: 'no-store' }).catch(() => null);
    if (r && r.status === 200) return true;
    await new Promise((res) => setTimeout(res, 30000));
  }
  return false;
}

(async () => {
  let wrote = 0;
  for (const slug of slugs) {
    const html = `content/approved/${slug}.html`;
    const json = `content/approved/${slug}.json`;
    if (!existsSync(html) || !existsSync(json)) { console.error(`[publish] ${slug}: missing approved html or json`); process.exit(1); }
    const meta = JSON.parse(readFileSync(json, 'utf8'));
    const content = readFileSync(html, 'utf8');
    if (!meta.title || meta.slug !== slug) { console.error(`[publish] ${slug}: json slug/title mismatch`); process.exit(1); }
    const [existing] = await db.select().from(guides).where(eq(guides.slug, slug)).limit(1);
    if (existing && existing.status === 'published' && !update) {
      console.error(`[publish] ${slug}: already published; pass --update to replace`); process.exit(1);
    }
    const now = new Date();
    if (existing) {
      await db.update(guides).set({ title: meta.title, dek: meta.meta_description ?? null, content, status: 'published', published_at: existing.published_at ?? now, updated_at: now }).where(eq(guides.id, existing.id));
    } else {
      await db.insert(guides).values({ slug, path: `/guides/${slug}/`, title: meta.title, dek: meta.meta_description ?? null, content, status: 'published', published_at: now, updated_at: now });
    }
    console.log(`[publish] ${slug}: written (${existing ? 'updated' : 'new'})`);
    wrote++;
  }
  const hook = process.env.EVENTS_BUILD_HOOK;
  if (!hook) { console.error('[publish] EVENTS_BUILD_HOOK not set; rows written, no rebuild'); process.exit(1); }
  const r = await fetch(hook, { method: 'POST' });
  console.log(`[publish] rebuild triggered, status ${r.status}`);
  for (const slug of slugs) {
    const url = `${BASE}/guides/${slug}/`;
    const ok = await waitLive(url);
    if (!ok) { console.error(`[publish] ${slug}: ${url} not live after 10 minutes`); process.exit(1); }
    console.log(`[publish] live: ${url}`);
    mkdirSync('content/published', { recursive: true });
    for (const ext of ['html', 'json']) renameSync(`content/approved/${slug}.${ext}`, `content/published/${slug}.${ext}`);
  }
  console.log(`[publish] done, ${wrote} guide(s)`);
  process.exit(0);
})().catch((e) => { console.error('[publish] error', e); process.exit(1); });
