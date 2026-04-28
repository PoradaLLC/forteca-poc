import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "@/lib/cart-context";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const GA_ID = "G-TD58MRLVZ2";

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
  metadataBase: new URL("https://fortecaestate.com"),
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
    url: "https://fortecaestate.com",
    siteName: "Forteca Estate",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Forteca Estate" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness"],
            name: "Forteca Estate",
            url: "https://fortecaestate.com",
            logo: "https://fortecaestate.com/images/logo.png",
            description:
              "Premium vacation rentals and property management across Pennsylvania, New York, and Florida.",
            telephone: "+1-347-556-0089",
            email: "fortecaestate@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "814 Monroe St #205",
              addressLocality: "Stroudsburg",
              addressRegion: "PA",
              postalCode: "18360",
              addressCountry: "US",
            },
            sameAs: [
              "https://www.facebook.com/FortecaEstate/",
              "https://www.instagram.com/fortecaestate/",
              "https://www.youtube.com/channel/UC7VRaZDHymQho2eE9v___kQ",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-347-556-0089",
              email: "fortecaestate@gmail.com",
              contactType: "customer service",
            },
          }}
        />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
