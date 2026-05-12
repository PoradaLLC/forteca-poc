# forteca-poc

> Direct-booking platform for the Forteca Estate vacation rental portfolio — properties, availability, Stripe checkout, and iCal sync with Airbnb / VRBO.

## What this is

Forteca-poc is the proof-of-concept (and increasingly the production) replacement for the Forteca Estate Squarespace site. It runs a 44-property vacation-rental portfolio across PA / NY / FL with a public marketing surface, a property catalog, a date-pick → guest-info → Stripe-checkout booking flow, and an admin dashboard for properties, bookings, calendars, guests, and reviews.

It's also the architectural parent of the rest of the Porada Next.js sites — `porada` was forked from this repo and slimmed down, and the shared `formula/` template (see [Formula doc](https://github.com/PoradaLLC/docs/blob/main/src/content/docs/repos/formula.md)) lives here in its richest form.

## Tech stack

- **Framework:** Next.js 16.2.3 (App Router), React 19.2.4, TypeScript 5
- **Styling:** Tailwind CSS 4, shadcn/ui (Radix primitives), Framer Motion, Embla carousel
- **Data:** Supabase (Postgres) — five migrations under `supabase/migrations/` (initial schema, Hospitable source, seeded reviews, schema rebuild, Hospitable fields)
- **Auth:** NextAuth.js v5 beta (guest + admin sessions)
- **Payments:** Stripe (`@stripe/stripe-js` on the client, `stripe` server SDK + webhook)
- **Email:** Resend (booking confirmations, contact replies, newsletter)
- **Images:** Cloudinary
- **Rate limiting:** Upstash Redis (`@upstash/ratelimit` + `@upstash/redis`)
- **Calendars:** `react-day-picker`, `date-fns`, iCal parsing for Airbnb / VRBO sync
- **Forms:** react-hook-form + Zod
- **Tests:** Vitest (`src/__tests__/`), Playwright for E2E
- **Deploy:** Vercel; cron `*/15 * * * *` → `/api/ical/sync`

> **Heads-up:** Next.js 16 has breaking changes from earlier versions — see `AGENTS.md` and consult `node_modules/next/dist/docs/` before relying on remembered APIs.

## Quick start

```sh
npm install
npm run dev   # http://localhost:3000
```

Required environment variables (drop into `.env.local`):

```sh
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
AUTH_SECRET=
AUTH_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
CRON_SECRET=                     # gates /api/ical/sync against unauthorized hits
```

Apply Supabase migrations with `supabase db push` against a project linked via `supabase link`.

## Repo layout

```
src/
  app/
    (marketing)/         # home, services, testimonials, blog, contact
    properties/          # listings + detail pages
    booking/             # date select → guest info → payment
    admin/               # CRUD: properties, bookings, calendar, guests, reviews
    api/
      properties/
      bookings/
      payments/webhook   # Stripe webhook handler
      newsletter/
      ical/sync          # cron-triggered iCal pull (Airbnb/VRBO)
      availability/
  components/            # layout, property, booking, marketing
  lib/
    supabase/            # browser, server, middleware
    stripe.ts
    email.ts             # Resend templates
    ical.ts              # iCal parser/writer
    validators.ts
    proxy.ts
  __tests__/             # Vitest sample
docs/                    # in-repo architecture docs (see below)
formula/                 # 10-file LLM template — see Formula doc
supabase/
  migrations/            # 5 migrations
PLAN.md                  # 26 KB original spec
```

## Common commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Next dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run type-check` | `tsc --noEmit` |
| `npm test` | Vitest run |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:e2e` | Playwright E2E |

## In-repo docs

Six architecture docs live under [`docs/`](docs/) — pull these for design intent before refactoring:

- [`docs/architecture.md`](docs/architecture.md) — system overview
- [`docs/database.md`](docs/database.md) — schema, RLS, table relationships
- [`docs/admin-dashboard.md`](docs/admin-dashboard.md) — admin surface walkthrough
- [`docs/public-pages.md`](docs/public-pages.md) — marketing + property pages
- [`docs/styling.md`](docs/styling.md) — Tailwind tokens, fonts, design system
- [`docs/deployment.md`](docs/deployment.md) — Vercel config, env vars, cron

[`PLAN.md`](PLAN.md) is the original 26 KB migration spec from the Squarespace site — read it for the *why* behind every table and route.

## Deployment

Vercel auto-builds on push to `main`. The Vercel project holds the env vars listed above. `vercel.json` pins one cron job:

```json
{
  "crons": [{ "path": "/api/ical/sync", "schedule": "*/15 * * * *" }]
}
```

The endpoint reads `Authorization: Bearer $CRON_SECRET` and aborts otherwise — Vercel's cron runner sets that header automatically. To trigger a manual sync from your machine, hit the endpoint with the same bearer.

## Related

- [`porada`](https://github.com/PoradaLLC/porada) — slimmed-down fork (consulting site, no booking engine).
- [`forteca-cleaning`](https://github.com/PoradaLLC/forteca-cleaning) — sister marketing site for the cleaning arm.
- [`forteca-contracting`](https://github.com/PoradaLLC/forteca-contracting) — sister marketing site for the contracting arm.
- [`forteca-mobile`](https://github.com/PoradaLLC/forteca-mobile) — Forteca Estate companion mobile app.

## Operational notes

- iCal sync runs every 15 min — failures don't currently page anyone; check Vercel cron logs if availability drifts.
- Stripe webhook signature is verified in `/api/payments/webhook` against `STRIPE_WEBHOOK_SECRET`. Rotate via the Stripe dashboard, then update Vercel + redeploy.
- Upstash rate-limit fronts the contact form and newsletter endpoints — useful when scrapers find the site.
