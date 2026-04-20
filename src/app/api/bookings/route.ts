import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { expandDateRange } from "@/lib/ical";
import { sendBookingConfirmation, sendAdminBookingAlert } from "@/lib/email";

interface CreateBookingPayload {
  propertyId: string;
  propertySlug: string;
  propertyName: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  numGuests: number;
  nightlyRate: number;
  cleaningFee: number;
  totalAmount: number;
  paymentIntent: string;
  specialRequests?: string;
}

export async function POST(req: NextRequest) {
  const payload: CreateBookingPayload = await req.json();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SECRET_KEY;

  const bookingId = crypto.randomUUID();

  // If Supabase is not configured, just send emails and return mock confirmation
  if (!supabaseUrl || !serviceKey) {
    await sendBookingConfirmation({
      guestName: payload.guestName,
      guestEmail: payload.guestEmail,
      propertyName: payload.propertyName,
      propertySlug: payload.propertySlug,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      numGuests: payload.numGuests,
      totalAmount: payload.totalAmount,
      bookingId,
    });
    return NextResponse.json({ bookingId });
  }

  const supabase = await createServiceClient();

  // Upsert guest
  const { data: guest, error: guestError } = await supabase
    .from("guests")
    .upsert(
      {
        email: payload.guestEmail,
        first_name: payload.guestName.split(" ")[0],
        last_name: payload.guestName.split(" ").slice(1).join(" ") || "—",
        phone: payload.guestPhone ?? null,
      },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  if (guestError) {
    console.error("[bookings] guest upsert error:", guestError.message);
    return NextResponse.json({ error: "Failed to save guest" }, { status: 500 });
  }

  // Create booking
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      id: bookingId,
      property_id: payload.propertyId,
      guest_id: guest.id,
      check_in: payload.checkIn,
      check_out: payload.checkOut,
      num_guests: payload.numGuests,
      nightly_rate: payload.nightlyRate,
      cleaning_fee: payload.cleaningFee,
      total_amount: payload.totalAmount,
      payment_intent: payload.paymentIntent,
      status: "confirmed",
      source: "direct",
      special_requests: payload.specialRequests ?? null,
    })
    .select("id")
    .single();

  if (bookingError) {
    console.error("[bookings] booking insert error:", bookingError.message);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }

  // Mark availability as booked
  const dates = expandDateRange(new Date(payload.checkIn), new Date(payload.checkOut));
  await supabase.from("availability").upsert(
    dates.map((date) => ({
      property_id: payload.propertyId,
      date,
      status: "booked",
      source: "direct",
    })),
    { onConflict: "property_id,date" }
  );

  // Send emails
  await Promise.all([
    sendBookingConfirmation({
      guestName: payload.guestName,
      guestEmail: payload.guestEmail,
      propertyName: payload.propertyName,
      propertySlug: payload.propertySlug,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      numGuests: payload.numGuests,
      totalAmount: payload.totalAmount,
      bookingId: booking.id,
    }),
    sendAdminBookingAlert({
      guestName: payload.guestName,
      guestEmail: payload.guestEmail,
      propertyName: payload.propertyName,
      propertySlug: payload.propertySlug,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      numGuests: payload.numGuests,
      totalAmount: payload.totalAmount,
      bookingId: booking.id,
    }),
  ]);

  return NextResponse.json({ bookingId: booking.id });
}
