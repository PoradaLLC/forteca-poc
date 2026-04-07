"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileNav({ open, onClose, links }: MobileNavProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-72 bg-forteca-navy p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Dialog.Title asChild>
              <span className="text-lg font-bold text-white">
                Forteca<span className="text-forteca-gold">Estate</span>
              </span>
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="rounded-md p-1 text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="mt-8 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-base font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="gold-rule my-2" />
            <Link
              href="/properties"
              onClick={onClose}
              className="mt-2 rounded-md bg-forteca-gold px-4 py-2.5 text-center text-sm font-bold uppercase tracking-widest text-forteca-navy"
            >
              Book Now
            </Link>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
