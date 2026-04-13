-- ============================================================
-- Forteca Estate — Consolidated Schema (post-cleanup)
-- Only active tables: properties, reviews, blog_posts,
-- subscribers, contact_submissions
-- Hospitable manages: bookings, guests, availability, calendar
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
CREATE TABLE IF NOT EXISTS properties (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT UNIQUE NOT NULL,
  name           TEXT NOT NULL,
  tagline        TEXT,
  description    TEXT,
  location       TEXT,
  address        TEXT,
  latitude       DECIMAL(10,8),
  longitude      DECIMAL(11,8),
  bedrooms       INT NOT NULL,
  bathrooms      INT NOT NULL,
  max_guests     INT NOT NULL,
  base_price     DECIMAL(10,2) NOT NULL,
  cleaning_fee   DECIMAL(10,2) DEFAULT 0,
  amenities      JSONB DEFAULT '[]',
  house_rules    JSONB DEFAULT '[]',
  images         JSONB DEFAULT '[]',
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

-- ─── REVIEWS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  guest_name  TEXT NOT NULL,
  rating      INT CHECK (rating >= 1 AND rating <= 5),
  content     TEXT,
  source      TEXT DEFAULT 'direct'
                CHECK (source IN ('direct', 'airbnb', 'vrbo', 'google', 'hospitable')),
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_property ON reviews(property_id, is_approved);

-- ─── BLOG POSTS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  content      TEXT NOT NULL,
  cover_image  TEXT,
  author       TEXT DEFAULT 'Forteca Estate',
  tags         JSONB DEFAULT '[]',
  images       JSONB DEFAULT '[]',
  status       TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_blog_published ON blog_posts(status, published_at DESC);

-- ─── NEWSLETTER SUBSCRIBERS ─────────────────────────────────
CREATE TABLE IF NOT EXISTS subscribers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  first_name    TEXT,
  last_name     TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── CONTACT SUBMISSIONS ────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
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

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active properties" ON properties FOR SELECT USING (status = 'active');
CREATE POLICY "Admins manage properties" ON properties FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads approved reviews" ON reviews FOR SELECT USING (is_approved = TRUE);
CREATE POLICY "Admins manage reviews" ON reviews FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins manage blog posts" ON blog_posts FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage subscribers" ON subscribers FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage contact submissions" ON contact_submissions FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read property images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'property-images');
CREATE POLICY "Auth upload blog images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Auth delete blog images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'blog-images');
CREATE POLICY "Public read blog images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'blog-images');
