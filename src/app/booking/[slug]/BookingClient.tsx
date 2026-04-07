"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Users,
  Calendar,
  Minus,
  Plus,
  Lock,
} from "lucide-react";
import type { DateRange } from "react-day-picker";
import { AvailabilityCalendar } from "@/components/booking/AvailabilityCalendar";
import { cn, calcNights, formatPrice } from "@/lib/utils";

const guestSchema = z.object({
  guestName: z.string().min(2, "Full name required"),
  guestEmail: z.string().email("Valid email required"),
  guestPhone: z.string().optional(),
  specialRequests: z.string().optional(),
});
type GuestFormValues = z.infer<typeof guestSchema>;

interface BookingProperty {
  slug: string;
  name: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  base_price: number;
  cleaning_fee: number;
  min_nights: number;
  gradient?: string;
}

interface Props {
  property: BookingProperty;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

function toDateStr(d: Date): string {
  return d.toISOString().split("T")[0];
}

function formatDisplayDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function BookingClient({
  property,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
}: Props) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialCheckIn && initialCheckOut
      ? {
          from: new Date(initialCheckIn + "T00:00:00"),
          to: new Date(initialCheckOut + "T00:00:00"),
        }
      : undefined
  );
  const [numGuests, setNumGuests] = useState(initialGuests);
  const [step, setStep] = useState<"dates" | "info">("dates");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestFormValues>({ resolver: zodResolver(guestSchema) });

  const checkIn = dateRange?.from;
  const checkOut = dateRange?.to;
  const nights = checkIn && checkOut ? calcNights(toDateStr(checkIn), toDateStr(checkOut)) : 0;
  const nightlyTotal = property.base_price * nights;
  const serviceFee = Math.round(nightlyTotal * 0.12);
  const totalAmount = nightlyTotal + property.cleaning_fee + serviceFee;
  const validDates = !!checkIn && !!checkOut && nights >= property.min_nights;

  async function onSubmit(values: GuestFormValues) {
    if (!validDates || !checkIn || !checkOut) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertySlug: property.slug,
          checkIn: toDateStr(checkIn),
          checkOut: toDateStr(checkOut),
          numGuests,
          guestName: values.guestName,
          guestEmail: values.guestEmail,
          guestPhone: values.guestPhone,
          specialRequests: values.specialRequests,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      if (data.url) window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Header */}
      <div className="border-b border-forteca-navy/10 bg-white px-4 py-3">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/properties/${property.slug}`}
            className="inline-flex items-center gap-2 text-sm text-forteca-slate transition-colors hover:text-forteca-navy"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {property.name}
          </Link>
        </div>
      </div>

      <div className="min-h-screen bg-forteca-cream px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-8 font-serif text-3xl font-bold text-forteca-navy">
            Book Your Stay
          </h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: Steps */}
            <div className="space-y-6 lg:col-span-2">
              {/* Step 1: Dates */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-serif text-xl font-bold text-forteca-navy">
                    1. Select Dates
                  </h2>
                  {validDates && step === "info" && (
                    <button
                      type="button"
                      onClick={() => setStep("dates")}
                      className="text-xs font-semibold text-forteca-gold underline"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {step === "dates" ? (
                  <>
                    <div className="overflow-x-auto">
                      <AvailabilityCalendar
                        propertyId={property.slug}
                        minNights={property.min_nights}
                        onRangeChange={setDateRange}
                        initialRange={dateRange}
                      />
                    </div>

                    {/* Guests */}
                    <div className="mt-5 flex items-center justify-between rounded-xl border border-forteca-navy/10 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-forteca-navy">
                        <Users className="h-4 w-4 text-forteca-gold" />
                        <span className="font-medium">Guests</span>
                        <span className="text-xs text-forteca-slate">
                          (max {property.max_guests})
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setNumGuests((n) => Math.max(1, n - 1))}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-forteca-navy/20 text-forteca-navy transition-colors hover:bg-forteca-navy/5"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">
                          {numGuests}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setNumGuests((n) => Math.min(property.max_guests, n + 1))
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-forteca-navy/20 text-forteca-navy transition-colors hover:bg-forteca-navy/5"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {!validDates && nights > 0 && nights < property.min_nights && (
                      <p className="mt-3 text-sm text-red-500">
                        Minimum stay is {property.min_nights} nights for this
                        property.
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => setStep("info")}
                      disabled={!validDates}
                      className={cn(
                        "mt-5 w-full rounded-xl py-3.5 text-sm font-bold uppercase tracking-widest transition-all",
                        validDates
                          ? "bg-forteca-navy text-white hover:bg-forteca-navy-light"
                          : "cursor-not-allowed bg-forteca-navy/30 text-white/50"
                      )}
                    >
                      Continue
                    </button>
                  </>
                ) : (
                  /* Dates summary */
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <p className="text-xs text-forteca-slate">Check-in</p>
                      <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-forteca-navy">
                        <Calendar className="h-4 w-4 text-forteca-gold" />
                        {checkIn ? formatDisplayDate(checkIn) : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-forteca-slate">Check-out</p>
                      <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-forteca-navy">
                        <Calendar className="h-4 w-4 text-forteca-gold" />
                        {checkOut ? formatDisplayDate(checkOut) : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-forteca-slate">Guests</p>
                      <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-forteca-navy">
                        <Users className="h-4 w-4 text-forteca-gold" />
                        {numGuests}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Guest Info */}
              {step === "info" && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5"
                >
                  <h2 className="mb-5 font-serif text-xl font-bold text-forteca-navy">
                    2. Your Details
                  </h2>

                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forteca-slate">
                          Full Name <span className="text-forteca-gold">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Jane Smith"
                          {...register("guestName")}
                          className={cn(
                            "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all",
                            "focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20",
                            errors.guestName
                              ? "border-red-400"
                              : "border-forteca-navy/10"
                          )}
                        />
                        {errors.guestName && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.guestName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forteca-slate">
                          Email <span className="text-forteca-gold">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="jane@example.com"
                          {...register("guestEmail")}
                          className={cn(
                            "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all",
                            "focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20",
                            errors.guestEmail
                              ? "border-red-400"
                              : "border-forteca-navy/10"
                          )}
                        />
                        {errors.guestEmail && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.guestEmail.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forteca-slate">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...register("guestPhone")}
                        className="w-full rounded-xl border border-forteca-navy/10 px-4 py-3 text-sm outline-none transition-all focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forteca-slate">
                        Special Requests (optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Early check-in, accessibility needs, anniversaries…"
                        {...register("specialRequests")}
                        className="w-full resize-none rounded-xl border border-forteca-navy/10 px-4 py-3 text-sm outline-none transition-all focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className={cn(
                      "mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all",
                      submitting
                        ? "cursor-not-allowed bg-forteca-gold/60 text-forteca-navy"
                        : "bg-forteca-gold text-forteca-navy hover:bg-forteca-gold-light"
                    )}
                  >
                    <Lock className="h-4 w-4" />
                    {submitting ? "Redirecting to payment…" : `Pay ${formatPrice(totalAmount)}`}
                  </button>

                  <p className="mt-3 text-center text-xs text-forteca-slate">
                    Secure payment via Stripe · Free cancellation within 48 hrs
                  </p>
                </form>
              )}
            </div>

            {/* Right: Price summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 rounded-2xl bg-forteca-navy p-6 shadow-xl">
                {/* Property mini-card */}
                <div
                  className={cn(
                    "mb-5 h-28 rounded-xl bg-gradient-to-br",
                    property.gradient
                  )}
                />
                <p className="text-xs font-semibold uppercase tracking-widest text-forteca-gold">
                  {property.location}
                </p>
                <h3 className="mt-1 font-serif text-lg font-bold text-white">
                  {property.name}
                </h3>
                <div className="mt-2 flex gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3.5 w-3.5" /> {property.bedrooms} BR
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" /> {property.bathrooms} BA
                  </span>
                </div>

                <div className="gold-rule my-5" />

                {nights > 0 ? (
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-white/60">
                      <span>
                        {formatPrice(property.base_price)} × {nights} nights
                      </span>
                      <span>{formatPrice(nightlyTotal)}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Cleaning fee</span>
                      <span>{formatPrice(property.cleaning_fee)}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Service fee</span>
                      <span>{formatPrice(serviceFee)}</span>
                    </div>
                    <div className="gold-rule" />
                    <div className="flex justify-between font-bold text-white">
                      <span>Total</span>
                      <span>{formatPrice(totalAmount)}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-white/40">
                    Select dates to see pricing
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
