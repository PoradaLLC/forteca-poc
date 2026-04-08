-- ============================================================
-- Add 'hospitable' as a valid review source
-- ============================================================

ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_source_check;

ALTER TABLE reviews ADD CONSTRAINT reviews_source_check
  CHECK (source IN ('direct', 'airbnb', 'vrbo', 'google', 'hospitable'));
