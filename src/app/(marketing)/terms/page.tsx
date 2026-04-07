import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Forteca Estate terms of service — rules and policies for using our website and booking services.",
};

export default function TermsPage() {
  return (
    <section className="bg-forteca-cream px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-4xl font-bold text-forteca-navy">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-forteca-slate">
          Last updated: January 1, 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-forteca-navy/70">
          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the Forteca Estate website and services, you
              agree to be bound by these Terms of Service. If you do not agree to
              these terms, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              2. Booking & Reservations
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                All bookings are subject to availability and confirmation by
                Forteca Estate.
              </li>
              <li>
                Guests must be at least 21 years of age to make a reservation.
              </li>
              <li>
                The person making the reservation must be present during the
                stay.
              </li>
              <li>
                Accurate guest counts must be provided at the time of booking.
                Exceeding the listed maximum occupancy is prohibited.
              </li>
              <li>
                Check-in and check-out times are specified in your booking
                confirmation. Early check-in or late check-out may be available
                upon request but is not guaranteed.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              3. Pricing & Payment
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                All prices are listed in US dollars and are subject to change
                without notice until a booking is confirmed.
              </li>
              <li>
                Total cost includes nightly rate, cleaning fee, service fee, and
                applicable taxes.
              </li>
              <li>
                Full payment is required at the time of booking unless otherwise
                arranged.
              </li>
              <li>
                Payment is processed securely through Stripe. Forteca Estate does
                not store credit card information.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              4. Cancellation Policy
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Free cancellation</strong> within 48 hours of booking, provided
                check-in is at least 14 days away.
              </li>
              <li>
                <strong>14+ days before check-in:</strong> Full refund minus a $50
                processing fee.
              </li>
              <li>
                <strong>7–13 days before check-in:</strong> 50% refund.
              </li>
              <li>
                <strong>Less than 7 days:</strong> No refund.
              </li>
              <li>
                Forteca Estate reserves the right to cancel a booking due to
                unforeseen circumstances (maintenance, safety concerns). In such
                cases, a full refund or alternative property will be offered.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              5. Property Rules
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>No smoking inside any property.</li>
              <li>
                No parties or events unless explicitly approved in writing.
              </li>
              <li>
                Pets are only allowed at properties designated as
                &quot;Pet Friendly.&quot; A pet fee may apply.
              </li>
              <li>
                Guests are responsible for any damage to the property beyond
                normal wear and tear.
              </li>
              <li>Quiet hours are 10:00 PM to 8:00 AM.</li>
              <li>
                Guests must follow all house rules provided in the check-in
                guide.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              6. Liability
            </h2>
            <p>
              Forteca Estate provides vacation rental accommodations and is not
              liable for injuries, accidents, or loss of personal belongings
              during your stay. Guests use amenities (hot tubs, fire pits,
              grills, lake access, etc.) at their own risk. We recommend travel
              insurance for all bookings.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              7. Intellectual Property
            </h2>
            <p>
              All content on this website — including text, images, logos, and
              design — is the property of Forteca Estate and is protected by
              copyright law. You may not reproduce, distribute, or use any
              content without our written permission.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              8. Changes to Terms
            </h2>
            <p>
              We may update these terms from time to time. Continued use of our
              services after changes constitutes acceptance of the updated terms.
              Material changes will be communicated via email to guests with
              active bookings.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              9. Contact
            </h2>
            <p>
              Questions about these terms? Reach us at{" "}
              <a
                href="mailto:fortecaestate@gmail.com"
                className="font-semibold text-forteca-gold hover:underline"
              >
                fortecaestate@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
