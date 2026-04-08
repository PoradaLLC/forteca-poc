"use client";

import { useTransition } from "react";
import { CheckCircle, XCircle, Sparkles, Trash2 } from "lucide-react";
import {
  approveReview,
  rejectReview,
  toggleFeaturedReview,
  updatePropertyStatus,
  deleteProperty,
} from "@/app/admin/actions";

// ─── REVIEWS ──────────────────────────────────────────────────────────────────

export function ApproveReviewButton({ reviewId }: { reviewId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => approveReview(reviewId))}
      className="rounded-lg bg-green-500/10 p-1.5 text-green-400 transition-colors hover:bg-green-500/20 disabled:opacity-50"
      title="Approve"
    >
      <CheckCircle className="h-3.5 w-3.5" />
    </button>
  );
}

export function RejectReviewButton({ reviewId }: { reviewId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm("Delete this review? This cannot be undone.")) {
          startTransition(() => rejectReview(reviewId));
        }
      }}
      className="rounded-lg bg-red-500/10 p-1.5 text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
      title="Delete"
    >
      <XCircle className="h-3.5 w-3.5" />
    </button>
  );
}

export function ToggleFeaturedButton({
  reviewId,
  isFeatured,
}: {
  reviewId: string;
  isFeatured: boolean;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(() => toggleFeaturedReview(reviewId, isFeatured))
      }
      className={`rounded-lg p-1.5 transition-colors disabled:opacity-50 ${
        isFeatured
          ? "bg-forteca-gold/20 text-forteca-gold hover:bg-forteca-gold/30"
          : "bg-white/5 text-white/20 hover:bg-white/10 hover:text-white/40"
      }`}
      title={isFeatured ? "Remove from featured" : "Mark as featured"}
    >
      <Sparkles className="h-3.5 w-3.5" />
    </button>
  );
}

// ─── PROPERTIES ───────────────────────────────────────────────────────────────

export function PropertyStatusSelect({
  propertyId,
  currentStatus,
}: {
  propertyId: string;
  currentStatus: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      disabled={pending}
      defaultValue={currentStatus}
      onChange={(e) =>
        startTransition(() => updatePropertyStatus(propertyId, e.target.value))
      }
      className="rounded-full border-0 bg-white/5 px-2.5 py-1 text-xs font-semibold capitalize text-white/60 focus:outline-none focus:ring-1 focus:ring-forteca-gold/50 disabled:opacity-50"
    >
      {["active", "inactive", "maintenance"].map((s) => (
        <option key={s} value={s} className="bg-forteca-navy text-white">
          {s}
        </option>
      ))}
    </select>
  );
}

export function DeletePropertyButton({
  propertyId,
  propertyName,
}: {
  propertyId: string;
  propertyName: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (
          confirm(
            `Delete "${propertyName}"? This will also remove all associated bookings, reviews, and availability data. This cannot be undone.`
          )
        ) {
          startTransition(() => deleteProperty(propertyId));
        }
      }}
      className="rounded-lg bg-red-500/10 p-1.5 text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
      title="Delete property"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  );
}

