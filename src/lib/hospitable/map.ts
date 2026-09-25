import type { ScrapedListing } from "./scrape";

/** URL-safe slug from a display name. */
export function slugify(input: string): string {
  return (input || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

/** Normalized key for matching a listing to an existing row by name. */
export function normalizeName(input: string): string {
  return (input || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Pick a slug that does not collide with any already-used slug. Mutates `used`. */
export function uniqueSlug(base: string, used: Set<string>): string {
  const root = base || "listing";
  let slug = root;
  let i = 2;
  while (used.has(slug)) slug = `${root}-${i++}`;
  used.add(slug);
  return slug;
}

function tagline(description: string | null): string | null {
  if (!description) return null;
  const line = description.split(/\r?\n/)[0].trim();
  return line ? line.slice(0, 120) : null;
}

/**
 * Map a scraped DirectStays listing to a `properties` insert row.
 * Row is always inserted as an `inactive` draft. `base_price` is a placeholder;
 * the admin sets the real price before publishing. `images` uses the renderer's
 * `{ src, alt }` shape.
 */
export function mapScrapedToRow(
  l: ScrapedListing,
  slug: string
): Record<string, unknown> {
  return {
    slug,
    name: l.name,
    tagline: tagline(l.description),
    description: l.description,
    location: l.location,
    latitude: l.latitude,
    longitude: l.longitude,
    bedrooms: l.bedrooms == null ? 0 : Math.round(l.bedrooms),
    // bathrooms column is INT; DirectStays may report 2.5 -> round up.
    bathrooms: l.bathrooms == null ? 0 : Math.max(0, Math.ceil(l.bathrooms)),
    max_guests: l.maxGuests == null ? 1 : Math.round(l.maxGuests),
    base_price: 0, // placeholder — admin sets before publishing
    cleaning_fee: 0,
    amenities: l.amenities ?? [],
    house_rules: [],
    images: l.images.map((src) => ({ src, alt: l.name })),
    hospitable_widget_url: l.widgetUrl,
    status: "inactive" as const,
  };
}

/** Extract the numeric Hospitable listing id from a stored widget URL, if any. */
export function listingIdFromWidgetUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = String(url).match(/\/widget\/[A-Za-z0-9-]+\/(\d+)/);
  return m ? m[1] : null;
}
