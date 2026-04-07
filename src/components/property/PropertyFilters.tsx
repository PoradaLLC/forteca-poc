"use client";

import { useState, useMemo } from "react";
import { MapPin } from "lucide-react";
import { PropertyCard, type PropertyCardData } from "@/components/property/PropertyCard";

const typeFilters = [
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
    match: (p: PropertyCardData) =>
      p.amenities.some((a) => /hot tub/i.test(a)),
  },
  {
    label: "Pool",
    match: (p: PropertyCardData) =>
      p.amenities.some((a) => /pool/i.test(a)) || /pool/i.test(p.name),
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
  const [activeType, setActiveType] = useState(0);
  const [activeLocation, setActiveLocation] = useState("All");

  // Extract unique locations from properties
  const locations = useMemo(() => {
    const locs = new Set<string>();
    for (const p of properties) {
      if (p.location) locs.add(p.location);
    }
    return ["All", ...Array.from(locs).sort()];
  }, [properties]);

  const filtered = properties.filter((p) => {
    const matchesType = typeFilters[activeType].match(p);
    const matchesLocation =
      activeLocation === "All" || p.location === activeLocation;
    return matchesType && matchesLocation;
  });

  return (
    <>
      {/* Filter chips */}
      <div className="bg-forteca-navy px-4 pb-8">
        <div className="mx-auto max-w-7xl space-y-3">
          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((filter, i) => (
              <button
                key={filter.label}
                type="button"
                onClick={() => setActiveType(i)}
                className={
                  i === activeType
                    ? "rounded-full bg-forteca-gold px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-forteca-navy transition-colors"
                    : "rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 transition-colors hover:border-white/40 hover:text-white"
                }
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Location filter */}
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-white/30" />
            <select
              value={activeLocation}
              onChange={(e) => setActiveLocation(e.target.value)}
              className="rounded-full border border-white/20 bg-transparent px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 outline-none transition-colors hover:border-white/40 focus:border-forteca-gold/50"
            >
              {locations.map((loc) => (
                <option
                  key={loc}
                  value={loc}
                  className="bg-forteca-navy text-white"
                >
                  {loc}
                </option>
              ))}
            </select>
          </div>
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
              No properties match these filters.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
