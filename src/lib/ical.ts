/** Minimal iCal (.ics) parser and generator — no external library needed. */

export interface ICalEvent {
  uid: string;
  summary: string;
  start: Date;
  end: Date;
}

// ─── Generator ─────────────────────────────────────────────────────────────

function toICSDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function toICSDateOnly(d: Date): string {
  return d.toISOString().split("T")[0].replace(/-/g, "");
}

export function generateICS(
  events: ICalEvent[],
  calName = "Forteca Estate"
): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//Forteca Estate//Booking Calendar//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${calName}`,
  ];

  for (const evt of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${evt.uid}`,
      `DTSTAMP:${toICSDate(new Date())}`,
      `DTSTART;VALUE=DATE:${toICSDateOnly(evt.start)}`,
      `DTEND;VALUE=DATE:${toICSDateOnly(evt.end)}`,
      `SUMMARY:${evt.summary}`,
      "STATUS:CONFIRMED",
      "TRANSP:OPAQUE",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

// ─── Parser ────────────────────────────────────────────────────────────────

function extractProp(block: string, key: string): string | null {
  // Handles both KEY:value and KEY;PARAM=...:value patterns
  const re = new RegExp(`^${key}(?:;[^:]*)?:(.+)$`, "mi");
  const m = block.match(re);
  return m ? m[1].trim() : null;
}

function parseICSDateString(raw: string): Date | null {
  // Handles YYYYMMDD and YYYYMMDDTHHmmssZ formats
  const clean = raw.replace(/[TZ]/g, "");
  if (clean.length < 8) return null;
  const y = +clean.slice(0, 4);
  const mo = +clean.slice(4, 6) - 1;
  const d = +clean.slice(6, 8);
  const h = clean.length >= 10 ? +clean.slice(8, 10) : 0;
  const mi = clean.length >= 12 ? +clean.slice(10, 12) : 0;
  return new Date(Date.UTC(y, mo, d, h, mi));
}

export function parseICS(content: string): ICalEvent[] {
  const events: ICalEvent[] = [];
  // Split on VEVENT boundaries
  const vevents = content.split(/BEGIN:VEVENT/i).slice(1);

  for (const block of vevents) {
    const endIdx = block.search(/END:VEVENT/i);
    const body = endIdx >= 0 ? block.slice(0, endIdx) : block;

    const dtstart = extractProp(body, "DTSTART");
    const dtend = extractProp(body, "DTEND");
    const summary = extractProp(body, "SUMMARY") ?? "Blocked";
    const uid = extractProp(body, "UID") ?? crypto.randomUUID();

    if (!dtstart || !dtend) continue;

    const start = parseICSDateString(dtstart);
    const end = parseICSDateString(dtend);
    if (!start || !end) continue;

    events.push({ uid, summary, start, end });
  }

  return events;
}

/** Expand a date range into individual date strings (YYYY-MM-DD). */
export function expandDateRange(start: Date, end: Date): string[] {
  const dates: string[] = [];
  const cur = new Date(start);
  while (cur < end) {
    dates.push(cur.toISOString().split("T")[0]);
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return dates;
}
