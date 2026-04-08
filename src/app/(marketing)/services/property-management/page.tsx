import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Camera,
  Headphones,
  Wrench,
  TrendingUp,
  CalendarDays,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Property Management",
  description:
    "Full-service vacation rental management. Listings, guests, cleaning, maintenance — we handle everything.",
};

const features = [
  {
    icon: BarChart3,
    title: "Dynamic Pricing",
    description:
      "We optimize nightly rates based on demand, seasonality, and local events to maximize your revenue year-round.",
  },
  {
    icon: Camera,
    title: "Professional Listings",
    description:
      "HDR photography, compelling descriptions, and SEO-optimized listings across Airbnb, VRBO, and our direct platform.",
  },
  {
    icon: Headphones,
    title: "Guest Communication",
    description:
      "We handle all inquiries, bookings, check-ins, and reviews — 24/7 response times that earn Superhost status.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Cleaning",
    description:
      "Coordinated cleaning crews between every stay, seasonal maintenance, and emergency repairs — all handled.",
  },
  {
    icon: TrendingUp,
    title: "Owner Reporting",
    description:
      "Monthly statements with revenue breakdowns, occupancy rates, and actionable insights delivered to your inbox.",
  },
  {
    icon: CalendarDays,
    title: "Calendar Management",
    description:
      "Synchronized availability across all platforms. No double-bookings, no gaps, no manual work required.",
  },
];

const process = [
  {
    step: "01",
    title: "Consultation",
    description:
      "We visit your property, assess its potential, and build a custom management plan tailored to your goals.",
  },
  {
    step: "02",
    title: "Setup & Staging",
    description:
      "Professional photography, listing creation, pricing strategy, and any staging recommendations to maximize appeal.",
  },
  {
    step: "03",
    title: "Go Live",
    description:
      "Your property goes live across multiple platforms. We handle everything from the first booking onward.",
  },
  {
    step: "04",
    title: "Ongoing Management",
    description:
      "Guest support, cleaning, maintenance, pricing adjustments, reviews — you get monthly reports and collect revenue.",
  },
];

export default function PropertyManagementPage() {
  return (
    <>
      {/* Hero */}
      <section className="grain bg-forteca-navy px-4 pb-20 pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <Link
            href="/services"
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-forteca-gold/60 transition-colors hover:text-forteca-gold"
          >
            ← Services
          </Link>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            Property Management
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50">
            Own the asset, skip the headaches. We handle listings, guests,
            cleaning, maintenance, and revenue optimization — so you collect
            returns without lifting a finger.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
          >
            <Phone className="h-4 w-4" />
            Free Consultation
          </Link>
        </div>
      </section>

      {/* What we handle */}
      <section className="bg-forteca-cream px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              Everything Covered
            </p>
            <h2 className="font-serif text-3xl font-bold text-forteca-navy">
              What We Handle
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-forteca-gold/10">
                  <Icon className="h-5 w-5 text-forteca-gold" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold text-forteca-navy">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-forteca-slate">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="grain bg-forteca-navy px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              How It Works
            </p>
            <h2 className="font-serif text-3xl font-bold text-white">
              From Onboarding to Revenue
            </h2>
          </div>

          <div className="space-y-8">
            {process.map(({ step, title, description }) => (
              <div
                key={step}
                className="flex gap-6 rounded-2xl border border-white/5 bg-white/5 p-6"
              >
                <span className="font-serif text-3xl font-bold text-forteca-gold/30">
                  {step}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forteca-cream px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-forteca-navy">
            Have a vacation rental property?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-forteca-slate">
            Let&apos;s talk about what it could earn. Free property assessment,
            no obligation.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forteca-navy px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-forteca-navy-light"
          >
            Schedule a Call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
