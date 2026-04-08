import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { Mail, Users, UserX, Send } from "lucide-react";
import { SubscriberActions } from "./SubscriberActions";
import { BroadcastForm } from "./BroadcastForm";

export const metadata: Metadata = { title: "Newsletter" };

export default async function AdminNewsletterPage() {
  const supabase = await createServiceClient();

  const { data: subscribers } = await supabase
    .from("subscribers")
    .select("id, email, first_name, is_active, subscribed_at")
    .order("subscribed_at", { ascending: false });

  const total = subscribers?.length ?? 0;
  const active = (subscribers ?? []).filter((s: { is_active: boolean }) => s.is_active).length;
  const inactive = total - active;

  const stats = [
    { label: "Total Subscribers", value: total, icon: Users, color: "text-blue-400" },
    { label: "Active", value: active, icon: Mail, color: "text-green-400" },
    { label: "Unsubscribed", value: inactive, icon: UserX, color: "text-red-400" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-white">Newsletter</h1>
        <p className="mt-1 text-sm text-white/40">
          Manage subscribers and send broadcast emails via Resend
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/5 bg-white/5 p-5"
          >
            <div className="mb-3">
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="mt-1 text-xs text-white/40">{label}</p>
          </div>
        ))}
      </div>

      {/* Broadcast email */}
      <div className="mb-8 rounded-2xl border border-white/5 bg-white/5 p-6">
        <div className="mb-5 flex items-center gap-3">
          <Send className="h-5 w-5 text-forteca-gold" />
          <h2 className="font-serif text-lg font-bold text-white">
            Send Broadcast Email
          </h2>
        </div>
        <BroadcastForm activeCount={active} />
      </div>

      {/* Subscribers table */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {["Email", "Name", "Status", "Subscribed", "Actions"].map((h) => (
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
            {(subscribers ?? []).length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center">
                  <Mail className="mx-auto mb-3 h-8 w-8 text-white/20" />
                  <p className="text-sm text-white/30">No subscribers yet.</p>
                </td>
              </tr>
            ) : (
              (subscribers ?? []).map(
                (sub: {
                  id: string;
                  email: string;
                  first_name: string | null;
                  is_active: boolean;
                  subscribed_at: string;
                }) => (
                  <tr
                    key={sub.id}
                    className="transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-4 font-medium text-white">
                      {sub.email}
                    </td>
                    <td className="px-5 py-4 text-white/50">
                      {sub.first_name || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          sub.is_active
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {sub.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-white/30">
                      {new Date(sub.subscribed_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <SubscriberActions
                        subscriberId={sub.id}
                        email={sub.email}
                        isActive={sub.is_active}
                      />
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
