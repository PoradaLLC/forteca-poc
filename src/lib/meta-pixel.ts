"use client";

function generateEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface LeadParams {
  email?: string;
  phone?: string;
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
}

/**
 * Fires a browser-side Meta Pixel `Lead` event and returns the event_id
 * so the same id can be sent to the Conversions API for deduplication.
 */
export function trackLead(params: LeadParams = {}): string {
  const eventId = generateEventId();

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(
      "track",
      "Lead",
      {
        content_name: params.content_name,
        content_category: params.content_category,
        value: params.value,
        currency: params.currency ?? "USD",
      },
      { eventID: eventId }
    );
  }

  return eventId;
}
