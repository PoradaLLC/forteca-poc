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

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────

export interface BlogImage {
  url: string;
  path: string;
}

export async function uploadBlogImage(formData: FormData): Promise<BlogImage> {
  await requireAdmin();
  const supabase = await createServiceClient();
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("blog-images")
    .upload(path, file, { contentType: file.type });
  if (error) throw new Error(error.message);

  const { data: urlData } = supabase.storage
    .from("blog-images")
    .getPublicUrl(path);

  return { url: urlData.publicUrl, path };
}

export async function deleteBlogImage(path: string) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const { error } = await supabase.storage
    .from("blog-images")
    .remove([path]);
  if (error) throw new Error(error.message);
}

export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const supabase = await createServiceClient();

  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const status = (formData.get("status") as string) || "draft";
  const imagesJson = formData.get("images") as string;
  const images = imagesJson ? JSON.parse(imagesJson) : [];

  const { error } = await supabase.from("blog_posts").insert({
    title,
    slug,
    excerpt,
    content,
    status,
    images,
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
  const imagesJson = formData.get("images") as string;
  const images = imagesJson ? JSON.parse(imagesJson) : [];

  const updates: Record<string, unknown> = {
    title,
    slug,
    excerpt,
    content,
    status,
    images,
    updated_at: new Date().toISOString(),
  };

  if (status === "published") {
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

  // Delete associated images from storage
  const { data: post } = await supabase
    .from("blog_posts")
    .select("images")
    .eq("id", postId)
    .single();

  if (post?.images && Array.isArray(post.images) && post.images.length > 0) {
    const paths = (post.images as BlogImage[]).map((img) => img.path);
    await supabase.storage.from("blog-images").remove(paths);
  }

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

// ─── NEWSLETTER / SUBSCRIBERS ────────────────────────────────────────────────

export async function toggleSubscriberStatus(subscriberId: string, isActive: boolean) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const { error } = await supabase
    .from("subscribers")
    .update({ is_active: !isActive })
    .eq("id", subscriberId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/newsletter");
}

export async function deleteSubscriber(subscriberId: string) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const { error } = await supabase
    .from("subscribers")
    .delete()
    .eq("id", subscriberId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/newsletter");
}

export async function sendBroadcastEmail(formData: FormData) {
  await requireAdmin();
  const subject = formData.get("subject") as string;
  const body = formData.get("body") as string;

  if (!subject || !body) throw new Error("Subject and body are required");

  const supabase = await createServiceClient();
  const { data: subscribers } = await supabase
    .from("subscribers")
    .select("email")
    .eq("is_active", true);

  if (!subscribers || subscribers.length === 0) {
    throw new Error("No active subscribers");
  }

  const { Resend } = await import("resend");
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@fortecaestate.com";

  const htmlBody = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#0d1b2a">
      <div style="background:#0d1b2a;padding:32px;text-align:center">
        <h1 style="color:#c9a84c;margin:0;font-size:24px">Forteca Estate</h1>
      </div>
      <div style="padding:40px 32px;background:#f5f0e8">
        <h2 style="font-size:22px;margin:0 0 16px">${subject}</h2>
        <div style="color:#6b7280;line-height:1.7">${body.replace(/\n/g, "<br>")}</div>
        <div style="text-align:center;margin:32px 0">
          <a href="https://fortecaestate.com/properties"
             style="background:#c9a84c;color:#0d1b2a;padding:14px 32px;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;border-radius:8px;display:inline-block">
            Browse Properties
          </a>
        </div>
        <p style="font-size:12px;color:#9ca3af;margin:24px 0 0">
          You received this because you subscribed to the Forteca Estate newsletter.
        </p>
      </div>
      <div style="background:#0d1b2a;padding:24px;text-align:center">
        <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0">&copy; Forteca Estate</p>
      </div>
    </div>
  `;

  // Send to each subscriber
  const emails = subscribers.map((s: { email: string }) => s.email);
  const results = await Promise.allSettled(
    emails.map((email: string) =>
      resend.emails.send({
        from: `Forteca Estate <${from}>`,
        to: email,
        subject,
        html: htmlBody,
      })
    )
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  console.log(`[BROADCAST] Sent: ${sent}, Failed: ${failed}`);
  revalidatePath("/admin/newsletter");

  return { sent, failed, total: emails.length };
}

// ─── CONTACT MESSAGES ────────────────────────────────────────────────────────

export async function toggleMessageRead(messageId: string, isRead: boolean) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ is_read: !isRead })
    .eq("id", messageId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(messageId: string) {
  await requireAdmin();
  const supabase = await createServiceClient();
  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", messageId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
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

