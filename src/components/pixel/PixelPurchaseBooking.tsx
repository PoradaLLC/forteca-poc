"use client";
import { useEffect } from "react";

export default function PixelPurchaseBooking({
  value,
  propertyName,
  bookingId,
}: {
  value: number;
  propertyName: string;
  bookingId: string;
}) {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Purchase", {
        value,
        currency: "USD",
        content_name: propertyName,
        content_ids: [bookingId],
        content_type: "hotel",
      });
    }
  }, [value, propertyName, bookingId]);
  return null;
}
