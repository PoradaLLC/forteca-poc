import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import {
  Home,
  BookOpen,
  Users,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react";

export const metadata: Metadata = { title: "Dashboard" };

async function getDashboardData() {
  const supabase = await createServiceClient();
  const now = new Date().toISOString().split("T")[0];

  const [
    { count: totalProperties },
    { count: totalBookings },
    { count: totalGuests },
    { count: pendingReviews },
    { data: upcomingBookings },
    { data: recentBookings },
  ] = await Promise.all([
    supabase.from("properties").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "confirmed"),
    supabase.from("guests").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }).eq("is_approved", false),
    supabase
      .from("bookings")
      .select("id, check_in, check_out, num_guests, total_amount, status, properties(name)")
      .eq("status", "confirmed")
      .gte("check_in", now)
      .order("check_in", { ascending: true })
      .limit(5),
    supabase
      .from("bookings")
      .select("id, check_in, check_out, total_amount, created_at, guests(first_name, last_name, email), properties(name)")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  // Revenue this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  const { data: monthRevenue } = await supabase
    .from("bookings")
    .select("total_amount")
    .eq("status", "confirmed")
    .gte("created_at", startOfMonth.toISOString());

  const revenue = (monthRevenue ?? []).reduce(
    (sum: number, b: { total_amount: number }) => sum + (b.total_amount ?? 0),
    0
  );

  return {
    totalProperties: totalProperties ?? 0,
    totalBookings: totalBookings ?? 0,
    totalGuests: totalGuests ?? 0,
    pendingReviews: pendingReviews ?? 0,
    monthRevenue: revenue,
    upcomingBookings: upcomingBookings ?? [],
    recentBookings: recentBookings ?? [],
  };
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const stats = [
    { label: "Active Properties", value: data.totalProperties, icon: Home, href: "/admin/properties", color: "text-blue-400" },
    { label: "Confirmed Bookings", value: data.totalBookings, icon: BookOpen, href: "/admin/bookings", color: "text-green-400" },
    { label: "Total Guests", value: data.totalGuests, icon: Users, href: "/admin/guests", color: "text-purple-400" },
    { label: "Revenue This Month", value: `$${data.monthRevenue.toLocaleString()}`, icon: DollarSign, href: "/admin/bookings", color: "text-forteca-gold" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/40">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:border-white/10 hover:bg-white/[0.07]"
          >
            <div className="mb-3 flex items-center justify-between">
              <Icon className={cn("h-5 w-5", color)} />
              <ArrowRight className="h-4 w-4 text-white/20 transition-transform group-hover:translate-x-0.5 group-hover:text-white/40" />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="mt-1 text-xs text-white/40">{label}</p>
          </Link>
        ))}
      </div>

      {/* Pending reviews alert */}
      {data.pendingReviews > 0 && (
        <Link
          href="/admin/reviews"
          className="mb-8 flex items-center gap-3 rounded-xl border border-forteca-gold/30 bg-forteca-gold/10 px-5 py-3 text-sm text-forteca-gold transition-colors hover:bg-forteca-gold/15"
        >
          <TrendingUp className="h-4 w-4" />
          <span>
            <strong>{data.pendingReviews}</strong> review{data.pendingReviews !== 1 ? "s" : ""} waiting for approval
          </span>
          <ArrowRight className="ml-auto h-4 w-4" />
        </Link>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming bookings */}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-white">Upcoming Check-ins</h2>
            <Link href="/admin/bookings" className="text-xs text-forteca-gold hover:underline">
              View all
            </Link>
          </div>
          {data.upcomingBookings.length === 0 ? (
            <p className="text-sm text-white/30">No upcoming bookings.</p>
          ) : (
            <div className="space-y-3">
              {data.upcomingBookings.map((b: {
                id: string;
                check_in: string;
                check_out: string;
                num_guests: number;
                total_amount: number;
                properties: { name: string }[];
              }) => {
                const property = b.properties?.[0] ?? null;
                return (
                <div key={b.id} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-forteca-gold/10">
                    <Clock className="h-4 w-4 text-forteca-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {property?.name ?? "Unknown property"}
                    </p>
                    <p className="text-xs text-white/40">
                      {b.check_in} → {b.check_out} · {b.num_guests} guests
                    </p>
                  </div>
                  <span className="text-sm font-bold text-forteca-gold">${b.total_amount}</span>
                </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent bookings */}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-white">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-xs text-forteca-gold hover:underline">
              View all
            </Link>
          </div>
          {data.recentBookings.length === 0 ? (
            <p className="text-sm text-white/30">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {data.recentBookings.map((b: {
                id: string;
                check_in: string;
                check_out: string;
                total_amount: number;
                guests: { first_name: string; last_name: string; email: string }[];
                properties: { name: string }[];
              }) => {
                const guest = b.guests?.[0] ?? null;
                const property = b.properties?.[0] ?? null;
                return (
                <div key={b.id} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Users className="h-4 w-4 text-white/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {guest ? `${guest.first_name} ${guest.last_name}` : "Guest"}
                    </p>
                    <p className="truncate text-xs text-white/40">
                      {property?.name} · {b.check_in}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-white/70">${b.total_amount}</span>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
