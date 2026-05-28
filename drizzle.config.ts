import type { Config } from 'drizzle-kit';

// drizzle-kit auto-loads .env from project root — no dotenv dep needed.

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
