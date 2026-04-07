"use client";

import { useTransition } from "react";
import { CheckCircle, XCircle, Sparkles, Trash2 } from "lucide-react";
import {
  approveReview,
  rejectReview,
  toggleFeaturedReview,
  updateBookingStatus,
  updatePropertyStatus,
  deleteProperty,
  triggerIcalSync,
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

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────

export function BookingStatusSelect({
  bookingId,
  currentStatus,
}: {
  bookingId: string;
  currentStatus: string;
}) {
  const [pending, startTransition] = useTransition();

  const statusStyles: Record<string, string> = {
    confirmed: "bg-green-500/10 text-green-400",
    pending: "bg-yellow-500/10 text-yellow-400",
    cancelled: "bg-red-500/10 text-red-400",
    completed: "bg-blue-500/10 text-blue-400",
  };

  return (
    <select
      disabled={pending}
      defaultValue={currentStatus}
      onChange={(e) =>
        startTransition(() => updateBookingStatus(bookingId, e.target.value))
      }
      className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold capitalize focus:outline-none focus:ring-1 focus:ring-forteca-gold/50 disabled:opacity-50 ${
        statusStyles[currentStatus] ?? "bg-white/10 text-white/40"
      }`}
    >
      {["pending", "confirmed", "cancelled", "completed"].map((s) => (
        <option key={s} value={s} className="bg-forteca-navy text-white">
          {s}
        </option>
      ))}
    </select>
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

// ─── ICAL SYNC ────────────────────────────────────────────────────────────────

export function SyncNowButton({ syncId }: { syncId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => triggerIcalSync(syncId))}
      className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
      title="Sync now"
    >
      {pending ? (
        <span className="block h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
        </svg>
      )}
    </button>
  );
}
