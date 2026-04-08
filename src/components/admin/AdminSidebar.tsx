"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Star,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink,
  Mail,
  CreditCard,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin",            label: "Dashboard",   icon: LayoutDashboard, exact: true },
  { href: "/admin/properties", label: "Properties",  icon: Home },
  { href: "/admin/blog",       label: "Blog",        icon: FileText },
  { href: "/admin/newsletter", label: "Newsletter",  icon: Mail },
  { href: "/admin/reviews",    label: "Reviews",     icon: Star },
  { href: "/admin/settings",   label: "Settings",    icon: Settings },
];

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  function isActive(item: (typeof navItems)[number]) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  return (
    <aside className="flex w-60 flex-col border-r border-white/5 bg-forteca-navy">
      {/* Logo */}
      <div className="border-b border-white/5 px-6 py-5">
        <Link href="/admin" className="font-serif text-lg font-bold text-white">
          Forteca<span className="text-forteca-gold">Estate</span>
        </Link>
        <p className="mt-0.5 text-xs text-white/30">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-forteca-gold/15 text-forteca-gold"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4.5 w-4.5 flex-shrink-0" />
              {item.label}
              {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* External links */}
      <div className="space-y-1 px-3 pb-2">
        <a
          href="https://app.hospitable.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg bg-forteca-gold/10 px-3 py-2.5 text-sm font-medium text-forteca-gold transition-all hover:bg-forteca-gold/20"
        >
          <ExternalLink className="h-4 w-4 flex-shrink-0" />
          Hospitable
        </a>
        <a
          href="https://dashboard.stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg bg-blue-500/10 px-3 py-2.5 text-sm font-medium text-blue-400 transition-all hover:bg-blue-500/20"
        >
          <CreditCard className="h-4 w-4 flex-shrink-0" />
          Stripe Dashboard
        </a>
      </div>

      {/* User + sign out */}
      <div className="border-t border-white/5 p-4">
        <p className="mb-2 truncate px-1 text-xs text-white/30">{userEmail}</p>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/40 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
