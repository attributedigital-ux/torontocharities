import { db } from '@/db';
import { sql } from 'drizzle-orm';
async function main() {
  const r = await db.execute(sql`
    SELECT outreach_count, COUNT(*) AS n,
      MAX(outreach_sent_at)::date AS last_sent
    FROM charities WHERE outreach_sent_at IS NOT NULL
    GROUP BY outreach_count ORDER BY outreach_count
  `);
  for (const row of r as any[]) console.log(`touches=${row.outreach_count} charities=${row.n} last_sent=${row.last_sent}`);
  process.exit(0);
}
main().catch(e => { console.error(e.message); process.exit(1); });
