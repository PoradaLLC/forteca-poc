import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Valid email required"),
  firstName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { email, firstName } = parsed.data;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    // Dev fallback — just log
    console.log("[newsletter] Subscribed (dev mode):", email);
    return NextResponse.json({ success: true });
  }

  const supabase = await createServiceClient();

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

  return NextResponse.json({ success: true });
}
