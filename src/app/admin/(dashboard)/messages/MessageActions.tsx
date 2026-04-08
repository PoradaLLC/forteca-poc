"use client";

import { useTransition } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { toggleMessageRead, deleteMessage } from "@/app/admin/actions";

export function MessageActions({
  messageId,
  isRead,
  senderName,
}: {
  messageId: string;
  isRead: boolean;
  senderName: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-shrink-0 flex-col gap-1.5">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(() => toggleMessageRead(messageId, isRead))
        }
        className={`rounded-lg p-1.5 transition-colors disabled:opacity-50 ${
          isRead
            ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
            : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
        }`}
        title={isRead ? "Mark as unread" : "Mark as read"}
      >
        {isRead ? (
          <EyeOff className="h-3.5 w-3.5" />
        ) : (
          <Eye className="h-3.5 w-3.5" />
        )}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (
            confirm(
              `Delete message from "${senderName}"? This cannot be undone.`
            )
          ) {
            startTransition(() => deleteMessage(messageId));
          }
        }}
        className="rounded-lg bg-red-500/10 p-1.5 text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
        title="Delete"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
