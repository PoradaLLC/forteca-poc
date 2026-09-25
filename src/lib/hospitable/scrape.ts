/**
 * Scraper for a Hospitable Direct ("DirectStays") public site, e.g.
 * https://fortecaestate.directstays.com
 *
 * Each property detail page embeds a schema.org `VacationRental` JSON-LD block
 * plus its booking-widget URL. That is the source of truth we parse — no API
 * token required. Only public pages are fetched.
 */

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

export interface ScrapedListing {
  slug: string; // DirectStays slug (path segment)
  listingId: string | null; // numeric Hospitable listing id (from JSON-LD identifier)
  name: string;
  description: string | null;
  location: string | null; // "City, ST" if derivable
  latitude: number | null;
  longitude: number | null;
  bedrooms: number | null;
  bathrooms: number | null; // may be fractional (e.g. 2.5)
  maxGuests: number | null;
  amenities: string[];
  images: string[]; // full gallery, absolute URLs
  widgetUrl: string | null; // booking.hospitable.com/widget/<acct>/<id>
}

async function getHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
  return res.text();
}

/** Enumerate every property slug from the index page. */
export async function listSlugs(baseUrl: string): Promise<string[]> {
  const html = await getHtml(baseUrl.replace(/\/+$/, "") + "/");
  const set = new Set<string>();
  const re = /\/property\/([a-z0-9-]+)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) set.add(m[1]);
  return [...set];
}

function extractJsonLd(html: string): Record<string, unknown> | null {
  const re =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      const data = JSON.parse(m[1].trim());
      const node = Array.isArray(data) ? data[0] : data;
      if (node && typeof node === "object") return node as Record<string, unknown>;
    } catch {
      // try next block
    }
  }
  return null;
}

/** Humanize a camelCase amenity code, e.g. "hotTub" -> "Hot tub". */
function humanizeAmenity(code: string): string {
  const s = code
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function num(v: unknown): number | null {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function fetchListing(
  baseUrl: string,
  slug: string
): Promise<ScrapedListing | null> {
  const url = `${baseUrl.replace(/\/+$/, "")}/property/${slug}`;
  const html = await getHtml(url);
  const ld = extractJsonLd(html);
  if (!ld) return null;

  const contains = (ld.containsPlace as Record<string, unknown>) || {};
  const occupancy = (contains.occupancy as Record<string, unknown>) || {};
  const amenityFeature = (contains.amenityFeature as Array<Record<string, unknown>>) || [];

  const amenities = amenityFeature
    .filter((a) => a && a.value !== false && typeof a.name === "string")
    .map((a) => humanizeAmenity(String(a.name)));

  const images = Array.isArray(ld.image)
    ? (ld.image as unknown[]).map(String).filter((s) => /^https?:\/\//.test(s))
    : [];

  // booking-widget URL (scraped verbatim so it matches what Hospitable serves)
  const widgetMatch = html.match(
    /https?:\/\/booking\.hospitable\.com\/widget\/[A-Za-z0-9-]+\/\d+/
  );

  // "City, ST" from a "City, ST, United States" pattern in the page
  const locMatch = html.match(
    /([A-Z][A-Za-z .'’-]+,\s*[A-Z]{2}),\s*United States/
  );

  return {
    slug,
    listingId: ld.identifier != null ? String(ld.identifier) : null,
    name: String(ld.name || "").trim() || slug,
    description: typeof ld.description === "string" ? ld.description : null,
    location: locMatch ? locMatch[1].replace(/\s+/g, " ").trim() : null,
    latitude: num(ld.latitude),
    longitude: num(ld.longitude),
    bedrooms: num(contains.numberOfBedrooms),
    bathrooms: num(contains.numberOfBathroomsTotal),
    maxGuests: num(occupancy.value),
    amenities,
    images,
    widgetUrl: widgetMatch ? widgetMatch[0] : null,
  };
}
