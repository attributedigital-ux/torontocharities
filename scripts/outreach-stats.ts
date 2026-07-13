import { db, charities } from '@/db';
import { sql } from 'drizzle-orm';

async function main() {
  const r = await db.execute(sql`
    SELECT
      COUNT(*) AS total,
      COUNT(email) AS with_email,
      COUNT(outreach_sent_at) AS outreach_sent,
      COUNT(*) FILTER (WHERE outreach_count >= 2) AS got_followup,
      COUNT(claimed_at) AS claimed,
      COUNT(linkback_verified_at) AS linkback_verified,
      MAX(outreach_sent_at) AS last_outreach,
      MAX(linkback_verified_at) AS last_verified
    FROM charities
  `);
  console.log(r);
  process.exit(0);
}
main().catch(e => { console.error(e.message); process.exit(1); });
