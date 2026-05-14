import type { Metadata } from "next";
import { LeadConnectorEmbeds } from "@/components/contact/LeadConnectorEmbeds";
import PixelLead from "@/components/pixel/PixelLead";

export const metadata: Metadata = {
  title: "See How Forteca Estate Helps Owners Take the Stress Out of Property Management",
  description:
    "Watch how Forteca Estate helps short-term rental owners with guest communication, turnovers, maintenance, marketing, and day-to-day property care — then book a consultation call.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://fortecaestate.com/get-started/book" },
};

export default function GetStartedVslPage() {
  return (
    <>
      <PixelLead />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="grain bg-forteca-navy px-4 pb-12 pt-14">
        <div className="mx-auto max-w-3xl">
          <div className="relative text-center">
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
              <div className="h-40 w-[500px] rounded-full bg-forteca-gold/5 blur-3xl" />
            </div>
            <p className="relative mb-3 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              Watch &amp; Book
            </p>
            <h1 className="relative font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              See How Forteca Estate Helps Owners Take the Stress Out of
              Property Management
            </h1>
            <p className="relative mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60">
              Watch the video below to learn how our team helps short-term
              rental owners manage guest communication, turnovers, maintenance,
              marketing, and day-to-day property care. Book a consultation call
              below to see if Forteca Estate is the right fit for your property!
            </p>
          </div>
        </div>
      </section>

      {/* ── VIDEO ────────────────────────────────────────────────────────── */}
      <section className="bg-forteca-navy px-4 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl ring-1 ring-forteca-gold/20 shadow-2xl shadow-black/40">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/V36dpv8-lQ8?si=-atWX7rmt4i9Hgpq"
              title="Forteca Estate — Property Management Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <div className="gold-rule" />

      {/* ── BOOKING ──────────────────────────────────────────────────────── */}
      <section className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              Free Consultation Call
            </p>
            <h2 className="font-serif text-2xl font-bold text-forteca-navy sm:text-3xl">
              Pick a time that works for you
            </h2>
            <p className="mt-3 text-sm text-forteca-slate">
              We&apos;ll walk through your property, your goals, and whether
              Forteca Estate is the right fit.
            </p>
          </div>

          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-forteca-navy/5">
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/mjafIT5kvPfbIRbwhCtc"
              style={{
                width: "100%",
                border: "none",
                minHeight: "1050px",
                display: "block",
              }}
              id="gnxrzHxJv22boLn6r2mq_1777741914490"
              title="Book a Call"
            />
          </div>
        </div>
      </section>

      <LeadConnectorEmbeds />
    </>
  );
}
