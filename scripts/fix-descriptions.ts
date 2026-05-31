import { db, charities } from '../db';
import { like, sql } from 'drizzle-orm';

async function main() {
  const rows = await db.select({ id: charities.id, description: charities.description })
    .from(charities)
    .where(like(charities.description, '%`%'));

  console.log(`Found ${rows.length} descriptions with fences`);

  let fixed = 0;
  for (const row of rows) {
    if (!row.description) continue;
    let d = row.description.trim();
    d = d.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    if (d.startsWith('{')) {
      try {
        const parsed = JSON.parse(d);
        d = parsed.description ?? d;
      } catch {}
    }
    await db.update(charities).set({ description: d }).where(sql`id = ${row.id}`);
    fixed++;
  }

  console.log(`Fixed ${fixed} descriptions`);
  process.exit(0);
}
main();
