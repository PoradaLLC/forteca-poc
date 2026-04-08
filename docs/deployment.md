# Deployment & CI/CD

## Hosting: Vercel

The app is deployed on Vercel with automatic deployments from the `main` branch on GitHub.

### Deployment Flow

1. Push to `main` → GitHub Actions CI runs (lint, type-check, tests)
2. Vercel auto-deploys on push (preview for PRs, production for main)
3. Next.js builds with static generation for property pages and store pages
4. Dynamic pages (blog, testimonials, admin) render on demand

### Environment Variables (Vercel)

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Environments | Description |
|----------|-------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | All | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview | Supabase service role key (server-only) |
| `RESEND_API_KEY` | Production, Preview | Resend API key for transactional email |
| `RESEND_FROM_EMAIL` | All | Sender email address |

**Not yet needed** (for future use):
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- `CLOUDINARY_*` (images stored in Supabase Storage instead)
- `AUTH_SECRET`, `AUTH_URL` (NextAuth not used, using Supabase Auth)
- `UPSTASH_*` (rate limiting not yet implemented)

### Important Notes

- After adding/changing env vars in Vercel, you must **redeploy** for them to take effect
- `SUPABASE_SERVICE_ROLE_KEY` should only be in Production and Preview, never Development if using `vercel dev`
- Resend sandbox mode (free tier) can only send to the account owner's email — verify a domain for production use

## CI Pipeline: GitHub Actions

File: `.github/workflows/ci.yml`

Triggered on: push to `main`, pull requests to `main`

Steps:
1. Checkout code
2. Setup Node.js 20 with npm cache
3. `npm ci` — clean install dependencies
4. `npm run lint` — ESLint
5. `npm run type-check` — `tsc --noEmit`
6. `npm run test` — Vitest unit tests

### Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "type-check": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test"
}
```

## Next.js Configuration (`next.config.ts`)

### Security Headers

Applied to all routes (`/(.*)`):

| Header | Value |
|--------|-------|
| X-Content-Type-Options | nosniff |
| X-Frame-Options | DENY |
| X-XSS-Protection | 1; mode=block |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |
| Content-Security-Policy | See below |
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload |

**CSP Details:**
- `script-src`: self, unsafe-inline, unsafe-eval, js.stripe.com
- `frame-src`: js.stripe.com (for Stripe Elements)
- `img-src`: self, res.cloudinary.com, data:, blob:
- `style-src`: self, unsafe-inline, fonts.googleapis.com
- `font-src`: self, fonts.gstatic.com
- `connect-src`: self, *.supabase.co, wss://*.supabase.co, nominatim.openstreetmap.org

### Image Remote Patterns

- `res.cloudinary.com/**` — Cloudinary images (legacy)
- `*.supabase.co/storage/**` — Supabase Storage images (active)

### 301 Redirects

18 permanent redirects from old Squarespace URLs to new paths. Examples:
- `/blvck-cabin-poconos` → `/properties/blvck-cabin-i`
- `/forteca-blog` → `/blog`
- `/fortecastore` → `/store`
- `/testimonals` → `/testimonials` (typo fix)

## Local Development

```bash
# 1. Clone and install
git clone <repo>
cd forteca-poc
npm install

# 2. Set up environment
cp .env.local.example .env.local
# Fill in Supabase URL, anon key, and service role key

# 3. Run dev server
npm run dev
# → http://localhost:3000

# 4. Access admin
# Navigate to /admin/login
# Use a Supabase user with admin role set
```

### Without Supabase

The app gracefully degrades if Supabase isn't configured:
- Properties fall back to `mock-data.ts` (12 hardcoded properties)
- Blog shows "Coming Soon"
- Newsletter signup logs to console
- Admin shows "Supabase Not Configured" message
- Reviews don't display

## Build Cache Issues

If you encounter stale type errors after deleting pages/files:
```bash
rm -rf .next
npm run build
```

The `.next/types/validator.ts` file caches page references and can get out of sync.
