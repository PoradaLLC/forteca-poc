# Step 1: Project Setup

This guide walks through bootstrapping a new business website using the same stack as Forteca Estate. Replace "Forteca Estate" / "forteca" with your business name throughout.

## 1.1 Create the Next.js Project

```bash
npx create-next-app@latest my-business \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-git

cd my-business
git init
```

## 1.2 Install Dependencies

```bash
# UI
npm install lucide-react clsx tailwind-merge class-variance-authority

# Supabase
npm install @supabase/supabase-js @supabase/ssr

# Forms & validation
npm install react-hook-form zod @hookform/resolvers

# Email
npm install resend

# Image optimization
npm install sharp

# Dev tooling
npm install -D vitest @vitejs/plugin-react
```

### Optional (add as needed)
```bash
# E-commerce
npm install stripe @stripe/stripe-js

# Animation
npm install framer-motion

# Date handling
npm install date-fns react-day-picker

# Rate limiting
npm install @upstash/ratelimit @upstash/redis

# E2E tests
npm install -D @playwright/test
```

## 1.3 TypeScript Configuration

The default `tsconfig.json` from create-next-app should already have:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Verify the `@/*` alias points to `./src/*`.

## 1.4 Create Utility Files

### `src/lib/utils.ts`
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
```

## 1.5 Environment Variables

Create `.env.local.example`:
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Email (Resend)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Optional: Stripe
# STRIPE_SECRET_KEY=sk_...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

Add to `.gitignore`:
```
.env.local
.env*.local
```

## 1.6 CI Pipeline

Create `.github/workflows/ci.yml`:
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    name: Lint, Type-check & Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
```

Add scripts to `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "type-check": "tsc --noEmit",
    "test": "vitest run"
  }
}
```

## 1.7 Project Structure

Create the directory structure:
```bash
mkdir -p src/app/{api,admin}
mkdir -p src/app/\(marketing\)
mkdir -p src/components/{layout,admin}
mkdir -p src/lib/supabase
mkdir -p src/types
mkdir -p public/images
mkdir -p supabase/migrations
```

## 1.8 Next.js Configuration

Create `next.config.ts` with security headers:

```ts
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "img-src 'self' data: blob:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    ].join("; "),
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/**" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  // Add 301 redirects from old site URLs here
  async redirects() {
    return [];
  },
};

export default nextConfig;
```

Add `https://js.stripe.com` to `script-src` and `frame-src` if using Stripe.
Add `https://nominatim.openstreetmap.org` to `connect-src` if using location search.
