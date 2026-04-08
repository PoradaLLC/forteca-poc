// ─── Properties ──────────────────────────────────────────────────────────────

export type PropertyStatus = "active" | "inactive" | "maintenance";
export type BookingSource = "direct" | "airbnb" | "vrbo";
export type AvailabilityStatus = "available" | "booked" | "blocked" | "maintenance";

export interface PropertyImage {
  url: string;
  alt: string;
  order: number;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  location: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  base_price: number;
  cleaning_fee: number;
  amenities: string[];
  house_rules: string[];
  images: PropertyImage[];
  status: PropertyStatus;
  airbnb_url: string | null;
  vrbo_url: string | null;
  check_in_time: string;
  check_out_time: string;
  min_nights: number;
  created_at: string;
  updated_at: string;
}

// ─── Availability ─────────────────────────────────────────────────────────────

export interface Availability {
  id: string;
  property_id: string;
  date: string;
  status: AvailabilityStatus;
  price_override: number | null;
  source: BookingSource | "manual";
}

// ─── Guests ───────────────────────────────────────────────────────────────────

export interface Guest {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  address: string | null;
  id_verified: boolean;
  notes: string | null;
  created_at: string;
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  property_id: string;
  guest_id: string | null;
  check_in: string;
  check_out: string;
  num_guests: number;
  nightly_rate: number;
  cleaning_fee: number;
  service_fee: number;
  taxes: number;
  total_amount: number;
  status: BookingStatus;
  payment_intent: string | null;
  source: BookingSource;
  special_requests: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingWithDetails extends Booking {
  property: Property;
  guest: Guest | null;
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export type ReviewSource = "direct" | "airbnb" | "vrbo" | "google" | "hospitable";

export interface Review {
  id: string;
  property_id: string;
  booking_id: string | null;
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
  cover_image: string | null;
  author: string;
  tags: string[];
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
  last_name: string | null;
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
  is_read: boolean;
  created_at: string;
}

// ─── iCal Syncs ──────────────────────────────────────────────────────────────

export type ICalPlatform = "airbnb" | "vrbo" | "booking.com";

export interface ICalSync {
  id: string;
  property_id: string;
  platform: ICalPlatform;
  ical_url: string;
  export_url: string | null;
  last_synced: string | null;
  sync_interval: number;
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiError {
  error: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
