# Cookie-Cutter Formula: Next.js Business Website

## What This Is

A step-by-step guide for an LLM (or developer) to replicate the Forteca Estate website architecture for a different business. The same tech stack, patterns, and structure — just swap the branding, data, and content.

## Tech Stack Summary

| Component | Technology | Why |
|-----------|-----------|-----|
| Framework | Next.js 16+ (App Router) | Server components, static generation, API routes, all-in-one |
| Database | Supabase (PostgreSQL) | Free tier, real-time, auth, storage, RLS policies |
| Auth | Supabase Auth | Built-in, role-based, no separate auth service |
| Email | Resend | Simple API, free tier, HTML templates |
| Styling | Tailwind CSS 4 | Utility-first, CSS custom properties, no config file |
| Hosting | Vercel | Zero-config Next.js hosting, auto-deploy from GitHub |
| CI | GitHub Actions | Lint, type-check, tests on every push |
| Images | Supabase Storage + Next.js Image | Free storage, automatic optimization |
| Forms | React Hook Form + Zod | Type-safe validation, good DX |
| Icons | Lucide React | Lightweight, tree-shakeable, consistent |

## Guide Structure

| File | Contents |
|------|---------|
| `01-project-setup.md` | Initialize Next.js, install deps, create file structure, CI pipeline |
| `02-supabase.md` | Create project, client setup, schema, RLS, storage buckets, admin user |
| `03-styling-and-theming.md` | Brand colors, typography, animations, reusable UI patterns |
| `04-layouts-and-routing.md` | Route groups, layouts, Header/Footer isolation, admin auth layout |
| `05-features.md` | Data access layer, blog with images, newsletter, contact form, cart, location search, reviews |
| `06-vercel-deployment.md` | Vercel setup, env vars, domains, troubleshooting |

## What You Need to Customize

When replicating for a new business:

1. **Brand colors** — Change hex values in `globals.css` `:root`
2. **Fonts** — Swap Google Fonts in `layout.tsx`
3. **Content** — Homepage copy, about page, services, team photos
4. **Database schema** — Adjust table columns for your domain (e.g., "properties" might become "products", "listings", "rooms")
5. **Images** — Replace `public/images/` assets (logo, hero video, team photos, store products)
6. **External integrations** — Replace Hospitable/DirectStays with your booking system. Replace Stripe with your payment processor.
7. **SEO** — Update metadata, descriptions, redirects from old site URLs
8. **Email templates** — Update branding in `email.ts` HTML templates

## Key Architectural Decisions

1. **Server Components by default** — only add `"use client"` for interactivity
2. **Service role client for all admin operations** — bypasses RLS cleanly
3. **Mock data fallback** — app works offline/without Supabase for development
4. **No middleware for auth** — auth checks happen in layouts (simpler, more explicit)
5. **Server actions over API routes for admin** — cleaner form handling, built-in `revalidatePath()`
6. **Static generation where possible** — property pages, store pages pre-rendered at build time
7. **Images in Supabase Storage** — no separate image service needed
8. **Cart in React Context** — no persistence needed (Stripe checkout handles the actual purchase)
