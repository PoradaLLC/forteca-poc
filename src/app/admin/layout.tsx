import type { Metadata } from "next";

export const metadata: Metadata = { title: { default: "Admin", template: "%s | Forteca Admin" } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
