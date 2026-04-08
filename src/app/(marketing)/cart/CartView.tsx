"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft, Lock } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function CartView() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <>
      {/* Header */}
      <section className="grain bg-forteca-navy px-4 pb-12 pt-14">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/store"
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="font-serif text-4xl font-bold text-white">
            Your Cart
          </h1>
        </div>
      </section>

      <section className="bg-forteca-cream px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {items.length === 0 ? (
            <div className="py-20 text-center">
              <ShoppingCart className="mx-auto mb-6 h-16 w-16 text-forteca-navy/10" />
              <h2 className="font-serif text-2xl font-bold text-forteca-navy">
                Your cart is empty
              </h2>
              <p className="mt-3 text-forteca-slate">
                Browse the store and add some items.
              </p>
              <Link
                href="/store"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-forteca-navy px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-forteca-navy-light"
              >
                Browse Store
              </Link>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.slug}-${item.size}`}
                    className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-forteca-navy/5 sm:p-6"
                  >
                    {/* Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-forteca-cream-dark sm:h-28 sm:w-28">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                        sizes="112px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-forteca-navy">
                            {item.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-forteca-slate">
                            Size: {item.size}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-forteca-navy">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-1 rounded-lg border border-forteca-navy/10">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.slug,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="p-2 text-forteca-slate transition-colors hover:text-forteca-navy"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-forteca-navy">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.slug,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="p-2 text-forteca-slate transition-colors hover:text-forteca-navy"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug, item.size)}
                          className="flex items-center gap-1.5 text-xs text-red-500 transition-colors hover:text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5">
                <div className="flex items-center justify-between border-b border-forteca-navy/5 pb-4">
                  <span className="text-sm text-forteca-slate">Subtotal</span>
                  <span className="text-lg font-bold text-forteca-navy">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="mt-3 text-xs text-forteca-slate">
                  Shipping and taxes calculated at checkout.
                </p>

                {/* Checkout placeholder */}
                <button
                  type="button"
                  disabled
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-forteca-navy/30 py-4 text-sm font-bold uppercase tracking-widest text-white/50"
                >
                  <Lock className="h-4 w-4" />
                  Checkout Coming Soon
                </button>
                <p className="mt-2 text-center text-xs text-forteca-slate">
                  Stripe checkout will be connected soon.
                </p>

                {/* Clear cart */}
                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-4 w-full text-center text-xs text-forteca-slate transition-colors hover:text-red-500"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
