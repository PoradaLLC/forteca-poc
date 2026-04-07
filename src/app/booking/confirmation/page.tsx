import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Calendar, Users, ArrowRight, Home } from "lucide-react";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Booking Confirmed" };

interface Props {
  searchParams: Promise<{
    session_id?: string;
    dev?: string;
    property?: string;
    checkin?: string;
    checkout?: string;
    guests?: string;
    name?: string;
    email?: string;
    total?: string;
  }>;
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const sp = await searchParams;
  const sessionId = sp.session_id;

  let details: {
    guestName: string;
    guestEmail: string;
    propertyName: string;
    checkIn: string;
    checkOut: string;
    numGuests: number;
    totalAmount: number;
    bookingId: string;
  } | null = null;

  // Dev mode (no Stripe configured)
  if (sp.dev === "true") {
    details = {
      guestName: decodeURIComponent(sp.name ?? "Guest"),
      guestEmail: decodeURIComponent(sp.email ?? ""),
      propertyName: sp.property ?? "Your Property",
      checkIn: sp.checkin ?? "",
      checkOut: sp.checkout ?? "",
      numGuests: Number(sp.guests ?? 2),
      totalAmount: Number(sp.total ?? 0),
      bookingId: sessionId ?? "DEV-0000000",
    };
  } else if (sessionId && stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const meta = session.metadata;
      if (meta) {
        details = {
          guestName: meta.guestName,
          guestEmail: meta.guestEmail,
          propertyName: meta.propertyName,
          checkIn: meta.checkIn,
          checkOut: meta.checkOut,
          numGuests: Number(meta.numGuests),
          totalAmount: Number(meta.totalAmount),
          bookingId: sessionId,
        };
      }
    } catch {
      // session fetch failed — show generic success
    }
  }

  return (
    <div className="min-h-screen bg-forteca-cream px-4 py-16">
      <div className="mx-auto max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-forteca-navy">
          <CheckCircle className="h-10 w-10 text-forteca-gold" />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
          You&apos;re all set
        </p>
        <h1 className="font-serif text-4xl font-bold text-forteca-navy">
          Booking Confirmed!
        </h1>

        {details ? (
          <>
            <p className="mt-4 text-base text-forteca-slate">
              Hi <strong className="text-forteca-navy">{details.guestName}</strong>! A
              confirmation has been sent to{" "}
              <strong className="text-forteca-navy">{details.guestEmail}</strong>.
            </p>

            {/* Booking card */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5 text-left">
              <h2 className="mb-4 font-serif text-lg font-bold text-forteca-navy">
                {details.propertyName}
              </h2>
              <dl className="space-y-3 text-sm">
                {[
                  {
                    icon: Calendar,
                    label: "Check-in",
                    value: details.checkIn,
                  },
                  {
                    icon: Calendar,
                    label: "Check-out",
                    value: details.checkOut,
                  },
                  {
                    icon: Users,
                    label: "Guests",
                    value: String(details.numGuests),
                  },
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
                  <div className="flex items-center justify-between">
                    <dt className="font-bold text-forteca-navy">Total Paid</dt>
                    <dd className="font-bold text-forteca-gold">
                      ${details.totalAmount}
                    </dd>
                  </div>
                </div>
              </dl>
              <p className="mt-4 text-xs text-forteca-slate">
                Confirmation ID:{" "}
                <span className="font-mono text-forteca-navy">
                  {details.bookingId.slice(-12).toUpperCase()}
                </span>
              </p>
            </div>

            <p className="mt-5 text-sm text-forteca-slate">
              Check-in is at 3:00 PM. We&apos;ll send detailed arrival instructions
              a few days before your stay.
            </p>
          </>
        ) : (
          <p className="mt-4 text-base text-forteca-slate">
            Your payment was received. A confirmation email is on its way.
          </p>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-forteca-navy px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-forteca-navy-light"
          >
            <Home className="h-4 w-4" />
            Browse More Properties
          </Link>
          <Link
            href="/booking/manage"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-forteca-navy/20 px-6 py-3 text-sm font-semibold text-forteca-navy transition-colors hover:border-forteca-navy/40"
          >
            Manage Booking
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
