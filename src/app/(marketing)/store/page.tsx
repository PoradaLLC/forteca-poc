import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Shop Forteca Estate merchandise — apparel, accessories, and branded goods.",
};

export default function StorePage() {
  return (
    <>
      {/* Hero */}
      <section className="grain bg-forteca-navy px-4 pb-20 pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            Forteca Merch
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            The Forteca Store
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/50">
            Rep the brand. Apparel, accessories, and gear — coming soon.
          </p>
        </div>
      </section>

      {/* Coming soon */}
      <section className="bg-forteca-cream px-4 py-24">
        <div className="mx-auto max-w-md text-center">
          <ShoppingBag className="mx-auto mb-6 h-16 w-16 text-forteca-navy/10" />
          <h2 className="font-serif text-2xl font-bold text-forteca-navy">
            Coming Soon
          </h2>
          <p className="mt-3 text-forteca-slate">
            We&apos;re putting the finishing touches on our merchandise
            collection. Sign up for our newsletter to be the first to know when
            the store launches.
          </p>
          <Link
            href="/properties"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forteca-navy px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-forteca-navy-light"
          >
            Browse Getaways
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
