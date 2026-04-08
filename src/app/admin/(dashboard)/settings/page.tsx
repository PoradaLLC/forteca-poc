import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "Settings" };

export default function AdminSettingsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-white/40">Integrations & configuration</p>
      </div>

      {/* Hospitable / DirectStays */}
      <section className="mb-8">
        <h2 className="mb-4 font-serif text-lg font-bold text-white">
          Booking & Calendar Sync
        </h2>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-white">Hospitable / DirectStays</p>
              <p className="mt-1 text-sm text-white/40">
                Bookings, payments, calendar sync, and guest communication are
                managed through Hospitable. All properties are listed at{" "}
                <span className="text-forteca-gold">fortecaestate.directstays.com</span>.
              </p>
            </div>
            <a
              href="https://my.hospitable.com/user/hello?returnUrl=%2Fdashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-forteca-gold px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
            >
              <ExternalLink className="h-4 w-4" />
              Open Hospitable
            </a>
          </div>
          <div className="mt-4 space-y-2 text-sm text-white/30">
            <p>Hospitable handles:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Booking widget & payment processing</li>
              <li>Calendar sync across Airbnb, VRBO, Booking.com</li>
              <li>Automated guest messaging</li>
              <li>Availability management</li>
            </ul>
          </div>
        </div>
      </section>

      {/* General Settings */}
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
