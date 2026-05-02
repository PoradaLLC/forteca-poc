import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
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
    value: "814 Monroe St #205, Stroudsburg, PA 18360",
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
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <section className="grain bg-forteca-navy px-4 pb-16 pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            We&apos;d love to hear from you.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/50">
            Questions about a property, a booking inquiry, or interested in our
            management services? Reach out — we respond fast.
          </p>
        </div>
      </section>

      <div className="gold-rule" />

      {/* ── CONTACT CARDS ────────────────────────────────────────────────── */}
      <section className="bg-forteca-cream px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forteca-navy/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forteca-gold/10">
                  <Icon className="h-4.5 w-4.5 text-forteca-gold" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-forteca-slate">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-1 block text-sm font-medium text-forteca-navy transition-colors hover:text-forteca-gold"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-forteca-navy">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────────────────────────────────── */}
      <section className="bg-forteca-cream px-4 pb-6">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            Send Us a Message
          </p>
          <h2 className="mb-6 font-serif text-3xl font-bold text-forteca-navy">
            Fill out the form below
          </h2>
          <LeadConnectorEmbeds />
        </div>
      </section>

      {/* ── PROPERTY OWNERS ──────────────────────────────────────────────── */}
      <section className="bg-forteca-cream px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-forteca-navy p-8 sm:p-10">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
                  Property Owners
                </p>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Interested in management services?
                </h3>
                <p className="mt-2 max-w-md text-sm text-white/50">
                  We manage properties across Pennsylvania, New York, and
                  Florida. Let&apos;s talk about how we can maximize your
                  investment.
                </p>
              </div>
              <a
                href="tel:+14842863223"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-forteca-gold px-7 py-3 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light sm:mt-0 sm:flex-shrink-0"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
