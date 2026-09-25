import { createClient, createServiceClient } from "@/lib/supabase/server";
import { properties as mockProperties } from "@/lib/mock-data";
import type { MockProperty } from "@/lib/mock-data";

/**
 * When true, the public catalog also shows draft (inactive/maintenance) listings.
 * On by default for local development (`next dev`) so drafts can be reviewed on
 * localhost, and opt-in elsewhere via PREVIEW_DRAFTS=1. NEVER true in a normal
 * production deploy, so the live site keeps hiding drafts. Requires the
 * service-role client because RLS blocks the anon key from reading non-active rows.
 */
const PREVIEW_DRAFTS =
  process.env.NODE_ENV === "development" || process.env.PREVIEW_DRAFTS === "1";

export interface Property {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  base_price: number;
  cleaning_fee: number;
  min_nights: number;
  amenities: string[];
  images: { src: string; alt: string }[];
  status: string;
  airbnb_url: string | null;
  vrbo_url: string | null;
  hospitable_widget_url: string | null;
  latitude: number | null;
  longitude: number | null;
}

function dbToProperty(row: Record<string, unknown>): Property {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    tagline: (row.tagline as string) ?? "",
    description: (row.description as string) ?? "",
    location: (row.location as string) ?? "Poconos, PA",
    bedrooms: row.bedrooms as number,
    bathrooms: row.bathrooms as number,
    max_guests: row.max_guests as number,
    base_price: Number(row.base_price),
    cleaning_fee: Number(row.cleaning_fee ?? 0),
    min_nights: (row.min_nights as number) ?? 2,
    amenities: (row.amenities as string[]) ?? [],
    images: (row.images as { src: string; alt: string }[]) ?? [],
    status: (row.status as string) ?? "active",
    airbnb_url: (row.airbnb_url as string) ?? null,
    vrbo_url: (row.vrbo_url as string) ?? null,
    hospitable_widget_url: (row.hospitable_widget_url as string) ?? null,
    latitude: row.latitude ? Number(row.latitude) : null,
    longitude: row.longitude ? Number(row.longitude) : null,
  };
}

function mockToProperty(m: MockProperty): Property {
  return {
    id: m.slug,
    slug: m.slug,
    name: m.name,
    tagline: m.tagline,
    description: m.description,
    location: m.location,
    bedrooms: m.bedrooms,
    bathrooms: m.bathrooms,
    max_guests: m.max_guests,
    base_price: m.base_price,
    cleaning_fee: m.cleaning_fee,
    min_nights: m.min_nights,
    amenities: m.amenities,
    images: m.images ?? [],
    status: "active",
    airbnb_url: m.airbnb_url ?? null,
    vrbo_url: null,
    hospitable_widget_url: m.hospitable_widget_url ?? null,
    latitude: null,
    longitude: null,
  };
}

export async function getProperties(): Promise<Property[]> {
  try {
    // Local preview: read every listing (drafts included) via the service client,
    // which bypasses the "active only" RLS policy. Production uses the anon client
    // and only ever sees active rows.
    const supabase = PREVIEW_DRAFTS ? await createServiceClient() : await createClient();
    let query = supabase.from("properties").select("*").order("name");
    if (!PREVIEW_DRAFTS) query = query.eq("status", "active");
    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      return mockProperties.map(mockToProperty);
    }

    return data.map(dbToProperty);
  } catch {
    return mockProperties.map(mockToProperty);
  }
}

export async function getProperty(slug: string): Promise<Property | null> {
  try {
    // Local preview uses the service client so draft detail pages resolve too.
    const supabase = PREVIEW_DRAFTS ? await createServiceClient() : await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      const mock = mockProperties.find((p) => p.slug === slug);
      return mock ? mockToProperty(mock) : null;
    }

    return dbToProperty(data);
  } catch {
    const mock = mockProperties.find((p) => p.slug === slug);
    return mock ? mockToProperty(mock) : null;
  }
}

/**
 * Fetch a property by slug regardless of status, using the service-role client
 * (bypasses RLS). For admin draft previews ONLY — callers must verify the request
 * is an authenticated admin (see isAdmin) before exposing the result.
 */
export async function getPropertyPreview(slug: string): Promise<Property | null> {
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error || !data) return null;
    return dbToProperty(data);
  } catch {
    return null;
  }
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const all = await getProperties();
  // Return first 4 as featured
  return all.slice(0, 4);
}

export async function getPropertySlugs(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select("slug")
      .eq("status", "active");

    if (error || !data) {
      return mockProperties.map((p) => p.slug);
    }

    return data.map((row: { slug: string }) => row.slug);
  } catch {
    return mockProperties.map((p) => p.slug);
  }
}
