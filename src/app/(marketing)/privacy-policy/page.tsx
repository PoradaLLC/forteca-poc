import type { Metadata } from "next";
import {
  Database,
  Zap,
  Shield,
  Globe,
  Link2,
  Archive,
  UserCheck,
  Smartphone,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Forteca Estate privacy policy — how we collect, use, and protect your personal information.",
};

type Icon = React.ComponentType<{ className?: string }>;

const sections: { id: string; num: string; title: string; icon: Icon }[] = [
  { id: "information-collected", num: "01", title: "Information We Collect", icon: Database },
  { id: "how-we-use", num: "02", title: "How We Use Your Information", icon: Zap },
  { id: "payment-security", num: "03", title: "Payment Security", icon: Shield },
  { id: "cookies", num: "04", title: "Cookies", icon: Globe },
  { id: "third-party", num: "05", title: "Third-Party Services", icon: Link2 },
  { id: "data-retention", num: "06", title: "Data Retention", icon: Archive },
  { id: "your-rights", num: "07", title: "Your Rights", icon: UserCheck },
  { id: "sms-program", num: "08", title: "SMS / Text Messaging", icon: Smartphone },
  { id: "contact", num: "09", title: "Contact Us", icon: Mail },
];

function SectionHeading({
  num,
  icon: Icon,
  inverted = false,
  children,
}: {
  num: string;
  icon: Icon;
  inverted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <div className="relative flex-shrink-0">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full ring-1 ${
            inverted ? "bg-white/10 ring-white/20" : "bg-forteca-gold/10 ring-forteca-gold/25"
          }`}
        >
          <Icon className="h-5 w-5 text-forteca-gold" />
        </span>
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-forteca-gold font-mono text-[9px] font-bold text-white shadow-sm">
          {num}
        </span>
      </div>
      <h2
        className={`font-serif text-xl font-bold sm:text-2xl ${
          inverted ? "text-white" : "text-forteca-navy"
        }`}
      >
        {children}
      </h2>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2.5 mt-6 flex items-center gap-2.5 text-sm font-bold text-forteca-navy">
      <span className="h-[3px] w-5 rounded-full bg-forteca-gold" />
      {children}
    </h3>
  );
}

function Dots({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-forteca-navy/70">
          <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-forteca-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* HERO */}
      <section className="grain relative overflow-hidden bg-forteca-navy px-4 pb-20 pt-16">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-80 w-[700px] rounded-full bg-forteca-gold/[0.04] blur-3xl" />
          <div className="absolute h-48 w-[400px] rounded-full bg-forteca-gold/[0.05] blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-forteca-gold/25 bg-forteca-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-forteca-gold">
            <Shield className="h-3 w-3" />
            Legal Document
          </span>
          <h1 className="mt-2 font-serif text-5xl font-bold text-white sm:text-6xl">
            Privacy Policy
          </h1>
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-forteca-gold/40" />
            <p className="text-sm text-white/40">Last updated January 1, 2026</p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-forteca-gold/40" />
          </div>
          <p className="relative mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/50">
            We take your privacy seriously. This policy explains what information we collect,
            how we use it, and the choices you have.
          </p>
        </div>
      </section>

      <div className="gold-rule" />

      {/* CONTENT */}
      <section className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">

            {/* Sidebar TOC */}
            <aside className="mb-12 lg:mb-0">
              <div className="lg:sticky lg:top-24">
                <div className="rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-forteca-navy/[0.07]">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
                    Contents
                  </p>
                  <nav>
                    <ul className="space-y-0.5">
                      {sections.map(({ id, title, icon: Icon }) => (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            className="group flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm text-forteca-slate transition-all hover:bg-forteca-gold/5 hover:text-forteca-navy"
                          >
                            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-forteca-gold/10 transition-colors group-hover:bg-forteca-gold/20">
                              <Icon className="h-3.5 w-3.5 text-forteca-gold/60 transition-colors group-hover:text-forteca-gold" />
                            </span>
                            <span className="leading-tight">{title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </aside>

            {/* Sections */}
            <div className="space-y-4">

              <article
                id="information-collected"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading num="01" icon={Database}>Information We Collect</SectionHeading>
                <div className="space-y-4 text-sm leading-relaxed text-forteca-navy/70">
                  <p>When you book a stay, contact us, or browse our website, we may collect:</p>
                  <Dots
                    items={[
                      "Name, email address, phone number",
                      "Billing and payment information (processed securely via Stripe)",
                      "Booking details (dates, property, guest count)",
                      "Communications you send us (contact forms, emails)",
                      "Device and usage data (cookies, IP address, browser type)",
                    ]}
                  />
                </div>
              </article>

              <article
                id="how-we-use"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading num="02" icon={Zap}>How We Use Your Information</SectionHeading>
                <Dots
                  items={[
                    "Process and manage your bookings",
                    "Send booking confirmations and check-in instructions",
                    "Respond to your inquiries and support requests",
                    "Improve our website and services",
                    "Send marketing communications (only with your consent)",
                    "Comply with legal obligations",
                  ]}
                />
              </article>

              <article
                id="payment-security"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading num="03" icon={Shield}>Payment Security</SectionHeading>
                <div className="rounded-xl bg-forteca-gold/5 p-5 ring-1 ring-forteca-gold/15">
                  <p className="text-sm leading-relaxed text-forteca-navy/70">
                    All payment processing is handled by{" "}
                    <strong className="font-semibold text-forteca-navy">Stripe</strong>, a
                    PCI-DSS Level 1 certified payment processor. We never store your full
                    credit card number on our servers. Payment data is encrypted in transit
                    and at rest.
                  </p>
                </div>
              </article>

              <article
                id="cookies"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading num="04" icon={Globe}>Cookies</SectionHeading>
                <p className="text-sm leading-relaxed text-forteca-navy/70">
                  We use essential cookies to maintain your session and preferences. We may
                  also use analytics cookies (such as Vercel Analytics) to understand how
                  visitors use our site. You can disable cookies in your browser settings,
                  though some features may not work correctly.
                </p>
              </article>

              <article
                id="third-party"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading num="05" icon={Link2}>Third-Party Services</SectionHeading>
                <div className="space-y-4 text-sm leading-relaxed text-forteca-navy/70">
                  <p>We share data with the following third-party services as necessary:</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      { name: "Stripe", desc: "Payment processing" },
                      { name: "Supabase", desc: "Database & authentication" },
                      { name: "Resend", desc: "Transactional email" },
                      { name: "Vercel", desc: "Hosting & analytics" },
                    ].map(({ name, desc }) => (
                      <div
                        key={name}
                        className="flex items-center gap-3 rounded-xl bg-forteca-cream-dark/60 px-4 py-3 ring-1 ring-forteca-navy/[0.08]"
                      >
                        <span className="h-2 w-2 flex-shrink-0 rounded-full bg-forteca-gold" />
                        <span>
                          <strong className="font-semibold text-forteca-navy">{name}</strong>
                          <span className="ml-1.5 text-forteca-slate">— {desc}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <p>We do not sell your personal information to third parties.</p>
                </div>
              </article>

              <article
                id="data-retention"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading num="06" icon={Archive}>Data Retention</SectionHeading>
                <p className="text-sm leading-relaxed text-forteca-navy/70">
                  We retain your personal information for as long as necessary to fulfill
                  the purposes outlined in this policy, comply with legal obligations, and
                  resolve disputes. Booking records are retained for a minimum of{" "}
                  <strong className="font-semibold text-forteca-navy">7 years</strong> for
                  tax and legal compliance.
                </p>
              </article>

              <article
                id="your-rights"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading num="07" icon={UserCheck}>Your Rights</SectionHeading>
                <div className="space-y-3 text-sm leading-relaxed text-forteca-navy/70">
                  <p>You have the right to:</p>
                  <Dots
                    items={[
                      "Access the personal data we hold about you",
                      "Request correction of inaccurate data",
                      "Request deletion of your data (subject to legal retention requirements)",
                      "Opt out of marketing communications at any time",
                      "Lodge a complaint with a data protection authority",
                    ]}
                  />
                </div>
              </article>

              <article
                id="sms-program"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading num="08" icon={Smartphone}>
                  SMS / Text Messaging Program
                </SectionHeading>
                <div className="space-y-5 text-sm leading-relaxed text-forteca-navy/70">

                  <div>
                    <SubHeading>SMS Consent &amp; Opt-In</SubHeading>
                    <p>
                      By providing your phone number through our website forms, scheduling
                      tools, or other communication channels, you consent to receive text
                      messages from Forteca Estate. These messages may include responses to
                      inquiries, appointment confirmations, reminders, service updates, and
                      occasional marketing communications related to our services.
                    </p>
                  </div>

                  <div>
                    <SubHeading>Opt-In Method</SubHeading>
                    <p>Users opt in to receive SMS messages by:</p>
                    <div className="mt-2">
                      <Dots
                        items={[
                          "Submitting a form on our website",
                          "Requesting information or services",
                          "Providing verbal or written consent",
                        ]}
                      />
                    </div>
                  </div>

                  <div>
                    <SubHeading>Message Frequency</SubHeading>
                    <p>
                      Message frequency may vary depending on your interaction with us but
                      typically ranges from{" "}
                      <strong className="font-semibold text-forteca-navy">
                        1–5 messages per week
                      </strong>
                      .
                    </p>
                  </div>

                  <div>
                    <SubHeading>Message &amp; Data Rates</SubHeading>
                    <p>
                      Message and data rates may apply depending on your mobile carrier and
                      plan.
                    </p>
                  </div>

                  <div>
                    <SubHeading>Opt-Out Instructions</SubHeading>
                    <p>You can opt out of receiving SMS messages at any time by replying:</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-lg bg-forteca-navy px-3.5 py-2 text-xs font-bold tracking-wider text-white">
                        STOP — Unsubscribe
                      </span>
                      <span className="inline-flex items-center rounded-lg bg-forteca-navy/10 px-3.5 py-2 text-xs font-bold tracking-wider text-forteca-navy ring-1 ring-forteca-navy/15">
                        HELP — Get assistance
                      </span>
                    </div>
                    <p className="mt-3">
                      After opting out, you will no longer receive SMS messages unless you
                      opt back in.
                    </p>
                  </div>

                  <div>
                    <SubHeading>Data Usage &amp; Privacy</SubHeading>
                    <div className="space-y-2">
                      <p>
                        We do not share or sell your mobile information with third parties
                        for marketing purposes. Your information is used solely for
                        communication related to your inquiries and our services.
                      </p>
                      <p>
                        Information sharing to subcontractors in support services (such as
                        customer service, messaging platforms, or technical support) is
                        permitted solely for the purpose of operating our business and
                        providing services to you.
                      </p>
                      <p>
                        All other use case categories exclude text messaging originator
                        opt-in data and consent; this information will not be shared with
                        any third parties.
                      </p>
                    </div>
                  </div>

                </div>
              </article>

              {/* Contact — inverted navy card */}
              <article
                id="contact"
                className="scroll-mt-24 relative overflow-hidden rounded-2xl bg-forteca-navy p-8 ring-1 ring-forteca-gold/15"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-forteca-gold/[0.06] blur-3xl" />
                <div className="relative">
                  <div className="mb-7 flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                        <Mail className="h-5 w-5 text-forteca-gold" />
                      </span>
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-forteca-gold font-mono text-[9px] font-bold text-white shadow-sm">
                        09
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-bold text-white sm:text-2xl">
                      Contact Us
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">
                    Questions about this privacy policy or your personal data? We&apos;re
                    here to help.
                  </p>
                  <a
                    href="mailto:forteca@fortecaestate.com"
                    className="mt-5 inline-flex items-center gap-2.5 rounded-xl bg-forteca-gold/10 px-5 py-3 text-sm font-semibold text-forteca-gold ring-1 ring-forteca-gold/25 transition-all hover:bg-forteca-gold/20 hover:ring-forteca-gold/40"
                  >
                    <Mail className="h-4 w-4" />
                    forteca@fortecaestate.com
                  </a>
                </div>
              </article>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
