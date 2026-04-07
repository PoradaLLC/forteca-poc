import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { Link2, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { SyncNowButton } from "@/components/admin/AdminActions";

export const metadata: Metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const supabase = await createServiceClient();

  // Fetch iCal sync configurations
  const { data: icalSyncs } = await supabase
    .from("ical_syncs")
    .select(`
      id, platform, ical_url, export_url, last_synced, sync_interval,
      properties ( name, slug )
    `)
    .order("platform");

  const platformColors: Record<string, string> = {
    airbnb: "bg-pink-500/10 text-pink-400",
    vrbo: "bg-indigo-500/10 text-indigo-400",
    "booking.com": "bg-blue-500/10 text-blue-400",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-white/40">iCal sync & integrations</p>
      </div>

      {/* iCal Sync Section */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-white">iCal Syncs</h2>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-forteca-gold px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
          >
            <Link2 className="h-4 w-4" />
            Add Feed
          </button>
        </div>

        {(icalSyncs ?? []).length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-white/5 px-6 py-10 text-center">
            <AlertCircle className="mx-auto mb-3 h-8 w-8 text-white/20" />
            <p className="text-sm text-white/40">No iCal feeds configured.</p>
            <p className="mt-1 text-xs text-white/20">
              Add Airbnb, VRBO, or Booking.com calendar feeds to sync availability automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {(icalSyncs ?? []).map((sync: {
              id: string;
              platform: string;
              ical_url: string;
              export_url: string | null;
              last_synced: string | null;
              sync_interval: number;
              properties: { name: string; slug: string }[];
            }) => {
              const property = sync.properties?.[0] ?? null;
              return (
              <div
                key={sync.id}
                className="rounded-2xl border border-white/5 bg-white/5 p-5 transition-colors hover:border-white/10"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${platformColors[sync.platform] ?? "bg-white/10 text-white/40"}`}>
                        {sync.platform}
                      </span>
                      <span className="text-sm font-medium text-white">
                        {property?.name ?? "Unknown Property"}
                      </span>
                    </div>
                    <p className="mt-2 max-w-lg truncate text-xs text-white/30 font-mono">
                      {sync.ical_url}
                    </p>
                    {sync.export_url && (
                      <p className="mt-1 max-w-lg truncate text-xs text-white/20 font-mono">
                        Export: {sync.export_url}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <p className="text-xs text-white/40">
                        Every {sync.sync_interval} min
                      </p>
                      <p className="mt-0.5 text-xs text-white/20">
                        {sync.last_synced
                          ? `Last: ${formatDate(sync.last_synced)}`
                          : "Never synced"}
                      </p>
                    </div>
                    <SyncNowButton syncId={sync.id} />
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </section>

      {/* General Settings Section */}
      <section>
        <h2 className="mb-4 font-serif text-lg font-bold text-white">General</h2>
        <div className="space-y-4 rounded-2xl border border-white/5 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Default Check-in Time</p>
              <p className="text-xs text-white/30">Time shown to guests on confirmation</p>
            </div>
            <input
              type="time"
              defaultValue="16:00"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-forteca-gold/50 focus:outline-none"
            />
          </div>
          <div className="border-t border-white/5" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Default Check-out Time</p>
              <p className="text-xs text-white/30">Time shown to guests on confirmation</p>
            </div>
            <input
              type="time"
              defaultValue="11:00"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-forteca-gold/50 focus:outline-none"
            />
          </div>
          <div className="border-t border-white/5" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Minimum Stay</p>
              <p className="text-xs text-white/30">Default minimum nights per booking</p>
            </div>
            <input
              type="number"
              defaultValue={2}
              min={1}
              className="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-forteca-gold/50 focus:outline-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
