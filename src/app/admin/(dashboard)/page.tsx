import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import {
  Home,
  FileText,
  Users,
  Mail,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = { title: "Dashboard" };

async function getDashboardData() {
  const supabase = await createServiceClient();

  const [
    { count: totalProperties },
    { count: totalBlogPosts },
    { count: totalGuests },
    { count: totalSubscribers },
    { count: pendingReviews },
  ] = await Promise.all([
    supabase.from("properties").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("guests").select("*", { count: "exact", head: true }),
    supabase.from("subscribers").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("reviews").select("*", { count: "exact", head: true }).eq("is_approved", false),
  ]);

  return {
    totalProperties: totalProperties ?? 0,
    totalBlogPosts: totalBlogPosts ?? 0,
    totalGuests: totalGuests ?? 0,
    totalSubscribers: totalSubscribers ?? 0,
    pendingReviews: pendingReviews ?? 0,
  };
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const stats = [
    { label: "Active Properties", value: data.totalProperties, icon: Home, href: "/admin/properties", color: "text-blue-400" },
    { label: "Published Posts", value: data.totalBlogPosts, icon: FileText, href: "/admin/blog", color: "text-green-400" },
    { label: "Total Guests", value: data.totalGuests, icon: Users, href: "/admin/guests", color: "text-purple-400" },
    { label: "Subscribers", value: data.totalSubscribers, icon: Mail, href: "/admin/newsletter", color: "text-forteca-gold" },
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

      {/* Quick links */}
      <div className="grid gap-6 lg:grid-cols-2">
        <a
          href="https://my.hospitable.com/user/hello?returnUrl=%2Fdashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl border border-forteca-gold/20 bg-forteca-gold/5 p-6 transition-all hover:border-forteca-gold/30 hover:bg-forteca-gold/10"
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-forteca-gold/15">
            <Home className="h-6 w-6 text-forteca-gold" />
          </div>
          <div>
            <p className="font-serif text-lg font-bold text-white">Hospitable Dashboard</p>
            <p className="text-sm text-white/40">Manage bookings, calendars & guests</p>
          </div>
          <ArrowRight className="ml-auto h-5 w-5 text-forteca-gold/50" />
        </a>
        <a
          href="https://dashboard.stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 transition-all hover:border-blue-500/30 hover:bg-blue-500/10"
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/15">
            <Mail className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <p className="font-serif text-lg font-bold text-white">Stripe Dashboard</p>
            <p className="text-sm text-white/40">Payments, payouts & financials</p>
          </div>
          <ArrowRight className="ml-auto h-5 w-5 text-blue-400/50" />
        </a>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
