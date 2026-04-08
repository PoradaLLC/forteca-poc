# Step 6: Vercel Deployment

## 6.1 Initial Setup

### Connect GitHub to Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Select your repository
4. Vercel auto-detects Next.js — accept the defaults
5. Add environment variables before first deploy (see 6.2)
6. Deploy

### Install Vercel CLI (optional but recommended)

```bash
npm i -g vercel
vercel login
vercel link  # link local project to Vercel project
```

## 6.2 Environment Variables

Set in Vercel Dashboard → Project → Settings → Environment Variables.

**Required for all environments:**
| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

**Required for Production + Preview:**
| Variable | Value |
|----------|-------|
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `RESEND_API_KEY` | Your Resend API key |
| `RESEND_FROM_EMAIL` | `noreply@yourdomain.com` |

**After adding env vars**: Redeploy for them to take effect. Vercel does NOT automatically redeploy when env vars change.

### Pulling env vars to local

```bash
vercel env pull .env.local
```

**Warning**: `vercel env pull` overwrites `.env.local` entirely — back up custom vars first.

## 6.3 Deployment Flow

```
git push → GitHub → GitHub Actions CI (lint, types, tests)
                  → Vercel auto-deploy
                     ├── main branch → Production deployment
                     └── PR branches → Preview deployment (unique URL)
```

Both CI and Vercel deploy run in parallel. CI checks code quality; Vercel builds and deploys.

## 6.4 Build Configuration

Vercel auto-detects these from `package.json`:
- Build command: `next build`
- Output directory: `.next`
- Install command: `npm ci`
- Node.js version: 20 (set in Vercel project settings if needed)

### Static vs Dynamic Pages

Next.js determines page type at build time:
- **Static (○)**: Pages with no dynamic data fetching → built once, served from CDN
- **SSG (●)**: Pages using `generateStaticParams()` → pre-rendered for known paths
- **Dynamic (ƒ)**: Pages querying Supabase → rendered on each request

Examples in this project:
- Static: `/about`, `/contact`, `/services/*`, `/terms`, `/privacy-policy`
- SSG: `/properties/[slug]`, `/store/[slug]` (pre-rendered at build time)
- Dynamic: `/blog`, `/blog/[slug]`, `/testimonials`, `/admin/*`, all API routes

## 6.5 Domain Configuration

1. Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain (e.g., `yourdomain.com`)
3. Configure DNS:
   - A record: `76.76.21.21` (Vercel)
   - CNAME for `www`: `cname.vercel-dns.com`
4. SSL is automatic

## 6.6 Image Optimization

Next.js Image component (`next/image`) handles optimization. Configure allowed remote domains in `next.config.ts`:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/**" },
  ],
},
```

The `sharp` package is installed for server-side image optimization.

## 6.7 Troubleshooting

### Build fails with stale cache
```bash
rm -rf .next
npm run build
```

### Env vars not taking effect
Redeploy after adding/changing env vars in Vercel dashboard.

### RLS errors on admin operations
Ensure `createServiceClient()` uses `createClient` from `@supabase/supabase-js` (NOT `createServerClient` from `@supabase/ssr`). The SSR client respects RLS even with the service role key.

### Resend not sending emails
- Check `RESEND_API_KEY` is set and not empty in Vercel env vars
- Sandbox mode can only send to account owner email — verify your domain at resend.com
- Check Vercel function logs for errors

### CSP blocking resources
Add the resource domain to the appropriate CSP directive in `next.config.ts`. Common additions:
- Stripe: `script-src` + `frame-src` for `https://js.stripe.com`
- Supabase real-time: `connect-src` for `wss://*.supabase.co`
- External APIs: `connect-src` for the API domain
