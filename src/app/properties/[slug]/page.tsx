import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Users,
  BedDouble,
  Bath,
  MapPin,
  Check,
  ArrowLeft,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { getProperty, properties } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};
  return {
    title: property.name,
    description: property.tagline,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const nights = 3;
  const subtotal = property.base_price * nights;
  const total = subtotal + property.cleaning_fee;

  return (
    <>
      {/* Back nav */}
      <div className="bg-forteca-navy px-4 py-3">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Properties
          </Link>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-[55vh] overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            property.gradient
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forteca-navy/80 via-forteca-navy/10 to-transparent" />

        {/* Property name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10">
          <div className="mx-auto max-w-7xl">
            {property.badge && (
              <span className="mb-3 inline-block rounded-full bg-forteca-gold px-3 py-1 text-xs font-bold uppercase tracking-widest text-forteca-navy">
                {property.badge}
              </span>
            )}
            <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
              {property.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-forteca-gold" />
                {property.location}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-white/70">
                <Star className="h-4 w-4 fill-forteca-gold text-forteca-gold" />
                {property.rating} · {property.review_count} reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="bg-forteca-cream px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
          {/* Left: Details */}
          <div className="lg:col-span-2">
            {/* Quick specs */}
            <div className="mb-8 grid grid-cols-3 gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5">
              {[
                { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
                { icon: Bath, label: "Bathrooms", value: property.bathrooms },
                { icon: Users, label: "Max Guests", value: property.max_guests },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <Icon className="mb-2 h-5 w-5 text-forteca-gold" />
                  <span className="text-2xl font-bold text-forteca-navy">
                    {value}
                  </span>
                  <span className="text-xs text-forteca-slate">{label}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-4 font-serif text-2xl font-bold text-forteca-navy">
                About This Property
              </h2>
              <p className="leading-relaxed text-forteca-slate">
                {property.description}
              </p>
            </div>

            <div className="gold-rule-left mb-8 w-24" />

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="mb-5 font-serif text-2xl font-bold text-forteca-navy">
                Amenities
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-forteca-navy/5"
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-forteca-gold/10">
                      <Check className="h-3.5 w-3.5 text-forteca-gold" />
                    </div>
                    <span className="text-sm text-forteca-navy">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="gold-rule-left mb-8 w-24" />

            {/* Reviews */}
            {property.reviews.length > 0 && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <h2 className="font-serif text-2xl font-bold text-forteca-navy">
                    Guest Reviews
                  </h2>
                  <span className="flex items-center gap-1 rounded-full bg-forteca-gold/10 px-3 py-1 text-sm font-bold text-forteca-gold">
                    <Star className="h-3.5 w-3.5 fill-forteca-gold" />
                    {property.rating}
                  </span>
                </div>
                <div className="space-y-4">
                  {property.reviews.map((review) => (
                    <div
                      key={review.author}
                      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5"
                    >
                      <div className="mb-3 flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-forteca-gold text-forteca-gold"
                          />
                        ))}
                      </div>
                      <blockquote className="font-serif italic text-forteca-navy/80">
                        &ldquo;{review.quote}&rdquo;
                      </blockquote>
                      <p className="mt-3 text-sm font-semibold text-forteca-slate">
                        — {review.author}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl bg-forteca-navy p-6 shadow-xl">
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
                Book Direct · Best Rate
              </div>
              <div className="mb-5 flex items-baseline gap-1">
                <span className="font-serif text-3xl font-bold text-white">
                  ${property.base_price}
                </span>
                <span className="text-sm text-white/50">/ night</span>
              </div>

              {/* Price preview */}
              <div className="mb-5 space-y-2 rounded-xl bg-white/5 p-4 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>${property.base_price} × {nights} nights (est.)</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Cleaning fee</span>
                  <span>${property.cleaning_fee}</span>
                </div>
                <div className="gold-rule my-2" />
                <div className="flex justify-between font-bold text-white">
                  <span>Est. Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <Link
                href={`/booking/${property.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-forteca-gold py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
              >
                <Calendar className="h-4 w-4" />
                Check Availability
              </Link>

              {property.airbnb_url && (
                <a
                  href={property.airbnb_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  View on Airbnb
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              <p className="mt-4 text-center text-xs text-white/30">
                Min. {property.min_nights} nights · Free cancellation
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
