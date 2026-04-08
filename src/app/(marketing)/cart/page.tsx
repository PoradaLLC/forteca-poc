import type { Metadata } from "next";
import { CartView } from "./CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your shopping cart — Forteca Estate Store.",
};

export default function CartPage() {
  return <CartView />;
}
