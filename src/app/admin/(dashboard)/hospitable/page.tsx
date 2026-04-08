import type { Metadata } from "next";
import { ExternalLink, Calendar, MessageSquare, CreditCard, BarChart3 } from "lucide-react";

export const metadata: Metadata = { title: "Hospitable" };

const features = [
  {
    icon: Calendar,
    title: "Calendar & Availability",
    description: "Manage availability, sync calendars across Airbnb, VRBO, and Booking.com.",
  },
  {
    icon: MessageSquare,
    title: "Guest Messaging",
    description: "Automated and manual guest communication across all platforms.",
  },
  {
    icon: CreditCard,
    title: "Direct Bookings & Payments",
    description: "Accept direct bookings via DirectStays with integrated payment processing.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Revenue reports, occupancy rates, and performance metrics.",
  },
];

export default function AdminHospitablePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-white">Hospitable</h1>
        <p className="mt-1 text-sm text-white/40">
          Property management, bookings, and guest communication
        </p>
      </div>

      {/* Main CTA */}
      <div className="mb-8 rounded-2xl border border-forteca-gold/20 bg-forteca-gold/5 p-8 text-center">
        <h2 className="mb-2 font-serif text-2xl font-bold text-white">
          Manage Your Properties
        </h2>
        <p className="mx-auto mb-6 max-w-md text-sm text-white/50">
          All bookings, calendar sync, guest messaging, and payments are managed
          through Hospitable. Your DirectStays page is live at{" "}
          <span className="text-forteca-gold">fortecaestate.directstays.com</span>.
        </p>
        <a
          href="https://my.hospitable.com/user/hello?returnUrl=%2Fdashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-forteca-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
        >
          <ExternalLink className="h-4 w-4" />
          Open Hospitable Dashboard
        </a>
      </div>

      {/* Features grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/5 bg-white/5 p-6"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-forteca-gold/10">
              <Icon className="h-5 w-5 text-forteca-gold" />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-white">{title}</h3>
            <p className="text-xs text-white/40">{description}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-8 rounded-2xl border border-white/5 bg-white/5 p-6">
        <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
        <div className="space-y-2">
          {[
            { label: "Hospitable Dashboard", url: "https://my.hospitable.com/user/hello?returnUrl=%2Fdashboard" },
            { label: "DirectStays Booking Page", url: "https://fortecaestate.directstays.com" },
          ].map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              {label}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
