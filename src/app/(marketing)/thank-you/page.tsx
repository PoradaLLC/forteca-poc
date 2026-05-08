import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import PixelLead from "@/components/pixel/PixelLead";

export const metadata: Metadata = {
  title: "Thank You | Forteca Estate",
  description: "Thanks for reaching out — we'll be in touch within 24 hours.",
};

const steps = [
  "We review your message and match you with the right team member.",
  "You'll hear from us within 24 hours via email or phone.",
  "If you booked a call, check your email for a calendar confirmation.",
];

export default function ThankYouPage() {
  return (
    <>
      <PixelLead />
      {/* Header */}
      <section className="grain bg-forteca-navy px-4 pb-16 pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            Message Received
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            Thank you for reaching out.
          </h1>
          <p className="mt-4 text-base text-white/50">
            We&apos;ll be in touch within 24 hours.
          </p>
        </div>
      </section>

      <div className="gold-rule" />

      {/* Content */}
      <section className="bg-forteca-cream px-4 py-20">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-forteca-navy/5">
            {/* Icon */}
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-forteca-gold/10">
              <Check className="h-8 w-8 text-forteca-gold" strokeWidth={2.5} />
            </div>

            <h2 className="mb-6 text-center font-serif text-2xl font-bold text-forteca-navy">
              What happens next?
            </h2>

            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-forteca-gold/10 text-xs font-bold text-forteca-gold">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-forteca-slate">
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-forteca-gold px-7 py-3 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
              >
                Browse Properties
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-forteca-navy/20 px-7 py-3 text-sm font-semibold text-forteca-navy transition-colors hover:border-forteca-navy/40 hover:text-forteca-navy"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
