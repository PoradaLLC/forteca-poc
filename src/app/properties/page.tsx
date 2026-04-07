import type { Metadata } from "next";
import { properties } from "@/lib/mock-data";
import { PropertyFilters } from "@/components/property/PropertyFilters";
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
        </div>
      </section>

      {/* Filters + Grid */}
      <PropertyFilters properties={properties} />
    </>
  );
}
