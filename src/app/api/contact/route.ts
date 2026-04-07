import { NextResponse, type NextRequest } from "next/server";
import { ContactSchema } from "@/lib/validators";
import { sendContactNotification } from "@/lib/email";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

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
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
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

  return NextResponse.json({ success: true });
}
