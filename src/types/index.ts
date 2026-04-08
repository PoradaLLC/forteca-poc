// ─── Properties ──────────────────────────────────────────────────────────────

export type PropertyStatus = "active" | "inactive" | "maintenance";

export interface Property {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  location: string | null;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  base_price: number;
  cleaning_fee: number;
  amenities: string[];
  images: { url: string; alt: string; order: number }[];
  status: PropertyStatus;
  airbnb_url: string | null;
  vrbo_url: string | null;
  min_nights: number;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export type ReviewSource = "direct" | "airbnb" | "vrbo" | "google" | "hospitable";

export interface Review {
  id: string;
  property_id: string;
  guest_name: string;
  rating: number;
  content: string | null;
  source: ReviewSource;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export type BlogPostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  images: { url: string; path: string }[];
  status: BlogPostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export interface Subscriber {
  id: string;
  email: string;
  first_name: string | null;
  is_active: boolean;
  subscribed_at: string;
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
}
