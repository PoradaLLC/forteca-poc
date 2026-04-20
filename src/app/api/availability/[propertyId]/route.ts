import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ propertyId: string }> }
) {
  const { propertyId } = await params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SECRET_KEY;

  // Return empty array (all available) if Supabase not configured
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ blockedDates: [] });
  }

  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from("availability")
    .select("date, status")
    .eq("property_id", propertyId)
    .in("status", ["booked", "blocked", "maintenance"]);

  if (error) {
    console.error("[availability] Supabase error:", error.message);
    return NextResponse.json({ blockedDates: [] });
  }

  const blockedDates = (data ?? []).map((row: { date: string }) => row.date);
  return NextResponse.json({ blockedDates });
}
