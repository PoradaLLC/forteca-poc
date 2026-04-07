import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { CalendarDays, Circle } from "lucide-react";

export const metadata: Metadata = { title: "Calendar" };

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  available:   { bg: "bg-green-500/20", text: "text-green-400", label: "Available" },
  booked:      { bg: "bg-blue-500/20",  text: "text-blue-400",  label: "Booked" },
  blocked:     { bg: "bg-red-500/20",   text: "text-red-400",   label: "Blocked" },
  maintenance: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Maintenance" },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default async function AdminCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; property?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createServiceClient();

  // Current month or from query param
  const now = new Date();
  const [targetYear, targetMonth] = params.month
    ? params.month.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  const monthIndex = targetMonth - 1;

  const daysInMonth = getDaysInMonth(targetYear, monthIndex);
  const firstDay = getFirstDayOfWeek(targetYear, monthIndex);

  const startDate = `${targetYear}-${String(targetMonth).padStart(2, "0")}-01`;
  const endDate = `${targetYear}-${String(targetMonth).padStart(2, "0")}-${daysInMonth}`;

  // Fetch properties
  const { data: properties } = await supabase
    .from("properties")
    .select("id, name, slug")
    .eq("status", "active")
    .order("name");

  const selectedProperty = params.property || properties?.[0]?.id;

  // Fetch availability for the month
  let availabilityMap: Record<string, { status: string; price_override: number | null; source: string }> = {};
  if (selectedProperty) {
    const { data: availability } = await supabase
      .from("availability")
      .select("date, status, price_override, source")
      .eq("property_id", selectedProperty)
      .gte("date", startDate)
      .lte("date", endDate);

    for (const a of availability ?? []) {
      availabilityMap[a.date] = a;
    }
  }

  // Navigation
  const prevMonth = new Date(targetYear, monthIndex - 1, 1);
  const nextMonth = new Date(targetYear, monthIndex + 1, 1);
  const prevParam = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, "0")}`;
  const nextParam = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, "0")}`;

  const monthLabel = new Date(targetYear, monthIndex).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Calendar</h1>
        <p className="mt-1 text-sm text-white/40">Manage availability by property</p>
      </div>

      {/* Property selector + month nav */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-white/40" />
          <select
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-forteca-gold/50 focus:outline-none"
            defaultValue={selectedProperty ?? ""}
          >
            {(properties ?? []).map((p: { id: string; name: string }) => (
              <option key={p.id} value={p.id} className="bg-forteca-navy text-white">
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/admin/calendar?month=${prevParam}${selectedProperty ? `&property=${selectedProperty}` : ""}`}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            ←
          </a>
          <span className="min-w-[160px] text-center text-sm font-semibold text-white">
            {monthLabel}
          </span>
          <a
            href={`/admin/calendar?month=${nextParam}${selectedProperty ? `&property=${selectedProperty}` : ""}`}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            →
          </a>
        </div>

        {/* Legend */}
        <div className="ml-auto flex items-center gap-4">
          {Object.entries(statusColors).map(([key, val]) => (
            <span key={key} className="flex items-center gap-1.5 text-xs text-white/40">
              <Circle className={`h-2 w-2 fill-current ${val.text}`} />
              {val.label}
            </span>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-white/5">
          {weekdays.map((d) => (
            <div key={d} className="px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-widest text-white/30">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="border-b border-r border-white/5 p-3" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${targetYear}-${String(targetMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const avail = availabilityMap[dateStr];
            const status = avail?.status ?? "available";
            const colors = statusColors[status] ?? statusColors.available;
            const isToday = dateStr === now.toISOString().split("T")[0];

            return (
              <div
                key={day}
                className={`border-b border-r border-white/5 p-3 transition-colors hover:bg-white/[0.03] ${isToday ? "ring-1 ring-inset ring-forteca-gold/30" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span className={`text-sm font-medium ${isToday ? "text-forteca-gold" : "text-white/70"}`}>
                    {day}
                  </span>
                  <Circle className={`h-2 w-2 fill-current ${colors.text}`} />
                </div>
                {avail?.price_override && (
                  <p className="mt-1 text-xs font-semibold text-forteca-gold">
                    ${avail.price_override}
                  </p>
                )}
                {avail?.source && avail.source !== "manual" && (
                  <p className="mt-0.5 text-[10px] capitalize text-white/20">
                    via {avail.source}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
