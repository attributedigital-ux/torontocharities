import { db } from '@/db';
import { sql } from 'drizzle-orm';
async function main() {
  await db.execute(sql`ALTER TABLE charities ADD COLUMN IF NOT EXISTS reengagement_sent_at timestamp`);
  console.log('Column added.');
  process.exit(0);
}
main().catch(e => { console.error(e.message); process.exit(1); });
