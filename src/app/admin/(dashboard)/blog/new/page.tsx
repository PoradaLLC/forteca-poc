import type { Metadata } from "next";
import { BlogPostForm } from "../BlogPostForm";

export const metadata: Metadata = { title: "New Post" };

export default function NewBlogPostPage() {
  return <BlogPostForm />;
}
