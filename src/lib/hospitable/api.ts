/**
 * Public Hospitable booking-widget data endpoint.
 *
 * The DirectStays booking widget fetches each listing from
 *   GET https://api.hospitable.com/bookings/api/properties/{listingId}
 * with a literal `Authorization: Bearer null` header (no real token required —
 * this is the same call the anonymous public widget makes). It returns rich,
 * authoritative metadata that the scraped JSON-LD lacks: the full photo gallery,
 * capacity, real check-in/out times, house rules, and a clean address.
 *
 * It does NOT return amenities, description, bedroom/bathroom counts, or price —
 * those still come from the scrape (or, later, manual entry / a pricing capture).
 */

const API_BASE = "https://api.hospitable.com/bookings/api/properties";

interface HospitablePhoto {
  xx_large?: string;
  thumbnail?: string;
  caption?: string;
  order?: number;
}

interface HospitableHouseRules {
  allow_pets?: boolean | null;
  allow_smoking?: boolean | null;
  allow_events?: boolean | null;
  allow_children?: boolean | null;
  allow_infants?: boolean | null;
  additional_rules?: string | null;
}

export interface EnrichData {
  listingId: string;
  name: string | null;
  maxGuests: number | null;
  checkInTime: string | null; // "HH:MM"
  checkOutTime: string | null;
  location: string | null; // "City, ST"
  images: { src: string; alt: string }[];
  houseRules: string[];
}

/** Strip a trailing country segment: "Effort, PA, US" -> "Effort, PA". */
function normalizeAddress(addr: string | null | undefined): string | null {
  if (!addr) return null;
  return addr.replace(/,\s*(US|USA|United States)\s*$/i, "").trim() || null;
}

function normalizeTime(t: string | null | undefined): string | null {
  if (!t) return null;
  const m = String(t).match(/^(\d{1,2}):(\d{2})/);
  return m ? `${m[1].padStart(2, "0")}:${m[2]}` : null;
}

function humanizeHouseRules(hr: HospitableHouseRules | null | undefined): string[] {
  if (!hr) return [];
  const rules: string[] = [];
  if (hr.allow_pets != null) rules.push(hr.allow_pets ? "Pets allowed" : "No pets");
  if (hr.allow_smoking != null) rules.push(hr.allow_smoking ? "Smoking allowed" : "No smoking");
  if (hr.allow_events != null) rules.push(hr.allow_events ? "Events allowed" : "No events / parties");
  if (hr.allow_children != null) rules.push(hr.allow_children ? "Children welcome" : "Not suitable for children");
  if (hr.allow_infants != null) rules.push(hr.allow_infants ? "Infants welcome" : "Not suitable for infants");
  const extra = (hr.additional_rules ?? "").trim();
  if (extra) rules.push(extra);
  return rules;
}

export interface PricingData {
  listingId: string;
  fromPrice: number | null; // lowest available nightly rate in the window ("from $X")
  minNights: number | null; // smallest min-stay among available nights
  currency: string | null;
  sampledNights: number; // how many bookable nights we saw
}

interface CalendarDay {
  price?: number;
  currency?: string;
  available?: boolean;
  min_stay?: number;
}

/**
 * Derive a representative "from" nightly price from the widget's public calendar
 * endpoint. Hospitable prices are dynamic per night, so we take the lowest
 * available nightly rate over the next `days` days — the honest "from $X".
 */
export async function fetchWidgetPricing(
  listingId: string,
  days = 180
): Promise<PricingData | null> {
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const start = fmt(new Date());
  const end = fmt(new Date(Date.now() + days * 86_400_000));
  const url = `${API_BASE}/${listingId}/calendar?start_date=${start}&end_date=${end}`;
  const res = await fetch(url, {
    headers: {
      Authorization: "Bearer null",
      Origin: "https://booking.hospitable.com",
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { data?: Record<string, CalendarDay> };
  const data = json?.data ?? (json as unknown as Record<string, CalendarDay>);
  if (!data || typeof data !== "object") return null;

  const avail = Object.values(data).filter(
    (d): d is CalendarDay => !!d && d.available === true && typeof d.price === "number" && d.price > 0
  );
  if (avail.length === 0) return null;

  const prices = avail.map((d) => d.price as number);
  const minStays = avail.map((d) => d.min_stay).filter((n): n is number => typeof n === "number" && n > 0);
  return {
    listingId,
    fromPrice: Math.min(...prices),
    minNights: minStays.length ? Math.min(...minStays) : null,
    currency: avail[0].currency ?? null,
    sampledNights: avail.length,
  };
}

export async function fetchWidgetProperty(listingId: string): Promise<EnrichData | null> {
  const res = await fetch(`${API_BASE}/${listingId}`, {
    headers: {
      Authorization: "Bearer null",
      Origin: "https://booking.hospitable.com",
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { data?: Record<string, unknown> };
  const d = json?.data;
  if (!d) return null;

  const name = typeof d.name === "string" ? d.name : null;
  const photos = Array.isArray(d.photos) ? (d.photos as HospitablePhoto[]) : [];
  const images = photos
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((p) => ({
      src: String(p.xx_large || p.thumbnail || ""),
      alt: (p.caption && p.caption.trim()) || name || "",
    }))
    .filter((im) => /^https?:\/\//.test(im.src));

  const maxGuests =
    typeof d.max_guests === "number" ? d.max_guests : Number(d.max_guests) || null;

  return {
    listingId,
    name,
    maxGuests: Number.isFinite(maxGuests as number) ? (maxGuests as number) : null,
    checkInTime: normalizeTime(d.checkin_time as string),
    checkOutTime: normalizeTime(d.checkout_time as string),
    location: normalizeAddress((d.public_address as string) ?? (d.city as string)),
    images,
    houseRules: humanizeHouseRules(d.house_rules as HospitableHouseRules),
  };
}
