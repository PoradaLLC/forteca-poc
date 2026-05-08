import crypto from "node:crypto";

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_PIXEL_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

interface CapiLeadInput {
  eventId: string;
  email?: string;
  phone?: string;
  eventSourceUrl: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
  contentName?: string;
  contentCategory?: string;
  value?: number;
  currency?: string;
}

/**
 * Sends a `Lead` event to Meta's Conversions API.
 * Uses the same event_id as the browser pixel so Meta deduplicates.
 * PII (email, phone) is SHA-256 hashed per Meta requirements.
 */
export async function sendLeadCapi(input: CapiLeadInput): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.log("[META_CAPI] Skipping — META_PIXEL_ID or META_PIXEL_ACCESS_TOKEN not set");
    return;
  }

  const userData: Record<string, string | string[]> = {};
  if (input.email) userData.em = sha256(input.email);
  if (input.phone) {
    const digits = input.phone.replace(/\D/g, "");
    if (digits) userData.ph = sha256(digits);
  }
  if (input.clientIpAddress) userData.client_ip_address = input.clientIpAddress;
  if (input.clientUserAgent) userData.client_user_agent = input.clientUserAgent;
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: input.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: {
          content_name: input.contentName,
          content_category: input.contentCategory,
          value: input.value,
          currency: input.currency ?? "USD",
        },
      },
    ],
  };

  if (TEST_EVENT_CODE) {
    payload.test_event_code = TEST_EVENT_CODE;
  }

  try {
    const url = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      console.error("[META_CAPI] Error response:", JSON.stringify(json));
    } else {
      console.log("[META_CAPI] Lead sent:", JSON.stringify(json));
    }
  } catch (err) {
    console.error("[META_CAPI] Fetch failed:", err);
  }
}

/**
 * Pulls the _fbp and _fbc cookies from a Next.js request's cookie header
 * so they can be forwarded to CAPI for better attribution.
 */
export function extractFbCookies(cookieHeader: string | null): { fbp?: string; fbc?: string } {
  if (!cookieHeader) return {};
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k, v.join("=")];
    })
  );
  return { fbp: cookies._fbp, fbc: cookies._fbc };
}
