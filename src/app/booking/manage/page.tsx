"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowLeft, Calendar, Users, Home } from "lucide-react";

interface BookingResult {
  id: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  numGuests: number;
  status: string;
  totalAmount: number;
}

export default function ManageBookingPage() {
  const [email, setEmail] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setResult(null);

    // TODO: wire to /api/bookings/lookup when Supabase is connected
    await new Promise((r) => setTimeout(r, 800));
    setNotFound(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-forteca-cream px-4 py-16">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-forteca-slate transition-colors hover:text-forteca-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
          Booking Management
        </p>
        <h1 className="mb-6 font-serif text-3xl font-bold text-forteca-navy">
          Find Your Booking
        </h1>

        {!result ? (
          <form
            onSubmit={handleLookup}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5"
          >
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forteca-slate">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  required
                  className="w-full rounded-xl border border-forteca-navy/10 px-4 py-3 text-sm outline-none transition-all focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forteca-slate">
                  Confirmation ID
                </label>
                <input
                  type="text"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value.toUpperCase())}
                  placeholder="e.g. CS_LIVE_ABC123"
                  required
                  className="w-full rounded-xl border border-forteca-navy/10 px-4 py-3 font-mono text-sm outline-none transition-all focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20"
                />
              </div>
            </div>

            {notFound && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                No booking found with those details. Please check your confirmation
                email and try again.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-forteca-navy py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-forteca-navy-light disabled:opacity-60"
            >
              <Search className="h-4 w-4" />
              {loading ? "Searching…" : "Find Booking"}
            </button>
          </form>
        ) : (
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-forteca-navy">
                {result.propertyName}
              </h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${
                  result.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {result.status}
              </span>
            </div>
            <dl className="space-y-3 text-sm">
              {[
                { icon: Calendar, label: "Check-in", value: result.checkIn },
                { icon: Calendar, label: "Check-out", value: result.checkOut },
                { icon: Users, label: "Guests", value: String(result.numGuests) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-forteca-slate">
                    <Icon className="h-4 w-4 text-forteca-gold" />
                    {label}
                  </dt>
                  <dd className="font-semibold text-forteca-navy">{value}</dd>
                </div>
              ))}
              <div className="border-t border-forteca-navy/5 pt-3">
                <div className="flex items-center justify-between font-bold">
                  <dt className="text-forteca-navy">Total</dt>
                  <dd className="text-forteca-gold">${result.totalAmount}</dd>
                </div>
              </div>
            </dl>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-forteca-slate">
            Need help?{" "}
            <Link
              href="/contact"
              className="font-semibold text-forteca-navy hover:underline"
            >
              Contact us
            </Link>
          </p>
        </div>

        <Link
          href="/properties"
          className="mt-8 flex items-center justify-center gap-2 text-sm text-forteca-slate transition-colors hover:text-forteca-navy"
        >
          <Home className="h-4 w-4" />
          Browse properties
        </Link>
      </div>
    </div>
  );
}
