import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Palette,
  Camera,
  Sofa,
  Leaf,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Home Staging",
  description:
    "Professional home staging in the Pocono Mountains. Sell faster, rent higher — whether listing on the market or launching as a vacation rental.",
};

const services = [
  {
    icon: Sofa,
    title: "Full-Home Staging",
    description:
      "Complete furniture, décor, and accessory packages that transform empty or dated spaces into move-in-ready showpieces.",
  },
  {
    icon: Palette,
    title: "Partial & Refresh Staging",
    description:
      "Working with existing furniture? We supplement and restyle what you have to maximize impact without full replacement.",
  },
  {
    icon: Camera,
    title: "Listing Photography",
    description:
      "We coordinate with professional photographers so your staged home is captured at its absolute best — HDR, dusk shots, and drone when applicable.",
  },
  {
    icon: Leaf,
    title: "Seasonal Refreshes",
    description:
      "For vacation rentals, we rotate décor seasonally — winter warmth, summer brightness — keeping your listing photos fresh year-round.",
  },
];

export default function HomeStagingPage() {
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
            Home Staging
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50">
            First impressions close deals. Our staging transforms properties —
            whether for the market or a premium rental listing — into spaces that
            stop the scroll and book the showing.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
          >
            <Phone className="h-4 w-4" />
            Get a Quote
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="bg-forteca-cream px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              What We Offer
            </p>
            <h2 className="font-serif text-3xl font-bold text-forteca-navy">
              Staging Services
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {services.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-forteca-gold/10">
                  <Icon className="h-6 w-6 text-forteca-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-forteca-navy">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-forteca-slate">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="grain bg-forteca-navy px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              The Impact
            </p>
            <h2 className="font-serif text-3xl font-bold text-white">
              Why Staging Works
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { stat: "73%", label: "of buyers can better visualize a staged home as their own" },
              { stat: "25%", label: "faster sale on average for staged homes vs. unstaged" },
              { stat: "20%+", label: "higher nightly rate for professionally styled rental listings" },
            ].map(({ stat, label }) => (
              <div
                key={stat}
                className="rounded-2xl border border-white/5 bg-white/5 p-6 text-center"
              >
                <p className="font-serif text-4xl font-bold text-forteca-gold">
                  {stat}
                </p>
                <p className="mt-2 text-sm text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-forteca-cream px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-forteca-navy">
            Our Process
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Walkthrough", text: "We visit the property, assess the space, and discuss your goals — sale or rental." },
              { step: "2", title: "Design Plan", text: "A tailored staging proposal with style direction, inventory, timeline, and pricing." },
              { step: "3", title: "Install", text: "Our team handles delivery, setup, and styling — typically completed in one day." },
              { step: "4", title: "Photography", text: "Professional shoot coordinated immediately after install to capture peak presentation." },
            ].map(({ step, title, text }) => (
              <div
                key={step}
                className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-forteca-navy/5"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forteca-gold text-sm font-bold text-forteca-navy">
                  {step}
                </span>
                <div>
                  <h3 className="font-bold text-forteca-navy">{title}</h3>
                  <p className="mt-1 text-sm text-forteca-slate">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain bg-forteca-navy px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-white">
            Ready to transform your space?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/50">
            Free walkthrough and staging quote. We work with both sellers and
            rental owners across the Poconos.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
