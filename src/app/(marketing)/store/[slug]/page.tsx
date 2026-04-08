import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { storeProducts, getProduct } from "@/lib/store-data";
import { ProductDetail } from "./ProductDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return storeProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <div className="bg-forteca-navy px-4 py-3">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>
        </div>
      </div>

      <section className="bg-forteca-cream px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <ProductDetail product={product} />
        </div>
      </section>
    </>
  );
}
