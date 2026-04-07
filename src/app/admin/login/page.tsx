import type { Metadata } from "next";
import { AdminLoginForm } from "./AdminLoginForm";

export const metadata: Metadata = { title: "Admin Login | Forteca Estate" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-forteca-navy px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-serif text-3xl font-bold text-white">
            Forteca<span className="text-forteca-gold">Estate</span>
          </p>
          <p className="mt-2 text-sm text-white/50">Admin Dashboard</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
