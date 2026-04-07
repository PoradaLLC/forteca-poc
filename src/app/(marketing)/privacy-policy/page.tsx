import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Forteca Estate privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-forteca-cream px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-4xl font-bold text-forteca-navy">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-forteca-slate">
          Last updated: January 1, 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-forteca-navy/70">
          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              1. Information We Collect
            </h2>
            <p>
              When you book a stay, contact us, or browse our website, we may
              collect the following information:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Name, email address, phone number</li>
              <li>Billing and payment information (processed securely via Stripe)</li>
              <li>Booking details (dates, property, guest count)</li>
              <li>Communications you send us (contact forms, emails)</li>
              <li>Device and usage data (cookies, IP address, browser type)</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Process and manage your bookings</li>
              <li>Send booking confirmations and check-in instructions</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Improve our website and services</li>
              <li>Send marketing communications (only with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              3. Payment Security
            </h2>
            <p>
              All payment processing is handled by Stripe, a PCI-DSS Level 1
              certified payment processor. We never store your full credit card
              number on our servers. Payment data is encrypted in transit and at
              rest.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              4. Cookies
            </h2>
            <p>
              We use essential cookies to maintain your session and preferences.
              We may also use analytics cookies (such as Vercel Analytics) to
              understand how visitors use our site. You can disable cookies in
              your browser settings, though some features may not work correctly.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              5. Third-Party Services
            </h2>
            <p>We share data with the following third-party services as necessary:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Supabase</strong> — database and authentication</li>
              <li><strong>Resend</strong> — transactional email delivery</li>
              <li><strong>Vercel</strong> — website hosting and analytics</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              6. Data Retention
            </h2>
            <p>
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this policy, comply with legal
              obligations, and resolve disputes. Booking records are retained for
              a minimum of 7 years for tax and legal compliance.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              7. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal retention requirements)</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              8. Contact Us
            </h2>
            <p>
              If you have questions about this privacy policy or your personal
              data, contact us at{" "}
              <a
                href="mailto:fortecaestate@gmail.com"
                className="font-semibold text-forteca-gold hover:underline"
              >
                fortecaestate@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
