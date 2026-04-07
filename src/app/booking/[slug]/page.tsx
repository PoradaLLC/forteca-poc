import { redirect } from "next/navigation";
import { getProperty } from "@/lib/properties";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BookingPage({ params }: Props) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    redirect("/properties");
  }

  // Redirect to DirectStays/Hospitable booking page
  redirect(`https://fortecaestate.directstays.com/property/${property.slug}`);
}
