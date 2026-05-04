"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackLead } from "@/lib/meta-pixel";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

const subjects = [
  "Booking Inquiry",
  "Property Question",
  "Property Management",
  "Real Estate Services",
  "Home Staging",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    const eventId = trackLead({
      content_name: "Contact Form",
      content_category: data.subject,
      email: data.email,
      phone: data.phone,
    });

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, event_id: eventId }),
    });
    if (!res.ok) throw new Error("Failed to send message");
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-14 text-center shadow-sm ring-1 ring-forteca-navy/5">
        <CheckCircle className="mb-4 h-12 w-12 text-forteca-gold" />
        <h3 className="font-serif text-2xl font-bold text-forteca-navy">
          Message Received!
        </h3>
        <p className="mt-2 max-w-xs text-sm text-forteca-slate">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-forteca-gold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-forteca-navy/5"
    >
      {/* Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forteca-slate">
            Full Name <span className="text-forteca-gold">*</span>
          </label>
          <input
            type="text"
            placeholder="Jane Smith"
            {...register("name")}
            className={cn(
              "w-full rounded-xl border bg-forteca-cream/50 px-4 py-3 text-sm text-forteca-navy placeholder-forteca-slate/50 outline-none transition-all",
              "focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20",
              errors.name ? "border-red-400" : "border-forteca-navy/10"
            )}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forteca-slate">
            Email <span className="text-forteca-gold">*</span>
          </label>
          <input
            type="email"
            placeholder="jane@example.com"
            {...register("email")}
            className={cn(
              "w-full rounded-xl border bg-forteca-cream/50 px-4 py-3 text-sm text-forteca-navy placeholder-forteca-slate/50 outline-none transition-all",
              "focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20",
              errors.email ? "border-red-400" : "border-forteca-navy/10"
            )}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone + Subject */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forteca-slate">
            Phone (optional)
          </label>
          <input
            type="tel"
            placeholder="(484) 286-3223"
            {...register("phone")}
            className="w-full rounded-xl border border-forteca-navy/10 bg-forteca-cream/50 px-4 py-3 text-sm text-forteca-navy placeholder-forteca-slate/50 outline-none transition-all focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forteca-slate">
            Subject <span className="text-forteca-gold">*</span>
          </label>
          <select
            {...register("subject")}
            className={cn(
              "w-full rounded-xl border bg-forteca-cream/50 px-4 py-3 text-sm text-forteca-navy outline-none transition-all",
              "focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20",
              errors.subject ? "border-red-400" : "border-forteca-navy/10"
            )}
          >
            <option value="">Select a subject…</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forteca-slate">
          Message <span className="text-forteca-gold">*</span>
        </label>
        <textarea
          rows={5}
          placeholder="Tell us what you're looking for…"
          {...register("message")}
          className={cn(
            "w-full resize-none rounded-xl border bg-forteca-cream/50 px-4 py-3 text-sm text-forteca-navy placeholder-forteca-slate/50 outline-none transition-all",
            "focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20",
            errors.message ? "border-red-400" : "border-forteca-navy/10"
          )}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl bg-forteca-navy py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all",
          "hover:bg-forteca-navy-light",
          isSubmitting && "cursor-not-allowed opacity-60"
        )}
      >
        {isSubmitting ? (
          "Sending…"
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
