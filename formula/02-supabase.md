# Step 2: Supabase Setup

## 2.1 Create Supabase Project

1. Go to https://supabase.com and create a new project
2. Choose a region close to your users (e.g., `us-east-1` for US East Coast)
3. Note your project URL and keys from Settings → API:
   - `NEXT_PUBLIC_SUPABASE_URL` — the project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the `anon` public key
   - `SUPABASE_SERVICE_ROLE_KEY` — the `service_role` secret key (server-only, bypasses RLS)

## 2.2 Client Setup

### Browser Client (`src/lib/supabase/client.ts`)

Used in `"use client"` components for auth and real-time features.

```ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### Server Client (`src/lib/supabase/server.ts`)

Two clients: one cookie-based for auth-aware reads, one service-role for trusted mutations.

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cookie-based client — respects RLS, carries user session
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch { /* Server Component — no-op */ }
        },
      },
    }
  );
}

// Service role client — BYPASSES RLS. Use for admin operations only.
export async function createServiceClient() {
  const { createClient: createSupabaseClient } = await import("@supabase/supabase-js");
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
```

**CRITICAL**: The service client MUST use `createClient` from `@supabase/supabase-js` (not `createServerClient` from `@supabase/ssr`). The SSR version sends cookie-based auth context and will NOT bypass RLS even with the service role key.

## 2.3 Database Schema

Create your migration file at `supabase/migrations/0001_initial_schema.sql`. Here's the pattern for common tables:

### Properties / Listings Table
```sql
CREATE TABLE properties (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  tagline       TEXT,
  description   TEXT,
  location      TEXT,
  latitude      DECIMAL,
  longitude     DECIMAL,
  bedrooms      INT DEFAULT 1,
  bathrooms     INT DEFAULT 1,
  max_guests    INT DEFAULT 2,
  base_price    DECIMAL DEFAULT 0,
  cleaning_fee  DECIMAL DEFAULT 0,
  amenities     TEXT[] DEFAULT '{}',
  images        JSONB DEFAULT '[]',
  status        TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  airbnb_url    TEXT,
  vrbo_url      TEXT,
  min_nights    INT DEFAULT 2,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_properties_slug ON properties(slug);
CREATE INDEX idx_properties_status ON properties(status);
```

### Reviews Table
```sql
CREATE TABLE reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  guest_name  TEXT NOT NULL,
  rating      INT CHECK (rating >= 1 AND rating <= 5),
  content     TEXT,
  source      TEXT DEFAULT 'direct' CHECK (source IN ('direct', 'airbnb', 'vrbo', 'google')),
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_reviews_property ON reviews(property_id, is_approved);
```

### Blog Posts Table
```sql
CREATE TABLE blog_posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  content      TEXT NOT NULL,
  images       JSONB DEFAULT '[]',
  status       TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### Newsletter Subscribers Table
```sql
CREATE TABLE subscribers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  first_name    TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Contact Submissions Table
```sql
CREATE TABLE contact_submissions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  subject    TEXT,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Auto-update Trigger
```sql
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_properties_updated BEFORE UPDATE ON properties
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_blog_posts_updated BEFORE UPDATE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

## 2.4 Row Level Security (RLS)

Enable RLS on every table and create policies:

```sql
-- Properties: public reads active, admins manage all
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active properties" ON properties FOR SELECT USING (status = 'active');
CREATE POLICY "Admins manage properties" ON properties FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Reviews: public reads approved, admins manage all
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads approved reviews" ON reviews FOR SELECT USING (is_approved = TRUE);
CREATE POLICY "Admins manage reviews" ON reviews FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Blog: public reads published, admins manage all
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins manage blog posts" ON blog_posts FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Subscribers: anyone inserts, admins manage
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage subscribers" ON subscribers FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Contact: anyone inserts, admins manage
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage contact" ON contact_submissions FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

## 2.5 Storage Buckets

Create storage buckets for image uploads:

```sql
-- Property images bucket (public read)
INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);

-- Blog images bucket (public read)
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Storage policies
CREATE POLICY "Public read property images" ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'property-images');

CREATE POLICY "Auth upload blog images" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Auth delete blog images" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'blog-images');

CREATE POLICY "Public read blog images" ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'blog-images');
```

## 2.6 Admin User Setup

1. Create a user via Supabase Auth (dashboard or signup flow)
2. Set the admin role:

```sql
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'
WHERE email = 'admin@yourdomain.com';
```

## 2.7 Applying Migrations

### Via Supabase Dashboard
Go to SQL Editor and paste your migration SQL.

### Via Supabase CLI
```bash
npx supabase db push
```

### Via Supabase MCP (Claude Code)
Use the `apply_migration` tool with a name and SQL query.
