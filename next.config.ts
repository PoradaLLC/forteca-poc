import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live",
      "frame-src https://js.stripe.com https://booking.hospitable.com https://form.jotform.com https://vercel.live",
      "frame-ancestors 'self' https://sierra-117.net https://www.sierra-117.net https://*.vercel.app",
      "img-src 'self' https://res.cloudinary.com data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://nominatim.openstreetmap.org https://api.stripe.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://vercel.live wss://ws-us3.pusher.com",
    ].join("; "),
  },
  {
    key: "X-Forwarded-Proto",
    value: "https",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blvck-cabin-poconos",
        destination: "/properties/blvck-cabin-i",
        permanent: true,
      },
      {
        source: "/blvck-cabin-ii",
        destination: "/properties/blvck-cabin-ii",
        permanent: true,
      },
      {
        source: "/blvckcabin-3",
        destination: "/properties/blvck-cabin-iii",
        permanent: true,
      },
      {
        source: "/blve-cabin",
        destination: "/properties/blve-cabin",
        permanent: true,
      },
      {
        source: "/scenic-getaway",
        destination: "/properties/scenic-getaway",
        permanent: true,
      },
      {
        source: "/arctic-getaway",
        destination: "/properties/arctic-getaway",
        permanent: true,
      },
      {
        source: "/pocono-villa",
        destination: "/properties/pocono-villa",
        permanent: true,
      },
      {
        source: "/mountain-lake",
        destination: "/properties/mountain-lake-getaway",
        permanent: true,
      },
      {
        source: "/mountain-oasis",
        destination: "/properties/mountain-oasis",
        permanent: true,
      },
      {
        source: "/happy-trails",
        destination: "/properties/happy-trails",
        permanent: true,
      },
      {
        source: "/rampersad-poconos-home",
        destination: "/properties/rampersad-poconos-home",
        permanent: true,
      },
      {
        source: "/pocono-getaway",
        destination: "/properties/pocono-getaway",
        permanent: true,
      },
      {
        source: "/perfect-pocono",
        destination: "/properties/rustic-heaven",
        permanent: true,
      },
      {
        source: "/getaway-listing",
        destination: "/properties",
        permanent: true,
      },
      {
        source: "/testimonals",
        destination: "/testimonials",
        permanent: true,
      },
      {
        source: "/privacy-policy-4",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/forteca-blog",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/fortecastore",
        destination: "/store",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
