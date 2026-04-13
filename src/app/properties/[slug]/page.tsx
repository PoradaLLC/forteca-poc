import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Users,
  BedDouble,
  Bath,
  MapPin,
  Check,
  ArrowLeft,
} from "lucide-react";
import { getProperty, getPropertySlugs } from "@/lib/properties";
import { createServiceClient } from "@/lib/supabase/server";
import { BookingSidebar } from "@/components/booking/BookingSidebar";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return {};
  return {
    title: property.name,
    description: property.tagline,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();

  const heroImage = property.images?.[0]?.src;

  // Fetch reviews from Supabase
  let reviews: { author: string; quote: string; rating: number }[] = [];
  let avgRating = 0;
  let reviewCount = 0;
  try {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("reviews")
      .select("guest_name, content, rating")
      .eq("property_id", property.id)
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(10);
    if (data && data.length > 0) {
      reviews = data.map((r: { guest_name: string; content: string | null; rating: number }) => ({
        author: r.guest_name,
        quote: r.content ?? "",
        rating: r.rating,
      }));
      reviewCount = data.length;
      avgRating = data.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / data.length;
    }
  } catch {
    // Supabase not configured — no reviews
  }

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
        {heroImage ? (
          <Image
            src={heroImage}
            alt={property.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-zinc-900 to-stone-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forteca-navy/80 via-forteca-navy/10 to-transparent" />

        {/* Property name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
              {property.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-forteca-gold" />
                {property.location}
              </span>
              {reviewCount > 0 && (
                <span className="flex items-center gap-1.5 text-sm text-white/70">
                  <Star className="h-4 w-4 fill-forteca-gold text-forteca-gold" />
                  {avgRating.toFixed(1)} · {reviewCount} reviews
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Photo gallery */}
      {property.images && property.images.length > 1 && (
        <section className="bg-forteca-cream-dark px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {property.images.slice(1, 11).map((img) => (
                <div key={img.src} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
            {reviews.length > 0 && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <h2 className="font-serif text-2xl font-bold text-forteca-navy">
                    Guest Reviews
                  </h2>
                  <span className="flex items-center gap-1 rounded-full bg-forteca-gold/10 px-3 py-1 text-sm font-bold text-forteca-gold">
                    <Star className="h-3.5 w-3.5 fill-forteca-gold" />
                    {avgRating.toFixed(1)}
                  </span>
                </div>
                <div className="space-y-4">
                  {reviews.map((review) => (
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
            <BookingSidebar
              propertySlug={property.slug}
              basePrice={property.base_price}
              minNights={property.min_nights}
              airbnbUrl={property.airbnb_url}
              vrboUrl={property.vrbo_url}
              hospitableWidgetUrl={property.hospitable_widget_url}
            />
          </div>
        </div>
      </section>
    </>
  );
}
