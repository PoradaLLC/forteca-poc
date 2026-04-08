import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { MessageSquare, Mail, Phone, Clock } from "lucide-react";
import { MessageActions } from "./MessageActions";

export const metadata: Metadata = { title: "Messages" };

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default async function AdminMessagesPage() {
  const supabase = await createServiceClient();

  const { data: messages } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const submissions = (messages ?? []) as ContactSubmission[];
  const unread = submissions.filter((m) => !m.is_read).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Messages</h1>
        <p className="mt-1 text-sm text-white/40">
          {submissions.length} total · {unread} unread
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-white/5 px-5 py-20 text-center">
          <MessageSquare className="mx-auto mb-3 h-8 w-8 text-white/20" />
          <p className="text-sm text-white/30">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-2xl border bg-white/5 p-6 transition-colors ${
                msg.is_read
                  ? "border-white/5"
                  : "border-forteca-gold/20 bg-forteca-gold/[0.03]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-serif text-lg font-bold text-white">
                      {msg.name}
                    </h3>
                    {!msg.is_read && (
                      <span className="rounded-full bg-forteca-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-forteca-gold">
                        New
                      </span>
                    )}
                  </div>

                  {/* Subject */}
                  {msg.subject && (
                    <p className="mt-1 text-sm font-medium text-white/70">
                      {msg.subject}
                    </p>
                  )}

                  {/* Contact details */}
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-white/40">
                    <a
                      href={`mailto:${msg.email}`}
                      className="flex items-center gap-1.5 transition-colors hover:text-forteca-gold"
                    >
                      <Mail className="h-3 w-3" />
                      {msg.email}
                    </a>
                    {msg.phone && (
                      <a
                        href={`tel:${msg.phone}`}
                        className="flex items-center gap-1.5 transition-colors hover:text-forteca-gold"
                      >
                        <Phone className="h-3 w-3" />
                        {msg.phone}
                      </a>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {formatDate(msg.created_at)}
                    </span>
                  </div>

                  {/* Message body */}
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/60">
                    {msg.message}
                  </p>
                </div>

                {/* Actions */}
                <MessageActions
                  messageId={msg.id}
                  isRead={msg.is_read}
                  senderName={msg.name}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
