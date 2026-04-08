"use client";

import { useTransition, useState } from "react";
import { Send } from "lucide-react";
import { sendBroadcastEmail } from "@/app/admin/actions";

export function BroadcastForm({ activeCount }: { activeCount: number }) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    sent: number;
    failed: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setResult(null);
    setError(null);

    if (activeCount === 0) {
      setError("No active subscribers to send to.");
      return;
    }

    const subject = formData.get("subject") as string;
    const body = formData.get("body") as string;
    if (!subject || !body) {
      setError("Subject and body are required.");
      return;
    }

    if (
      !confirm(
        `Send this email to ${activeCount} active subscriber${activeCount !== 1 ? "s" : ""}?`
      )
    ) {
      return;
    }

    startTransition(async () => {
      try {
        const res = await sendBroadcastEmail(formData);
        setResult(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">
          Subject
        </label>
        <input
          name="subject"
          type="text"
          required
          placeholder="e.g. Summer Deals Are Here!"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">
          Body
        </label>
        <textarea
          name="body"
          rows={6}
          required
          placeholder="Write your email content here. Line breaks will be preserved."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white placeholder-white/30 outline-none transition-all focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          {error}
        </p>
      )}

      {result && (
        <p className="rounded-lg bg-green-500/10 px-4 py-2.5 text-sm text-green-400">
          Sent to {result.sent} subscriber{result.sent !== 1 ? "s" : ""}.
          {result.failed > 0 && ` ${result.failed} failed.`}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || activeCount === 0}
        className="flex items-center gap-2 rounded-xl bg-forteca-gold px-5 py-3 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        {pending ? "Sending..." : `Send to ${activeCount} Subscriber${activeCount !== 1 ? "s" : ""}`}
      </button>
    </form>
  );
}
