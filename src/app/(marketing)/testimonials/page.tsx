import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight, Quote } from "lucide-react";
import { properties } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what guests say about their Forteca Estate experience — real reviews from real stays in the Pocono Mountains.",
};

// Collect all reviews from properties + add standalone ones
const propertyReviews = properties.flatMap((p) =>
  p.reviews.map((r) => ({
    ...r,
    property: p.name,
    propertySlug: p.slug,
  }))
);

const standaloneReviews = [
  {
    author: "Sarah & Marcus T.",
    quote:
      "We've stayed at three Forteca properties now — every one has been immaculate, thoughtfully stocked, and exactly as described. They've ruined other rentals for us.",
    rating: 5,
    property: "Blvck Cabin I · Blve Cabin · Scenic Getaway",
    propertySlug: null,
  },
  {
    author: "The Johnson Family",
    quote:
      "Pocono Villa was the most impressive rental I've ever seen. 14 family members, zero complaints, memories we'll talk about for decades.",
    rating: 5,
    property: "Pocono Villa",
    propertySlug: "pocono-villa",
  },
  {
    author: "Monique D.",
    quote:
      "Booked Rustic Heaven for a long weekend and ended up extending two extra nights. The kind of place that makes you forget what day it is.",
    rating: 5,
    property: "Rustic Heaven",
    propertySlug: "perfect-pocono",
  },
  {
    author: "David K.",
    quote:
      "The hot tub overlooking the trees at sunset is something I think about at least once a week. Already planning trip number four.",
    rating: 5,
    property: "Arctic Getaway",
    propertySlug: "arctic-getaway",
  },
  {
    author: "Lisa & Tom R.",
    quote:
      "We compared Forteca's direct price to Airbnb and saved over $200. Plus the communication was faster and more personal. Won't book through a platform again.",
    rating: 5,
    property: "Mountain Oasis",
    propertySlug: "mountain-oasis",
  },
];

const allReviews = [...standaloneReviews, ...propertyReviews];

// Calculate aggregate
const avgRating =
  allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="grain bg-forteca-navy px-4 pb-16 pt-14">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            Guest Reviews
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            What Our Guests Say
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
            Real reviews from real stays. Nothing edited, nothing filtered.
          </p>

          {/* Aggregate stats */}
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-5 w-5 fill-forteca-gold text-forteca-gold" />
                <span className="font-serif text-3xl font-bold text-white">
                  {avgRating.toFixed(1)}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/40">Average Rating</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <span className="font-serif text-3xl font-bold text-white">
                {allReviews.length}
              </span>
              <p className="mt-1 text-xs text-white/40">Reviews</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <span className="font-serif text-3xl font-bold text-white">
                13
              </span>
              <p className="mt-1 text-xs text-white/40">Properties</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {allReviews.map((review, i) => (
              <div
                key={`${review.author}-${i}`}
                className="mb-6 break-inside-avoid rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5"
              >
                <Quote className="mb-3 h-6 w-6 text-forteca-gold/30" />

                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-3.5 w-3.5 fill-forteca-gold text-forteca-gold"
                    />
                  ))}
                </div>

                <blockquote className="font-serif text-base italic leading-relaxed text-forteca-navy/80">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                <div className="mt-5 border-t border-forteca-navy/5 pt-4">
                  <p className="text-sm font-bold text-forteca-navy">
                    {review.author}
                  </p>
                  {review.propertySlug ? (
                    <Link
                      href={`/properties/${review.propertySlug}`}
                      className="text-xs text-forteca-gold transition-colors hover:text-forteca-gold-light"
                    >
                      {review.property}
                    </Link>
                  ) : (
                    <p className="text-xs text-forteca-slate">
                      {review.property}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain bg-forteca-navy px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-white">
            Ready to create your own story?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/50">
            Browse our properties and book direct for the best rates.
          </p>
          <Link
            href="/properties"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
          >
            Browse Properties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
