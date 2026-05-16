import Link from "next/link";
import { ArrowRight, Home, Key, Hammer, Flame } from "lucide-react";

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

export function ServicesSection() {
  return (
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
  );
}
