"use client";

import { useTransition } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { deleteBlogPost, toggleBlogPostStatus } from "@/app/admin/actions";

export function BlogPostActions({
  postId,
  postTitle,
  currentStatus,
}: {
  postId: string;
  postTitle: string;
  currentStatus: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(() => toggleBlogPostStatus(postId, currentStatus))
        }
        className={`rounded-lg p-1.5 transition-colors disabled:opacity-50 ${
          currentStatus === "published"
            ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
            : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
        }`}
        title={currentStatus === "published" ? "Unpublish" : "Publish"}
      >
        {currentStatus === "published" ? (
          <EyeOff className="h-3.5 w-3.5" />
        ) : (
          <Eye className="h-3.5 w-3.5" />
        )}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (confirm(`Delete "${postTitle}"? This cannot be undone.`)) {
            startTransition(() => deleteBlogPost(postId));
          }
        }}
        className="rounded-lg bg-red-500/10 p-1.5 text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
        title="Delete"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
