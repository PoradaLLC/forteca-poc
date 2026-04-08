"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/properties", label: "Getaways" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact Us" },
  { href: "/store", label: "Store" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const isStorePage = pathname.startsWith("/store") || pathname.startsWith("/cart");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-forteca-navy/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Forteca Estate"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            Forteca<span className="text-forteca-gold">Estate</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA / Cart + mobile toggle */}
        <div className="flex items-center gap-3">
          {isStorePage ? (
            <Link
              href="/cart"
              className={cn(
                "relative hidden rounded-md bg-forteca-gold px-4 py-2 text-sm font-semibold text-forteca-navy",
                "transition-opacity hover:opacity-90 lg:flex items-center gap-2"
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-forteca-navy">
                  {totalItems}
                </span>
              )}
            </Link>
          ) : (
            <Link
              href="/properties"
              className={cn(
                "hidden rounded-md bg-forteca-gold px-4 py-2 text-sm font-semibold text-forteca-navy",
                "transition-opacity hover:opacity-90 lg:block"
              )}
            >
              Book Now
            </Link>
          )}

          {/* Mobile: always show cart if items exist on store pages */}
          {isStorePage && (
            <Link
              href="/cart"
              className="relative rounded-md p-2 text-white/80 hover:text-white lg:hidden"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-forteca-gold text-[10px] font-bold text-forteca-navy">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-white/80 hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
