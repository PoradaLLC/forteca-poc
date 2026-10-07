import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { listSlugs, fetchListing, type ScrapedListing } from "@/lib/hospitable/scrape";
import { fetchWidgetProperty, fetchWidgetPricing } from "@/lib/hospitable/api";
import { mapLimit } from "@/lib/async";
import {
  mapScrapedToRow,
  slugify,
  uniqueSlug,
  normalizeName,
  listingIdFromWidgetUrl,
} from "@/lib/hospitable/map";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const DEFAULT_BASE = "https://fortecaestate.directstays.com";

function unauthorized() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.HOSPITABLE_SYNC_SECRET;
  if (!secret) return false;
  if (req.headers.get("authorization") === `Bearer ${secret}`) return true;
  if (req.nextUrl.searchParams.get("secret") === secret) return true;
  return false;
}

interface ExistingRow {
  id: string;
  slug: string;
  name: string;
  status: string;
  hospitable_widget_url: string | null;
  images: { src: string; alt: string }[] | null;
}

async function handleEnrich(req: NextRequest, supabaseUrl: string, serviceKey: string) {
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  // Dry-run by default; pass ?apply=1 to write.
  const isDryRun = req.nextUrl.searchParams.get("apply") !== "1";
  const includeAll = req.nextUrl.searchParams.get("all") === "1";
  // Pricing is opt-in: ?pricing=1 also sets base_price (lowest available nightly)
  // and min_nights from the public calendar endpoint.
  const withPricing = req.nextUrl.searchParams.get("pricing") === "1";
  const slugFilter = req.nextUrl.searchParams.get("slugs");

  const { data: rows, error: readErr } = await supabase
    .from("properties")
    .select("id, slug, name, status, hospitable_widget_url, images");
  if (readErr) {
    return NextResponse.json(
      { error: "supabase_read_failed", detail: readErr.message },
      { status: 500 }
    );
  }

  let targets = (rows ?? []) as ExistingRow[];
  if (!includeAll) targets = targets.filter((r) => r.status === "inactive");
  if (slugFilter) {
    const want = new Set(slugFilter.split(",").map((s) => s.trim()).filter(Boolean));
    targets = targets.filter((r) => want.has(r.slug));
  }
  // Only rows whose widget URL carries a numeric Hospitable listing id.
  const withId = targets
    .map((r) => ({ row: r, listingId: listingIdFromWidgetUrl(r.hospitable_widget_url) }))
    .filter((t): t is { row: ExistingRow; listingId: string } => t.listingId !== null);

  const fetched = await mapLimit(withId, 6, async ({ row, listingId }) => {
    try {
      const [data, pricing] = await Promise.all([
        fetchWidgetProperty(listingId),
        withPricing ? fetchWidgetPricing(listingId) : Promise.resolve(null),
      ]);
      return { row, listingId, data, pricing };
    } catch {
      return { row, listingId, data: null, pricing: null };
    }
  });

  // Build the update patch for each row from whatever the API returned.
  const plans = fetched.map(({ row, listingId, data, pricing }) => {
    const patch: Record<string, unknown> = {};
    if (data) {
      if (data.images.length > 0) patch.images = data.images;
      if (data.maxGuests != null) patch.max_guests = data.maxGuests;
      if (data.checkInTime) patch.check_in_time = data.checkInTime;
      if (data.checkOutTime) patch.check_out_time = data.checkOutTime;
      if (data.location) patch.location = data.location;
      if (data.houseRules.length > 0) patch.house_rules = data.houseRules;
    }
    if (withPricing && pricing) {
      if (pricing.fromPrice != null) patch.base_price = pricing.fromPrice;
      if (pricing.minNights != null) patch.min_nights = pricing.minNights;
    }
    return {
      id: row.id,
      slug: row.slug,
      listing_id: listingId,
      ok: data != null,
      old_image_count: row.images?.length ?? 0,
      new_image_count: data?.images.length ?? 0,
      from_price: pricing?.fromPrice ?? null,
      min_nights: pricing?.minNights ?? null,
      priced_nights: pricing?.sampledNights ?? 0,
      fields: Object.keys(patch),
      patch,
    };
  });

  if (isDryRun) {
    return NextResponse.json({
      mode: "enrich",
      dry_run: true,
      scope: includeAll ? "all" : "inactive_only",
      targeted: withId.length,
      fetched_ok: plans.filter((p) => p.ok).length,
      fetch_failed: plans.filter((p) => !p.ok).length,
      proposed: plans.map(({ patch, ...summary }) => summary),
      sample_patch: plans.find((p) => p.fields.length > 0)?.patch ?? null,
    });
  }

  // Apply
  const updated: string[] = [];
  const errors: Array<{ slug: string; error: string }> = [];
  for (const p of plans) {
    if (!p.ok || p.fields.length === 0) continue;
    const { error } = await supabase
      .from("properties")
      .update({ ...p.patch, updated_at: new Date().toISOString() })
      .eq("id", p.id);
    if (error) errors.push({ slug: p.slug, error: error.message });
    else updated.push(p.slug);
  }
  return NextResponse.json({
    mode: "enrich",
    dry_run: false,
    scope: includeAll ? "all" : "inactive_only",
    targeted: withId.length,
    updated_count: updated.length,
    error_count: errors.length,
    updated,
    errors,
    note: "Existing rows enriched from Hospitable public widget API. Status and price untouched.",
  });
}

async function handle(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized();

  const mode = (req.nextUrl.searchParams.get("mode") || "dry-run").toLowerCase();
  const baseUrl = req.nextUrl.searchParams.get("base") || DEFAULT_BASE;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SECRET_KEY;

  const missing: string[] = [];
  if (!supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceKey) missing.push("SUPABASE_SECRET_KEY");
  if (missing.length) {
    return NextResponse.json({ error: "missing_env", missing }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl!, serviceKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // ── mode=enrich ────────────────────────────────────────────────────────────
  // Update EXISTING rows with authoritative data from Hospitable's public
  // booking-widget API (photos, capacity, check-in/out, house rules, location).
  // Does not scrape, insert, or change status. Defaults to draft (inactive) rows;
  // pass ?all=1 to also enrich active listings.
  if (mode === "enrich") {
    return handleEnrich(req, supabaseUrl!, serviceKey!);
  }

  // 1) Existing rows (never modified). Also read widget URL for id-based matching.
  const { data: existing, error: exErr } = await supabase
    .from("properties")
    .select("id, slug, name, status, hospitable_widget_url");
  if (exErr) {
    return NextResponse.json(
      { error: "supabase_read_failed", detail: exErr.message },
      { status: 500 }
    );
  }
  const existingRows = existing ?? [];
  const usedSlugs = new Set<string>(existingRows.map((r) => String(r.slug)));
  const existingByListingId = new Map<string, { slug: string; name: string }>();
  const existingByName = new Map<string, { slug: string; name: string }>();
  for (const r of existingRows) {
    const ref = { slug: String(r.slug), name: String(r.name) };
    existingByName.set(normalizeName(String(r.name)), ref);
    const lid = listingIdFromWidgetUrl(r.hospitable_widget_url as string | null);
    if (lid) existingByListingId.set(lid, ref);
  }

  // 2) Enumerate DirectStays slugs, then scrape each detail page.
  let slugs: string[];
  try {
    slugs = await listSlugs(baseUrl);
  } catch (e) {
    return NextResponse.json(
      { error: "index_fetch_failed", detail: (e as Error).message },
      { status: 502 }
    );
  }

  const scraped = (
    await mapLimit(slugs, 6, async (slug) => {
      try {
        return await fetchListing(baseUrl, slug);
      } catch {
        return null;
      }
    })
  ).filter((x): x is ScrapedListing => x !== null);

  // 3) Classify: matched (already on site) vs new.
  const matched: Array<{ slug: string; name: string; matched_slug: string; via: string }> = [];
  const fresh: ScrapedListing[] = [];
  for (const l of scraped) {
    const byId = l.listingId ? existingByListingId.get(l.listingId) : undefined;
    const byName = existingByName.get(normalizeName(l.name));
    const hit = byId || byName;
    if (hit) {
      matched.push({
        slug: l.slug,
        name: l.name,
        matched_slug: hit.slug,
        via: byId ? "listing_id" : "name",
      });
    } else {
      fresh.push(l);
    }
  }

  // Optional subset filter for apply: ?slugs=a,b OR ?ids=123,456
  const slugFilter = req.nextUrl.searchParams.get("slugs");
  const idFilter = req.nextUrl.searchParams.get("ids");
  let selected = fresh;
  if (slugFilter) {
    const want = new Set(slugFilter.split(",").map((s) => s.trim()).filter(Boolean));
    selected = fresh.filter((l) => want.has(l.slug));
  } else if (idFilter) {
    const want = new Set(idFilter.split(",").map((s) => s.trim()).filter(Boolean));
    selected = fresh.filter((l) => l.listingId && want.has(l.listingId));
  }

  if (mode === "dry-run") {
    const proposed = selected.map((l) => {
      const proposedSlug = uniqueSlug(slugify(l.name), usedSlugs);
      const row = mapScrapedToRow(l, proposedSlug);
      const images = row.images as Array<{ src: string }>;
      return {
        directstays_slug: l.slug,
        listing_id: l.listingId,
        proposed_slug: proposedSlug,
        name: l.name,
        location: l.location,
        bedrooms: row.bedrooms,
        bathrooms: row.bathrooms,
        max_guests: row.max_guests,
        image_count: images.length,
        amenities_count: (row.amenities as string[]).length,
        has_widget_url: Boolean(l.widgetUrl),
      };
    });
    return NextResponse.json({
      mode,
      base: baseUrl,
      directstays_count: scraped.length,
      existing_count: existingRows.length,
      matched_count: matched.length,
      new_count: fresh.length,
      matched,
      proposed_new: proposed,
      sample_full_row: selected[0]
        ? mapScrapedToRow(selected[0], slugify(selected[0].name))
        : null,
    });
  }

  if (mode === "apply") {
    const inserted: Array<{ slug: string; id: string; listing_id: string | null }> = [];
    const errors: Array<{ directstays_slug: string; error: string }> = [];
    for (const l of selected) {
      const slug = uniqueSlug(slugify(l.name), usedSlugs);
      const row = mapScrapedToRow(l, slug);
      const { data, error } = await supabase
        .from("properties")
        .insert(row)
        .select("id, slug")
        .single();
      if (error) {
        errors.push({ directstays_slug: l.slug, error: error.message });
        usedSlugs.delete(slug);
      } else {
        inserted.push({ slug: String(data.slug), id: String(data.id), listing_id: l.listingId });
      }
    }
    return NextResponse.json({
      mode,
      requested: selected.length,
      inserted_count: inserted.length,
      error_count: errors.length,
      inserted,
      errors,
      note: "New listings inserted as status='inactive' (hidden). Existing rows untouched.",
    });
  }

  return NextResponse.json({ error: "unknown_mode", mode }, { status: 400 });
}

export async function GET(req: NextRequest) {
  return handle(req);
}

export async function POST(req: NextRequest) {
  return handle(req);
}
