# Step 4: Layouts & Routing

## 4.1 Root Layout

The root layout (`src/app/layout.tsx`) should only contain:
- Font loading
- Global metadata
- Global providers (e.g., CartProvider)
- The `<html>` and `<body>` tags

**Do NOT put Header/Footer here** — they go in route-specific layouts so admin pages stay clean.

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { YourSerif, YourSans } from "next/font/google";
import { CartProvider } from "@/lib/cart-context"; // if you have a store
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Your Business", template: "%s | Your Business" },
  description: "Your business description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
```

## 4.2 Route Group Structure

Use Next.js route groups to control which pages get which layouts:

```
src/app/
├── layout.tsx                 # Root: fonts, providers, <html>/<body>
├── globals.css
├── (marketing)/               # Public pages WITH Header/Footer
│   ├── layout.tsx             # ← Header + main + Footer wrapper
│   ├── page.tsx               # Homepage (/)
│   ├── about/page.tsx
│   ├── blog/
│   ├── contact/
│   ├── cart/
│   ├── services/
│   ├── store/
│   └── testimonials/
├── properties/                # Property pages WITH Header/Footer
│   ├── layout.tsx             # ← Own layout with Header + Footer
│   ├── page.tsx               # /properties
│   └── [slug]/page.tsx        # /properties/cabin-name
├── admin/                     # Admin pages WITHOUT Header/Footer
│   ├── layout.tsx             # ← Metadata only
│   ├── login/page.tsx
│   └── (dashboard)/
│       ├── layout.tsx         # ← Auth check + AdminSidebar
│       ├── page.tsx           # /admin dashboard
│       └── blog/page.tsx      # etc.
└── api/
    ├── contact/route.ts
    └── newsletter/route.ts
```

## 4.3 Marketing Layout

```tsx
// src/app/(marketing)/layout.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
```

Copy this same pattern for `properties/layout.tsx` and `booking/layout.tsx` — any route group outside `(marketing)` that still needs Header/Footer.

## 4.4 Admin Layout

Two levels of admin layout:

### Level 1: Metadata wrapper (`src/app/admin/layout.tsx`)
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### Level 2: Auth-guarded dashboard (`src/app/admin/(dashboard)/layout.tsx`)
```tsx
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Check Supabase config
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return <div>Supabase Not Configured</div>;
  }

  // Auth check
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");
  const role = user.app_metadata?.role ?? user.user_metadata?.role;
  if (role !== "admin") redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-[#0a1520]">
      <AdminSidebar userEmail={user.email ?? ""} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
```

The login page (`src/app/admin/login/`) is outside `(dashboard)/` so it doesn't require auth.

## 4.5 Dynamic Routes

### Property/listing detail: `[slug]`
```tsx
// src/app/properties/[slug]/page.tsx
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  // fetch and render...
}
```

### Blog post: `[slug]`
Same pattern — `generateStaticParams()` for static generation, `params` for dynamic data.

### Blog edit: `[id]`
Admin uses UUID `[id]` instead of slug for editing (avoids conflicts with slug changes).

## 4.6 API Routes

API routes live in `src/app/api/` and export HTTP method handlers:

```tsx
// src/app/api/newsletter/route.ts
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // validate, process, return
  return NextResponse.json({ success: true });
}
```

Use API routes for:
- Public form submissions (contact, newsletter) — these don't need admin auth
- Webhook endpoints (Stripe, etc.)
- External integrations

Use server actions for:
- Admin mutations — cleaner than API routes for form submissions
- Any operation that needs `requireAdmin()` auth
