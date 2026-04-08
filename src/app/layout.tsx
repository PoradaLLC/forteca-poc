import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Forteca Estate — Vacation Rentals & Property Management",
    template: "%s | Forteca Estate",
  },
  description:
    "Premium vacation rentals and property management across Pennsylvania, New York, and Florida. Book directly and save.",
  keywords: [
    "vacation rental",
    "cabin rental",
    "property management",
    "vacation home Pennsylvania",
    "vacation rental New York",
    "vacation rental Florida",
    "Forteca Estate",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Forteca Estate",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
