// Migration runner — applies extensions, Drizzle generated migrations, and custom indexes in order.
// Run: npm run db:migrate (which calls drizzle-kit migrate)
// Or: npx tsx db/migrate.ts (this script, which also applies the custom SQL files)

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}
const url: string = process.env.DATABASE_URL;

async function run() {
  const sql = postgres(url, { max: 1 });
  const db = drizzle(sql);

  // 1. Apply extensions BEFORE any tables exist.
  const extensions = readFileSync(
    path.join(__dirname, 'migrations', '0000_extensions.sql'),
    'utf8',
  );
  console.log('Applying extensions...');
  await sql.unsafe(extensions);

  // 2. Apply Drizzle-generated migrations (created by `drizzle-kit generate`).
  console.log('Applying Drizzle migrations...');
  await migrate(db, { migrationsFolder: path.join(__dirname, 'migrations') });

  // 3. Apply custom SQL files (trigram indexes that need tables to exist first).
  const customFiles = readdirSync(path.join(__dirname, 'migrations'))
    .filter((f) => f.match(/^\d{4,}_.*\.sql$/) && f !== '0000_extensions.sql')
    .sort();

  for (const file of customFiles) {
    const content = readFileSync(path.join(__dirname, 'migrations', file), 'utf8');
    console.log(`Applying ${file}...`);
    await sql.unsafe(content);
  }

  await sql.end();
  console.log('Migrations complete.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
