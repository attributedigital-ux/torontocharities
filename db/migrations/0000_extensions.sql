-- Extensions required by the schema.
-- This file runs BEFORE Drizzle's generated migrations.
-- See db/migrate.ts for the runner that ensures order.

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- GIN trigram indexes Drizzle can't express in TS schema.
-- Run AFTER charities and events tables exist (so this needs to be in a later migration
-- or applied manually after `drizzle-kit migrate`).
-- See db/migrations/9999_trigram_indexes.sql for the actual GIN index creation.
