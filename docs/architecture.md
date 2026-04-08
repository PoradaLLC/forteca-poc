# Architecture Overview

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.2 |
| Language | TypeScript | 5.x |
| Database | Supabase (PostgreSQL) | — |
| Auth | Supabase Auth | — |
| Email | Resend | 6.10.0 |
| Styling | Tailwind CSS | 4.x |
| Fonts | Playfair Display (serif), DM Sans (body) | Google Fonts |
| Icons | Lucide React | 1.7.0 |
| Hosting | Vercel | — |
| CI | GitHub Actions | — |
| Image Optimization | Sharp + Next.js Image | 0.34.5 |
| Forms | React Hook Form + Zod | 7.72.1 / 4.3.6 |

## Repository Structure

```
forteca-poc/
├── .github/workflows/ci.yml    # GitHub Actions CI pipeline
├── docs/                        # This documentation
├── formula/                     # Cookie-cutter templates for replication
├── public/
│   └── images/
│       ├── hero.mp4             # Homepage background video
│       ├── logo.png             # Brand logo
│       ├── services/            # Service page photos
│       ├── store/               # Store product images
│       │   ├── hat/             # Dad hat product photos
│       │   └── sweatshirt/      # Champion sweatshirt photos
│       └── team/                # Team headshots + group photo
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout (fonts, CartProvider)
│   │   ├── globals.css          # Tailwind config, brand tokens, animations
│   │   ├── (marketing)/         # Public-facing pages (with Header/Footer)
│   │   │   ├── layout.tsx       # Marketing layout (Header + Footer wrapper)
│   │   │   ├���─ page.tsx         # Homepage
│   │   │   ├── about/
│   │   │   ├── blog/
│   │   │   ├── cart/
│   │   │   ├── contact/
│   │   │   ├��─ privacy-policy/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   ├── terms/
│   │   │   └── testimonials/
│   │   ├── properties/          # Property listing + detail pages
│   │   │   ├── layout.tsx       # Properties layout (Header + Footer)
│   │   │   ├── page.tsx         # /properties listing with filters
│   ��   │   └── [slug]/page.tsx  # /properties/cabin-name detail
│   │   ├── booking/             # Booking flow
│   │   │   ├── layout.tsx       # Booking layout (Header + Footer)
│   │   │   └── [slug]/page.tsx  # /booking/cabin-name
│   │   ├── admin/               # Admin dashboard (NO Header/Footer)
│   │   │   ├── layout.tsx       # Metadata-only wrapper
��   │   │   ├── actions.ts       # All server actions (mutations)
│   │   │   ├── login/           # Login page + form
│   │   │   └── (dashboard)/     # Auth-guarded admin pages
│   │   │       ├── layout.tsx   # Auth check + AdminSidebar
│   │   ���       ├���─ page.tsx     # Dashboard stats
│   │   │       ├── blog/        # Blog CRUD
│   │   │       ├── hospitable/  # Hospitable link page
│   │   │       ├── newsletter/  # Subscriber management + broadcast
│   │   │       ├── properties/  # Property visibility management
│   │   │       ├── reviews/     # Review moderation
│   │   │       ├── settings/    # General settings
│   │   │       └── stripe/      # Stripe link page
│   │   └── api/                 # API routes
│   │       ├── contact/route.ts # POST contact form
│   │       └── newsletter/route.ts # POST newsletter signup
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Sticky nav, context-aware CTA
│   │   ��   ├── Footer.tsx       # 5-column footer + newsletter
│   │   │   └── MobileNav.tsx    # Slide-out drawer menu
��   │   ├── property/
│   │   │   ├── PropertyCard.tsx # Card component (feature/grid variants)
│   │   │   └── PropertyFilters.tsx # Type + location filtering
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx # Admin nav sidebar
│   │   │   └── AdminActions.tsx # Reusable action buttons
│   │   └── NewsletterForm.tsx   # Email signup (footer/inline variants)
│   ├��─ lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Browser Supabase client
│   │   │   └── server.ts        # Server + service role clients
│   │   ├── cart-context.tsx     # Shopping cart React context
│   │   ├── email.ts            # Resend email templates
│   │   ├── mock-data.ts        # Fallback property data for dev
│   │   ├── properties.ts       # Property data access layer
│   │   ├── store-data.ts       # Store product catalog
│   │   ├── utils.ts            # cn(), formatPrice, formatDate, slugify
│   │   └── validators.ts       # Zod schemas (contact form)
│   └── types/
│       └── index.ts            # TypeScript interfaces for all entities
├── supabase/
│   ├── migrations/             # SQL migration files
│   └── seed.sql                # Initial seed data
├── next.config.ts              # Security headers, redirects, image domains
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript config with @/* alias
└── .env.local.example          # Environment variable template
```

## Route Groups Explained

The app uses Next.js route groups to control layout inheritance:

- **`(marketing)/`** — All public pages. Wrapped with `Header` + `Footer` via `(marketing)/layout.tsx`.
- **`properties/`** — Outside `(marketing)` because property pages have their own layout file that also includes Header/Footer. This is separate to allow potential future customization.
- **`booking/`** — Same as properties, separate layout with Header/Footer.
- **`admin/`** — No Header/Footer at all. The `(dashboard)/layout.tsx` handles auth checks and renders `AdminSidebar` instead.

## Data Flow

```
Browser → Next.js Server Component → createServiceClient() → Supabase PostgreSQL
                                   → Supabase Storage (images)
                                   → Resend API (emails)
```

- **Server Components** (default): Fetch data directly from Supabase using the service role client. No client-side data fetching needed for reads.
- **Client Components** (`"use client"`): Used for interactivity — forms, filters, cart, admin actions. Marked explicitly.
- **Server Actions** (`"use server"` in `actions.ts`): All admin mutations go through server actions with `requireAdmin()` auth check.
- **API Routes** (`/api/*`): Used for public POST endpoints (contact form, newsletter) that don't need admin auth.

## Authentication Architecture

1. **Supabase Auth** handles user sessions (email/password).
2. Admin role is stored in `user.app_metadata.role` or `user.user_metadata.role` as `"admin"`.
3. The `(dashboard)/layout.tsx` checks for a valid admin session on every request:
   - No user → redirect to `/admin/login`
   - User without admin role → redirect to `/admin/login`
   - Missing Supabase env vars → show helpful error message
4. Server actions call `requireAdmin()` before any mutation.
5. The service role client (`createServiceClient()`) bypasses RLS for trusted server operations.
6. The browser client (`createClient()`) uses the anon key and respects RLS policies.

## External Services

| Service | Purpose | Where Used |
|---------|---------|-----------|
| Hospitable | Booking management, calendar sync, guest messaging | External link from admin, DirectStays booking URL on property pages |
| Stripe | Payment processing (future) | Admin link page, CSP headers allow stripe.js |
| Resend | Transactional email (welcome, contact, booking) | `/api/newsletter`, `/api/contact`, `email.ts` |
| Nominatim | Free geocoding for property location search | `PropertyFilters.tsx` — converts zip/city to lat/lng |
| DirectStays | Hospitable's direct booking engine | "Book Direct" button on property detail pages |
