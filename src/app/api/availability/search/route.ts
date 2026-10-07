import { NextResponse, type NextRequest } from "next/server";
import { getProperties } from "@/lib/properties";
import { createServiceClient } from "@/lib/supabase/server";
import { listingIdFromWidgetUrl } from "@/lib/hospitable/map";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Local-midnight "YYYY-MM-DD" (matches the cached date keys; avoids TZ drift). */
function fmtLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Every night in [start, end) must be in the available-date set. */
function isRangeBookable(available: Set<string>, start: string, end: string): boolean {
  const cursor = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  if (!(cursor < endDate)) return false;
  while (cursor < endDate) {
    if (!available.has(fmtLocal(cursor))) return false;
    cursor.setDate(cursor.getDate() + 1);
  }
  return true;
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const start = sp.get("start") ?? "";
  const end = sp.get("end") ?? "";
  const guestsRaw = sp.get("guests");
  const guests = guestsRaw ? parseInt(guestsRaw, 10) : null;

  if (!DATE_RE.test(start) || !DATE_RE.test(end) || start >= end) {
    return NextResponse.json(
      { error: "invalid_range", detail: "start and end must be YYYY-MM-DD with end > start" },
      { status: 400 }
    );
  }

  const properties = await getProperties();

  // Read the precomputed availability cache (populated by /api/availability/refresh).
  const supabase = await createServiceClient();
  const { data: cacheRows, error } = await supabase
    .from("availability_cache")
    .select("listing_id, available_dates, updated_at");
  if (error) {
    return NextResponse.json(
      {
        error: "cache_unavailable",
        detail: error.message,
        hint: "Apply migration 0006 and run /api/availability/refresh.",
      },
      { status: 503 }
    );
  }

  const byListing = new Map<string, Set<string>>();
  let freshestUpdatedAt: string | null = null;
  for (const row of cacheRows ?? []) {
    const dates = Array.isArray(row.available_dates) ? (row.available_dates as string[]) : [];
    byListing.set(String(row.listing_id), new Set(dates));
    const u = row.updated_at as string | null;
    if (u && (!freshestUpdatedAt || u > freshestUpdatedAt)) freshestUpdatedAt = u;
  }

  let checked = 0;
  let uncached = 0;
  const availableSlugs: string[] = [];
  for (const p of properties) {
    const listingId = listingIdFromWidgetUrl(p.hospitable_widget_url);
    if (!listingId) continue;
    const set = byListing.get(listingId);
    if (!set) {
      uncached++;
      continue;
    }
    checked++;
    if (guests && guests > 0 && (p.max_guests ?? 0) < guests) continue;
    if (isRangeBookable(set, start, end)) availableSlugs.push(p.slug);
  }

  return NextResponse.json({
    start,
    end,
    guests: guests ?? null,
    availableSlugs,
    count: availableSlugs.length,
    checkedListings: checked,
    uncachedListings: uncached,
    cacheUpdatedAt: freshestUpdatedAt,
  });
}
