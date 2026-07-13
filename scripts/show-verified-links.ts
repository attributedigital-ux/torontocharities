import { db } from '@/db';
import { sql } from 'drizzle-orm';
async function main() {
  const r = await db.execute(sql`
    SELECT display_name AS name, website_url AS website, linkback_verified_at::date AS verified
    FROM charities WHERE linkback_verified_at IS NOT NULL
    ORDER BY linkback_verified_at DESC
  `);
  for (const row of (r.rows ?? r) as any[]) console.log(`${row.verified} | ${row.name} | ${row.website}`);
  process.exit(0);
}
main().catch(e => { console.error(e.message); process.exit(1); });
