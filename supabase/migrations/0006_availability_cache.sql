-- Availability cache: precomputed per-listing availability from Hospitable's
-- public calendar endpoint. Populated hourly by /api/availability/refresh (the
-- live fan-out of 73 calendar calls per user search gets rate-limited, so we
-- precompute out-of-band and let search read from here). Read/written only by
-- the service role, which bypasses RLS.

CREATE TABLE IF NOT EXISTS availability_cache (
  listing_id      TEXT PRIMARY KEY,          -- numeric Hospitable listing id (as text)
  slug            TEXT,                       -- properties.slug at refresh time (convenience)
  available_dates JSONB NOT NULL DEFAULT '[]',-- array of "YYYY-MM-DD" strings that are available
  window_start    DATE,
  window_end      DATE,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE availability_cache ENABLE ROW LEVEL SECURITY;
-- No public policy: only the service role (bypasses RLS) reads/writes this cache.
