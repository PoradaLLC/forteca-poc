import Link from "next/link";
import { ArrowRight, MapPin, Star, Shield } from "lucide-react";

const highlights = [
  {
    icon: MapPin,
    title: "Poconos PA",
    description: "13 handpicked properties in the heart of the Pocono Mountains.",
  },
  {
    icon: Star,
    title: "5-Star Experience",
    description: "Consistently top-rated on Airbnb and VRBO. Book direct and save.",
  },
  {
    icon: Shield,
    title: "Professionally Managed",
    description: "Full-service property management — pristine stays, guaranteed.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center bg-forteca-navy px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-forteca-gold">
            Pocono Mountains · Pennsylvania
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Your Perfect Mountain
            <br />
            <span className="text-forteca-gold">Getaway Awaits</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
            Premium vacation cabins and villas in the Poconos — hot tubs,
            lake views, and memories that last a lifetime.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-md bg-forteca-gold px-6 py-3 text-base font-semibold text-forteca-navy transition-opacity hover:opacity-90"
            >
              Browse Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-white/60"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-forteca-navy sm:text-3xl">
            Why Choose Forteca Estate
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forteca-navy">
                  <Icon className="h-7 w-7 text-forteca-gold" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-forteca-navy">
                  {title}
                </h3>
                <p className="text-sm text-forteca-slate">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forteca-navy px-4 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to Book Your Stay?
          </h2>
          <p className="mt-4 text-white/70">
            Browse all 13 properties and find your perfect Pocono escape.
          </p>
          <Link
            href="/properties"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-forteca-gold px-6 py-3 text-base font-semibold text-forteca-navy transition-opacity hover:opacity-90"
          >
            View All Properties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
