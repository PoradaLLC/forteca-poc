"use client";

import { Calendar as CalendarIcon } from "lucide-react";

interface BookingSidebarProps {
  propertySlug: string;
  basePrice: number;
  minNights: number;
  airbnbUrl: string | null;
  vrboUrl: string | null;
  hospitableWidgetUrl: string | null;
}

export function BookingSidebar({
  propertySlug,
  basePrice,
  minNights,
  airbnbUrl,
  vrboUrl,
  hospitableWidgetUrl,
}: BookingSidebarProps) {
  return (
    <div className="sticky top-20 space-y-4">
      {/* Hospitable booking widget */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-forteca-navy/5">
        {hospitableWidgetUrl ? (
          <iframe
            src={hospitableWidgetUrl}
            sandbox="allow-top-navigation allow-scripts allow-same-origin allow-forms allow-popups"
            className="w-full border-0"
            style={{ height: 900 }}
            title="Book this property"
          />
        ) : (
          <div className="bg-forteca-navy p-6">
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              Book Direct · Best Rate
            </div>
            <div className="mb-5 flex items-baseline gap-1">
              <span className="font-serif text-3xl font-bold text-white">
                from ${basePrice}
              </span>
              <span className="text-sm text-white/50">/ night</span>
            </div>
            <a
              href={`https://fortecaestate.directstays.com/property/${propertySlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-forteca-gold py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
            >
              <CalendarIcon className="h-4 w-4" />
              Book Direct
            </a>
            <p className="mt-4 text-center text-xs text-white/30">
              Min. {minNights} nights · Free cancellation
            </p>
          </div>
        )}
      </div>

      {/* Also available on */}
      <div className="rounded-2xl bg-forteca-navy p-4">
        <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-widest text-white/30">
          Also available on
        </p>

        {/* Airbnb */}
        <a
          href={
            airbnbUrl ||
            `https://www.airbnb.com/s/${encodeURIComponent(propertySlug)}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white/70 transition-all hover:border-[#FF5A5F]/40 hover:text-[#FF5A5F]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.7 18.5c-.4.8-1.1 1.4-2 1.4-.6 0-1.1-.2-1.7-.6-.7-.5-1.5-1.3-2.3-2.3-.6.8-1.2 1.5-1.8 2-.8.7-1.5 1-2.2 1s-1.5-.5-2-1.4c-1.7-3.5-3.4-8.6-1-10.2.6-.4 1.3-.6 2-.6 1.6 0 3 1.3 4 2.8.3.4.5.8.7 1.2.2-.4.5-.8.7-1.2 1-1.5 2.4-2.8 4-2.8.7 0 1.4.2 2 .6 2.4 1.6.7 6.7-1 10.1z" />
          </svg>
          Book on Airbnb
        </a>

        {/* VRBO */}
        <a
          href={
            vrboUrl ||
            `https://www.vrbo.com/search?query=${encodeURIComponent(propertySlug)}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white/70 transition-all hover:border-[#3B5998]/40 hover:text-[#5B9BD5]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.2 2L1 14.4l4.4 7.6h13.2l4.4-7.6L19.8 2H4.2zm7.8 16.2c-3.5 0-6.3-2.8-6.3-6.3S8.5 5.6 12 5.6s6.3 2.8 6.3 6.3-2.8 6.3-6.3 6.3z" />
          </svg>
          Book on VRBO
        </a>
      </div>
    </div>
  );
}
