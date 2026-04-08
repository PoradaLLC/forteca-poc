# Step 5: Feature Implementation Patterns

## 5.1 Property/Listing Data Access Layer

Create a data access layer that queries Supabase with a mock-data fallback for local development:

```tsx
// src/lib/properties.ts
import { createServiceClient } from "@/lib/supabase/server";

export interface Property {
  id: string;
  slug: string;
  name: string;
  // ... all fields
}

function dbToProperty(row: Record<string, unknown>): Property {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    // ... map all fields, with defaults for nullable columns
    images: (row.images as { src: string; alt: string }[]) ?? [],
    amenities: (row.amenities as string[]) ?? [],
  };
}

export async function getProperties(): Promise<Property[]> {
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("status", "active")
      .order("name");
    if (error || !data || data.length === 0) return mockFallback();
    return data.map(dbToProperty);
  } catch {
    return mockFallback();
  }
}

export async function getProperty(slug: string): Promise<Property | null> {
  try {
    const supabase = await createServiceClient();
    const { data } = await supabase.from("properties").select("*").eq("slug", slug).single();
    if (!data) return null;
    return dbToProperty(data);
  } catch {
    return null;
  }
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const all = await getProperties();
  return all.slice(0, 4);
}

export async function getPropertySlugs(): Promise<string[]> {
  try {
    const supabase = await createServiceClient();
    const { data } = await supabase.from("properties").select("slug").eq("status", "active");
    return (data ?? []).map((r: { slug: string }) => r.slug);
  } catch {
    return [];
  }
}
```

## 5.2 Blog System

### Server Actions for CRUD
```tsx
// src/app/admin/actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export interface BlogImage { url: string; path: string; }

export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const images = JSON.parse((formData.get("images") as string) || "[]");

  await supabase.from("blog_posts").insert({
    title, slug,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    status: formData.get("status") as string || "draft",
    images,
    published_at: formData.get("status") === "published" ? new Date().toISOString() : null,
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
```

### Image Upload to Supabase Storage
```tsx
export async function uploadBlogImage(formData: FormData): Promise<BlogImage> {
  await requireAdmin();
  const supabase = await createServiceClient();
  const file = formData.get("file") as File;
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${file.name.split(".").pop()}`;

  await supabase.storage.from("blog-images").upload(path, file, { contentType: file.type });
  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return { url: data.publicUrl, path };
}

export async function deleteBlogImage(path: string) {
  await requireAdmin();
  const supabase = await createServiceClient();
  await supabase.storage.from("blog-images").remove([path]);
}
```

### Blog Content Rendering
The blog uses a simple markdown-like parser — split content on double newlines, then detect patterns:
- `**bold text**` → `<strong>`
- `- list item` → `<ul><li>`
- `**Heading**` alone → `<h3>`
- Everything else → `<p>`

Normalize `\r\n` to `\n` before splitting (browsers send `\r\n` from textareas).

## 5.3 Newsletter System

### Signup API Route
```tsx
// src/app/api/newsletter/route.ts
export async function POST(req: NextRequest) {
  const { email, firstName } = await req.json();
  // Validate with Zod
  // Upsert into subscribers table
  // Send welcome email (non-blocking)
  sendNewsletterWelcome(email).catch(console.error);
  return NextResponse.json({ success: true });
}
```

### Broadcast Email (Admin Action)
```tsx
export async function sendBroadcastEmail(formData: FormData) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const { data: subscribers } = await supabase
    .from("subscribers").select("email").eq("is_active", true);

  const resend = new Resend(process.env.RESEND_API_KEY);
  await Promise.allSettled(
    subscribers.map(s => resend.emails.send({
      from: `Your Business <${from}>`,
      to: s.email,
      subject: formData.get("subject") as string,
      html: buildEmailTemplate(formData.get("body") as string),
    }))
  );
}
```

## 5.4 Email Templates (Resend)

```tsx
// src/lib/email.ts
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@yourdomain.com";

export async function sendNewsletterWelcome(email: string) {
  if (!resend) { console.log("[DEV] Welcome email →", email); return; }
  await resend.emails.send({
    from: `Your Business <${FROM}>`,
    to: email,
    subject: "Welcome!",
    html: `<div>...</div>`,
  });
}
```

**Resend sandbox limitation**: Free tier can only send to the account owner's email. Verify a domain for production.

## 5.5 Contact Form

### Zod Validation (`src/lib/validators.ts`)
```tsx
import { z } from "zod";
export const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
});
```

### Client Component with React Hook Form
```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema } from "@/lib/validators";

export function ContactForm() {
  const form = useForm({ resolver: zodResolver(ContactSchema) });

  async function onSubmit(data) {
    const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) });
    // handle response
  }

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
}
```

## 5.6 Location-Based Filtering

Use Nominatim (free, no API key) for geocoding zip codes and cities:

```tsx
const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=us&limit=1`,
  { headers: { "User-Agent": "YourApp/1.0" } }
);
const [result] = await response.json();
const { lat, lon } = result;
```

Haversine distance formula for radius filtering:
```tsx
function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
```

## 5.7 Shopping Cart

Client-side React Context for cart state:

```tsx
// src/lib/cart-context.tsx
"use client";
import { createContext, useContext, useState, useCallback } from "react";

export interface CartItem {
  slug: string; name: string; price: number; size: string; quantity: number; image: string;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = useCallback((item) => { /* merge or add */ }, []);
  const removeItem = useCallback((slug, size) => { /* filter out */ }, []);
  // ... updateQuantity, clearCart, totalItems, totalPrice
  return <CartContext.Provider value={...}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
```

Wrap the root layout with `<CartProvider>` so the header can access cart state.

## 5.8 Admin Auth Pattern

```tsx
// In actions.ts
async function requireAdmin() {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const role = user.app_metadata?.role ?? user.user_metadata?.role;
  if (role !== "admin") throw new Error("Forbidden");
  return user;
}
```

Every server action calls `requireAdmin()` first. Every admin page layout checks auth and redirects.

## 5.9 Review Scraping Pattern

To import reviews from external platforms:
1. Use `WebFetch` or scraping to get reviews from listing pages (DirectStays, etc.)
2. Extract: guest_name, rating, content, source
3. Insert into `reviews` table with `is_approved = true` via SQL:

```sql
INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved)
SELECT p.id, r.guest_name, r.rating, r.content, r.source, true
FROM (VALUES
  ('property-slug', 'Guest Name', 5, 'Review text', 'airbnb')
) AS r(slug, guest_name, rating, content, source)
JOIN properties p ON p.slug = r.slug;
```
