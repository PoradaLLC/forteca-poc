"use server";

import { stripe } from "@/lib/stripe";
import { getProduct } from "@/lib/store-data";

interface CartItem {
  slug: string;
  size: string;
  quantity: number;
}

export async function startCheckoutSession(items: CartItem[]) {
  if (!items || items.length === 0) {
    throw new Error("Cart is empty");
  }

  const lineItems = items.map((item) => {
    const product = getProduct(item.slug);
    if (!product) throw new Error(`Product not found: ${item.slug}`);

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description:
            item.size !== "One Size" ? `Size: ${item.size}` : product.description,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: item.quantity,
    };
  });

  if (!stripe) throw new Error("Stripe is not configured");

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    redirect_on_completion: "never",
    line_items: lineItems,
    mode: "payment",
  });

  return session.client_secret;
}
