import { MinimalFooter } from "@/components/layout/MinimalFooter";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <MinimalFooter />
    </>
  );
}
