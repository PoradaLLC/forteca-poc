import type { Metadata } from "next";
import { getProperties } from "@/lib/properties";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse all Forteca Estate vacation rentals — cabins, villas, and lakefront retreats across PA, NY, and FL.",
};

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <>
      {/* Header */}
      <section className="grain bg-forteca-navy px-4 pb-16 pt-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-forteca-gold" />
            <p className="text-sm font-semibold uppercase tracking-widest text-forteca-gold">
              Pennsylvania · New York · Florida
            </p>
          </div>
          <h1 className="mt-3 font-serif text-4xl font-bold text-white sm:text-5xl">
            All Getaways
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/50">
            {properties.length} handpicked vacation rentals across three states.
            Every property is professionally managed and personally vetted.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <PropertyFilters properties={properties} />
    </>
  );
}
