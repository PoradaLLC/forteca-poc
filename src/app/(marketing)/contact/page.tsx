import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { LeadConnectorEmbeds } from "@/components/contact/LeadConnectorEmbeds";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Forteca Estate — questions about properties, bookings, or property management services.",
};

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "fortecaestate@gmail.com",
    href: "mailto:fortecaestate@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(484) 286-3223",
    href: "tel:+14842863223",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "814 Monroe St #205, Stroudsburg, PA",
    href: "https://maps.google.com/?q=814+Monroe+St+%23205+Stroudsburg+PA+18360",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="grain bg-forteca-navy px-4 pb-20 pt-14">
        <div className="mx-auto max-w-4xl">

          {/* Heading with glow */}
          <div className="relative text-center">
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
              <div className="h-40 w-[500px] rounded-full bg-forteca-gold/5 blur-3xl" />
            </div>
            <p className="relative mb-3 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              Get in Touch
            </p>
            <h1 className="relative font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              We&apos;d love to hear
              <br className="hidden sm:block" /> from you.
            </h1>
            <p className="relative mx-auto mt-5 max-w-lg text-base text-white/50">
              Questions about a property, a booking, or our management services?
              We respond to every message within 24 hours.
            </p>
          </div>

          {/* Contact info cards */}
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-forteca-gold/10">
                  <Icon className="h-4 w-4 text-forteca-gold" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 block text-sm font-medium text-white/80 transition-colors hover:text-forteca-gold"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-medium text-white/80">{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-rule" />

      {/* ── FORM + CALENDAR ──────────────────────────────────────────────── */}
      <section className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-7xl">
          {/* 4-cell grid: headers in row 1, cards in row 2 — ensures cards align */}
          <div className="grid gap-x-10 lg:grid-cols-2">

            {/* Left header */}
            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
                Send Us a Message
              </p>
              <h2 className="mb-2 font-serif text-2xl font-bold text-forteca-navy sm:text-3xl">
                Fill out the form below
              </h2>
              <p className="text-sm text-forteca-slate">
                Tell us what you need — we&apos;ll match you with the right person and
                get back to you within 24 hours.
              </p>
            </div>

            {/* Right header */}
            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
                Schedule a Call
              </p>
              <h2 className="mb-2 font-serif text-2xl font-bold text-forteca-navy sm:text-3xl">
                Book Time With Us
              </h2>
              <p className="text-sm text-forteca-slate">
                Prefer to talk? Pick a time that works and we&apos;ll make it happen.
              </p>
            </div>

            {/* Left card */}
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

            {/* Right card */}
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
        </div>
      </section>

      {/* ── PROPERTY OWNERS CTA ──────────────────────────────────────────── */}
      <section className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl bg-forteca-navy p-8 sm:p-10">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-forteca-gold/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 left-1/3 h-32 w-32 rounded-full bg-forteca-gold/5 blur-2xl" />

            <div className="relative sm:flex sm:items-center sm:justify-between sm:gap-10">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
                  Property Owners
                </p>
                <h3 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                  Interested in management services?
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
                  We manage properties across Pennsylvania, New York, and Florida.
                  Let&apos;s talk about how we can maximize your investment.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:mt-0 sm:flex-shrink-0">
                <a
                  href="tel:+14842863223"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-forteca-gold px-7 py-3 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
                >
                  Call Us Now
                </a>
                <a
                  href="mailto:fortecaestate@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/70 transition-colors hover:border-white/40 hover:text-white"
                >
                  Send an Email
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Script loader */}
      <LeadConnectorEmbeds />
    </>
  );
}
