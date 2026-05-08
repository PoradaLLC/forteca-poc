import { NextResponse, type NextRequest } from "next/server";
import { sendLeadCapi, extractFbCookies } from "@/lib/meta-capi";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const eventId = body.event_id as string | undefined;
  if (!eventId) {
    return NextResponse.json({ error: "Missing event_id" }, { status: 400 });
  }

  const { fbp, fbc } = extractFbCookies(req.headers.get("cookie"));
  const eventSourceUrl =
    req.headers.get("referer") ?? "https://www.fortecaestate.com/booking/confirmation";
  const clientIpAddress = req.headers.get("x-forwarded-for")?.split(",")[0].trim();
  const clientUserAgent = req.headers.get("user-agent") ?? undefined;

  await sendLeadCapi({
    eventId,
    email: body.email,
    eventSourceUrl,
    clientIpAddress,
    clientUserAgent,
    fbp,
    fbc,
    contentName: body.property_name ?? "Booking",
    contentCategory: "Booking Confirmation",
    value: typeof body.total_amount === "number" ? body.total_amount : undefined,
    currency: "USD",
  });

  return NextResponse.json({ ok: true });
}
