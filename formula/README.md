# Cookie-Cutter Formula

## What This Is

Drop this `formula/` directory into any repo and ask an LLM (Claude, GPT, etc.) to build a website using these guides. The LLM will produce a production-grade Next.js website with the same architecture as Forteca Estate.

## How to Use

1. Copy this entire `formula/` directory into your new repo
2. Tell the LLM:

```
Read all files in the formula/ directory. Use them as blueprints to build a website for my business: [describe your business]. My brand colors are [X], my fonts are [Y], and I need these pages: [list pages].
```

3. The LLM will follow the guides in numbered order:
   - `01-project-setup.md` — scaffolds the Next.js project
   - `02-supabase.md` — sets up database, auth, storage
   - `03-styling-and-theming.md` — applies your brand
   - `04-layouts-and-routing.md` — builds the page structure
   - `05-features.md` — implements features (blog, newsletter, contact, cart, etc.)
   - `06-vercel-deployment.md` — deploys to Vercel

## What You Should Provide

Before the LLM starts, give it:

| Detail | Example |
|--------|---------|
| Business name | "Mountain Lodge Rentals" |
| Primary dark color | `#1a2332` |
| Accent color | `#d4a853` |
| Background color | `#f8f5ef` |
| Display font | Cormorant Garamond |
| Body font | Inter |
| Logo file | `logo.png` in public/images/ |
| Pages needed | Home, Properties, About, Blog, Contact, Store |
| Business type | Vacation rentals, restaurant, law firm, agency, etc. |
| External integrations | Booking system, payment processor, email provider |

## What Gets Built

- **Next.js 16+ App Router** with TypeScript
- **Supabase** for database, auth, and image storage
- **Resend** for transactional email
- **Stripe** for payments (optional)
- **Tailwind CSS 4** with your brand tokens
- **Admin dashboard** with auth-guarded CRUD
- **Blog** with image uploads and markdown content
- **Newsletter** signup with broadcast email
- **Contact form** with email notifications
- **Store** with shopping cart (optional)
- **CI pipeline** on GitHub Actions
- **Deployed on Vercel** with security headers and SEO

## Customization Points

The guides use generic patterns. The LLM should adapt these to your business:

- **Database tables**: "properties" might become "listings", "menu_items", "services", etc.
- **Pages**: Not every business needs a Store or Testimonials page — pick what fits
- **External services**: Swap Hospitable for your booking system, or remove it entirely
- **Features**: The blog, newsletter, and contact form patterns work for any business
- **Pricing**: Adjust the Stripe checkout for your products/services

## File Overview

| File | Purpose |
|------|---------|
| `README.md` | This file — how to use the formula |
| `00-overview.md` | Tech stack rationale and architecture decisions |
| `01-project-setup.md` | Next.js init, dependencies, config, CI |
| `02-supabase.md` | Database schema, clients, RLS, storage, admin auth |
| `03-styling-and-theming.md` | Brand colors, fonts, animations, UI patterns |
| `04-layouts-and-routing.md` | Route groups, layouts, Header/Footer separation, admin auth |
| `05-features.md` | Data layer, blog, newsletter, contact, cart, location search |
| `06-vercel-deployment.md` | Vercel setup, env vars, domains, troubleshooting |
