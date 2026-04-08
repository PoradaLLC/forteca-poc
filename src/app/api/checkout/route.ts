import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { getProduct } from "@/lib/store-data";

const CartItemSchema = z.object({
  slug: z.string(),
  name: z.string(),
  size: z.string(),
  quantity: z.number().int().min(1),
});

const CheckoutSchema = z.object({
  items: z.array(CartItemSchema).min(1),
});

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const parsed = CheckoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid cart" },
      { status: 400 }
    );
  }

  const { items } = parsed.data;

  // Build line items from our product catalog (don't trust client prices)
  const lineItems = [];
  for (const item of items) {
    const product = getProduct(item.slug);
    if (!product) {
      return NextResponse.json(
        { error: `Product not found: ${item.slug}` },
        { status: 400 }
      );
    }

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: item.size !== "One Size" ? `Size: ${item.size}` : undefined,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: item.quantity,
    });
  }

  const stripe = new Stripe(secretKey);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Stripe types lag behind API; ui_mode: "embedded" is valid
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: lineItems,
    mode: "payment",
  } as any);

  return NextResponse.json({ clientSecret: session.client_secret });
}
