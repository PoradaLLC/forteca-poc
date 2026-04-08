# Database Schema & Supabase Configuration

## Overview

The database runs on Supabase (managed PostgreSQL). There are 5 active tables, 2 storage buckets, and Row Level Security (RLS) policies on all tables.

## Tables

### `properties`
Main table storing all vacation rental listings.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Auto-generated |
| slug | TEXT (UNIQUE) | URL-safe identifier, matches DirectStays slug |
| name | TEXT | Display name |
| tagline | TEXT | Short subtitle |
| description | TEXT | Full property description |
| location | TEXT | e.g. "Poconos, PA" |
| address | TEXT | Full address (optional) |
| latitude | DECIMAL | For location-based filtering |
| longitude | DECIMAL | For location-based filtering |
| bedrooms | INT | Number of bedrooms |
| bathrooms | INT | Number of bathrooms |
| max_guests | INT | Maximum guest capacity |
| base_price | DECIMAL | Nightly rate in USD |
| cleaning_fee | DECIMAL | One-time cleaning fee |
| amenities | TEXT[] | Array of amenity strings |
| house_rules | TEXT[] | Array of rules |
| images | JSONB | Array of `{src, alt}` objects — stored as Supabase Storage URLs |
| status | TEXT | `active`, `inactive`, or `maintenance` |
| airbnb_url | TEXT | Link to Airbnb listing (nullable) |
| vrbo_url | TEXT | Link to VRBO listing (nullable) |
| check_in_time | TEXT | Default: "16:00" |
| check_out_time | TEXT | Default: "11:00" |
| min_nights | INT | Minimum booking nights |
| created_at | TIMESTAMPTZ | Auto-set |
| updated_at | TIMESTAMPTZ | Auto-updated via trigger |

**Current data**: 44 properties across PA, NY, FL.

### `reviews`
Guest reviews linked to properties.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Auto-generated |
| property_id | UUID (FK → properties) | CASCADE on delete |
| booking_id | UUID | Nullable, not enforced (bookings table dropped) |
| guest_name | TEXT | Reviewer's display name |
| rating | INT | 1–5, enforced by CHECK constraint |
| content | TEXT | Review text (nullable) |
| source | TEXT | `direct`, `airbnb`, `vrbo`, `google` — CHECK constraint |
| is_featured | BOOLEAN | Default false — featured reviews shown first |
| is_approved | BOOLEAN | Default false — must be approved to show publicly |
| created_at | TIMESTAMPTZ | Auto-set |

**Current data**: 106 reviews scraped from DirectStays, all approved, source: airbnb.

### `blog_posts`
Blog content managed via admin dashboard.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Auto-generated |
| slug | TEXT (UNIQUE) | URL path segment |
| title | TEXT | Post title |
| excerpt | TEXT | Short summary for index page |
| content | TEXT | Full post body (markdown-like) |
| cover_image | TEXT | Legacy column (unused, kept for compatibility) |
| author | TEXT | Default: "Forteca Estate" |
| tags | JSONB | Array of tag strings |
| images | JSONB | Array of `{url, path}` objects — `url` is public URL, `path` is storage path for deletion |
| status | TEXT | `draft` or `published` |
| published_at | TIMESTAMPTZ | Set when first published |
| created_at | TIMESTAMPTZ | Auto-set |
| updated_at | TIMESTAMPTZ | Auto-updated via trigger |

### `subscribers`
Newsletter email list.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Auto-generated |
| email | TEXT (UNIQUE) | Subscriber email |
| first_name | TEXT | Optional |
| last_name | TEXT | Optional |
| is_active | BOOLEAN | Default true — false means unsubscribed |
| subscribed_at | TIMESTAMPTZ | Auto-set |

### `contact_submissions`
Contact form entries.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Auto-generated |
| name | TEXT | Sender name |
| email | TEXT | Sender email |
| phone | TEXT | Optional |
| subject | TEXT | Form subject line |
| message | TEXT | Message body |
| is_read | BOOLEAN | Default false |
| created_at | TIMESTAMPTZ | Auto-set |

## Storage Buckets

### `property-images` (public)
- Contains 528 property photos (12 per property, 44 properties)
- Public read access, no auth required
- Images referenced in `properties.images` JSONB column
- URL pattern: `https://<project>.supabase.co/storage/v1/object/public/property-images/<filename>`

### `blog-images` (public)
- Contains blog post photos uploaded via admin
- Public read access
- Authenticated users can upload/delete
- Images referenced in `blog_posts.images` JSONB column
- When a blog post is deleted, its images are also removed from storage

## Row Level Security (RLS)

All tables have RLS enabled. Key policies:

**Properties**: Public SELECT for active properties. Admins have full access.

**Reviews**: Public SELECT where `is_approved = true`. Admins manage all.

**Blog Posts**: Public SELECT where `status = 'published'`. Admins manage all.

**Subscribers**: Public INSERT (anyone can subscribe). Admins manage all.

**Contact Submissions**: Public INSERT. Admins manage all.

**Important**: The service role client (`createServiceClient()`) uses `@supabase/supabase-js` directly (not the SSR cookie-based client) to bypass RLS for all admin operations.

## Migrations

Located in `supabase/migrations/`:

1. `0001_initial_schema.sql` — Creates all tables, indexes, RLS policies, and the `set_updated_at()` trigger function
2. `0002_add_hospitable_source.sql` — Adds `hospitable` to review source enum
3. `0003_seed_reviews.sql` — Initial review seed data
4. `<timestamp>_add_blog_images.sql` — Adds `images` JSONB column to blog_posts, creates blog-images bucket
5. `<timestamp>_drop_unused_tables.sql` — Drops `ical_syncs`, `availability`, `bookings`, `guests` (managed by Hospitable)

## Querying Patterns

**Server components** use `createServiceClient()` for reads:
```ts
const supabase = await createServiceClient();
const { data } = await supabase.from("properties").select("*").eq("status", "active");
```

**Server actions** use `createServiceClient()` for mutations after `requireAdmin()`:
```ts
await requireAdmin(); // throws if not admin
const supabase = await createServiceClient();
await supabase.from("blog_posts").insert({ ... });
revalidatePath("/blog");
```

**API routes** use direct `createClient()` from `@supabase/supabase-js` for public operations:
```ts
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(url, serviceKey);
await supabase.from("subscribers").upsert({ email, ... });
```
