import { db, raw_events } from '@/db';
import { eq } from 'drizzle-orm';
async function main() {
  const r = await db.update(raw_events)
    .set({ processed_status: 'pending', processed_at: null })
    .where(eq(raw_events.processed_status, 'error'))
    .returning({ id: raw_events.id });
  console.log('Reset', r.length, 'events to pending');
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });
