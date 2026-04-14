import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@fortecaestate.com";
const ADMIN_EMAIL = "fortecaestate@gmail.com";

export interface BookingEmailData {
  guestName: string;
  guestEmail: string;
  propertyName: string;
  propertySlug: string;
  checkIn: string;
  checkOut: string;
  numGuests: number;
  totalAmount: number;
  bookingId: string;
}

function bookingConfirmationHtml(d: BookingEmailData): string {
  return `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#0d1b2a">
      <div style="background:#0d1b2a;padding:32px;text-align:center">
        <h1 style="color:#c9a84c;margin:0;font-size:24px">Forteca Estate</h1>
        <p style="color:rgba(255,255,255,0.6);margin:8px 0 0;font-size:13px">Pocono Mountains, PA</p>
      </div>
      <div style="padding:40px 32px;background:#f5f0e8">
        <h2 style="font-size:22px;margin:0 0 8px">Booking Confirmed!</h2>
        <p style="color:#6b7280;margin:0 0 32px">Hi ${d.guestName}, your reservation is confirmed.</p>
        <div style="background:#fff;border-radius:12px;padding:24px;margin-bottom:24px">
          <h3 style="margin:0 0 16px;font-size:16px">${d.propertyName}</h3>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6b7280;border-bottom:1px solid #e5e7eb">Check-in</td><td style="padding:8px 0;font-weight:600;border-bottom:1px solid #e5e7eb;text-align:right">${d.checkIn}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-bottom:1px solid #e5e7eb">Check-out</td><td style="padding:8px 0;font-weight:600;border-bottom:1px solid #e5e7eb;text-align:right">${d.checkOut}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-bottom:1px solid #e5e7eb">Guests</td><td style="padding:8px 0;font-weight:600;border-bottom:1px solid #e5e7eb;text-align:right">${d.numGuests}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Total Paid</td><td style="padding:8px 0;font-weight:700;text-align:right;color:#c9a84c">$${d.totalAmount}</td></tr>
          </table>
        </div>
        <p style="font-size:13px;color:#6b7280">Confirmation ID: <strong>${d.bookingId}</strong></p>
        <p style="font-size:13px;color:#6b7280">Check-in time is 3:00 PM. Check-out is 11:00 AM. We'll be in touch with detailed instructions before your arrival.</p>
      </div>
      <div style="background:#0d1b2a;padding:24px;text-align:center">
        <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0">Questions? Reply to this email or contact us at fortecaestate@gmail.com</p>
      </div>
    </div>
  `;
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  if (!resend) {
    console.log("[DEV EMAIL] Booking confirmation →", data.guestEmail, data);
    return;
  }
  await resend.emails.send({
    from: `Forteca Estate <${FROM}>`,
    to: data.guestEmail,
    subject: `Booking Confirmed — ${data.propertyName}`,
    html: bookingConfirmationHtml(data),
  });
}

export async function sendAdminBookingAlert(data: BookingEmailData) {
  if (!resend) {
    console.log("[DEV EMAIL] Admin alert → new booking:", data);
    return;
  }
  await resend.emails.send({
    from: `Forteca Bookings <${FROM}>`,
    to: ADMIN_EMAIL,
    subject: `New Booking: ${data.propertyName} · ${data.checkIn} → ${data.checkOut}`,
    html: `<p>New booking from <strong>${data.guestName}</strong> (${data.guestEmail}).</p>
           <p>Property: ${data.propertyName}<br>
           Dates: ${data.checkIn} → ${data.checkOut}<br>
           Guests: ${data.numGuests}<br>
           Total: $${data.totalAmount}<br>
           ID: ${data.bookingId}</p>`,
  });
}

export async function sendNewsletterWelcome(email: string) {
  console.log("[EMAIL] sendNewsletterWelcome called, resend client:", resend ? "initialized" : "NULL", "from:", FROM);
  if (!resend) {
    console.log("[DEV EMAIL] Newsletter welcome →", email);
    return;
  }
  console.log("[EMAIL] Sending newsletter welcome to:", email);
  const result = await resend.emails.send({
    from: `Forteca Estate <${FROM}>`,
    to: email,
    subject: "Welcome to the Forteca List",
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#0d1b2a">
        <div style="background:#0d1b2a;padding:32px;text-align:center">
          <h1 style="color:#c9a84c;margin:0;font-size:24px">Forteca Estate</h1>
          <p style="color:rgba(255,255,255,0.6);margin:8px 0 0;font-size:13px">Pocono Mountains, PA</p>
        </div>
        <div style="padding:40px 32px;background:#f5f0e8">
          <h2 style="font-size:22px;margin:0 0 16px">You're on the list!</h2>
          <p style="color:#6b7280;line-height:1.7;margin:0 0 24px">
            Thanks for subscribing. You'll be the first to hear about exclusive deals,
            new property additions, and Pocono travel tips.
          </p>
          <div style="text-align:center;margin:32px 0">
            <a href="https://fortecaestate.com/properties"
               style="background:#c9a84c;color:#0d1b2a;padding:14px 32px;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;border-radius:8px;display:inline-block">
              Browse Properties
            </a>
          </div>
          <p style="font-size:13px;color:#6b7280;margin:0">
            No spam, ever. Unsubscribe anytime by replying to this email.
          </p>
        </div>
        <div style="background:#0d1b2a;padding:24px;text-align:center">
          <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0">&copy; Forteca Estate · Pocono Mountains, PA</p>
        </div>
      </div>
    `,
  });
  console.log("[EMAIL] Resend response for", email, ":", JSON.stringify(result));
  if (result.error) {
    console.error("[EMAIL] Resend error:", result.error);
  }
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  if (!resend) {
    console.log("[DEV EMAIL] Contact form submission:", data);
    return;
  }
  const result = await resend.emails.send({
    from: `Forteca Website <${FROM}>`,
    to: ADMIN_EMAIL,
    subject: `Contact Form: ${data.subject} — from ${data.name}`,
    html: `<p><strong>From:</strong> ${data.name} (${data.email})<br>
           <strong>Phone:</strong> ${data.phone ?? "—"}<br>
           <strong>Subject:</strong> ${data.subject}</p>
           <p><strong>Message:</strong><br>${data.message.replace(/\n/g, "<br>")}</p>`,
  });
  console.log("[EMAIL] Contact notification result:", JSON.stringify(result));
  if (result.error) {
    console.error("[EMAIL] Contact email error:", result.error);
  }
}
