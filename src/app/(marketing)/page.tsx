import Link from "next/link";
import { ArrowRight, Star, Home, Key, Hammer, Flame } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getFeaturedProperties } from "@/lib/properties";
import { createClient } from "@/lib/supabase/server";

const stats = [
  { value: "44", label: "Properties" },
  { value: "3", label: "States" },
  { value: "1000+", label: "Happy Guests" },
  { value: "2019", label: "Est." },
];

const services = [
  {
    icon: Home,
    title: "Vacation Rentals",
    description:
      "Handpicked cabins and villas across Pennsylvania, New York, and Florida. Every property is professionally managed and personally vetted.",
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
    icon: Hammer,
    title: "Home Staging",
    description:
      "Sell faster and for more. Our staging transforms properties — whether for the market or a premium rental listing.",
    href: "/services/home-staging",
  },
  {
    icon: Flame,
    title: "Hot Tubs",
    description:
      "Custom wood-burning and electric hot tub installations. The #1 amenity that boosts bookings and guest satisfaction.",
    href: "/services",
  },
];

async function getHomepageReviews() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reviews")
      .select("guest_name, rating, content, properties ( name )")
      .eq("is_approved", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(3);
    if (data && data.length > 0) {
      return data.map((r: { guest_name: string; rating: number; content: string | null; properties: { name: string }[] }) => ({
        quote: r.content ?? "",
        author: r.guest_name,
        property: r.properties?.[0]?.name ?? "Forteca Estate",
        rating: r.rating,
      }));
    }
  } catch {
    // fallback below
  }
  return [
    { quote: "Every property has been immaculate, thoughtfully stocked, and exactly as described.", author: "Happy Guest", property: "Forteca Estate", rating: 5 },
    { quote: "The most impressive rental I've ever seen. Memories we'll talk about for decades.", author: "Returning Guest", property: "Forteca Estate", rating: 5 },
    { quote: "The kind of place that makes you forget what day it is.", author: "Weekend Traveler", property: "Forteca Estate", rating: 5 },
  ];
}

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

export default async function HomePage() {
  const [featuredProperties, testimonials] = await Promise.all([
    getFeaturedProperties(),
    getHomepageReviews(),
  ]);
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <link rel="preload" as="image" href="/images/hero-poster.jpg" fetchPriority="high" />
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative -mt-16 flex min-h-screen flex-col overflow-hidden bg-forteca-navy">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/hero-poster.jpg"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/50" />

        {/* Two-panel content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-16">
          {/* Logo / tagline */}
          <div className="mb-12 text-center">
            <h1 className="animate-fade-in font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Forteca<span className="text-forteca-gold">Estate</span>
            </h1>
            <p className="animate-fade-in delay-100 mt-3 text-sm tracking-widest text-white/50 uppercase">
              Pennsylvania · New York · Florida
            </p>
          </div>

          {/* Split panels */}
          <div className="animate-fade-up delay-200 grid w-full max-w-4xl gap-4 sm:grid-cols-2">
            {/* For Guests */}
            <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30 px-8 py-16 text-center backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-black/40">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:border-forteca-gold/50 group-hover:bg-forteca-gold/10 group-hover:scale-110">
                <Home className="h-6 w-6 text-white/70 transition-colors duration-500 group-hover:text-forteca-gold" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-3xl">
                For Guests
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
                Browse 44 premium vacation rentals. Hot tubs, lake views, fireplaces — book direct and save.
              </p>
              <Link
                href="/properties"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-forteca-gold px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-forteca-navy transition-all duration-200 hover:bg-forteca-gold-light hover:shadow-lg hover:shadow-forteca-gold/20 hover:scale-105"
              >
                Browse Getaways
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* For Owners */}
            <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30 px-8 py-16 text-center backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-black/40">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:border-forteca-gold/50 group-hover:bg-forteca-gold/10 group-hover:scale-110">
                <Key className="h-6 w-6 text-white/70 transition-colors duration-500 group-hover:text-forteca-gold" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-3xl">
                For Owners
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
                Full-service property management. We handle bookings, guests, maintenance — you collect revenue.
              </p>
              <Link
                href="/services/property-management"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white/80 transition-all duration-200 hover:border-forteca-gold hover:bg-forteca-gold/10 hover:text-white hover:scale-105"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom gold line */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forteca-gold/30 to-transparent" />
      </section>

      {/* ── VIDEO ────────────────────────────────────────────────────────── */}
      <section className="bg-forteca-navy px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-forteca-gold">
              See It For Yourself
            </p>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Experience Forteca Estate
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl ring-1 ring-forteca-gold/20 shadow-2xl shadow-black/40">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/V36dpv8-lQ8?si=-atWX7rmt4i9Hgpq"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
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
              View all
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
              View all properties
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
              Full-Service Vacation Rentals
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
              From weekend getaways to long-term property investment — Forteca
              Estate is your single trusted partner for vacation properties.
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

      {/* ── NEWSLETTER ────────────────────────────────────────────────────── */}
      <section className="border-y border-forteca-navy/10 bg-forteca-cream-dark px-4 py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            Never Miss a Deal
          </p>
          <h2 className="font-serif text-3xl font-bold text-forteca-navy">
            Join the Forteca List
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-forteca-slate">
            Exclusive rates, new property alerts, and Pocono travel tips —
            delivered to your inbox. No spam, unsubscribe anytime.
          </p>
          <div className="mt-6">
            <NewsletterForm variant="inline" />
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            Why Forteca Estate
          </p>
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-forteca-navy sm:text-4xl">
            The Premier Vacation Rental Experience<br className="hidden sm:block" /> in the Pocono Mountains
          </h2>
          <div className="grid gap-8 text-forteca-slate sm:grid-cols-2">
            <div>
              <h3 className="mb-3 font-serif text-xl font-bold text-forteca-navy">Pocono Mountain Cabins & Vacation Homes</h3>
              <p className="leading-relaxed">
                Forteca Estate manages a curated portfolio of over 44 vacation rentals across Pennsylvania,
                New York, and Florida. From private hot tub cabins in the Pocono Mountains to lakefront homes
                and luxury villas, every property is professionally maintained, fully stocked, and ready for
                your best getaway. Book directly and skip the platform fees.
              </p>
            </div>
            <div>
              <h3 className="mb-3 font-serif text-xl font-bold text-forteca-navy">Full-Service Property Management</h3>
              <p className="leading-relaxed">
                Own a vacation rental in Pennsylvania or beyond? Forteca Estate provides end-to-end
                property management — from guest communication and turnover cleaning to maintenance
                coordination and revenue optimization. Our owners earn more and worry less, backed by
                the same high standards that define every guest experience.
              </p>
            </div>
            <div>
              <h3 className="mb-3 font-serif text-xl font-bold text-forteca-navy">Direct Booking Benefits</h3>
              <p className="leading-relaxed">
                When you book directly with Forteca Estate, you get the best available rate — no
                platform service fees, no inflated cleaning charges, and direct access to our local
                team before, during, and after your stay. We handle special requests, early check-ins,
                and last-minute changes the way a real host should.
              </p>
            </div>
            <div>
              <h3 className="mb-3 font-serif text-xl font-bold text-forteca-navy">Serving the Pocono Region Since 2019</h3>
              <p className="leading-relaxed">
                Based in Stroudsburg, PA, Forteca Estate has been hosting guests and managing properties
                across the Pocono Mountains since 2019. We know these communities, these roads, and these
                seasons — and we bring that local knowledge to every stay and every property partnership
                we take on.
              </p>
            </div>
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
            Skip the platforms. Book directly with Forteca Estate for the
            best rates and personal service from day one.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all duration-200 hover:bg-forteca-gold-light"
            >
              Browse All Getaways
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
