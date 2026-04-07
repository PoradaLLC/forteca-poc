import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  MapPin,
  DollarSign,
  Search,
  HandshakeIcon,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Real Estate",
  description:
    "Buy or sell investment properties in the Pocono Mountains with Forteca Estate — local expertise, market knowledge, and rental-ready analysis.",
};

const buyerBenefits = [
  "Investment property analysis & ROI projections",
  "Off-market deal sourcing from our local network",
  "Post-purchase rental setup through our management arm",
  "Market trend briefings specific to the Poconos",
  "Financing partner introductions",
  "Property inspection coordination",
];

const sellerBenefits = [
  "Comparative market analysis & pricing strategy",
  "Professional photography & staging",
  "Multi-channel marketing (MLS, social, network)",
  "Negotiation & closing management",
  "Tenant coordination during sale if applicable",
  "Post-sale transition support",
];

export default function RealEstatePage() {
  return (
    <>
      {/* Hero */}
      <section className="grain bg-forteca-navy px-4 pb-20 pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <Link
            href="/services"
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-forteca-gold/60 transition-colors hover:text-forteca-gold"
          >
            ← Services
          </Link>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            Real Estate
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50">
            Buy or sell investment properties in the Poconos with a team who
            knows the market intimately from the inside. We live here, invest
            here, and manage here.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
          >
            <Phone className="h-4 w-4" />
            Talk to an Agent
          </Link>
        </div>
      </section>

      {/* Why Poconos */}
      <section className="bg-forteca-cream px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              The Market
            </p>
            <h2 className="font-serif text-3xl font-bold text-forteca-navy">
              Why Invest in the Poconos?
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MapPin,
                title: "NYC & Philly Access",
                stat: "< 2 hrs",
                description: "Drive from the two largest Northeast metros",
              },
              {
                icon: TrendingUp,
                title: "Growing Demand",
                stat: "Year-round",
                description: "Ski season, summer lake, fall foliage, spring hiking",
              },
              {
                icon: DollarSign,
                title: "Strong ROI",
                stat: "8-14%",
                description: "Average net return on managed vacation rentals",
              },
              {
                icon: Search,
                title: "Undervalued",
                stat: "vs. peers",
                description: "Lower entry price than Catskills, Hamptons, or Vermont",
              },
            ].map(({ icon: Icon, title, stat, description }) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-forteca-navy/5"
              >
                <Icon className="mx-auto mb-3 h-6 w-6 text-forteca-gold" />
                <p className="font-serif text-2xl font-bold text-forteca-navy">
                  {stat}
                </p>
                <h3 className="mt-1 text-sm font-bold text-forteca-navy">
                  {title}
                </h3>
                <p className="mt-1 text-xs text-forteca-slate">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyers & Sellers */}
      <section className="bg-forteca-cream-dark px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          {/* Buyers */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-forteca-navy/5">
            <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-forteca-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-forteca-gold">
              <Search className="h-3.5 w-3.5" />
              Buyers
            </div>
            <h3 className="mt-4 font-serif text-2xl font-bold text-forteca-navy">
              Buying in the Poconos
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-forteca-slate">
              Whether it&apos;s your first vacation property or you&apos;re
              expanding a portfolio, we source deals, run the numbers, and set up
              the rental operation after closing.
            </p>
            <ul className="mt-6 space-y-2.5">
              {buyerBenefits.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-forteca-navy"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-forteca-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Sellers */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-forteca-navy/5">
            <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-forteca-navy/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-forteca-navy">
              <HandshakeIcon className="h-3.5 w-3.5" />
              Sellers
            </div>
            <h3 className="mt-4 font-serif text-2xl font-bold text-forteca-navy">
              Selling Your Property
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-forteca-slate">
              We know what buyers in this market want because we manage properties
              here every day. That insight translates into faster sales at better
              prices.
            </p>
            <ul className="mt-6 space-y-2.5">
              {sellerBenefits.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-forteca-navy"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-forteca-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain bg-forteca-navy px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-white">
            Let&apos;s find your next investment
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/50">
            Free market briefing and property analysis. No obligation — just
            local expertise.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
