import type { MetadataRoute } from "next";
import { getPropertySlugs } from "@/lib/properties";
import { createServiceClient } from "@/lib/supabase/server";
import { storeProducts } from "@/lib/store-data";

const BASE = "https://fortecaestate.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${BASE}/properties`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE}/blog`, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/services`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/services/vacation-rentals`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/services/property-management`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/services/home-staging`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/store`, changeFrequency: "weekly" as const, priority: 0.4 },
    { url: `${BASE}/testimonials`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${BASE}/privacy-policy`, changeFrequency: "yearly" as const, priority: 0.1 },
    { url: `${BASE}/terms`, changeFrequency: "yearly" as const, priority: 0.1 },
  ];

  // Property pages
  let propertySlugs: string[] = [];
  try {
    propertySlugs = await getPropertySlugs();
  } catch {
    // Supabase unavailable
  }
  const propertyPages = propertySlugs.map((slug) => ({
    url: `${BASE}/properties/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, published_at")
      .eq("status", "published");
    if (data) {
      blogPages = data.map((post: { slug: string; published_at: string | null }) => ({
        url: `${BASE}/blog/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at) : undefined,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    // Supabase unavailable
  }

  // Store products
  const storePages = storeProducts.map((p) => ({
    url: `${BASE}/store/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticPages, ...propertyPages, ...blogPages, ...storePages];
}
