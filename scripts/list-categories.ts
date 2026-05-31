import { db } from '../db';
import { sql } from 'drizzle-orm';

async function main() {
  const rows = await (db as any).execute(sql`SELECT slug, name FROM categories ORDER BY name`);
  for (const r of rows) console.log(`'${r.slug}': '${r.name}'`);
  process.exit(0);
}
main();
