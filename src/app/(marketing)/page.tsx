import Link from "next/link";
import { ArrowRight, Star, Home, BarChart3, Key, Hammer } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { featuredProperties } from "@/lib/mock-data";

const stats = [
  { value: "13", label: "Properties" },
  { value: "500+", label: "Happy Guests" },
  { value: "4.9", label: "Avg. Rating" },
  { value: "2019", label: "Est." },
];

const services = [
  {
    icon: Home,
    title: "Vacation Rentals",
    description:
      "Handpicked cabins and villas across the Pocono Mountains. Every property is professionally managed and personally vetted.",
    href: "/services/vacation-rentals",
  },
  {
    icon: Key,
    title: "Property Management",
    description:
      "Full-service management for owners. We handle bookings, guests, maintenance, and everything between — so you don't have to.",
    href: "/services/property-management",
  },
  {
    icon: BarChart3,
    title: "Real Estate",
    description:
      "Buy or sell investment properties in the Poconos with a team who knows the market intimately from the inside.",
    href: "/services/real-estate",
  },
  {
    icon: Hammer,
    title: "Home Staging",
    description:
      "Sell faster and for more. Our staging transforms properties — whether for the market or a premium rental listing.",
    href: "/services/home-staging",
  },
];

const testimonials = [
  {
    quote:
      "We've stayed at three Forteca properties now — every one has been immaculate, thoughtfully stocked, and exactly as described. They've ruined other rentals for us.",
    author: "Sarah & Marcus T.",
    property: "Blvck Cabin I · Blve Cabin · Scenic Getaway",
    rating: 5,
  },
  {
    quote:
      "Pocono Villa was the most impressive rental I've ever seen. 14 family members, zero complaints, memories we'll talk about for decades.",
    author: "The Johnson Family",
    property: "Pocono Villa",
    rating: 5,
  },
  {
    quote:
      "Booked Rustic Heaven for a long weekend and ended up extending two extra nights. The kind of place that makes you forget what day it is.",
    author: "Monique D.",
    property: "Rustic Heaven",
    rating: 5,
  },
];

const amenityHighlights = [
  "Private Hot Tubs",
  "Lakefront Access",
  "Stone Fireplaces",
  "Game Rooms",
  "Full Kitchens",
  "Mountain Views",
  "Fire Pits",
  "Dog-Friendly",
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="grain relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-forteca-navy px-4 text-center">
        {/* Background radial glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forteca-gold/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forteca-gold/30 to-transparent" />
        </div>

        {/* Mountain silhouette */}
        <svg
          className="pointer-events-none absolute bottom-0 left-0 right-0 w-full opacity-10"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,220 L0,140 L120,80 L240,120 L360,50 L480,100 L600,30 L720,90 L840,20 L960,80 L1080,40 L1200,100 L1320,60 L1440,110 L1440,220 Z"
            fill="currentColor"
            className="text-forteca-gold"
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="animate-fade-in mb-5 inline-flex items-center gap-2 rounded-full border border-forteca-gold/30 bg-forteca-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-forteca-gold">
            <Star className="h-3 w-3 fill-forteca-gold" />
            Pocono Mountains · Pennsylvania
          </p>

          <h1 className="animate-fade-up font-serif text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Where the Mountain
            <br />
            <span className="relative">
              <span className="text-forteca-gold">Becomes Home</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0,8 Q100,2 200,8 Q300,14 400,8"
                  stroke="#c9a84c"
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity="0.5"
                />
              </svg>
            </span>
          </h1>

          <p className="animate-fade-up delay-200 mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            13 premium properties in the Pocono Mountains. Hot tubs, fireplaces,
            lake views — and a team that makes every stay effortless.
          </p>

          <div className="animate-fade-up delay-300 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all duration-200 hover:bg-forteca-gold-light hover:shadow-lg hover:shadow-forteca-gold/20"
            >
              Browse Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-white/40 hover:text-white"
            >
              Talk to Us
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/20 p-1">
            <div className="h-1.5 w-1 rounded-full bg-forteca-gold/60" />
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="border-y border-forteca-navy/10 bg-forteca-cream-dark">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-2 divide-x divide-y divide-forteca-navy/10 sm:grid-cols-4 sm:divide-y-0">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center py-6 text-center">
                <span className="font-serif text-3xl font-bold text-forteca-navy">
                  {value}
                </span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-forteca-slate">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ──────────────────────────────────────────── */}
      <section className="bg-forteca-cream px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
                Handpicked for You
              </p>
              <h2 className="font-serif text-3xl font-bold text-forteca-navy sm:text-4xl">
                Featured Properties
              </h2>
            </div>
            <Link
              href="/properties"
              className="hidden items-center gap-2 text-sm font-semibold text-forteca-navy/70 transition-colors hover:text-forteca-navy sm:flex"
            >
              View all 13
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.slug} property={property} variant="feature" />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-sm font-semibold text-forteca-navy"
            >
              View all 13 properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AMENITY HIGHLIGHTS ───────────────────────────────────────────── */}
      <div className="overflow-hidden bg-forteca-navy py-5">
        <div className="flex gap-8 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...amenityHighlights, ...amenityHighlights].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-white/40"
            >
              <span className="text-forteca-gold">✦</span>
              {item}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="grain bg-forteca-navy px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              What We Do
            </p>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Full-Service Real Estate & Rentals
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
              From weekend getaways to long-term property investment — Forteca
              Estate is your single trusted partner in the Poconos.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-2xl border border-white/5 bg-white/5 p-6 transition-all duration-300 hover:border-forteca-gold/30 hover:bg-white/[0.07]"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-forteca-gold/10 transition-colors duration-200 group-hover:bg-forteca-gold/20">
                  <Icon className="h-5 w-5 text-forteca-gold" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold text-white">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {description}
                </p>
                <p className="mt-4 flex items-center gap-1 text-xs font-semibold text-forteca-gold/70 transition-colors group-hover:text-forteca-gold">
                  Learn more <ArrowRight className="h-3 w-3" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-forteca-cream px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              Guest Stories
            </p>
            <h2 className="font-serif text-3xl font-bold text-forteca-navy sm:text-4xl">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map(({ quote, author, property, rating }) => (
              <div
                key={author}
                className="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-forteca-navy/5"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-forteca-gold text-forteca-gold"
                    />
                  ))}
                </div>
                <blockquote className="flex-1 font-serif text-base italic leading-relaxed text-forteca-navy/80">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="mt-6 border-t border-forteca-navy/5 pt-4">
                  <p className="text-sm font-bold text-forteca-navy">{author}</p>
                  <p className="text-xs text-forteca-slate">{property}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-forteca-navy px-4 py-24 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forteca-gold/5 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            Book Direct · Save More
          </p>
          <h2 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            Your perfect stay
            <br />
            is one click away.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-white/50">
            Skip the platforms. Book directly with Forteca Estate and get our
            best rates with personal service from day one.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all duration-200 hover:bg-forteca-gold-light"
            >
              Browse All Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
