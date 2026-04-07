import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Heart,
  Shield,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Forteca Estate — who we are, why we do this, and what makes our Pocono properties different.",
};

const stats = [
  { value: "2019", label: "Founded" },
  { value: "13", label: "Properties" },
  { value: "500+", label: "Stays Hosted" },
  { value: "4.9★", label: "Avg. Rating" },
];

const values = [
  {
    icon: Heart,
    title: "Genuine Hospitality",
    description:
      "Every detail is considered because every guest matters. We design experiences, not just accommodations.",
  },
  {
    icon: Shield,
    title: "Uncompromising Standards",
    description:
      "Spotless properties, reliable check-ins, honest descriptions. We hold our portfolio to the standard we'd want for ourselves.",
  },
  {
    icon: Star,
    title: "Curated Excellence",
    description:
      "Not just any property makes it into the Forteca portfolio. We seek out spaces with character, craft, and a point of view.",
  },
  {
    icon: Sparkles,
    title: "The Pocono Difference",
    description:
      "We're not a platform — we're local operators who know these mountains, these roads, and these communities intimately.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="grain bg-forteca-navy px-4 pb-20 pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            Our Story
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight text-white sm:text-6xl">
            We Love the Poconos.
            <br />
            <span className="text-forteca-gold">That&apos;s Why We&apos;re Here.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Forteca Estate was built on a simple belief: that a great stay changes
            a trip, and a great trip changes a person. Since 2019, we&apos;ve been
            building a portfolio of mountain properties that earn that kind of
            response — every time.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-forteca-navy/10 bg-forteca-cream-dark">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-2 divide-x divide-y divide-forteca-navy/10 sm:grid-cols-4 sm:divide-y-0">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center py-7 text-center">
                <span className="font-serif text-3xl font-bold text-forteca-navy">
                  {value}
                </span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-forteca-slate">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="bg-forteca-cream px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            The Beginning
          </p>
          <h2 className="mb-6 font-serif text-3xl font-bold text-forteca-navy">
            Built from a personal frustration
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-forteca-slate">
            <p>
              The founders of Forteca Estate spent years booking Pocono
              getaways for friends and family — and kept running into the same
              problem. Properties that looked beautiful online arrived with
              maintenance issues, unclear check-in instructions, and no one to
              call when something went wrong.
            </p>
            <p>
              In 2019, they decided to do it right. Starting with a single
              property, they built every system from scratch: the cleaning
              protocols, the guest communication workflows, the property
              inspection checklists. The goal wasn&apos;t to become the biggest
              operator in the Poconos. It was to become the best one.
            </p>
            <p>
              Five years later, the portfolio has grown to 13 properties — each
              one selected with the same standards, managed with the same care,
              and reviewed by guests who return season after season.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="grain bg-forteca-navy px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
              What We Stand For
            </p>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Our Values
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/5 bg-white/5 p-7"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-forteca-gold/10">
                  <Icon className="h-5 w-5 text-forteca-gold" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold text-white">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forteca-cream px-4 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="font-serif text-3xl font-bold text-forteca-navy">
            Come see for yourself.
          </h2>
          <p className="mt-4 text-base text-forteca-slate">
            Browse our full portfolio of Pocono properties and find the one
            that&apos;s right for your group.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full bg-forteca-navy px-7 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-forteca-navy-light"
            >
              Browse Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-forteca-navy/20 px-7 py-3 text-sm font-semibold text-forteca-navy transition-colors hover:border-forteca-navy/40"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
