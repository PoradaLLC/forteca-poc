-- ============================================================
-- Forteca Estate — Initial Schema
-- ============================================================

-- ─── updated_at trigger ─────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── PROPERTIES ─────────────────────────────────────────────
CREATE TABLE properties (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT UNIQUE NOT NULL,
  name           TEXT NOT NULL,
  tagline        TEXT,
  description    TEXT,
  location       TEXT,
  address        TEXT,                          -- Admin-only visibility
  latitude       DECIMAL(10,8),
  longitude      DECIMAL(11,8),
  bedrooms       INT NOT NULL,
  bathrooms      INT NOT NULL,
  max_guests     INT NOT NULL,
  base_price     DECIMAL(10,2) NOT NULL,
  cleaning_fee   DECIMAL(10,2) DEFAULT 0,
  amenities      JSONB DEFAULT '[]',            -- ["hot_tub", "wifi", "fireplace", ...]
  house_rules    JSONB DEFAULT '[]',
  images         JSONB DEFAULT '[]',            -- [{url, alt, order}]
  status         TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  airbnb_url     TEXT,
  vrbo_url       TEXT,
  check_in_time  TIME DEFAULT '15:00',
  check_out_time TIME DEFAULT '11:00',
  min_nights     INT DEFAULT 2,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── GUESTS ─────────────────────────────────────────────────
CREATE TABLE guests (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email        TEXT UNIQUE NOT NULL,
  first_name   TEXT NOT NULL,
  last_name    TEXT NOT NULL,
  phone        TEXT,
  address      TEXT,
  id_verified  BOOLEAN DEFAULT FALSE,
  notes        TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── AVAILABILITY / CALENDAR ─────────────────────────────────
CREATE TABLE availability (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id    UUID REFERENCES properties(id) ON DELETE CASCADE,
  date           DATE NOT NULL,
  status         TEXT NOT NULL DEFAULT 'available'
                   CHECK (status IN ('available', 'booked', 'blocked', 'maintenance')),
  price_override DECIMAL(10,2),
  source         TEXT DEFAULT 'manual'
                   CHECK (source IN ('manual', 'airbnb', 'vrbo', 'direct')),
  UNIQUE(property_id, date)
);

CREATE INDEX idx_availability_lookup ON availability(property_id, date, status);

-- ─── BOOKINGS ────────────────────────────────────────────────
CREATE TABLE bookings (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id      UUID REFERENCES properties(id) ON DELETE RESTRICT,
  guest_id         UUID REFERENCES guests(id),
  check_in         DATE NOT NULL,
  check_out        DATE NOT NULL,
  num_guests       INT NOT NULL,
  nightly_rate     DECIMAL(10,2) NOT NULL,
  cleaning_fee     DECIMAL(10,2) DEFAULT 0,
  service_fee      DECIMAL(10,2) DEFAULT 0,
  taxes            DECIMAL(10,2) DEFAULT 0,
  total_amount     DECIMAL(10,2) NOT NULL,
  status           TEXT DEFAULT 'pending'
                     CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_intent   TEXT,
  source           TEXT DEFAULT 'direct'
                     CHECK (source IN ('direct', 'airbnb', 'vrbo')),
  special_requests TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_dates CHECK (check_out > check_in)
);

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_bookings_property ON bookings(property_id, check_in, check_out);
CREATE INDEX idx_bookings_guest    ON bookings(guest_id);

-- ─── REVIEWS ─────────────────────────────────────────────────
CREATE TABLE reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  booking_id  UUID REFERENCES bookings(id),
  guest_name  TEXT NOT NULL,
  rating      INT CHECK (rating >= 1 AND rating <= 5),
  content     TEXT,
  source      TEXT DEFAULT 'direct'
                CHECK (source IN ('direct', 'airbnb', 'vrbo', 'google')),
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_property ON reviews(property_id, is_approved);

-- ─── ICAL SYNCS ──────────────────────────────────────────────
CREATE TABLE ical_syncs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   UUID REFERENCES properties(id) ON DELETE CASCADE,
  platform      TEXT NOT NULL CHECK (platform IN ('airbnb', 'vrbo', 'booking.com')),
  ical_url      TEXT NOT NULL,
  export_url    TEXT,
  last_synced   TIMESTAMPTZ,
  sync_interval INT DEFAULT 15
);

-- ─── BLOG POSTS ──────────────────────────────────────────────
CREATE TABLE blog_posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  content      TEXT NOT NULL,
  cover_image  TEXT,
  author       TEXT DEFAULT 'Forteca Estate',
  tags         JSONB DEFAULT '[]',
  status       TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_blog_published ON blog_posts(status, published_at DESC);

-- ─── NEWSLETTER SUBSCRIBERS ──────────────────────────────────
CREATE TABLE subscribers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  first_name    TEXT,
  last_name     TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── CONTACT SUBMISSIONS ─────────────────────────────────────
CREATE TABLE contact_submissions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  subject    TEXT,
  message    TEXT NOT NULL,
  is_read    BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Properties
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads active properties"
  ON properties FOR SELECT
  USING (status = 'active');

CREATE POLICY "Admins manage properties"
  ON properties FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Availability
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads availability"
  ON availability FOR SELECT
  USING (true);

CREATE POLICY "Admins manage availability"
  ON availability FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Guests
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Guests read own record"
  ON guests FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY "Admins manage guests"
  ON guests FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Guests read own bookings"
  ON bookings FOR SELECT
  USING (guest_id = auth.uid());

CREATE POLICY "Admins manage bookings"
  ON bookings FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads approved reviews"
  ON reviews FOR SELECT
  USING (is_approved = TRUE);

CREATE POLICY "Admins manage reviews"
  ON reviews FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Blog Posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins manage blog posts"
  ON blog_posts FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Subscribers: insert-only for public (newsletter signup)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins manage subscribers"
  ON subscribers FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Contact submissions: insert-only for public
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins manage contact submissions"
  ON contact_submissions FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- iCal syncs: admin only
ALTER TABLE ical_syncs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage ical syncs"
  ON ical_syncs FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');
