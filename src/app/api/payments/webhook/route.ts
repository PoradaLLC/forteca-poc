import { NextResponse, type NextRequest } from "next/server";
import { stripe, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe";

// App Router route handlers receive the raw body via req.text() — no config needed
export async function POST(req: NextRequest) {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) {
    console.warn("[webhook] Stripe not configured — skipping");
    return NextResponse.json({ received: true });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[webhook] Signature verification failed:", msg);
    return NextResponse.json({ error: `Webhook error: ${msg}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const meta = session.metadata;
    if (!meta) return NextResponse.json({ received: true });

    try {
      await fetch(
        `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/api/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            propertySlug: meta.propertySlug,
            propertyName: meta.propertyName,
            guestName: meta.guestName,
            guestEmail: meta.guestEmail,
            guestPhone: meta.guestPhone || undefined,
            checkIn: meta.checkIn,
            checkOut: meta.checkOut,
            numGuests: Number(meta.numGuests),
            nightlyRate: Number(meta.nightlyRate),
            cleaningFee: Number(meta.cleaningFee),
            totalAmount: Number(meta.totalAmount),
            paymentIntent: session.payment_intent ?? session.id,
            specialRequests: meta.specialRequests || undefined,
          }),
        }
      );
    } catch (err) {
      console.error("[webhook] Failed to create booking record:", err);
    }
  }

  return NextResponse.json({ received: true });
}
