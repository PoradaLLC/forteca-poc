import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Key,
  BarChart3,
  Hammer,
  ArrowRight,
  CheckCircle,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Forteca Estate offers vacation rental management, property management, real estate, and home staging across the Pocono Mountains.",
};

const services = [
  {
    icon: Home,
    title: "Vacation Rentals",
    tagline: "Premium stays, zero hassle",
    description:
      "13 handpicked cabins and villas across the Pocono Mountains. Every property is professionally managed, personally vetted, and equipped with everything guests need for an unforgettable stay.",
    highlights: [
      "Hot tubs, fireplaces, game rooms & full kitchens",
      "Professionally cleaned between every stay",
      "24/7 guest support",
      "Book direct for the best rates",
    ],
    href: "/services/vacation-rentals",
    gradient: "from-blue-900/20 via-forteca-navy to-forteca-navy",
  },
  {
    icon: Key,
    title: "Property Management",
    tagline: "Own the asset, skip the headaches",
    description:
      "Full-service management for vacation rental owners. We handle listings, guest communication, cleaning, maintenance, and revenue optimization — so you collect returns without lifting a finger.",
    highlights: [
      "Multi-platform listing (Airbnb, VRBO, direct)",
      "Dynamic pricing optimization",
      "Professional photography & staging",
      "Monthly owner statements",
    ],
    href: "/services/property-management",
    gradient: "from-emerald-900/20 via-forteca-navy to-forteca-navy",
  },
  {
    icon: BarChart3,
    title: "Real Estate",
    tagline: "Buy and sell with local expertise",
    description:
      "The Poconos market moves fast. Our team lives, works, and invests here — giving you an insider edge whether you're buying your first cabin or building a portfolio.",
    highlights: [
      "Investment property analysis & ROI projections",
      "Off-market deal sourcing",
      "Buyer & seller representation",
      "Post-purchase rental setup available",
    ],
    href: "/services/real-estate",
    gradient: "from-amber-900/20 via-forteca-navy to-forteca-navy",
  },
  {
    icon: Hammer,
    title: "Home Staging",
    tagline: "First impressions that close deals",
    description:
      "Whether listing on the market or launching as a rental, our staging team transforms spaces. We handle furniture, décor, photography coordination, and seasonal refreshes.",
    highlights: [
      "Full-home & partial staging options",
      "Rental listing optimization",
      "Seasonal décor refreshes",
      "Photography-ready presentation",
    ],
    href: "/services/home-staging",
    gradient: "from-rose-900/20 via-forteca-navy to-forteca-navy",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="grain bg-forteca-navy px-4 pb-20 pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            What We Do
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            Full-Service Real Estate
            <br />& Vacation Rentals
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50">
            From weekend getaways to long-term property investment — Forteca
            Estate is your single trusted partner in the Pocono Mountains. Four
            services, one team, complete confidence.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-forteca-cream px-4 py-20">
        <div className="mx-auto max-w-6xl space-y-16">
          {services.map(
            ({ icon: Icon, title, tagline, description, highlights, href }, i) => (
              <div
                key={title}
                className={`flex flex-col gap-10 lg:flex-row lg:items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Visual block */}
                <div className="flex-1">
                  <div className="grain flex aspect-[4/3] items-center justify-center rounded-2xl bg-forteca-navy shadow-xl">
                    <Icon className="h-20 w-20 text-forteca-gold/30" />
                  </div>
                </div>

                {/* Text block */}
                <div className="flex-1">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
                    {tagline}
                  </p>
                  <h2 className="font-serif text-3xl font-bold text-forteca-navy">
                    {title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-forteca-slate">
                    {description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-forteca-navy"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-forteca-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={href}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-forteca-navy px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-forteca-navy-light"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="grain bg-forteca-navy px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/50">
            Schedule a free consultation. We&apos;ll help you figure out the
            right service — no pressure, no commitment.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
          >
            <Phone className="h-4 w-4" />
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
