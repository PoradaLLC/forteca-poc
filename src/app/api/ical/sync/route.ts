import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { parseICS, expandDateRange } from "@/lib/ical";

// Called by Vercel Cron every 15 minutes
export async function POST(req: NextRequest) {
  // Verify cron secret to prevent unauthorized triggers
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ skipped: "Supabase not configured" });
  }

  const supabase = await createServiceClient();

  // Fetch all active iCal sync configs
  const { data: syncs, error } = await supabase
    .from("ical_syncs")
    .select("id, property_id, platform, ical_url");

  if (error) {
    console.error("[ical/sync] fetch error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let totalBlocked = 0;
  const errors: string[] = [];

  for (const sync of syncs ?? []) {
    try {
      const res = await fetch(sync.ical_url, { next: { revalidate: 0 } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const icsContent = await res.text();
      const events = parseICS(icsContent);

      const availabilityRows: {
        property_id: string;
        date: string;
        status: string;
        source: string;
      }[] = [];

      for (const evt of events) {
        const dates = expandDateRange(evt.start, evt.end);
        for (const date of dates) {
          availabilityRows.push({
            property_id: sync.property_id,
            date,
            status: "blocked",
            source: sync.platform,
          });
        }
      }

      if (availabilityRows.length > 0) {
        await supabase
          .from("availability")
          .upsert(availabilityRows, { onConflict: "property_id,date" });
        totalBlocked += availabilityRows.length;
      }

      // Update last_synced timestamp
      await supabase
        .from("ical_syncs")
        .update({ last_synced: new Date().toISOString() })
        .eq("id", sync.id);
    } catch (err) {
      const msg = `${sync.platform}/${sync.property_id}: ${err instanceof Error ? err.message : String(err)}`;
      errors.push(msg);
      console.error("[ical/sync]", msg);
    }
  }

  return NextResponse.json({
    synced: (syncs ?? []).length,
    blockedDates: totalBlocked,
    errors,
  });
}
