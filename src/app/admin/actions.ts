"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

// ─── AUTH HELPER ──────────────────────────────────────────────────────────────

async function requireAdmin() {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const role = user.app_metadata?.role ?? user.user_metadata?.role;
  if (role !== "admin") throw new Error("Forbidden");
  return user;
}

// ─── REVIEWS ──────────────────────────────────────────────────────────────────

export async function approveReview(reviewId: string) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const { error } = await supabase
    .from("reviews")
    .update({ is_approved: true })
    .eq("id", reviewId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/reviews");
}

export async function rejectReview(reviewId: string) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/reviews");
}

export async function toggleFeaturedReview(reviewId: string, isFeatured: boolean) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const { error } = await supabase
    .from("reviews")
    .update({ is_featured: !isFeatured })
    .eq("id", reviewId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/reviews");
}

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────

export async function updateBookingStatus(bookingId: string, status: string) {
  await requireAdmin();
  const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
  if (!validStatuses.includes(status)) throw new Error("Invalid status");

  const supabase = await createServiceClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", bookingId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

// ─── PROPERTIES ───────────────────────────────────────────────────────────────

export async function updatePropertyStatus(propertyId: string, status: string) {
  await requireAdmin();
  const validStatuses = ["active", "inactive", "maintenance"];
  if (!validStatuses.includes(status)) throw new Error("Invalid status");

  const supabase = await createServiceClient();
  const { error } = await supabase
    .from("properties")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", propertyId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/properties");
  revalidatePath("/admin");
}

export async function deleteProperty(propertyId: string) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", propertyId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/properties");
  revalidatePath("/admin");
}

