import type { Metadata } from "next";
import { PropertyCard } from "@/components/property/PropertyCard";
import { properties } from "@/lib/mock-data";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse all 13 Forteca Estate vacation rentals in the Pocono Mountains — cabins, villas, and lakefront retreats.",
};

export default function PropertiesPage() {
  return (
    <>
      {/* Header */}
      <section className="grain bg-forteca-navy px-4 pb-16 pt-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-forteca-gold" />
            <p className="text-sm font-semibold uppercase tracking-widest text-forteca-gold">
              Pocono Mountains, PA
            </p>
          </div>
          <h1 className="mt-3 font-serif text-4xl font-bold text-white sm:text-5xl">
            All Properties
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/50">
            {properties.length} handpicked retreats — from cozy 3-bedroom
            cabins to a 6-bedroom estate. Every property is professionally
            managed and personally vetted.
          </p>

          {/* Filter chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "All",
              "Cabin",
              "Villa / Estate",
              "Waterfront",
              "Hot Tub",
              "Pet Friendly",
            ].map((filter, i) => (
              <button
                key={filter}
                type="button"
                className={
                  i === 0
                    ? "rounded-full bg-forteca-gold px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-forteca-navy"
                    : "rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 transition-colors hover:border-white/40 hover:text-white"
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gold rule */}
      <div className="gold-rule" />

      {/* Grid */}
      <section className="bg-forteca-cream px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm text-forteca-slate">
            Showing{" "}
            <span className="font-semibold text-forteca-navy">
              {properties.length}
            </span>{" "}
            properties
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard
                key={property.slug}
                property={property}
                variant="grid"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
