import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Star, CheckCircle, XCircle } from "lucide-react";
import {
  ApproveReviewButton,
  RejectReviewButton,
  ToggleFeaturedButton,
} from "@/components/admin/AdminActions";

export const metadata: Metadata = { title: "Reviews" };

const sourceStyles: Record<string, string> = {
  direct: "bg-blue-500/10 text-blue-400",
  airbnb: "bg-pink-500/10 text-pink-400",
  vrbo: "bg-indigo-500/10 text-indigo-400",
  google: "bg-green-500/10 text-green-400",
  hospitable: "bg-purple-500/10 text-purple-400",
};

export default async function AdminReviewsPage() {
  const supabase = await createServiceClient();

  const { data: reviews } = await supabase
    .from("reviews")
    .select(`
      id, guest_name, rating, content, source, is_featured, is_approved, created_at,
      properties ( name, slug )
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  const pending = (reviews ?? []).filter(
    (r: { is_approved: boolean }) => !r.is_approved
  ).length;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Reviews</h1>
          <p className="mt-1 text-sm text-white/40">
            {reviews?.length ?? 0} total · {pending} pending approval
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Guest", "Property", "Rating", "Review", "Source", "Featured", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-white/30">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(reviews ?? []).length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-sm text-white/30">
                    No reviews yet.
                  </td>
                </tr>
              ) : (
                (reviews ?? []).map((r: {
                  id: string;
                  guest_name: string;
                  rating: number;
                  content: string | null;
                  source: string;
                  is_featured: boolean;
                  is_approved: boolean;
                  created_at: string;
                  properties: { name: string; slug: string }[];
                }) => {
                  const property = r.properties?.[0] ?? null;
                  return (
                  <tr
                    key={r.id}
                    className={`transition-colors hover:bg-white/[0.03] ${!r.is_approved ? "bg-forteca-gold/[0.03]" : ""}`}
                  >
                    <td className="px-5 py-4 font-medium text-white">{r.guest_name}</td>
                    <td className="px-5 py-4 text-white/60">{property?.name ?? "—"}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < r.rating ? "fill-forteca-gold text-forteca-gold" : "text-white/10"}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="max-w-[250px] px-5 py-4">
                      <p className="truncate text-white/50">{r.content ?? "—"}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${sourceStyles[r.source] ?? "bg-white/10 text-white/40"}`}>
                        {r.source}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <ToggleFeaturedButton reviewId={r.id} isFeatured={r.is_featured} />
                    </td>
                    <td className="px-5 py-4">
                      {r.is_approved ? (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-green-400">
                          <CheckCircle className="h-3.5 w-3.5" /> Approved
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-yellow-400">
                          <XCircle className="h-3.5 w-3.5" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-white/30">
                      {formatDate(r.created_at)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        {!r.is_approved && (
                          <ApproveReviewButton reviewId={r.id} />
                        )}
                        <RejectReviewButton reviewId={r.id} />
                      </div>
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
