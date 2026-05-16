import type { Metadata } from "next";
import { LeadConnectorEmbeds } from "@/components/contact/LeadConnectorEmbeds";
import { ServicesSection } from "@/components/marketing/ServicesSection";
import PixelContact from "@/components/pixel/PixelContact";

export const metadata: Metadata = {
  title: "Stress-Free Short-Term Rental Management Starts Here",
  description:
    "Forteca Estate is a local, 24/7 property management company that helps short-term rental owners save time, improve the guest experience, and keep their properties running smoothly.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://fortecaestate.com/get-started" },
};

export default function GetStartedLandingPage() {
  return (
    <>
      <PixelContact />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="grain bg-forteca-navy px-4 pb-12 pt-14">
        <div className="mx-auto max-w-3xl">
          <div className="relative text-center">
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
              <div className="h-40 w-[500px] rounded-full bg-forteca-gold/5 blur-3xl" />
            </div>
            <p className="relative mb-3 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              Forteca Estate
            </p>
            <h1 className="relative font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Stress-Free Short-Term Rental Management Starts Here
            </h1>
            <p className="relative mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60">
              Forteca Estate is a local, 24/7 property management company that
              helps short-term rental owners save time, improve the guest
              experience, and keep their properties running smoothly.
            </p>
          </div>
        </div>
      </section>

      <div className="gold-rule" />

      {/* ── OPT-IN FORM ──────────────────────────────────────────────────── */}
      <section className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              Get Started
            </p>
            <h2 className="font-serif text-2xl font-bold text-forteca-navy sm:text-3xl">
              Fill out the form below
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forteca-navy/5">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/tzOVDDrphRwwxVjUJKud"
              style={{ width: "100%", height: "1029px", border: "none", display: "block" }}
              id="inline-tzOVDDrphRwwxVjUJKud"
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Opt-In Form"
              data-height="1029"
              data-layout-iframe-id="inline-tzOVDDrphRwwxVjUJKud"
              data-form-id="tzOVDDrphRwwxVjUJKud"
              title="Opt-In Form"
            />
          </div>
        </div>
      </section>

      <ServicesSection />

      <LeadConnectorEmbeds />
    </>
  );
}
