import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Plus, FileText, Eye, EyeOff } from "lucide-react";
import { BlogPostActions } from "./BlogPostActions";

export const metadata: Metadata = { title: "Blog" };

export default async function AdminBlogPage() {
  const supabase = await createServiceClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, status, published_at, created_at, updated_at")
    .order("created_at", { ascending: false });

  const published = (posts ?? []).filter((p: { status: string }) => p.status === "published").length;
  const drafts = (posts ?? []).filter((p: { status: string }) => p.status === "draft").length;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Blog</h1>
          <p className="mt-1 text-sm text-white/40">
            {posts?.length ?? 0} posts · {published} published · {drafts} drafts
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-xl bg-forteca-gold px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
        {(posts ?? []).length === 0 ? (
          <div className="px-5 py-16 text-center">
            <FileText className="mx-auto mb-3 h-8 w-8 text-white/20" />
            <p className="text-sm text-white/30">No blog posts yet.</p>
            <Link
              href="/admin/blog/new"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forteca-gold hover:underline"
            >
              <Plus className="h-3.5 w-3.5" />
              Create your first post
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Title", "Status", "Date", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-white/30"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(posts ?? []).map(
                (post: {
                  id: string;
                  slug: string;
                  title: string;
                  excerpt: string | null;
                  status: string;
                  published_at: string | null;
                  created_at: string;
                }) => (
                  <tr
                    key={post.id}
                    className="transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="font-medium text-white hover:text-forteca-gold transition-colors"
                      >
                        {post.title}
                      </Link>
                      {post.excerpt && (
                        <p className="mt-0.5 max-w-md truncate text-xs text-white/40">
                          {post.excerpt}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          post.status === "published"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {post.status === "published" ? (
                          <Eye className="h-3 w-3" />
                        ) : (
                          <EyeOff className="h-3 w-3" />
                        )}
                        {post.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-white/30">
                      {post.published_at
                        ? formatDate(post.published_at)
                        : formatDate(post.created_at)}
                    </td>
                    <td className="px-5 py-4">
                      <BlogPostActions
                        postId={post.id}
                        postTitle={post.title}
                        currentStatus={post.status}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
