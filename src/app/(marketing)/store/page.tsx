import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { storeProducts } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Shop Forteca Estate merchandise — dad hats, Champion sweatshirts, and branded apparel.",
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
            Rep the brand. Premium apparel with the Forteca Estate logo.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-2">
            {storeProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/store/${product.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forteca-navy/5 transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden bg-forteca-cream-dark">
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-xl font-bold text-forteca-navy transition-colors group-hover:text-forteca-gold">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sm text-forteca-slate line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-forteca-navy">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.sizes.length > 1 && (
                      <span className="text-xs text-forteca-slate">
                        {product.sizes.join(" · ")}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
