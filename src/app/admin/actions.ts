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

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────

export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const supabase = await createServiceClient();

  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const status = (formData.get("status") as string) || "draft";

  const { error } = await supabase.from("blog_posts").insert({
    title,
    slug,
    excerpt,
    content,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function updateBlogPost(postId: string, formData: FormData) {
  await requireAdmin();
  const supabase = await createServiceClient();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const status = (formData.get("status") as string) || "draft";

  const updates: Record<string, unknown> = {
    title,
    slug,
    excerpt,
    content,
    status,
    updated_at: new Date().toISOString(),
  };

  if (status === "published") {
    // Only set published_at if not already set
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("published_at")
      .eq("id", postId)
      .single();
    if (!existing?.published_at) {
      updates.published_at = new Date().toISOString();
    }
  }

  const { error } = await supabase
    .from("blog_posts")
    .update(updates)
    .eq("id", postId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

export async function deleteBlogPost(postId: string) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", postId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function toggleBlogPostStatus(postId: string, currentStatus: string) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const newStatus = currentStatus === "published" ? "draft" : "published";
  const updates: Record<string, unknown> = { status: newStatus };
  if (newStatus === "published") {
    updates.published_at = new Date().toISOString();
  }
  const { error } = await supabase.from("blog_posts").update(updates).eq("id", postId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
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

