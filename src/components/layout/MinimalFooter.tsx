import Link from "next/link";

export function MinimalFooter() {
  return (
    <footer className="bg-forteca-navy text-white/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-6 text-center text-xs text-white/40 sm:flex-row sm:gap-6">
        <span>
          &copy; {new Date().getFullYear()} Forteca Estate. All rights reserved.
        </span>
        <span className="hidden sm:inline text-white/20">·</span>
        <Link
          href="/privacy-policy"
          className="transition-colors hover:text-forteca-gold"
        >
          Privacy Policy
        </Link>
        <span className="hidden sm:inline text-white/20">·</span>
        <Link
          href="/terms"
          className="transition-colors hover:text-forteca-gold"
        >
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
