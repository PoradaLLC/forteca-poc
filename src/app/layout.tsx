import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Forteca Estate — Pocono Vacation Rentals & Property Management",
    template: "%s | Forteca Estate",
  },
  description:
    "Premium vacation rentals and property management services in the Pocono Mountains, PA. Book directly and save.",
  keywords: [
    "Poconos vacation rental",
    "Pocono cabin rental",
    "Poconos property management",
    "vacation home rental Pennsylvania",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Forteca Estate",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
