"use client";

import { useState } from "react";
import { PropertyCard, type PropertyCardData } from "@/components/property/PropertyCard";

const filters = [
  { label: "All", match: () => true },
  { label: "Cabin", match: (p: PropertyCardData) => /cabin/i.test(p.name) },
  {
    label: "Villa / Estate",
    match: (p: PropertyCardData) =>
      /villa|estate/i.test(p.name) || p.badge === "Estate",
  },
  {
    label: "Waterfront",
    match: (p: PropertyCardData) =>
      p.badge === "Waterfront" ||
      p.amenities.some((a) => /lake|water|kayak/i.test(a)),
  },
  {
    label: "Hot Tub",
    match: (p: PropertyCardData) => p.amenities.includes("Hot Tub"),
  },
  {
    label: "Pet Friendly",
    match: (p: PropertyCardData) =>
      p.badge === "Pet Friendly" ||
      p.amenities.some((a) => /dog|pet/i.test(a)),
  },
] as const;

export function PropertyFilters({
  properties,
}: {
  properties: PropertyCardData[];
}) {
  const [active, setActive] = useState(0);

  const filtered = properties.filter(filters[active].match);

  return (
    <>
      {/* Filter chips */}
      <div className="bg-forteca-navy px-4 pb-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {filters.map((filter, i) => (
            <button
              key={filter.label}
              type="button"
              onClick={() => setActive(i)}
              className={
                i === active
                  ? "rounded-full bg-forteca-gold px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-forteca-navy transition-colors"
                  : "rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 transition-colors hover:border-white/40 hover:text-white"
              }
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results grid */}
      <section className="bg-forteca-cream px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm text-forteca-slate">
            Showing{" "}
            <span className="font-semibold text-forteca-navy">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "property" : "properties"}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((property) => (
              <PropertyCard
                key={property.slug}
                property={property}
                variant="grid"
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-forteca-slate">
              No properties match this filter.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
