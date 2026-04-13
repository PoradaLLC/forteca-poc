-- Add Hospitable booking widget URL to properties
-- Stores the per-listing iframe src, e.g.:
-- https://booking.hospitable.com/widget/{account-id}/{listing-id}

ALTER TABLE properties ADD COLUMN IF NOT EXISTS hospitable_widget_url TEXT;
