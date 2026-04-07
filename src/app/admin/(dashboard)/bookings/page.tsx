import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { BookingStatusSelect } from "@/components/admin/AdminActions";

export const metadata: Metadata = { title: "Bookings" };

export default async function AdminBookingsPage() {
  const supabase = await createServiceClient();

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      id, check_in, check_out, num_guests, total_amount, status, source, created_at,
      guests ( first_name, last_name, email ),
      properties ( name, slug )
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Bookings</h1>
        <p className="mt-1 text-sm text-white/40">{bookings?.length ?? 0} total</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Guest", "Property", "Dates", "Guests", "Total", "Source", "Status", "Booked"].map((h) => (
                  <th key={h} className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-white/30">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(bookings ?? []).length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-sm text-white/30">
                    No bookings yet.
                  </td>
                </tr>
              ) : (
                (bookings ?? []).map((b: {
                  id: string;
                  check_in: string;
                  check_out: string;
                  num_guests: number;
                  total_amount: number;
                  status: string;
                  source: string;
                  created_at: string;
                  guests: { first_name: string; last_name: string; email: string }[];
                  properties: { name: string; slug: string }[];
                }) => {
                  const guest = b.guests?.[0] ?? null;
                  const property = b.properties?.[0] ?? null;
                  return (
                  <tr key={b.id} className="transition-colors hover:bg-white/[0.03]">
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">
                        {guest ? `${guest.first_name} ${guest.last_name}` : "—"}
                      </p>
                      <p className="text-xs text-white/40">{guest?.email}</p>
                    </td>
                    <td className="px-5 py-4 text-white/70">{property?.name ?? "—"}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-white/70">
                      {b.check_in} → {b.check_out}
                    </td>
                    <td className="px-5 py-4 text-center text-white/70">{b.num_guests}</td>
                    <td className="px-5 py-4 font-semibold text-forteca-gold">${b.total_amount}</td>
                    <td className="px-5 py-4 capitalize text-white/40">{b.source}</td>
                    <td className="px-5 py-4">
                      <BookingStatusSelect bookingId={b.id} currentStatus={b.status} />
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-white/30">
                      {formatDate(b.created_at)}
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
