import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your order has been placed successfully.",
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <section className="grain bg-forteca-navy px-4 pb-12 pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold text-white">
            Thank You!
          </h1>
        </div>
      </section>

      <section className="bg-forteca-cream px-4 py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-forteca-navy">
            Order Confirmed
          </h2>
          <p className="mt-3 text-forteca-slate">
            Your order has been placed successfully. You&apos;ll receive a
            confirmation email from Stripe with your order details and tracking
            information once your items ship.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 rounded-full bg-forteca-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-forteca-navy/20 px-6 py-3 text-sm font-semibold text-forteca-navy transition-colors hover:border-forteca-navy/40"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
