import Image from "next/image";
import Link from "next/link";
import { Star, Users, BedDouble, Bath, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PropertyCardData {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  base_price: number;
  amenities: string[];
  images?: { src: string; alt: string }[];
  heroImage?: string;
  gradient?: string;
  badge?: string;
  rating?: number;
  review_count?: number;
}

interface PropertyCardProps {
  property: PropertyCardData;
  className?: string;
  /** "grid" for listing page, "feature" for home page featured section */
  variant?: "grid" | "feature";
}

export function PropertyCard({
  property,
  className,
  variant = "grid",
}: PropertyCardProps) {
  const isFeature = variant === "feature";
  const heroImage = property.heroImage ?? property.images?.[0]?.src;

  return (
    <Link
      href={`/properties/${property.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-forteca-navy card-lift",
        className
      )}
    >
      {/* Image / Gradient placeholder */}
      <div
        className={cn(
          "relative overflow-hidden img-zoom",
          isFeature ? "h-72" : "h-56"
        )}
      >
        {heroImage ? (
          <Image
            src={heroImage}
            alt={property.name}
            fill
            className="object-cover transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br transition-transform duration-500",
              property.gradient
            )}
          />
        )}
        {/* Atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forteca-navy/60 via-transparent to-transparent" />

        {/* Badge */}
        {property.badge && (
          <div className="absolute left-4 top-4 z-10 rounded-full bg-forteca-gold px-3 py-1 text-xs font-bold uppercase tracking-widest text-forteca-navy">
            {property.badge}
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
          <Star className="h-3 w-3 fill-forteca-gold text-forteca-gold" />
          <span className="text-xs font-semibold text-white">
            {property.rating}
          </span>
          <span className="text-xs text-white/60">({property.review_count})</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-forteca-gold/80">
          {property.location}
        </p>
        <h3 className="font-serif text-lg font-bold leading-tight text-white group-hover:text-forteca-gold-light transition-colors duration-200">
          {property.name}
        </h3>
        <p className="mt-1 text-sm text-white/50 line-clamp-2">
          {property.tagline}
        </p>

        {/* Specs row */}
        <div className="mt-4 flex items-center gap-4 text-xs text-white/60">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5" />
            {property.bedrooms} BR
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-3.5 w-3.5" />
            {property.bathrooms} BA
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Up to {property.max_guests}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <span className="text-xl font-bold text-white">
              ${property.base_price}
            </span>
            <span className="ml-1 text-xs text-white/50">/ night</span>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-forteca-gold transition-transform duration-200 group-hover:translate-x-1">
            View
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
