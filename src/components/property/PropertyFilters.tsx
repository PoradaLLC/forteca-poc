"use client";

import { useState, useMemo, useCallback } from "react";
import { MapPin, X, Search } from "lucide-react";
import { PropertyCard, type PropertyCardData } from "@/components/property/PropertyCard";

// ─── Haversine distance (miles) ──────────────────────────────────────────────

function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── Simple geocoding via Nominatim (free, no API key) ───────────────────────

async function geocode(
  query: string
): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=us`,
      { headers: { "User-Agent": "FortecaEstate/1.0" } }
    );
    const data = await res.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch {
    // Geocoding failed — ignore
  }
  return null;
}

// ─── Type filters ────────────────────────────────────────────────────────────

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

const radiusOptions = [10, 25, 50, 100, 250];

// ─── Component ───────────────────────────────────────────────────────────────

export function PropertyFilters({
  properties,
}: {
  properties: PropertyCardData[];
}) {
  const [activeType, setActiveType] = useState(0);
  const [locationQuery, setLocationQuery] = useState("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    label: string;
  } | null>(null);
  const [radius, setRadius] = useState(50);
  const [searching, setSearching] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!locationQuery.trim()) return;
    setSearching(true);
    const result = await geocode(locationQuery.trim());
    if (result) {
      setUserLocation({ ...result, label: locationQuery.trim() });
    }
    setSearching(false);
  }, [locationQuery]);

  const clearLocation = useCallback(() => {
    setUserLocation(null);
    setLocationQuery("");
  }, []);

  // Filter + sort
  const filtered = useMemo(() => {
    let result = properties.filter(typeFilters[activeType].match);

    if (userLocation) {
      result = result
        .map((p) => {
          const dist =
            p.latitude != null && p.longitude != null
              ? haversine(userLocation.lat, userLocation.lng, p.latitude, p.longitude)
              : Infinity;
          return { ...p, _distance: dist };
        })
        .filter((p) => p._distance <= radius)
        .sort((a, b) => a._distance - b._distance);
    }

    return result;
  }, [properties, activeType, userLocation, radius]);

  return (
    <>
      {/* Filters */}
      <div className="bg-forteca-navy px-4 pb-8">
        <div className="mx-auto max-w-7xl space-y-4">
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

          {/* Location search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Zip code or city (e.g. 10001, Philadelphia)"
                className="w-full rounded-full border border-white/20 bg-white/5 py-2 pl-9 pr-20 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-forteca-gold/50"
              />
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {userLocation && (
                  <button
                    type="button"
                    onClick={clearLocation}
                    className="rounded-full p-1 text-white/30 hover:text-white"
                    title="Clear location"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={searching || !locationQuery.trim()}
                  className="rounded-full bg-forteca-gold/20 px-2.5 py-1 text-xs font-semibold text-forteca-gold transition-colors hover:bg-forteca-gold/30 disabled:opacity-40"
                >
                  {searching ? "..." : <Search className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Radius selector — only show when location is set */}
            {userLocation && (
              <select
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="rounded-full border border-white/20 bg-transparent px-3 py-2 text-xs font-semibold text-white/60 outline-none transition-colors hover:border-white/40 focus:border-forteca-gold/50"
              >
                {radiusOptions.map((r) => (
                  <option
                    key={r}
                    value={r}
                    className="bg-forteca-navy text-white"
                  >
                    Within {r} miles
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Active location badge */}
          {userLocation && (
            <div className="flex items-center gap-2 text-xs text-white/40">
              <MapPin className="h-3 w-3 text-forteca-gold" />
              Showing properties within {radius} miles of{" "}
              <span className="font-semibold text-forteca-gold">
                {userLocation.label}
              </span>
            </div>
          )}
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
            {userLocation && (
              <span className="text-forteca-slate/60">
                {" "}
                near {userLocation.label}
              </span>
            )}
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
            <div className="py-12 text-center">
              <p className="text-forteca-slate">
                No properties found within {radius} miles.
              </p>
              <button
                type="button"
                onClick={() => setRadius(250)}
                className="mt-3 text-sm font-semibold text-forteca-gold hover:underline"
              >
                Expand to 250 miles
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
