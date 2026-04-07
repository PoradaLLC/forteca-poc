import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { BedDouble, Bath, Users, ExternalLink, Plus, Circle } from "lucide-react";

export const metadata: Metadata = { title: "Properties" };

export default async function AdminPropertiesPage() {
  const supabase = await createServiceClient();
  const { data: properties } = await supabase
    .from("properties")
    .select("id, slug, name, tagline, bedrooms, bathrooms, max_guests, base_price, status, airbnb_url")
    .order("name");

  const statusColor = {
    active: "text-green-400",
    inactive: "text-yellow-400",
    maintenance: "text-red-400",
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Properties</h1>
          <p className="mt-1 text-sm text-white/40">{properties?.length ?? 0} total</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-forteca-gold px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {["Property", "Beds / Baths / Guests", "Rate", "Status", "Links"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-white/30">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {(properties ?? []).map((p: {
              id: string;
              slug: string;
              name: string;
              tagline: string | null;
              bedrooms: number;
              bathrooms: number;
              max_guests: number;
              base_price: number;
              status: string;
              airbnb_url: string | null;
            }) => (
              <tr key={p.id} className="group transition-colors hover:bg-white/[0.03]">
                <td className="px-5 py-4">
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="mt-0.5 text-xs text-white/40 truncate max-w-[200px]">
                    {p.tagline ?? p.slug}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4 text-white/60">
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="h-3.5 w-3.5" /> {p.bedrooms}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="h-3.5 w-3.5" /> {p.bathrooms}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> {p.max_guests}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 font-semibold text-white">
                  ${p.base_price}<span className="text-xs text-white/40">/night</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`flex items-center gap-1.5 text-xs font-semibold capitalize ${statusColor[p.status as keyof typeof statusColor] ?? "text-white/40"}`}>
                    <Circle className="h-2 w-2 fill-current" />
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/properties/${p.slug}`}
                      target="_blank"
                      className="text-xs text-white/40 hover:text-white transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    {p.airbnb_url && (
                      <a
                        href={p.airbnb_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white/40 hover:text-white transition-colors"
                      >
                        Airbnb
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
