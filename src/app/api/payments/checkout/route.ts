import { NextResponse, type NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { CheckoutSchema } from "@/lib/validators";
import { getProperty } from "@/lib/mock-data";
import { calcNights } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Validate input
  const result = CheckoutSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid request", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const input = result.data;
  const property = getProperty(input.propertySlug);
  if (!property) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  const nights = calcNights(input.checkIn, input.checkOut);
  if (nights < property.min_nights) {
    return NextResponse.json(
      { error: `Minimum stay is ${property.min_nights} nights` },
      { status: 400 }
    );
  }

  const nightlyTotal = property.base_price * nights;
  const totalAmount = nightlyTotal + property.cleaning_fee;
  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  // Dev mode: no Stripe configured
  if (!stripe) {
    const mockSessionId = `dev_${crypto.randomUUID()}`;
    return NextResponse.json({
      url: `${origin}/booking/confirmation?session_id=${mockSessionId}&dev=true&property=${input.propertySlug}&checkin=${input.checkIn}&checkout=${input.checkOut}&guests=${input.numGuests}&name=${encodeURIComponent(input.guestName)}&email=${encodeURIComponent(input.guestEmail)}&total=${totalAmount}`,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: nightlyTotal * 100, // cents
          product_data: {
            name: `${property.name} — ${nights} night${nights > 1 ? "s" : ""}`,
            description: `${input.checkIn} → ${input.checkOut} · ${input.numGuests} guest${input.numGuests > 1 ? "s" : ""}`,
          },
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "usd",
          unit_amount: property.cleaning_fee * 100,
          product_data: { name: "Cleaning Fee" },
        },
        quantity: 1,
      },
    ],
    customer_email: input.guestEmail,
    metadata: {
      propertySlug: input.propertySlug,
      propertyName: property.name,
      checkIn: input.checkIn,
      checkOut: input.checkOut,
      numGuests: String(input.numGuests),
      guestName: input.guestName,
      guestEmail: input.guestEmail,
      guestPhone: input.guestPhone ?? "",
      specialRequests: input.specialRequests ?? "",
      nightlyRate: String(property.base_price),
      cleaningFee: String(property.cleaning_fee),
      totalAmount: String(totalAmount),
    },
    success_url: `${origin}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/booking/${input.propertySlug}`,
  });

  return NextResponse.json({ url: session.url });
}
