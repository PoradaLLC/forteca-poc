"use client";

import { useTransition, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, ArrowLeft, Upload, X, ImageIcon, GripVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  createBlogPost,
  updateBlogPost,
  uploadBlogImage,
  deleteBlogImage,
  type BlogImage,
} from "@/app/admin/actions";

interface BlogPostFormProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    status: string;
    images: BlogImage[] | null;
  };
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<BlogImage[]>(post?.images ?? []);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!post;

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const newImages: BlogImage[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const img = await uploadBlogImage(fd);
        newImages.push(img);
      }
      setImages((prev) => [...prev, ...newImages]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleRemoveImage(index: number) {
    const img = images[index];
    if (!confirm("Remove this image? It will be deleted from storage.")) return;
    try {
      await deleteBlogImage(img.path);
      setImages((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  }

  function moveImage(from: number, to: number) {
    if (to < 0 || to >= images.length) return;
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function handleSubmit(formData: FormData) {
    formData.set("images", JSON.stringify(images));
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

        {/* Images */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">
            Photos
          </label>
          <p className="mb-3 text-xs text-forteca-gold/70">
            The first photo will be used as the blog thumbnail on the index page.
          </p>

          {/* Image previews */}
          {images.length > 0 && (
            <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.map((img, i) => (
                <div
                  key={img.path}
                  className={`group relative aspect-[16/10] overflow-hidden rounded-xl border-2 ${
                    i === 0
                      ? "border-forteca-gold/50"
                      : "border-white/10"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`Blog image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  {i === 0 && (
                    <span className="absolute left-2 top-2 rounded-full bg-forteca-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-forteca-navy">
                      Thumbnail
                    </span>
                  )}
                  {/* Controls overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    {i > 0 && (
                      <button
                        type="button"
                        onClick={() => moveImage(i, i - 1)}
                        className="rounded-lg bg-white/20 p-1.5 text-white hover:bg-white/30"
                        title="Move left"
                      >
                        <GripVertical className="h-4 w-4 rotate-90" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="rounded-lg bg-red-500/80 p-1.5 text-white hover:bg-red-500"
                      title="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {i < images.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveImage(i, i + 1)}
                        className="rounded-lg bg-white/20 p-1.5 text-white hover:bg-white/30"
                        title="Move right"
                      >
                        <GripVertical className="h-4 w-4 -rotate-90" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 px-5 py-4 text-sm text-white/50 transition-all hover:border-forteca-gold/30 hover:text-white/70 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-forteca-gold/30 border-t-forteca-gold" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                {images.length === 0 ? "Add Photos" : "Add More Photos"}
              </>
            )}
          </button>
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
