"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { StoreProduct } from "@/lib/store-data";

export function ProductDetail({ product }: { product: StoreProduct }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.images[0].src,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Images */}
      <div>
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forteca-navy/5">
          <Image
            src={product.images[selectedImage].src}
            alt={product.images[selectedImage].alt}
            fill
            className="object-contain p-6"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {product.images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setSelectedImage(i)}
                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white transition-all ${
                  i === selectedImage
                    ? "ring-2 ring-forteca-gold ring-offset-2 ring-offset-forteca-cream"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-forteca-navy">
          {product.name}
        </h1>
        <p className="mt-2 text-2xl font-bold text-forteca-navy">
          ${product.price.toFixed(2)}
        </p>
        <p className="mt-4 leading-relaxed text-forteca-slate">
          {product.description}
        </p>

        {/* Size selector */}
        {product.sizes.length > 1 && (
          <div className="mt-6">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-forteca-slate">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
                    selectedSize === size
                      ? "border-forteca-gold bg-forteca-gold/10 text-forteca-navy"
                      : "border-forteca-navy/10 text-forteca-slate hover:border-forteca-navy/30"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to cart */}
        <button
          type="button"
          onClick={handleAdd}
          className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all ${
            added
              ? "bg-green-600 text-white"
              : "bg-forteca-gold text-forteca-navy hover:bg-forteca-gold-light"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </button>

        {/* Product details */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5">
          <h3 className="mb-3 font-serif text-lg font-bold text-forteca-navy">
            Product Details
          </h3>
          <ul className="space-y-2">
            {product.details.map((detail) => (
              <li
                key={detail}
                className="flex items-start gap-2.5 text-sm text-forteca-slate"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-forteca-gold" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
