"use client";

import { useState, useEffect } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";

interface AvailabilityCalendarProps {
  propertyId?: string;
  minNights?: number;
  onRangeChange?: (range: DateRange | undefined) => void;
  initialRange?: DateRange;
}

export function AvailabilityCalendar({
  propertyId,
  minNights = 2,
  onRangeChange,
  initialRange,
}: AvailabilityCalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!propertyId) return;
    setLoading(true);
    fetch(`/api/availability/${propertyId}`)
      .then((r) => r.json())
      .then((data: { blockedDates: string[] }) => {
        setBlockedDates(data.blockedDates.map((d) => new Date(d + "T00:00:00")));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [propertyId]);

  function handleSelect(r: DateRange | undefined) {
    setRange(r);
    onRangeChange?.(r);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="rdp-forteca">
      <style>{`
        .rdp-forteca {
          --rdp-accent-color: #c9a84c;
          --rdp-accent-background-color: rgba(201, 168, 76, 0.12);
          --rdp-selected-border: 2px solid #c9a84c;
          --rdp-range-start-color: #0d1b2a;
          --rdp-range-start-background: #c9a84c;
          --rdp-range-end-background: #c9a84c;
          --rdp-range-middle-background-color: rgba(201, 168, 76, 0.10);
        }
        .rdp-forteca .rdp-root { margin: 0; font-family: inherit; }
        .rdp-forteca .rdp-day_button:hover:not([disabled]) { background: rgba(201, 168, 76, 0.15); }
        .rdp-forteca .rdp-day[data-selected] .rdp-day_button { background: #c9a84c; color: #0d1b2a; font-weight: 700; }
        .rdp-forteca .rdp-day[data-range-start] .rdp-day_button,
        .rdp-forteca .rdp-day[data-range-end] .rdp-day_button { background: #c9a84c; color: #0d1b2a; font-weight: 700; }
        .rdp-forteca .rdp-day[data-range-middle] .rdp-day_button { background: rgba(201, 168, 76, 0.12); border-radius: 0; }
        .rdp-forteca .rdp-nav button { color: #0d1b2a; }
        .rdp-forteca .rdp-caption_label { font-family: Georgia, serif; font-weight: 700; color: #0d1b2a; }
        .rdp-forteca .rdp-day[aria-disabled="true"] .rdp-day_button { opacity: 0.25; cursor: not-allowed; text-decoration: line-through; }
      `}</style>
      {loading && (
        <p className="mb-2 text-xs text-forteca-slate">Loading availability…</p>
      )}
      <DayPicker
        mode="range"
        selected={range}
        onSelect={handleSelect}
        numberOfMonths={2}
        disabled={[{ before: today }, ...blockedDates]}
        showOutsideDays={false}
        pagedNavigation
      />
      {range?.from && range?.to && (
        <p className="mt-2 text-xs text-forteca-slate">
          Min. {minNights} nights required — you selected{" "}
          <span className="font-semibold text-forteca-navy">
            {Math.round(
              (range.to.getTime() - range.from.getTime()) / 86400000
            )}{" "}
            nights
          </span>
        </p>
      )}
    </div>
  );
}
