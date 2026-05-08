import { NextResponse, type NextRequest } from "next/server";
import { ContactSchema } from "@/lib/validators";
import { sendContactNotification } from "@/lib/email";
import { createServiceClient } from "@/lib/supabase/server";
import { sendLeadCapi, extractFbCookies } from "@/lib/meta-capi";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const eventId = body.event_id as string | undefined;

  const result = ContactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid request", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const data = result.data;

  // Save to Supabase if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SECRET_KEY;
  if (supabaseUrl && serviceKey) {
    const supabase = await createServiceClient();
    await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      subject: data.subject,
      message: data.message,
    });
  }

  // Send email notification
  await sendContactNotification(data);

  // Fire CAPI Lead event if browser pixel sent an event_id
  if (eventId) {
    const { fbp, fbc } = extractFbCookies(req.headers.get("cookie"));
    const eventSourceUrl = req.headers.get("referer") ?? "https://www.fortecaestate.com/contact";
    const clientIpAddress = req.headers.get("x-forwarded-for")?.split(",")[0].trim();
    const clientUserAgent = req.headers.get("user-agent") ?? undefined;

    await sendLeadCapi({
      eventId,
      email: data.email,
      phone: data.phone,
      eventSourceUrl,
      clientIpAddress,
      clientUserAgent,
      fbp,
      fbc,
      contentName: "Contact Form",
      contentCategory: data.subject,
    });
  }

  return NextResponse.json({ success: true });
}
