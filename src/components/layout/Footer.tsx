import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";

const footerLinks = {
  Properties: [
    { href: "/properties", label: "All Properties" },
    { href: "/properties/pocono-villa", label: "Pocono Villa" },
    { href: "/properties/blvck-cabin-i", label: "Blvck Cabin I" },
  ],
  Services: [
    { href: "/services/vacation-rentals", label: "Vacation Rentals" },
    { href: "/services/property-management", label: "Property Management" },
    { href: "/services/home-staging", label: "Home Staging" },
    { href: "/services", label: "Hot Tubs" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/store", label: "Store" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

const socials = [
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-forteca-navy text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              Forteca<span className="text-forteca-gold">Estate</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Premium vacation rentals and property management across PA, NY, and FL.
            </p>
            <div className="mt-4 flex gap-4">
              {socials.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 transition-colors hover:text-forteca-gold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {section}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="mx-auto max-w-md text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Stay in the loop
            </h3>
            <p className="mt-2 text-sm text-white/50">
              Get exclusive deals, new property alerts, and travel tips.
            </p>
            <div className="mt-4">
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Forteca Estate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
