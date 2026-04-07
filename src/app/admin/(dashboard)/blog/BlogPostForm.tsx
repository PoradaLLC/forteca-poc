"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createBlogPost, updateBlogPost } from "@/app/admin/actions";

interface BlogPostFormProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    status: string;
  };
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const isEdit = !!post;

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (isEdit) {
        await updateBlogPost(post.id, formData);
      } else {
        await createBlogPost(formData);
      }
      router.push("/admin/blog");
    });
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <h1 className="font-serif text-2xl font-bold text-white">
          {isEdit ? "Edit Post" : "New Post"}
        </h1>
      </div>

      <form action={handleSubmit} className="mx-auto max-w-3xl space-y-6">
        {/* Title */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">
            Title <span className="text-forteca-gold">*</span>
          </label>
          <input
            name="title"
            type="text"
            required
            defaultValue={post?.title ?? ""}
            placeholder="Your post title"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">
            Slug
          </label>
          <input
            name="slug"
            type="text"
            defaultValue={post?.slug ?? ""}
            placeholder="auto-generated-from-title"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20 font-mono"
          />
          <p className="mt-1 text-xs text-white/20">
            Leave blank to auto-generate from title
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            rows={2}
            defaultValue={post?.excerpt ?? ""}
            placeholder="A short summary shown on the blog index..."
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20"
          />
        </div>

        {/* Content */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">
            Content <span className="text-forteca-gold">*</span>
          </label>
          <textarea
            name="content"
            rows={20}
            required
            defaultValue={post?.content ?? ""}
            placeholder="Write your post content here...

Use **bold** for emphasis and separate paragraphs with blank lines."
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white placeholder-white/30 outline-none transition-all focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20 font-mono"
          />
          <p className="mt-1 text-xs text-white/20">
            Supports **bold** and paragraph breaks
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 border-t border-white/5 pt-6">
          <button
            type="submit"
            name="status"
            value="draft"
            disabled={pending}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {pending ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="submit"
            name="status"
            value="published"
            disabled={pending}
            className="flex items-center gap-2 rounded-xl bg-forteca-gold px-5 py-3 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light disabled:opacity-50"
          >
            <Eye className="h-4 w-4" />
            {pending ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
