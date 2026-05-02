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
      {/* Header */}
      <section className="grain bg-forteca-navy px-4 pb-16 pt-14">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            We&apos;d love to hear from you.
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/50">
            Questions about a property, a booking inquiry, or interested in our
            management services? Reach out — we respond fast.
          </p>
        </div>
      </section>

      <div className="gold-rule" />

      {/* Content */}
      <section className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
          {/* Embeds — form + calendar */}
          <div className="lg:col-span-3">
            <LeadConnectorEmbeds />
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-serif text-2xl font-bold text-forteca-navy">
              Contact Info
            </h2>
            <div className="space-y-4">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-forteca-navy/5"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-forteca-gold/10">
                    <Icon className="h-4.5 w-4.5 text-forteca-gold" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-forteca-slate">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-0.5 text-sm font-medium text-forteca-navy transition-colors hover:text-forteca-gold"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm font-medium text-forteca-navy">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Services callout */}
            <div className="mt-8 rounded-2xl bg-forteca-navy p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
                Property Owners
              </p>
              <h3 className="font-serif text-lg font-bold text-white">
                Interested in management services?
              </h3>
              <p className="mt-2 text-sm text-white/50">
                We manage properties across multiple states. Let&apos;s talk about
                how we can maximize your investment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
