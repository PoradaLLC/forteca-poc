import type { Metadata } from "next";
import { ExternalLink, CreditCard, Receipt, TrendingUp, Shield } from "lucide-react";

export const metadata: Metadata = { title: "Stripe" };

const features = [
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "Accept credit cards, Apple Pay, Google Pay, and bank transfers.",
  },
  {
    icon: Receipt,
    title: "Invoices & Receipts",
    description: "Automatic receipts for guests and invoicing for property owners.",
  },
  {
    icon: TrendingUp,
    title: "Revenue & Payouts",
    description: "Track revenue, manage payouts, and view financial reports.",
  },
  {
    icon: Shield,
    title: "Fraud Protection",
    description: "Built-in fraud detection and chargeback management.",
  },
];

export default function AdminStripePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-white">Stripe</h1>
        <p className="mt-1 text-sm text-white/40">
          Payment processing and financial management
        </p>
      </div>

      {/* Main CTA */}
      <div className="mb-8 rounded-2xl border border-white/5 bg-white/5 p-8 text-center">
        <h2 className="mb-2 font-serif text-2xl font-bold text-white">
          Payments & Financials
        </h2>
        <p className="mx-auto mb-6 max-w-md text-sm text-white/50">
          Stripe handles all payment processing for direct bookings. View
          transactions, manage payouts, and track revenue from the Stripe
          dashboard.
        </p>
        <a
          href="https://dashboard.stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-forteca-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
        >
          <ExternalLink className="h-4 w-4" />
          Open Stripe Dashboard
        </a>
      </div>

      {/* Features grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/5 bg-white/5 p-6"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-forteca-gold/10">
              <Icon className="h-5 w-5 text-forteca-gold" />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-white">{title}</h3>
            <p className="text-xs text-white/40">{description}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-8 rounded-2xl border border-white/5 bg-white/5 p-6">
        <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
        <div className="space-y-2">
          {[
            { label: "Stripe Dashboard", url: "https://dashboard.stripe.com" },
            { label: "Payments", url: "https://dashboard.stripe.com/payments" },
            { label: "Payouts", url: "https://dashboard.stripe.com/payouts" },
            { label: "Customers", url: "https://dashboard.stripe.com/customers" },
          ].map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              {label}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
