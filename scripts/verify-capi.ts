/**
 * Forteca Estate — Meta Conversions API verification script
 *
 * Sends a synthetic Lead event to Meta's CAPI endpoint and prints
 * a clear pass/fail report. Use this to confirm:
 *   1. META_PIXEL_ID and META_PIXEL_ACCESS_TOKEN env vars are set
 *   2. The token is valid for this pixel
 *   3. Meta accepts the event payload structure
 *   4. The event reaches the Test Events tab in Events Manager
 *
 * Usage:
 *   1. Get a Test Event Code from Events Manager → Test Events tab
 *   2. Run: META_TEST_EVENT_CODE=TEST12345 npx tsx scripts/verify-capi.ts
 *   3. Watch the Test Events tab — the synthetic event should appear within ~30s
 *   4. If you see a green checkmark in the terminal AND the event in Test Events,
 *      CAPI is working end-to-end.
 */

import crypto from "node:crypto";
import { config } from "dotenv";
import { resolve } from "node:path";

// Load .env.local from project root
config({ path: resolve(process.cwd(), ".env.local") });

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_PIXEL_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const BOLD = "\x1b[1m";

function ok(msg: string) {
  console.log(`${GREEN}✓${RESET} ${msg}`);
}
function fail(msg: string) {
  console.log(`${RED}✗${RESET} ${msg}`);
}
function info(msg: string) {
  console.log(`${CYAN}ℹ${RESET} ${msg}`);
}
function warn(msg: string) {
  console.log(`${YELLOW}⚠${RESET} ${msg}`);
}
function header(msg: string) {
  console.log(`\n${BOLD}${msg}${RESET}`);
}

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

async function main() {
  header("Forteca Estate — CAPI Verification");
  console.log("Pixel: 1325589082840284\n");

  // ── Step 1: env var sanity check ───────────────────────────────────────
  header("Step 1: Environment variables");

  if (!PIXEL_ID) {
    fail("META_PIXEL_ID is not set in .env.local");
    process.exit(1);
  }
  if (PIXEL_ID !== "1325589082840284") {
    warn(`META_PIXEL_ID is set to "${PIXEL_ID}" — expected "1325589082840284"`);
    warn("If this is intentional (different env), continue. Otherwise fix it.");
  } else {
    ok("META_PIXEL_ID matches expected pixel");
  }

  if (!ACCESS_TOKEN) {
    fail("META_PIXEL_ACCESS_TOKEN is not set in .env.local");
    fail("Get one from Events Manager → Settings → Conversions API → Generate access token");
    process.exit(1);
  }
  ok(`META_PIXEL_ACCESS_TOKEN is set (length: ${ACCESS_TOKEN.length})`);

  if (!TEST_EVENT_CODE) {
    warn("META_TEST_EVENT_CODE is not set");
    warn("Without it, the event goes to production stats, not Test Events tab");
    warn("To verify visually: get a code from Events Manager → Test Events tab,");
    warn("then re-run with: META_TEST_EVENT_CODE=TEST12345 npx tsx scripts/verify-capi.ts");
  } else {
    ok(`META_TEST_EVENT_CODE is set: ${TEST_EVENT_CODE}`);
  }

  // ── Step 2: build a synthetic Lead event ───────────────────────────────
  header("Step 2: Build synthetic Lead event");

  const eventId = crypto.randomUUID();
  const testEmail = "verify-capi-test@fortecaestate.com";
  const testPhone = "5705551234";

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: "https://www.fortecaestate.com/contact",
        action_source: "website",
        user_data: {
          em: sha256(testEmail),
          ph: sha256(testPhone),
          client_user_agent: "ForteceEstate-CAPI-Verify/1.0",
          client_ip_address: "127.0.0.1",
        },
        custom_data: {
          content_name: "CAPI Verification Test",
          content_category: "Verification",
          value: 0,
          currency: "USD",
        },
      },
    ],
  };

  if (TEST_EVENT_CODE) {
    payload.test_event_code = TEST_EVENT_CODE;
  }

  ok(`Generated event_id: ${eventId}`);
  info("Email/phone hashed with SHA-256 (Meta requirement)");

  // ── Step 3: POST to Meta CAPI ──────────────────────────────────────────
  header("Step 3: POST to Meta CAPI");

  const url = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    fail(`Network error: ${(err as Error).message}`);
    fail("Check your internet connection or Meta API status");
    process.exit(1);
  }

  const json = (await res.json()) as Record<string, unknown>;

  if (!res.ok) {
    fail(`Meta returned HTTP ${res.status}`);
    console.log("\nResponse body:");
    console.log(JSON.stringify(json, null, 2));

    const error = json.error as { code?: number; message?: string; type?: string } | undefined;
    if (error?.code === 190) {
      fail("Token is invalid or expired. Generate a new one in Events Manager → Settings → Conversions API.");
    } else if (error?.code === 100) {
      fail("Bad parameter. Pixel ID may be wrong, or payload structure is malformed.");
    } else if (error?.message?.includes("permission")) {
      fail("Token lacks permission for this pixel. Make sure the System User has access to the pixel.");
    }
    process.exit(1);
  }

  ok(`HTTP ${res.status} — Meta accepted the request`);

  const eventsReceived = json.events_received as number | undefined;
  const messages = json.messages as string[] | undefined;
  const fbtraceId = json.fbtrace_id as string | undefined;

  if (eventsReceived === 1) {
    ok(`events_received: 1 — Meta processed the Lead event`);
  } else {
    warn(`events_received: ${eventsReceived} — expected 1`);
  }

  if (messages && messages.length > 0) {
    warn("Meta returned messages (warnings):");
    messages.forEach((m) => warn(`  - ${m}`));
  } else {
    ok("No warnings from Meta");
  }

  if (fbtraceId) {
    info(`fbtrace_id: ${fbtraceId} (provide this to Meta support if debugging)`);
  }

  // ── Step 4: next steps ─────────────────────────────────────────────────
  header("Result");

  if (eventsReceived === 1 && (!messages || messages.length === 0)) {
    console.log(`${GREEN}${BOLD}✓ CAPI is working.${RESET}\n`);

    if (TEST_EVENT_CODE) {
      info("Now check Events Manager → Test Events tab.");
      info(`Look for a Lead event with event_id: ${eventId}`);
      info("It should appear within 30 seconds and show a 'Server' badge.");
      console.log("");
      info("To test full deduplication (Browser + Server matching),");
      info("submit a real form on your preview URL while META_TEST_EVENT_CODE is set.");
    } else {
      warn("This event went to production stats, not Test Events.");
      warn("To verify visually, re-run with META_TEST_EVENT_CODE set.");
    }
  } else {
    console.log(`${RED}${BOLD}✗ CAPI verification incomplete.${RESET}`);
    console.log("Review the warnings above and check Events Manager → Diagnostics.");
    process.exit(1);
  }
}

main().catch((err) => {
  fail(`Unexpected error: ${err.message}`);
  console.error(err);
  process.exit(1);
});
