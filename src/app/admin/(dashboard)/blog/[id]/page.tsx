import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import { BlogPostForm } from "../BlogPostForm";

export const metadata: Metadata = { title: "Edit Post" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServiceClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, content, status, images")
    .eq("id", id)
    .single();

  if (!post) notFound();

  return <BlogPostForm post={post} />;
}
