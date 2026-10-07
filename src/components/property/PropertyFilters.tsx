"use client";

import { useState, useMemo, useCallback } from "react";
import { MapPin, X, Search, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { PropertyCard, type PropertyCardData } from "@/components/property/PropertyCard";
import { AvailabilityCalendar } from "@/components/booking/AvailabilityCalendar";

/** Local-midnight "YYYY-MM-DD" for the availability API (avoids TZ drift). */
function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const guestOptions = [0, 2, 4, 6, 8, 10, 12, 16, 20];

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

const radiusOptions = [10, 25, 50, 100, 250];
const ITEMS_PER_PAGE = 12;

// ─── Component ───────────────────────────────────────────────────────────────

export function PropertyFilters({
  properties,
}: {
  properties: PropertyCardData[];
}) {
  const [locationQuery, setLocationQuery] = useState("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    label: string;
  } | null>(null);
  const [radius, setRadius] = useState(50);
  const [searching, setSearching] = useState(false);
  const [page, setPage] = useState(1);

  // Availability (date) search
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [showCal, setShowCal] = useState(false);
  const [guests, setGuests] = useState(0); // 0 = any
  const [availSlugs, setAvailSlugs] = useState<Set<string> | null>(null);
  const [availLoading, setAvailLoading] = useState(false);
  const [availError, setAvailError] = useState<string | null>(null);

  const searchAvailability = useCallback(async () => {
    if (!range?.from || !range?.to) return;
    const start = toDateStr(range.from);
    const end = toDateStr(range.to);
    setAvailLoading(true);
    setAvailError(null);
    try {
      const res = await fetch(`/api/availability/search?start=${start}&end=${end}`);
      const data = await res.json();
      if (!res.ok) {
        setAvailError(
          data?.error === "cache_unavailable"
            ? "Availability isn't ready yet — try again shortly."
            : "Couldn't check availability. Try again."
        );
        setAvailSlugs(null);
      } else {
        setAvailSlugs(new Set<string>(data.availableSlugs ?? []));
        setPage(1);
        setShowCal(false);
        if (typeof window.fbq === "function") window.fbq("track", "Search");
      }
    } catch {
      setAvailError("Couldn't check availability. Try again.");
    }
    setAvailLoading(false);
  }, [range]);

  const clearDates = useCallback(() => {
    setRange(undefined);
    setAvailSlugs(null);
    setAvailError(null);
    setShowCal(false);
    setPage(1);
  }, []);

  const handleSearch = useCallback(async () => {
    if (!locationQuery.trim()) return;
    setSearching(true);
    const result = await geocode(locationQuery.trim());
    if (result) {
      setUserLocation({ ...result, label: locationQuery.trim() });
      setPage(1);
      if (typeof window.fbq === "function") {
        window.fbq("track", "Search");
      }
    }
    setSearching(false);
  }, [locationQuery]);

  const clearLocation = useCallback(() => {
    setUserLocation(null);
    setLocationQuery("");
    setPage(1);
  }, []);

  // Filter + sort
  const filtered = useMemo(() => {
    let result: PropertyCardData[] = properties;

    if (guests > 0) {
      result = result.filter((p) => (p.max_guests ?? 0) >= guests);
    }

    if (availSlugs) {
      result = result.filter((p) => availSlugs.has(p.slug));
    }

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
  }, [properties, userLocation, radius, guests, availSlugs]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      {/* Filters */}
      <div className="bg-forteca-navy px-4 pb-8">
        <div className="mx-auto max-w-7xl space-y-4">
          {/* Date + guests availability search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCal((s) => !s)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors hover:border-forteca-gold/50"
              >
                <CalendarIcon className="h-4 w-4 text-white/40" />
                {range?.from && range?.to
                  ? `${range.from.toLocaleDateString(undefined, { month: "short", day: "numeric" })} – ${range.to.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`
                  : "Any dates"}
              </button>
              {showCal && (
                <div className="absolute left-0 top-full z-30 mt-2 rounded-2xl border border-black/10 bg-forteca-cream p-4 shadow-2xl">
                  <AvailabilityCalendar onRangeChange={setRange} initialRange={range} />
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={clearDates}
                      className="text-xs font-semibold text-forteca-slate hover:text-forteca-navy"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={searchAvailability}
                      disabled={!range?.from || !range?.to || availLoading}
                      className="rounded-full bg-forteca-gold px-4 py-2 text-xs font-bold uppercase tracking-widest text-forteca-navy transition-colors hover:bg-forteca-gold-light disabled:opacity-40"
                    >
                      {availLoading ? "Checking…" : "Search dates"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Guests */}
            <div className="relative">
              <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <select
                id="guests-filter"
                name="guests"
                value={guests}
                onChange={(e) => { setGuests(Number(e.target.value)); setPage(1); }}
                className="rounded-full border border-white/20 bg-transparent py-2 pl-9 pr-3 text-sm font-semibold text-white/70 outline-none transition-colors hover:border-white/40 focus:border-forteca-gold/50"
              >
                {guestOptions.map((g) => (
                  <option key={g} value={g} className="bg-forteca-navy text-white">
                    {g === 0 ? "Any guests" : `${g}+ guests`}
                  </option>
                ))}
              </select>
            </div>

            {availSlugs && range?.from && range?.to && (
              <span className="inline-flex items-center gap-2 rounded-full bg-forteca-gold/15 px-3 py-1.5 text-xs font-semibold text-forteca-gold">
                Available {range.from.toLocaleDateString(undefined, { month: "short", day: "numeric" })}–{range.to.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                <button type="button" onClick={clearDates} title="Clear dates" className="hover:text-white">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
          {availError && (
            <p className="text-xs text-red-300">{availError}</p>
          )}

          {/* Location search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                id="location-search"
                name="location"
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
                id="radius-filter"
                name="radius"
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
            {totalPages > 1 && (
              <span className="text-forteca-slate/60">
                {" "}· Page {page} of {totalPages}
              </span>
            )}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedItems.map((property) => (
              <PropertyCard
                key={property.slug}
                property={property}
                variant="grid"
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                disabled={page === 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-forteca-navy/10 text-forteca-navy transition-colors hover:bg-forteca-navy hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-forteca-navy"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    p === page
                      ? "bg-forteca-gold text-forteca-navy"
                      : "border border-forteca-navy/10 text-forteca-navy hover:bg-forteca-navy hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                disabled={page === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-forteca-navy/10 text-forteca-navy transition-colors hover:bg-forteca-navy hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-forteca-navy"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              {availSlugs ? (
                <>
                  <p className="text-forteca-slate">
                    No stays available for these dates{guests > 0 ? ` for ${guests}+ guests` : ""}
                    {userLocation ? ` within ${radius} miles of ${userLocation.label}` : ""}.
                  </p>
                  <button
                    type="button"
                    onClick={clearDates}
                    className="mt-3 text-sm font-semibold text-forteca-gold hover:underline"
                  >
                    Clear dates
                  </button>
                </>
              ) : (
                <>
                  <p className="text-forteca-slate">
                    No properties found{userLocation ? ` within ${radius} miles` : ""}.
                  </p>
                  {userLocation && (
                    <button
                      type="button"
                      onClick={() => { setRadius(250); setPage(1); }}
                      className="mt-3 text-sm font-semibold text-forteca-gold hover:underline"
                    >
                      Expand to 250 miles
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
