import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Label shown when a listing has no nightly price set — booking still works via the live Hospitable widget. */
export const PRICE_UNAVAILABLE_LABEL = "Check availability";

/**
 * Whether a listing has a real nightly price worth displaying.
 * Imported (scraped) listings arrive with base_price = 0; the true price lives
 * in the Hospitable booking widget, so we show a CTA instead of "$0".
 */
export function hasDisplayPrice(basePrice: number): boolean {
  return typeof basePrice === "number" && basePrice > 0;
}

/** Format a price in USD cents to a display string, e.g. 25000 → "$250" */
export function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format a date string to "Mon DD, YYYY" */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Calculate number of nights between two ISO date strings */
export function calcNights(checkIn: string, checkOut: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / msPerDay
  );
}

/** Slugify a string */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
