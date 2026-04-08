import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  CheckCircle,
  Clock,
  ShieldCheck,
  Sparkles,
  Phone,
} from "lucide-react";
import { getFeaturedProperties } from "@/lib/properties";
import { PropertyCard } from "@/components/property/PropertyCard";

export const metadata: Metadata = {
  title: "Vacation Rentals",
  description:
    "44 premium vacation rental properties across PA, NY, and FL. Book direct with Forteca Estate for the best rates.",
};

const features = [
  {
    icon: Star,
    title: "Handpicked Properties",
    description:
      "Every property in our portfolio is personally vetted, professionally designed, and maintained to hotel standards.",
  },
  {
    icon: ShieldCheck,
    title: "Book Direct, Save More",
    description:
      "No platform fees, no middleman. Booking directly with us means lower prices and personal service from day one.",
  },
  {
    icon: Clock,
    title: "24/7 Guest Support",
    description:
      "Local team, real phone numbers. Issues get resolved in minutes, not days — because we care about every guest.",
  },
  {
    icon: Sparkles,
    title: "Hotel-Grade Cleaning",
    description:
      "Professional deep-clean between every stay. Fresh linens, stocked essentials, and a walkthrough checklist before you arrive.",
  },
];

export default async function VacationRentalsPage() {
  const featuredProperties = await getFeaturedProperties();
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
            Vacation Rentals
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50">
            44 premium cabins, villas, and lakefront retreats across Pennsylvania,
            New York, and Florida. Hot tubs, fireplaces, views — and a team
            that makes every stay effortless.
          </p>
          <Link
            href="/properties"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
          >
            Browse All Properties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Why book direct */}
      <section className="bg-forteca-cream px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              The Forteca Difference
            </p>
            <h2 className="font-serif text-3xl font-bold text-forteca-navy">
              Why Guests Choose Us
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Featured properties */}
      <section className="bg-forteca-cream-dark px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
                Featured
              </p>
              <h2 className="font-serif text-3xl font-bold text-forteca-navy">
                Popular Properties
              </h2>
            </div>
            <Link
              href="/properties"
              className="hidden items-center gap-2 text-sm font-semibold text-forteca-navy/70 transition-colors hover:text-forteca-navy sm:flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.slug} property={property} variant="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-forteca-cream px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-forteca-navy">
            Every Stay Includes
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Fresh linens & towels",
              "Fully stocked kitchen",
              "High-speed WiFi",
              "Smart TV with streaming",
              "Coffee, tea & essentials",
              "Free on-site parking",
              "Detailed check-in guide",
              "Local recommendations",
              "Responsive guest support",
              "Professional cleaning",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-forteca-navy/5"
              >
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-forteca-gold" />
                <span className="text-sm text-forteca-navy">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain bg-forteca-navy px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-white">
            Ready to book?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/50">
            Browse our properties, pick your dates, and book directly — no
            platform fees, no surprises.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
            >
              Browse Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
