"use client";

import { useEffect, useRef } from "react";
import { trackLead } from "@/lib/meta-pixel";

interface Props {
  email?: string;
  propertyName?: string;
  totalAmount?: number;
  bookingId?: string;
}

export function LeadTracker({ email, propertyName, totalAmount, bookingId }: Props) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (!bookingId) return;
    fired.current = true;

    const eventId = trackLead({
      content_name: propertyName ?? "Booking",
      content_category: "Booking Confirmation",
      value: totalAmount,
      currency: "USD",
      email,
    });

    fetch("/api/meta/booking-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: eventId,
        email,
        property_name: propertyName,
        total_amount: totalAmount,
        booking_id: bookingId,
      }),
    }).catch(() => {
      // Non-blocking — browser pixel still counts
    });
  }, [bookingId, email, propertyName, totalAmount]);

  return null;
}
