import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendNewsletterWelcome } from "@/lib/email";
import { z } from "zod";
import { sendLeadCapi, extractFbCookies } from "@/lib/meta-capi";

const schema = z.object({
  email: z.string().email("Valid email required"),
  firstName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const eventId = body.event_id as string | undefined;

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { email, firstName } = parsed.data;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.log("[newsletter] Subscribed (dev mode):", email);
    await sendNewsletterWelcome(email);
  } else {
    const supabase = createClient(supabaseUrl, serviceKey);

    const { error } = await supabase.from("subscribers").upsert(
      {
        email,
        first_name: firstName || null,
        is_active: true,
        subscribed_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );

    if (error) {
      console.error("[newsletter] Supabase error:", error.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    try {
      await sendNewsletterWelcome(email);
    } catch (err) {
      console.error("[newsletter] Welcome email failed:", err);
    }
  }

  // Fire CAPI Lead event if browser pixel sent an event_id
  if (eventId) {
    const { fbp, fbc } = extractFbCookies(req.headers.get("cookie"));
    const eventSourceUrl = req.headers.get("referer") ?? "https://www.fortecaestate.com";
    const clientIpAddress = req.headers.get("x-forwarded-for")?.split(",")[0].trim();
    const clientUserAgent = req.headers.get("user-agent") ?? undefined;

    await sendLeadCapi({
      eventId,
      email,
      eventSourceUrl,
      clientIpAddress,
      clientUserAgent,
      fbp,
      fbc,
      contentName: "Newsletter Signup",
    });
  }

  return NextResponse.json({ success: true });
}
