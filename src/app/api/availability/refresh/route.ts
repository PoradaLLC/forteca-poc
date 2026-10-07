import { NextResponse, type NextRequest } from "next/server";
import { getProperties } from "@/lib/properties";
import { createServiceClient } from "@/lib/supabase/server";
import { listingIdFromWidgetUrl } from "@/lib/hospitable/map";
import { fetchWidgetAvailability } from "@/lib/hospitable/api";
import { mapLimit } from "@/lib/async";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const WINDOW_DAYS = 180;
// Slow + spaced to stay under Hospitable's public rate limit (a burst of 73
// calls gets throttled). Runs hourly out-of-band, so pace over correctness.
const CONCURRENCY = 2;
const DELAY_MS = 400;

function fmt(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  const syncSecret = process.env.HOSPITABLE_SYNC_SECRET;
  const auth = req.headers.get("authorization");
  // Vercel cron: when CRON_SECRET is set, Vercel attaches it as a Bearer token.
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;
  // Vercel injects x-vercel-cron on cron invocations and strips any incoming
  // x-vercel-* headers from external requests, so this reliably marks a real
  // cron run even when CRON_SECRET isn't configured.
  if (req.headers.get("x-vercel-cron")) return true;
  // Manual trigger with the shared sync secret.
  if (syncSecret && auth === `Bearer ${syncSecret}`) return true;
  if (syncSecret && req.nextUrl.searchParams.get("secret") === syncSecret) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const startedAt = Date.now();
  const start = fmt(new Date());
  const end = fmt(new Date(Date.now() + WINDOW_DAYS * 86_400_000));

  const properties = await getProperties();
  let withId = properties
    .map((p) => ({ slug: p.slug, listingId: listingIdFromWidgetUrl(p.hospitable_widget_url) }))
    .filter((l): l is { slug: string; listingId: string } => l.listingId !== null);

  // Stale-first: skip listings refreshed within FRESH_MS unless ?force=1, so a
  // re-run cheaply tops up only the missing/stale ones (less rate-limit pressure).
  const FRESH_MS = 45 * 60_000;
  const force = req.nextUrl.searchParams.get("force") === "1";
  const supabase = await createServiceClient();
  if (!force) {
    const { data: existing } = await supabase
      .from("availability_cache")
      .select("listing_id, updated_at");
    const freshIds = new Set(
      (existing ?? [])
        .filter((r) => r.updated_at && Date.now() - new Date(r.updated_at as string).getTime() < FRESH_MS)
        .map((r) => String(r.listing_id))
    );
    withId = withId.filter((l) => !freshIds.has(l.listingId));
  }

  const rows = await mapLimit(withId, CONCURRENCY, async ({ slug, listingId }, i) => {
    if (i >= CONCURRENCY) await new Promise((r) => setTimeout(r, DELAY_MS));
    const cal = await fetchWidgetAvailability(listingId, start, end).catch(() => null);
    if (!cal) return { listingId, error: true as const };
    const availableDates = Object.entries(cal)
      .filter(([, v]) => v.available)
      .map(([date]) => date)
      .sort();
    return {
      row: {
        listing_id: listingId,
        slug,
        available_dates: availableDates,
        window_start: start,
        window_end: end,
        updated_at: new Date().toISOString(),
      },
      error: false as const,
    };
  });

  const goodRows = rows.flatMap((r) => (r.error ? [] : [r.row]));
  const errors = rows.length - goodRows.length;

  // Upsert only successful fetches — leave stale rows intact on transient errors.
  const { error } = goodRows.length
    ? await supabase.from("availability_cache").upsert(goodRows, { onConflict: "listing_id" })
    : { error: null };
  if (error) {
    return NextResponse.json(
      { error: "cache_write_failed", detail: error.message, hint: "Has migration 0006 been applied?" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    refreshed: goodRows.length,
    errors,
    window: { start, end },
    duration_ms: Date.now() - startedAt,
  });
}
