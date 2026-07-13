import { db } from '@/db';
import { sql } from 'drizzle-orm';
async function main() {
  const r = await db.execute(sql`
    SELECT COUNT(*) FILTER (WHERE outreach_sent_at <= NOW() - INTERVAL '30 days') AS eligible_now,
           COUNT(*) AS eligible_total
    FROM charities
    WHERE email IS NOT NULL AND linkback_verified_at IS NULL AND claimed_at IS NULL
      AND outreach_count >= 3 AND reengagement_sent_at IS NULL
  `);
  console.log((r as any[])[0]);
  process.exit(0);
}
main().catch(e => { console.error(e.message); process.exit(1); });
