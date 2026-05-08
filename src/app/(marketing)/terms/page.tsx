import type { Metadata } from "next";
import {
  FileText,
  CalendarCheck,
  CreditCard,
  XCircle,
  Home,
  AlertTriangle,
  Copyright,
  RefreshCw,
  BookOpen,
  CheckSquare,
  ExternalLink,
  Smartphone,
  Share2,
  Ban,
  Scale,
  Layers,
  WifiOff,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Forteca Estate terms of service — rules and policies for using our website and booking services.",
};

type Icon = React.ComponentType<{ className?: string }>;

const sections: { id: string; title: string; icon: Icon }[] = [
  { id: "acceptance", title: "Acceptance of Terms", icon: FileText },
  { id: "booking", title: "Booking & Reservations", icon: CalendarCheck },
  { id: "pricing", title: "Pricing & Payment", icon: CreditCard },
  { id: "cancellation", title: "Cancellation Policy", icon: XCircle },
  { id: "property-rules", title: "Property Rules", icon: Home },
  { id: "liability", title: "Liability", icon: AlertTriangle },
  { id: "intellectual-property", title: "Intellectual Property", icon: Copyright },
  { id: "changes", title: "Changes to Terms", icon: RefreshCw },
  { id: "definitions", title: "Interpretation & Definitions", icon: BookOpen },
  { id: "acknowledgment", title: "Acknowledgment", icon: CheckSquare },
  { id: "third-party-links", title: "Links to Other Websites", icon: ExternalLink },
  { id: "sms", title: "SMS Messaging Terms", icon: Smartphone },
  { id: "social-media", title: "Third-Party Social Media", icon: Share2 },
  { id: "termination", title: "Termination", icon: Ban },
  { id: "limitation", title: "Limitation of Liability", icon: Scale },
  { id: "disclaimer", title: '"AS IS" Disclaimer', icon: Layers },
  { id: "governing-law", title: "Governing Law", icon: WifiOff },
  { id: "contact", title: "Contact Us", icon: Mail },
];

function SectionHeading({
  icon: Icon,
  inverted = false,
  children,
}: {
  icon: Icon;
  inverted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <span
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ring-1 ${
          inverted ? "bg-white/10 ring-white/20" : "bg-forteca-gold/10 ring-forteca-gold/25"
        }`}
      >
        <Icon className="h-5 w-5 text-forteca-gold" />
      </span>
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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-forteca-gold/5 p-5 ring-1 ring-forteca-gold/15">
      <p className="text-sm leading-relaxed text-forteca-navy/70">{children}</p>
    </div>
  );
}

export default function TermsPage() {
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
            <FileText className="h-3 w-3" />
            Legal Document
          </span>
          <h1 className="mt-2 font-serif text-5xl font-bold text-white sm:text-6xl">
            Terms of Service
          </h1>
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-forteca-gold/40" />
            <p className="text-sm text-white/40">Last updated January 1, 2026</p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-forteca-gold/40" />
          </div>
          <p className="relative mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/50">
            Please read these terms carefully before using our website or booking
            services. By using Forteca Estate, you agree to these conditions.
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
                id="acceptance"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={FileText}>Acceptance of Terms</SectionHeading>
                <p className="text-sm leading-relaxed text-forteca-navy/70">
                  By accessing or using the Forteca Estate website and services, you agree
                  to be bound by these Terms of Service. If you do not agree to these
                  terms, please do not use our services.
                </p>
              </article>

              <article
                id="booking"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={CalendarCheck}>Booking &amp; Reservations</SectionHeading>
                <Dots
                  items={[
                    "All bookings are subject to availability and confirmation by Forteca Estate.",
                    "Guests must be at least 21 years of age to make a reservation.",
                    "The person making the reservation must be present during the stay.",
                    "Accurate guest counts must be provided at the time of booking. Exceeding the listed maximum occupancy is prohibited.",
                    "Check-in and check-out times are specified in your booking confirmation. Early check-in or late check-out may be available upon request but is not guaranteed.",
                  ]}
                />
              </article>

              <article
                id="pricing"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={CreditCard}>Pricing &amp; Payment</SectionHeading>
                <Dots
                  items={[
                    "All prices are listed in US dollars and are subject to change without notice until a booking is confirmed.",
                    "Total cost includes nightly rate, cleaning fee, service fee, and applicable taxes.",
                    "Full payment is required at the time of booking unless otherwise arranged.",
                    <>Payment is processed securely through <strong className="font-semibold text-forteca-navy">Stripe</strong>. Forteca Estate does not store credit card information.</>,
                  ]}
                />
              </article>

              <article
                id="cancellation"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={XCircle}>Cancellation Policy</SectionHeading>
                <div className="space-y-3">
                  {[
                    {
                      label: "Within 48 hrs of booking",
                      detail: "Free cancellation — provided check-in is at least 14 days away.",
                      highlight: true,
                    },
                    {
                      label: "14+ days before check-in",
                      detail: "Full refund minus a $50 processing fee.",
                      highlight: false,
                    },
                    {
                      label: "7–13 days before check-in",
                      detail: "50% refund.",
                      highlight: false,
                    },
                    {
                      label: "Less than 7 days",
                      detail: "No refund.",
                      highlight: false,
                    },
                  ].map(({ label, detail, highlight }) => (
                    <div
                      key={label}
                      className={`flex items-start gap-4 rounded-xl px-4 py-3.5 ring-1 ${
                        highlight
                          ? "bg-forteca-gold/5 ring-forteca-gold/20"
                          : "bg-forteca-cream-dark/50 ring-forteca-navy/[0.08]"
                      }`}
                    >
                      <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-forteca-gold" />
                      <div className="text-sm leading-relaxed text-forteca-navy/70">
                        <strong className="font-semibold text-forteca-navy">{label}:</strong>{" "}
                        {detail}
                      </div>
                    </div>
                  ))}
                  <p className="pt-1 text-sm leading-relaxed text-forteca-navy/70">
                    Forteca Estate reserves the right to cancel a booking due to unforeseen
                    circumstances (maintenance, safety concerns). In such cases, a full refund
                    or alternative property will be offered.
                  </p>
                </div>
              </article>

              <article
                id="property-rules"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={Home}>Property Rules</SectionHeading>
                <Dots
                  items={[
                    "No smoking inside any property.",
                    "No parties or events unless explicitly approved in writing.",
                    <>Pets are only allowed at properties designated as <strong className="font-semibold text-forteca-navy">&quot;Pet Friendly.&quot;</strong> A pet fee may apply.</>,
                    "Guests are responsible for any damage to the property beyond normal wear and tear.",
                    "Quiet hours are 10:00 PM to 8:00 AM.",
                    "Guests must follow all house rules provided in the check-in guide.",
                  ]}
                />
              </article>

              <article
                id="liability"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={AlertTriangle}>Liability</SectionHeading>
                <Callout>
                  Forteca Estate provides vacation rental accommodations and is not liable
                  for injuries, accidents, or loss of personal belongings during your stay.
                  Guests use amenities (hot tubs, fire pits, grills, lake access, etc.) at
                  their own risk. We recommend travel insurance for all bookings.
                </Callout>
              </article>

              <article
                id="intellectual-property"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={Copyright}>Intellectual Property</SectionHeading>
                <p className="text-sm leading-relaxed text-forteca-navy/70">
                  All content on this website — including text, images, logos, and design —
                  is the property of Forteca Estate and is protected by copyright law. You
                  may not reproduce, distribute, or use any content without our written
                  permission.
                </p>
              </article>

              <article
                id="changes"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={RefreshCw}>Changes to Terms</SectionHeading>
                <p className="text-sm leading-relaxed text-forteca-navy/70">
                  We may update these terms from time to time. Continued use of our services
                  after changes constitutes acceptance of the updated terms. Material changes
                  will be communicated via email to guests with active bookings.
                </p>
              </article>

              <article
                id="definitions"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={BookOpen}>Interpretation &amp; Definitions</SectionHeading>
                <div className="space-y-6 text-sm leading-relaxed text-forteca-navy/70">
                  <div>
                    <SubHeading>SMS Opt-In</SubHeading>
                    <p className="mb-3">By opting in to receive SMS messages, you agree to receive messages related to:</p>
                    <Dots items={["Appointment reminders", "Service updates", "Customer support"]} />
                    <p className="mt-3">
                      Message frequency may vary. Message and data rates may apply. Reply STOP to opt out.
                    </p>
                  </div>

                  <div>
                    <SubHeading>Interpretation</SubHeading>
                    <p>
                      The words whose initial letters are capitalized have meanings defined under the
                      following conditions. The following definitions shall have the same meaning
                      regardless of whether they appear in singular or in plural.
                    </p>
                  </div>

                  <div>
                    <SubHeading>Definitions</SubHeading>
                    <p className="mb-4">For the purposes of these Terms and Conditions:</p>
                    <div className="space-y-3">
                      {[
                        {
                          term: "Affiliate",
                          def: 'An entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.',
                        },
                        { term: "Country", def: "Pennsylvania, United States" },
                        {
                          term: "Company",
                          def: 'Referred to as "the Company", "We", "Us" or "Our" — Forteca Estate, 814 Monroe St #205, Stroudsburg, PA.',
                        },
                        {
                          term: "Device",
                          def: "Any device that can access the Service such as a computer, a cell phone or a digital tablet.",
                        },
                        { term: "Service", def: "Refers to the Website." },
                        {
                          term: "Terms and Conditions",
                          def: 'Also referred to as "Terms" — these Terms and Conditions, including any documents expressly incorporated by reference, which govern Your access to and use of the Service.',
                        },
                        {
                          term: "Third-Party Social Media Service",
                          def: "Any services or content provided by a third party that is displayed, included, made available, or linked to through the Service.",
                        },
                        {
                          term: "Website",
                          def: "Forteca Estate, accessible from fortecaestate.com",
                          link: true,
                        },
                        {
                          term: "You",
                          def: "The individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service.",
                        },
                      ].map(({ term, def, link }) => (
                        <div
                          key={term}
                          className="rounded-xl bg-forteca-cream-dark/60 px-4 py-3.5 ring-1 ring-forteca-navy/[0.08]"
                        >
                          <strong className="font-semibold text-forteca-navy">{term} — </strong>
                          {link ? (
                            <>
                              Forteca Estate, accessible from{" "}
                              <a
                                href="https://fortecaestate.com"
                                className="font-semibold text-forteca-gold hover:underline"
                              >
                                fortecaestate.com
                              </a>
                            </>
                          ) : (
                            def
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              <article
                id="acknowledgment"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={CheckSquare}>Acknowledgment</SectionHeading>
                <div className="space-y-3 text-sm leading-relaxed text-forteca-navy/70">
                  <p>
                    These are the Terms and Conditions governing the use of this Service and
                    the agreement between You and the Company. These Terms set out the rights
                    and obligations of all users regarding the use of the Service.
                  </p>
                  <p>
                    Your access to and use of the Service is conditioned on Your acceptance
                    of and compliance with these Terms. These Terms apply to all visitors,
                    users and others who access or use the Service.
                  </p>
                  <p>
                    By accessing or using the Service You agree to be bound by these Terms.
                    If You disagree with any part of these Terms then You may not access the
                    Service.
                  </p>
                  <Callout>
                    You represent that you are over the age of 18. The Company does not
                    permit those under 18 to use the Service. Your access to and use of the
                    Service is also subject to Our Privacy Policy, which describes how We
                    collect, use, and disclose personal information.
                  </Callout>
                </div>
              </article>

              <article
                id="third-party-links"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={ExternalLink}>Links to Other Websites</SectionHeading>
                <div className="space-y-3 text-sm leading-relaxed text-forteca-navy/70">
                  <p>
                    Our Service may contain links to third-party websites or services that
                    are not owned or controlled by the Company.
                  </p>
                  <p>
                    The Company has no control over, and assumes no responsibility for, the
                    content, privacy policies, or practices of any third-party websites or
                    services. The Company shall not be responsible or liable, directly or
                    indirectly, for any damage or loss caused by or in connection with the
                    use of any such content, goods, or services.
                  </p>
                  <p>
                    We strongly advise You to read the terms and conditions and privacy
                    policies of any third-party websites or services that You visit.
                  </p>
                </div>
              </article>

              <article
                id="sms"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={Smartphone}>SMS Messaging Terms</SectionHeading>
                <div className="space-y-6 text-sm leading-relaxed text-forteca-navy/70">
                  <div>
                    <SubHeading>Program Description &amp; Message Types</SubHeading>
                    <p className="mb-3">
                      By opting in to receive SMS messages from Forteca Estate, you agree to
                      receive text messages related to your interaction with us. These may
                      include, but are not limited to:
                    </p>
                    <Dots
                      items={[
                        "Appointment confirmations and reminders",
                        "Service updates and notifications",
                        "Customer support communications",
                        "Promotional offers and marketing messages",
                      ]}
                    />
                    <p className="mt-3">
                      Message frequency may vary depending on your interaction with our services.
                    </p>
                  </div>

                  <div>
                    <SubHeading>Opt-Out Instructions</SubHeading>
                    <p className="mb-3">
                      You may opt out at any time by replying to any message:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-lg bg-forteca-navy px-3.5 py-2 text-xs font-bold tracking-wider text-white">
                        STOP — Unsubscribe
                      </span>
                      <span className="inline-flex items-center rounded-lg bg-forteca-navy/10 px-3.5 py-2 text-xs font-bold tracking-wider text-forteca-navy ring-1 ring-forteca-navy/15">
                        HELP — Get assistance
                      </span>
                    </div>
                    <p className="mt-3">
                      For assistance, contact us at{" "}
                      <a
                        href="mailto:forteca@fortecaestate.com"
                        className="font-semibold text-forteca-gold hover:underline"
                      >
                        forteca@fortecaestate.com
                      </a>{" "}
                      or{" "}
                      <a href="tel:+14842863223" className="font-semibold text-forteca-gold hover:underline">
                        (484) 286-3223
                      </a>
                      .
                    </p>
                  </div>

                  <div>
                    <SubHeading>Message &amp; Data Rates Disclaimer</SubHeading>
                    <p>
                      Message and data rates may apply depending on your mobile carrier and
                      service plan.
                    </p>
                  </div>

                  <div>
                    <SubHeading>Carrier Liability Disclaimer</SubHeading>
                    <p>
                      Carriers are not liable for delayed or undelivered messages. Delivery
                      of messages is subject to effective transmission by your mobile carrier
                      and is not guaranteed.
                    </p>
                  </div>
                </div>
              </article>

              <article
                id="social-media"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={Share2}>Third-Party Social Media Services</SectionHeading>
                <div className="space-y-3 text-sm leading-relaxed text-forteca-navy/70">
                  <p>
                    The Service may display, include, make available, or link to content or
                    services provided by a Third-Party Social Media Service. A Third-Party
                    Social Media Service is not owned or controlled by the Company, and the
                    Company does not endorse or assume responsibility for any Third-Party
                    Social Media Service.
                  </p>
                  <p>
                    You acknowledge and agree that the Company shall not be responsible or
                    liable, directly or indirectly, for any damage or loss caused by or in
                    connection with Your access to or use of any Third-Party Social Media
                    Service.
                  </p>
                  <p>
                    Your use of any Third-Party Social Media Service is governed by that
                    service&apos;s own terms and privacy policies.
                  </p>
                </div>
              </article>

              <article
                id="termination"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={Ban}>Termination</SectionHeading>
                <div className="space-y-3 text-sm leading-relaxed text-forteca-navy/70">
                  <p>
                    We may terminate or suspend Your access immediately, without prior notice
                    or liability, for any reason whatsoever, including without limitation if
                    You breach these Terms and Conditions.
                  </p>
                  <p>Upon termination, Your right to use the Service will cease immediately.</p>
                </div>
              </article>

              <article
                id="limitation"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={Scale}>Limitation of Liability</SectionHeading>
                <div className="space-y-3 text-sm leading-relaxed text-forteca-navy/70">
                  <p>
                    Notwithstanding any damages that You might incur, the entire liability of
                    the Company and any of its suppliers under any provision of these Terms
                    and Your exclusive remedy for all of the foregoing shall be limited to
                    the amount actually paid by You through the Service or{" "}
                    <strong className="font-semibold text-forteca-navy">100 USD</strong> if
                    You haven&apos;t purchased anything through the Service.
                  </p>
                  <p>
                    To the maximum extent permitted by applicable law, in no event shall the
                    Company or its suppliers be liable for any special, incidental, indirect,
                    or consequential damages whatsoever, including but not limited to damages
                    for loss of profits, loss of data, business interruption, personal injury,
                    or loss of privacy, even if the Company or any supplier has been advised
                    of the possibility of such damages.
                  </p>
                  <p>
                    Some states do not allow the exclusion of implied warranties or limitation
                    of liability for incidental or consequential damages, which means that
                    some of the above limitations may not apply. In these states, each
                    party&apos;s liability will be limited to the greatest extent permitted
                    by law.
                  </p>
                </div>
              </article>

              <article
                id="disclaimer"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={Layers}>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</SectionHeading>
                <div className="space-y-3 text-sm leading-relaxed text-forteca-navy/70">
                  <p>
                    The Service is provided to You &quot;AS IS&quot; and &quot;AS
                    AVAILABLE&quot; with all faults and defects without warranty of any kind.
                    To the maximum extent permitted under applicable law, the Company
                    expressly disclaims all warranties, whether express, implied, statutory
                    or otherwise, including all implied warranties of merchantability, fitness
                    for a particular purpose, title and non-infringement.
                  </p>
                  <p>
                    The Company provides no warranty that the Service will meet Your
                    requirements, achieve any intended results, be compatible with any other
                    software or services, operate without interruption, or be error free.
                  </p>
                  <p>
                    Some jurisdictions do not allow certain exclusions or limitations on
                    applicable statutory rights of a consumer, so some or all of the above
                    exclusions and limitations may not apply to You. In such a case the
                    exclusions and limitations set forth in this section shall be applied to
                    the greatest extent enforceable under applicable law.
                  </p>
                </div>
              </article>

              <article
                id="governing-law"
                className="scroll-mt-24 rounded-2xl bg-white/60 p-8 shadow-sm ring-1 ring-forteca-navy/[0.06] transition-all duration-300 hover:shadow-md hover:ring-forteca-gold/20"
              >
                <SectionHeading icon={WifiOff}>Governing Law</SectionHeading>
                <p className="text-sm leading-relaxed text-forteca-navy/70">
                  The laws of the Country, excluding its conflicts of law rules, shall govern
                  these Terms and Your use of the Service. Your use of the Application may
                  also be subject to other local, state, national, or international laws.
                </p>
              </article>

              {/* Contact — inverted navy card */}
              <article
                id="contact"
                className="scroll-mt-24 relative overflow-hidden rounded-2xl bg-forteca-navy p-8 ring-1 ring-forteca-gold/15"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-forteca-gold/[0.06] blur-3xl" />
                <div className="relative">
                  <div className="mb-7 flex items-center gap-4">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                      <Mail className="h-5 w-5 text-forteca-gold" />
                    </span>
                    <h2 className="font-serif text-xl font-bold text-white sm:text-2xl">
                      Contact Us
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">
                    Questions about these terms? We&apos;re here to help.
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
