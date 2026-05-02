"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";

interface NewsletterFormProps {
  variant?: "footer" | "inline";
}

export function NewsletterForm({ variant = "footer" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (res.ok) {
          setStatus("success");
          setEmail("");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    });
  }

  if (status === "success") {
    return (
      <p className={variant === "footer" ? "text-sm text-forteca-gold" : "text-sm font-semibold text-forteca-gold"}>
        You&apos;re in! Watch your inbox.
      </p>
    );
  }

  const isFooter = variant === "footer";

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        id="newsletter-email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder="Your email"
        required
        className={
          isFooter
            ? "flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-forteca-gold/50"
            : "flex-1 rounded-xl border border-forteca-navy/10 bg-white px-4 py-3 text-sm text-forteca-navy outline-none transition-all focus:border-forteca-gold focus:ring-2 focus:ring-forteca-gold/20"
        }
      />
      <button
        type="submit"
        disabled={pending}
        className={
          isFooter
            ? "flex items-center gap-1.5 rounded-lg bg-forteca-gold px-3 py-2 text-xs font-bold uppercase tracking-widest text-forteca-navy transition-colors hover:bg-forteca-gold-light disabled:opacity-50"
            : "flex items-center gap-2 rounded-xl bg-forteca-gold px-5 py-3 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-colors hover:bg-forteca-gold-light disabled:opacity-50"
        }
      >
        <Send className="h-3.5 w-3.5" />
        {pending ? "..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="absolute mt-12 text-xs text-red-400">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
