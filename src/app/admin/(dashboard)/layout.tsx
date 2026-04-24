import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY;

  // Admin pages require both the browser and service-role Supabase keys.
  if (!supabaseUrl || !supabaseKey || !supabaseServiceKey || supabaseUrl.includes("your-project")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a1520] px-4">
        <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-white">Supabase Not Configured</h1>
          <p className="mt-3 text-sm text-white/50">
            Set <code className="text-forteca-gold">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="text-forteca-gold">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> in your{" "}
            <code className="text-white">.env.local</code> file, and add{" "}
            <code className="text-forteca-gold">SUPABASE_SECRET_KEY</code> to enable admin data access.
          </p>
        </div>
      </div>
    );
  }

  const { createClient } = await import("@/lib/supabase/server");
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
