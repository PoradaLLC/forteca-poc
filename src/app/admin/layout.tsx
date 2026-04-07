import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = { title: { default: "Admin", template: "%s | Forteca Admin" } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const role = user.app_metadata?.role ?? user.user_metadata?.role;
  if (role !== "admin") redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-[#0a1520]">
      <AdminSidebar userEmail={user.email ?? ""} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
