import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight, Quote } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what guests say about their Forteca Estate experience — real reviews from real stays.",
};

interface ReviewRow {
  id: string;
  guest_name: string;
  rating: number;
  content: string | null;
  source: string;
  is_featured: boolean;
  created_at: string;
  properties: { name: string; slug: string }[] | null;
}

const sourceLabel: Record<string, string> = {
  airbnb: "Airbnb",
  vrbo: "VRBO",
  google: "Google",
  hospitable: "Hospitable",
  direct: "Direct",
};

export default async function TestimonialsPage() {
  const supabase = await createServiceClient();

  const { data } = await supabase
    .from("reviews")
    .select(`
      id, guest_name, rating, content, source, is_featured, created_at,
      properties ( name, slug )
    `)
    .eq("is_approved", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(100);

  const reviews = (data ?? []) as ReviewRow[];

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const propertyCount = new Set(
    reviews.map((r) => r.properties?.[0]?.slug).filter(Boolean)
  ).size;

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

          {reviews.length > 0 && (
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
                  {reviews.length}
                </span>
                <p className="mt-1 text-xs text-white/40">Reviews</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <span className="font-serif text-3xl font-bold text-white">
                  {propertyCount}
                </span>
                <p className="mt-1 text-xs text-white/40">Properties</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Reviews grid */}
      <section className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {reviews.length === 0 ? (
            <div className="py-20 text-center">
              <Star className="mx-auto mb-4 h-12 w-12 text-forteca-navy/20" />
              <h2 className="font-serif text-2xl font-bold text-forteca-navy">
                Reviews Coming Soon
              </h2>
              <p className="mt-2 text-forteca-slate">
                We&apos;re collecting guest reviews. Check back soon!
              </p>
            </div>
          ) : (
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="mb-6 break-inside-avoid rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5"
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <Quote className="h-6 w-6 shrink-0 text-forteca-gold/30" />
                    {review.source !== "direct" && (
                      <span className="rounded-full bg-forteca-navy/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-forteca-slate">
                        {sourceLabel[review.source] ?? review.source}
                      </span>
                    )}
                  </div>

                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-3.5 w-3.5 fill-forteca-gold text-forteca-gold"
                      />
                    ))}
                  </div>

                  <blockquote className="font-serif text-base italic leading-relaxed text-forteca-navy/80">
                    &ldquo;{review.content}&rdquo;
                  </blockquote>

                  <div className="mt-5 border-t border-forteca-navy/5 pt-4">
                    <p className="text-sm font-bold text-forteca-navy">
                      {review.guest_name}
                    </p>
                    {review.properties?.[0] ? (
                      <Link
                        href={`/properties/${review.properties[0].slug}`}
                        className="text-xs text-forteca-gold transition-colors hover:text-forteca-gold-light"
                      >
                        {review.properties[0].name}
                      </Link>
                    ) : (
                      <p className="text-xs text-forteca-slate">
                        Forteca Estate
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
