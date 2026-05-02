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
              9. Interpretation and Definitions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-forteca-navy">SMS Opt-In</h3>
                <p>By opting in to receive SMS messages, you agree to receive messages related to:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Appointment reminders</li>
                  <li>Service updates</li>
                  <li>Customer support</li>
                </ul>
                <p className="mt-2">
                  Message frequency may vary. Message and data rates may apply. Reply STOP to opt out.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-forteca-navy">Interpretation</h3>
                <p>
                  The words whose initial letters are capitalized have meanings defined under the
                  following conditions. The following definitions shall have the same meaning regardless
                  of whether they appear in singular or in plural.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-forteca-navy">Definitions</h3>
                <p>For the purposes of these Terms and Conditions:</p>
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    <strong>Affiliate</strong> means an entity that controls, is controlled by, or is
                    under common control with a party, where &quot;control&quot; means ownership of 50%
                    or more of the shares, equity interest or other securities entitled to vote for
                    election of directors or other managing authority.
                  </li>
                  <li><strong>Country</strong> refers to: Pennsylvania, United States</li>
                  <li>
                    <strong>Company</strong> (referred to as either &quot;the Company&quot;,
                    &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in these Terms and Conditions)
                    refers to Forteca Estate, 814 Monroe St #205, Stroudsburg, PA.
                  </li>
                  <li>
                    <strong>Device</strong> means any device that can access the Service such as a
                    computer, a cell phone or a digital tablet.
                  </li>
                  <li><strong>Service</strong> refers to the Website.</li>
                  <li>
                    <strong>Terms and Conditions</strong> (also referred to as &quot;Terms&quot;) means
                    these Terms and Conditions, including any documents expressly incorporated by
                    reference, which govern Your access to and use of the Service and form the entire
                    agreement between You and the Company regarding the Service.
                  </li>
                  <li>
                    <strong>Third-Party Social Media Service</strong> means any services or content
                    (including data, information, products or services) provided by a third party that
                    is displayed, included, made available, or linked to through the Service.
                  </li>
                  <li>
                    <strong>Website</strong> refers to Forteca Estate, accessible from{" "}
                    <a
                      href="https://fortecaestate.com"
                      className="font-semibold text-forteca-gold hover:underline"
                    >
                      https://fortecaestate.com
                    </a>
                  </li>
                  <li>
                    <strong>You</strong> means the individual accessing or using the Service, or the
                    company, or other legal entity on behalf of which such individual is accessing or
                    using the Service, as applicable.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              10. Acknowledgment
            </h2>
            <p>
              These are the Terms and Conditions governing the use of this Service and the agreement
              between You and the Company. These Terms and Conditions set out the rights and obligations
              of all users regarding the use of the Service.
            </p>
            <p className="mt-3">
              Your access to and use of the Service is conditioned on Your acceptance of and compliance
              with these Terms and Conditions. These Terms and Conditions apply to all visitors, users
              and others who access or use the Service.
            </p>
            <p className="mt-3">
              By accessing or using the Service You agree to be bound by these Terms and Conditions. If
              You disagree with any part of these Terms and Conditions then You may not access the
              Service.
            </p>
            <p className="mt-3">
              You represent that you are over the age of 18. The Company does not permit those under 18
              to use the Service.
            </p>
            <p className="mt-3">
              Your access to and use of the Service is also subject to Our Privacy Policy, which
              describes how We collect, use, and disclose personal information. Please read Our Privacy
              Policy carefully before using Our Service.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              11. Links to Other Websites
            </h2>
            <p>
              Our Service may contain links to third-party websites or services that are not owned or
              controlled by the Company.
            </p>
            <p className="mt-3">
              The Company has no control over, and assumes no responsibility for, the content, privacy
              policies, or practices of any third-party websites or services. You further acknowledge
              and agree that the Company shall not be responsible or liable, directly or indirectly, for
              any damage or loss caused or alleged to be caused by or in connection with the use of or
              reliance on any such content, goods or services available on or through any such websites
              or services.
            </p>
            <p className="mt-3">
              We strongly advise You to read the terms and conditions and privacy policies of any
              third-party websites or services that You visit.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              12. SMS Messaging Terms
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-forteca-navy">Program Description &amp; Message Types</h3>
                <p>
                  By opting in to receive SMS messages from Forteca Estate, you agree to receive text
                  messages related to your interaction with us. These may include, but are not limited to:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Appointment confirmations and reminders</li>
                  <li>Service updates and notifications</li>
                  <li>Customer support communications</li>
                  <li>Promotional offers and marketing messages</li>
                </ul>
                <p className="mt-2">
                  Message frequency may vary depending on your interaction with our services.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-forteca-navy">Opt-Out Instructions</h3>
                <p>
                  You may opt out of receiving SMS messages at any time by replying <strong>STOP</strong>{" "}
                  to any message you receive from us. Once you opt out, you will no longer receive SMS
                  communications unless you opt back in.
                </p>
                <p className="mt-2">
                  For assistance, reply <strong>HELP</strong> or contact us directly at{" "}
                  <a
                    href="mailto:fortecaestate@gmail.com"
                    className="font-semibold text-forteca-gold hover:underline"
                  >
                    fortecaestate@gmail.com
                  </a>{" "}
                  or{" "}
                  <a href="tel:+14842863223" className="font-semibold text-forteca-gold hover:underline">
                    (484) 286-3223
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-forteca-navy">Message &amp; Data Rates Disclaimer</h3>
                <p>
                  Message and data rates may apply depending on your mobile carrier and service plan.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-forteca-navy">Carrier Liability Disclaimer</h3>
                <p>
                  Carriers are not liable for delayed or undelivered messages. Delivery of messages is
                  subject to effective transmission by your mobile carrier and is not guaranteed.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              13. Links from Third-Party Social Media Services
            </h2>
            <p>
              The Service may display, include, make available, or link to content or services provided
              by a Third-Party Social Media Service. A Third-Party Social Media Service is not owned or
              controlled by the Company, and the Company does not endorse or assume responsibility for
              any Third-Party Social Media Service.
            </p>
            <p className="mt-3">
              You acknowledge and agree that the Company shall not be responsible or liable, directly or
              indirectly, for any damage or loss caused or alleged to be caused by or in connection with
              Your access to or use of any Third-Party Social Media Service, including any content,
              goods, or services made available through them.
            </p>
            <p className="mt-3">
              Your use of any Third-Party Social Media Service is governed by that Third-Party Social
              Media Service&apos;s terms and privacy policies.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              14. Termination
            </h2>
            <p>
              We may terminate or suspend Your access immediately, without prior notice or liability, for
              any reason whatsoever, including without limitation if You breach these Terms and
              Conditions.
            </p>
            <p className="mt-3">Upon termination, Your right to use the Service will cease immediately.</p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              15. Limitation of Liability
            </h2>
            <p>
              Notwithstanding any damages that You might incur, the entire liability of the Company and
              any of its suppliers under any provision of these Terms and Your exclusive remedy for all
              of the foregoing shall be limited to the amount actually paid by You through the Service
              or 100 USD if You haven&apos;t purchased anything through the Service.
            </p>
            <p className="mt-3">
              To the maximum extent permitted by applicable law, in no event shall the Company or its
              suppliers be liable for any special, incidental, indirect, or consequential damages
              whatsoever (including, but not limited to, damages for loss of profits, loss of data or
              other information, for business interruption, for personal injury, loss of privacy arising
              out of or in any way related to the use of or inability to use the Service, third-party
              software and/or third-party hardware used with the Service, or otherwise in connection
              with any provision of these Terms), even if the Company or any supplier has been advised
              of the possibility of such damages and even if the remedy fails of its essential purpose.
            </p>
            <p className="mt-3">
              Some states do not allow the exclusion of implied warranties or limitation of liability
              for incidental or consequential damages, which means that some of the above limitations
              may not apply. In these states, each party&apos;s liability will be limited to the
              greatest extent permitted by law.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              16. &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
            </h2>
            <p>
              The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with
              all faults and defects without warranty of any kind. To the maximum extent permitted under
              applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and
              their respective licensors and service providers, expressly disclaims all warranties,
              whether express, implied, statutory or otherwise, with respect to the Service, including
              all implied warranties of merchantability, fitness for a particular purpose, title and
              non-infringement, and warranties that may arise out of course of dealing, course of
              performance, usage or trade practice.
            </p>
            <p className="mt-3">
              Without limitation to the foregoing, the Company provides no warranty or undertaking, and
              makes no representation of any kind that the Service will meet Your requirements, achieve
              any intended results, be compatible or work with any other software, applications, systems
              or services, operate without interruption, meet any performance or reliability standards
              or be error free or that any errors or defects can or will be corrected.
            </p>
            <p className="mt-3">
              Without limiting the foregoing, neither the Company nor any of the company&apos;s
              provider makes any representation or warranty of any kind, express or implied: (i) as to
              the operation or availability of the Service, or the information, content, and materials
              or products included thereon; (ii) that the Service will be uninterrupted or error-free;
              (iii) as to the accuracy, reliability, or currency of any information or content provided
              through the Service; or (iv) that the Service, its servers, the content, or e-mails sent
              from or on behalf of the Company are free of viruses, scripts, trojan horses, worms,
              malware, timebombs or other harmful components.
            </p>
            <p className="mt-3">
              Some jurisdictions do not allow the exclusion of certain types of warranties or
              limitations on applicable statutory rights of a consumer, so some or all of the above
              exclusions and limitations may not apply to You. But in such a case the exclusions and
              limitations set forth in this section shall be applied to the greatest extent enforceable
              under applicable law.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              17. Governing Law
            </h2>
            <p>
              The laws of the Country, excluding its conflicts of law rules, shall govern these Terms
              and Your use of the Service. Your use of the Application may also be subject to other
              local, state, national, or international laws.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-forteca-navy">
              18. Contact
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
