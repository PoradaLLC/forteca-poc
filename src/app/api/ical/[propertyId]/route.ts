import { type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { generateICS } from "@/lib/ical";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ propertyId: string }> }
) {
  const { propertyId } = await params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  let events: { uid: string; summary: string; start: Date; end: Date }[] = [];

  if (supabaseUrl && serviceKey) {
    const supabase = await createServiceClient();

    // Fetch confirmed bookings for this property
    const { data } = await supabase
      .from("bookings")
      .select("id, check_in, check_out")
      .eq("property_id", propertyId)
      .eq("status", "confirmed");

    events = (data ?? []).map(
      (b: { id: string; check_in: string; check_out: string }) => ({
        uid: `${b.id}@fortecaestate.com`,
        summary: "Forteca Estate — Reserved",
        start: new Date(b.check_in),
        end: new Date(b.check_out),
      })
    );
  }

  const ics = generateICS(events, "Forteca Estate Availability");

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${propertyId}.ics"`,
      "Cache-Control": "no-cache, no-store",
    },
  });
}
