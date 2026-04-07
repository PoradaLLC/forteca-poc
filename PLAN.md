# Forteca Estate — Full Website Revamp Plan

## Current State Analysis

**Platform:** Squarespace (static site, no custom backend)
**Booking:** DirectStays (external booking engine at `fortecaestate.directstays.com`) + Airbnb/VRBO links
**Forms:** JotForm for consultation scheduling
**Email:** Gmail (`fortecaestate@gmail.com`)
**Store:** Squarespace commerce (`/fortecastore`)
**Blog:** Squarespace blog (`/forteca-blog`)

### Current Pages Inventory (scraped)

| Page | Purpose | Notes |
|------|---------|-------|
| `/` (Home) | Hero, services overview, newsletter, CTA | Long single-page with 4 service sections |
| `/getaway-listing` | Property grid/cards | 13 properties with images, links |
| `/blvck-cabin-poconos` | Individual property | Photo gallery, specs, Airbnb booking link |
| `/blvck-cabin-ii` | Individual property | Same pattern |
| `/blvckcabin-3` | Individual property | Same pattern |
| `/blve-cabin` | Individual property | Same pattern |
| `/scenic-getaway` | Individual property | Same pattern |
| `/arctic-getaway` | Individual property | Same pattern |
| `/pocono-villa` | Individual property | 6BR — largest property |
| `/mountain-lake` | Individual property | Same pattern |
| `/mountain-oasis` | Individual property | Same pattern |
| `/happy-trails` | Individual property | Same pattern |
| `/rampersad-poconos-home` | Individual property | Same pattern |
| `/pocono-getaway` | Individual property | Same pattern |
| `/perfect-pocono` | Individual property (Rustic Heaven) | Same pattern |
| `/fortecastore` | E-commerce store | Merchandise/branded items |
| `/forteca-blog` | Blog/content marketing | SEO, updates |
| `/contact` | Contact form + info | Email, phone numbers |
| `/testimonals` | Guest reviews | Social proof |
| `/hot-tubs` | Hot tub info/page | Amenity highlight |
| `/privacy-policy-4` | Legal | Privacy policy |
| `/home-staging` | Home staging service | Additional service offering |

---

## Proposed Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js 14+ (App Router) | SSR/SSG for SEO, API routes for backend |
| **Styling** | Tailwind CSS 4 | Utility-first, matches your requirements |
| **Hosting** | Vercel | Native Next.js support, edge functions, preview deploys |
| **Source Control** | GitHub | CI/CD via Vercel integration |
| **Database** | Supabase (PostgreSQL) | Open source, row-level security, auth, real-time |
| **Auth** | Supabase Auth + NextAuth.js | Admin panel access, guest accounts |
| **Booking/Calendar** | Cal.com (open source) or custom | Self-hosted scheduling engine |
| **Payments** | Stripe | PCI-compliant, guest checkout |
| **CMS** | Sanity.io (free tier) or Payload CMS | Headless, open source, property content management |
| **Email** | Resend (or Postmark) | Transactional email (confirmations, receipts) |
| **Image Hosting** | Cloudinary or Vercel Blob | Optimized property photos, transformations |
| **Analytics** | Plausible or Vercel Analytics | Privacy-respecting, GDPR-compliant |
| **Forms** | React Hook Form + Zod | Replace JotForm dependency |

---

## Site Architecture (Pages)

```
app/
├── (marketing)/
│   ├── page.tsx                    # Home — hero, services, testimonials, CTA
│   ├── about/page.tsx              # About Forteca (new — pulled from homepage services)
│   ├── services/
│   │   ├── page.tsx                # All services overview
│   │   ├── vacation-rentals/       # Vacation rental management detail
│   │   ├── property-management/    # Property management detail
│   │   ├── real-estate/            # Buy/sell real estate detail
│   │   └── home-staging/           # Home staging service
│   ├── contact/page.tsx            # Contact form + map + info
│   ├── testimonials/page.tsx       # Guest reviews (paginated)
│   ├── blog/
│   │   ├── page.tsx                # Blog index
│   │   └── [slug]/page.tsx         # Individual blog posts
│   ├── privacy-policy/page.tsx     # Legal
│   └── terms/page.tsx              # Terms of service (new)
│
├── properties/
│   ├── page.tsx                    # Property listing grid (replaces /getaway-listing)
│   └── [slug]/page.tsx             # Individual property detail + calendar + booking
│
├── booking/
│   ├── [propertySlug]/page.tsx     # Date picker → guest info → payment
│   ├── confirmation/page.tsx       # Booking confirmation
│   └── manage/page.tsx             # Guest booking management (modify/cancel)
│
├── store/
│   ├── page.tsx                    # Merch store
│   └── [productSlug]/page.tsx      # Product detail
│
├── admin/                          # Protected admin dashboard
│   ├── layout.tsx                  # Auth guard wrapper
│   ├── page.tsx                    # Dashboard overview
│   ├── properties/                 # CRUD properties
│   ├── bookings/                   # View/manage bookings
│   ├── calendar/                   # Availability calendar management
│   ├── guests/                     # Guest database
│   ├── reviews/                    # Review management
│   ├── blog/                       # Blog post editor
│   └── settings/                   # Site settings, integrations
│
├── api/
│   ├── properties/                 # Property CRUD endpoints
│   ├── bookings/                   # Booking creation, modification
│   ├── availability/               # Calendar availability checks
│   ├── payments/                   # Stripe webhook handler
│   ├── contact/                    # Contact form submission
│   ├── newsletter/                 # Newsletter signup
│   ├── reviews/                    # Review submission
│   └── auth/                       # Auth endpoints
│
└── layout.tsx                      # Root layout (nav, footer)
```

---

## Database Schema (Supabase / PostgreSQL)

```sql
-- ============================================
-- PROPERTIES
-- ============================================
CREATE TABLE properties (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  tagline       TEXT,
  description   TEXT,
  location      TEXT,                          -- "Poconos, PA"
  address       TEXT,                          -- Full address (admin-only visibility)
  latitude      DECIMAL(10,8),
  longitude     DECIMAL(11,8),
  bedrooms      INT NOT NULL,
  bathrooms     INT NOT NULL,
  max_guests    INT NOT NULL,
  base_price    DECIMAL(10,2) NOT NULL,        -- Per-night starting price
  cleaning_fee  DECIMAL(10,2) DEFAULT 0,
  amenities     JSONB DEFAULT '[]',            -- ["hot_tub", "wifi", "fireplace", ...]
  house_rules   JSONB DEFAULT '[]',
  images        JSONB DEFAULT '[]',            -- [{url, alt, order}]
  status        TEXT DEFAULT 'active',         -- active | inactive | maintenance
  airbnb_url    TEXT,                          -- External listing link
  vrbo_url      TEXT,
  check_in_time TIME DEFAULT '15:00',
  check_out_time TIME DEFAULT '11:00',
  min_nights    INT DEFAULT 2,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AVAILABILITY / CALENDAR
-- ============================================
CREATE TABLE availability (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   UUID REFERENCES properties(id) ON DELETE CASCADE,
  date          DATE NOT NULL,
  status        TEXT NOT NULL DEFAULT 'available',  -- available | booked | blocked | maintenance
  price_override DECIMAL(10,2),                     -- Dynamic pricing per night
  source        TEXT DEFAULT 'manual',              -- manual | airbnb | vrbo | direct
  UNIQUE(property_id, date)
);

CREATE INDEX idx_availability_lookup ON availability(property_id, date, status);

-- ============================================
-- BOOKINGS
-- ============================================
CREATE TABLE bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id     UUID REFERENCES properties(id) ON DELETE RESTRICT,
  guest_id        UUID REFERENCES guests(id),
  check_in        DATE NOT NULL,
  check_out       DATE NOT NULL,
  num_guests      INT NOT NULL,
  nightly_rate    DECIMAL(10,2) NOT NULL,
  cleaning_fee    DECIMAL(10,2) DEFAULT 0,
  service_fee     DECIMAL(10,2) DEFAULT 0,
  taxes           DECIMAL(10,2) DEFAULT 0,
  total_amount    DECIMAL(10,2) NOT NULL,
  status          TEXT DEFAULT 'pending',        -- pending | confirmed | cancelled | completed
  payment_intent  TEXT,                          -- Stripe payment intent ID
  source          TEXT DEFAULT 'direct',         -- direct | airbnb | vrbo
  special_requests TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_dates CHECK (check_out > check_in)
);

-- ============================================
-- GUESTS
-- ============================================
CREATE TABLE guests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  phone         TEXT,
  address       TEXT,
  id_verified   BOOLEAN DEFAULT FALSE,
  notes         TEXT,                            -- Admin notes
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REVIEWS
-- ============================================
CREATE TABLE reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   UUID REFERENCES properties(id) ON DELETE CASCADE,
  booking_id    UUID REFERENCES bookings(id),
  guest_name    TEXT NOT NULL,
  rating        INT CHECK (rating >= 1 AND rating <= 5),
  content       TEXT,
  source        TEXT DEFAULT 'direct',          -- direct | airbnb | vrbo | google
  is_featured   BOOLEAN DEFAULT FALSE,
  is_approved   BOOLEAN DEFAULT FALSE,          -- Admin approval before display
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BLOCKED DATES (for iCal sync)
-- ============================================
CREATE TABLE ical_syncs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   UUID REFERENCES properties(id) ON DELETE CASCADE,
  platform      TEXT NOT NULL,                   -- airbnb | vrbo | booking.com
  ical_url      TEXT NOT NULL,                   -- Import URL
  export_url    TEXT,                            -- Our export URL
  last_synced   TIMESTAMPTZ,
  sync_interval INT DEFAULT 15                   -- Minutes
);

-- ============================================
-- BLOG
-- ============================================
CREATE TABLE blog_posts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  excerpt       TEXT,
  content       TEXT NOT NULL,
  cover_image   TEXT,
  author        TEXT DEFAULT 'Forteca Estate',
  tags          JSONB DEFAULT '[]',
  status        TEXT DEFAULT 'draft',            -- draft | published
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================
CREATE TABLE subscribers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  first_name    TEXT,
  last_name     TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONTACT SUBMISSIONS
-- ============================================
CREATE TABLE contact_submissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  subject       TEXT,
  message       TEXT NOT NULL,
  is_read       BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Booking & Calendar Workflow

### Direct Booking Flow

```
Guest visits /properties/[slug]
  → Views photo gallery, amenities, reviews
  → Selects dates on availability calendar
  → Calendar checks `availability` table in real-time
  → "Book Now" → /booking/[slug]?checkin=...&checkout=...
  → Guest info form (React Hook Form + Zod validation)
  → Price calculation (nightly × nights + cleaning + taxes)
  → Stripe Checkout (or embedded Stripe Elements)
  → Stripe webhook → API confirms booking
  → availability rows marked as "booked"
  → Confirmation email via Resend
  → Redirect to /booking/confirmation?id=...
```

### Calendar Sync (iCal)

```
┌─────────────────────────────────────────────────────┐
│                  CALENDAR SYNC                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Airbnb ──(iCal export)──►  Forteca DB               │
│  VRBO   ──(iCal export)──►  (availability table)     │
│                                                      │
│  Forteca DB ──(iCal export)──► Airbnb                │
│             ──(iCal export)──► VRBO                  │
│                                                      │
│  Cron job (Vercel): every 15 min                     │
│    1. Fetch external iCal feeds                      │
│    2. Parse .ics blocked dates                       │
│    3. Upsert availability rows (source = platform)   │
│    4. Expose /api/ical/[propertyId].ics for export   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Libraries for Calendar

- **ical.js** — Parse and generate iCal (.ics) feeds
- **date-fns** — Date manipulation (lighter than moment)
- **react-day-picker** — Date range picker component

---

## Security Architecture

### Authentication & Authorization

```
┌────────────────────────────────────────────────────┐
│               SECURITY LAYERS                       │
├────────────────────────────────────────────────────┤
│                                                     │
│  1. EDGE MIDDLEWARE (middleware.ts)                  │
│     ├─ Rate limiting (Vercel KV or Upstash Redis)   │
│     ├─ CSRF token validation                        │
│     ├─ Admin route protection (/admin/*)            │
│     └─ Bot detection (honeypot fields)              │
│                                                     │
│  2. API ROUTE SECURITY                              │
│     ├─ Input validation (Zod schemas on every route)│
│     ├─ SQL injection: prevented by Supabase client  │
│     ├─ XSS: React auto-escapes + CSP headers        │
│     ├─ Auth token verification on protected routes  │
│     └─ Request body size limits                     │
│                                                     │
│  3. DATABASE SECURITY (Supabase RLS)                │
│     ├─ Row Level Security on all tables             │
│     ├─ Admin role: full CRUD                        │
│     ├─ Guest role: read properties, create bookings │
│     ├─ Anon role: read published content only       │
│     └─ Service role: API routes only (server-side)  │
│                                                     │
│  4. PAYMENT SECURITY                                │
│     ├─ Stripe handles PCI compliance                │
│     ├─ No card data touches our servers              │
│     ├─ Webhook signature verification               │
│     └─ Idempotency keys for payment creation        │
│                                                     │
│  5. INFRASTRUCTURE                                  │
│     ├─ HTTPS only (Vercel default)                  │
│     ├─ Environment variables (no secrets in code)   │
│     ├─ Vercel preview deploys: password protected   │
│     ├─ GitHub branch protection rules               │
│     └─ Dependabot for dependency vulnerabilities    │
│                                                     │
└────────────────────────────────────────────────────┘
```

### Key Security Headers (next.config.js)

```javascript
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; " +
           "frame-src https://js.stripe.com; img-src 'self' https://res.cloudinary.com data:; " +
           "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
           "font-src 'self' https://fonts.gstatic.com;"
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
];
```

### Row-Level Security Policies (Supabase)

```sql
-- Properties: anyone can read active, only admins can write
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active properties"
  ON properties FOR SELECT
  USING (status = 'active');

CREATE POLICY "Admins can do everything"
  ON properties FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Bookings: guests see only their own, admins see all
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Guests see own bookings"
  ON bookings FOR SELECT
  USING (guest_id = auth.uid());

CREATE POLICY "Admins manage all bookings"
  ON bookings FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Reviews: public reads approved, admins manage all
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads approved reviews"
  ON reviews FOR SELECT
  USING (is_approved = TRUE);
```

---

## Environment Variables

```bash
# .env.local (NEVER committed to Git)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...      # Server-side only

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...

# Image hosting
CLOUDINARY_CLOUD_NAME=forteca
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Auth
NEXTAUTH_SECRET=...                   # openssl rand -base64 32
NEXTAUTH_URL=https://fortecaestate.com

# Rate limiting
UPSTASH_REDIS_URL=...
UPSTASH_REDIS_TOKEN=...
```

---

## GitHub Repository Structure

```
forteca-estate/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                   # Lint, type-check, test on PR
│   │   └── lighthouse.yml           # Performance audits
│   ├── CODEOWNERS
│   └── dependabot.yml               # Auto-update dependencies
├── public/
│   ├── fonts/
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── app/                         # Next.js App Router (see architecture above)
│   ├── components/
│   │   ├── ui/                      # Button, Input, Card, Modal (shadcn/ui)
│   │   ├── layout/                  # Header, Footer, MobileNav
│   │   ├── property/                # PropertyCard, PhotoGallery, AmenityList
│   │   ├── booking/                 # DatePicker, PriceBreakdown, GuestForm
│   │   └── marketing/               # Hero, ServiceCard, TestimonialSlider
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts            # Browser client
│   │   │   ├── server.ts            # Server client (with service role)
│   │   │   └── middleware.ts        # Auth middleware helper
│   │   ├── stripe.ts                # Stripe initialization
│   │   ├── email.ts                 # Resend helpers
│   │   ├── ical.ts                  # iCal parsing/generation
│   │   ├── validators.ts            # Zod schemas
│   │   └── utils.ts                 # Shared utilities
│   ├── hooks/                       # Custom React hooks
│   ├── types/                       # TypeScript type definitions
│   └── styles/
│       └── globals.css              # Tailwind directives + custom properties
├── supabase/
│   ├── migrations/                  # SQL migration files
│   └── seed.sql                     # Initial property data
├── tests/
│   ├── e2e/                         # Playwright end-to-end tests
│   └── unit/                        # Vitest unit tests
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Key Open Source Libraries

| Library | Purpose |
|---------|---------|
| `next` | Framework |
| `tailwindcss` | Styling |
| `@supabase/supabase-js` | Database client |
| `stripe` + `@stripe/stripe-js` | Payments |
| `next-auth` | Authentication |
| `react-hook-form` + `zod` | Form validation |
| `react-day-picker` | Date range selection |
| `ical.js` | iCal parsing/generation |
| `date-fns` | Date utilities |
| `resend` | Transactional email |
| `@upstash/ratelimit` | API rate limiting |
| `sharp` | Image optimization |
| `embla-carousel-react` | Photo gallery carousel |
| `framer-motion` | Animations |
| `lucide-react` | Icons |
| `@radix-ui/*` (shadcn/ui) | Accessible UI primitives |

---

## Migration Checklist

### Phase 1 — Foundation (Week 1-2)
- [ ] Initialize Next.js project with Tailwind
- [ ] Set up GitHub repo with branch protection
- [ ] Connect Vercel for auto-deploys
- [ ] Set up Supabase project + run migrations
- [ ] Implement auth (admin login)
- [ ] Build shared layout (header, footer, mobile nav)

### Phase 2 — Content Pages (Week 3-4)
- [ ] Home page with hero, services, testimonials
- [ ] Property listing page (grid with filters)
- [ ] Individual property detail pages
- [ ] Contact page with form
- [ ] About / Services pages
- [ ] Blog index + post pages
- [ ] Testimonials page
- [ ] Privacy policy + terms

### Phase 3 — Booking Engine (Week 5-7)
- [ ] Availability calendar component
- [ ] iCal sync (import from Airbnb/VRBO)
- [ ] iCal export endpoint
- [ ] Booking flow (date select → guest info → payment)
- [ ] Stripe integration + webhook handling
- [ ] Confirmation emails
- [ ] Guest booking management (view/cancel)

### Phase 4 — Admin Dashboard (Week 8-9)
- [ ] Admin dashboard overview (bookings, revenue)
- [ ] Property CRUD (add/edit/remove listings)
- [ ] Booking management (view, confirm, cancel)
- [ ] Calendar management (block dates, pricing overrides)
- [ ] Review moderation
- [ ] Blog post editor
- [ ] Guest database

### Phase 5 — Polish & Launch (Week 10)
- [ ] SEO optimization (meta tags, sitemap, structured data)
- [ ] Performance audit (Lighthouse score 90+)
- [ ] Security audit (headers, RLS policies, rate limits)
- [ ] 301 redirects from old Squarespace URLs
- [ ] DNS migration
- [ ] Store migration (if applicable)
- [ ] Go live

---

## SEO Redirect Map (Squarespace → Next.js)

```javascript
// next.config.ts
const redirects = async () => [
  { source: '/blvck-cabin-poconos', destination: '/properties/blvck-cabin-i', permanent: true },
  { source: '/blvck-cabin-ii', destination: '/properties/blvck-cabin-ii', permanent: true },
  { source: '/blvckcabin-3', destination: '/properties/blvck-cabin-iii', permanent: true },
  { source: '/blve-cabin', destination: '/properties/blve-cabin', permanent: true },
  { source: '/scenic-getaway', destination: '/properties/scenic-getaway', permanent: true },
  { source: '/arctic-getaway', destination: '/properties/arctic-getaway', permanent: true },
  { source: '/pocono-villa', destination: '/properties/pocono-villa', permanent: true },
  { source: '/mountain-lake', destination: '/properties/mountain-lake-getaway', permanent: true },
  { source: '/mountain-oasis', destination: '/properties/mountain-oasis', permanent: true },
  { source: '/happy-trails', destination: '/properties/happy-trails', permanent: true },
  { source: '/rampersad-poconos-home', destination: '/properties/rampersad-poconos-home', permanent: true },
  { source: '/pocono-getaway', destination: '/properties/pocono-getaway', permanent: true },
  { source: '/perfect-pocono', destination: '/properties/rustic-heaven', permanent: true },
  { source: '/getaway-listing', destination: '/properties', permanent: true },
  { source: '/testimonals', destination: '/testimonials', permanent: true },
  { source: '/privacy-policy-4', destination: '/privacy-policy', permanent: true },
  { source: '/forteca-blog', destination: '/blog', permanent: true },
  { source: '/fortecastore', destination: '/store', permanent: true },
];
```
