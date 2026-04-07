import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProperty, getPropertySlugs } from "@/lib/properties";
import { BookingClient } from "./BookingClient";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ checkin?: string; checkout?: string; guests?: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  return {
    title: property ? `Book — ${property.name}` : "Book",
  };
}

export default async function BookingPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const property = await getProperty(slug);
  if (!property) notFound();

  return (
    <BookingClient
      property={property}
      initialCheckIn={sp.checkin}
      initialCheckOut={sp.checkout}
      initialGuests={sp.guests ? Number(sp.guests) : 2}
    />
  );
}
