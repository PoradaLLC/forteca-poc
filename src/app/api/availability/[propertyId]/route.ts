import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ propertyId: string }> }
) {
  const { propertyId } = await params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Return empty array (all available) if Supabase not configured
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ blockedDates: [] });
  }

  const supabase = await createServiceClient();

  // The param could be a slug or a UUID — resolve to UUID
  let resolvedId = propertyId;
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(propertyId);
  if (!isUuid) {
    const { data: prop } = await supabase
      .from("properties")
      .select("id")
      .eq("slug", propertyId)
      .single();
    if (!prop) {
      return NextResponse.json({ blockedDates: [] });
    }
    resolvedId = prop.id;
  }

  const { data, error } = await supabase
    .from("availability")
    .select("date, status")
    .eq("property_id", resolvedId)
    .in("status", ["booked", "blocked", "maintenance"]);

  if (error) {
    console.error("[availability] Supabase error:", error.message);
    return NextResponse.json({ blockedDates: [] });
  }

  const blockedDates = (data ?? []).map((row: { date: string }) => row.date);
  return NextResponse.json({ blockedDates });
}
