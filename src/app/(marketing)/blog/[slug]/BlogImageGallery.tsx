"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogImage {
  url: string;
  path: string;
}

export function BlogImageGallery({
  images,
  title,
}: {
  images: BlogImage[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);

  function prev() {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }
  function next() {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }

  if (images.length === 1) {
    return (
      <section className="bg-forteca-cream-dark px-4 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={images[0].url}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 768px"
              priority
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-forteca-cream-dark px-4 py-6">
      <div className="mx-auto max-w-3xl">
        {/* Main image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={images[current].url}
            alt={`${title} — photo ${current + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 768px"
            priority={current === 0}
          />

          {/* Navigation arrows */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-3 right-3 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {current + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail strip */}
        {images.length > 2 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={img.path}
                type="button"
                onClick={() => setCurrent(i)}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                  i === current
                    ? "ring-2 ring-forteca-gold ring-offset-2 ring-offset-forteca-cream-dark"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
