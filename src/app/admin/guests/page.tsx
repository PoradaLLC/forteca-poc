import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { UserCheck, UserX } from "lucide-react";

export const metadata: Metadata = { title: "Guests" };

export default async function AdminGuestsPage() {
  const supabase = await createServiceClient();

  const { data: guests } = await supabase
    .from("guests")
    .select("id, first_name, last_name, email, phone, id_verified, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Guests</h1>
        <p className="mt-1 text-sm text-white/40">{guests?.length ?? 0} registered</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {["Name", "Email", "Phone", "Verified", "Member Since"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-white/30">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {(guests ?? []).length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-white/30">
                  No guests yet.
                </td>
              </tr>
            ) : (
              (guests ?? []).map((g: {
                id: string;
                first_name: string;
                last_name: string;
                email: string;
                phone: string | null;
                id_verified: boolean;
                created_at: string;
              }) => (
                <tr key={g.id} className="transition-colors hover:bg-white/[0.03]">
                  <td className="px-5 py-4 font-medium text-white">
                    {g.first_name} {g.last_name}
                  </td>
                  <td className="px-5 py-4 text-white/60">{g.email}</td>
                  <td className="px-5 py-4 text-white/40">{g.phone ?? "—"}</td>
                  <td className="px-5 py-4">
                    {g.id_verified ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-green-400">
                        <UserCheck className="h-3.5 w-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-white/30">
                        <UserX className="h-3.5 w-3.5" /> Unverified
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-xs text-white/30">
                    {formatDate(g.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
