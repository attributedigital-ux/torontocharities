-- Trigram GIN indexes for fuzzy search and dedup.
-- Run AFTER all Drizzle migrations have created the underlying tables.

CREATE INDEX IF NOT EXISTS charities_display_name_trgm_idx
  ON charities USING gin (lower(display_name) gin_trgm_ops);

CREATE INDEX IF NOT EXISTS charities_legal_name_trgm_idx
  ON charities USING gin (lower(legal_name) gin_trgm_ops);

CREATE INDEX IF NOT EXISTS events_title_trgm_idx
  ON events USING gin (lower(title) gin_trgm_ops);
