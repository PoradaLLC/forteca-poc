"use client";

import { useTransition } from "react";
import { UserX, UserCheck, Trash2 } from "lucide-react";
import { toggleSubscriberStatus, deleteSubscriber } from "@/app/admin/actions";

export function SubscriberActions({
  subscriberId,
  email,
  isActive,
}: {
  subscriberId: string;
  email: string;
  isActive: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(() => toggleSubscriberStatus(subscriberId, isActive))
        }
        className={`rounded-lg p-1.5 transition-colors disabled:opacity-50 ${
          isActive
            ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
            : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
        }`}
        title={isActive ? "Deactivate" : "Reactivate"}
      >
        {isActive ? (
          <UserX className="h-3.5 w-3.5" />
        ) : (
          <UserCheck className="h-3.5 w-3.5" />
        )}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (confirm(`Remove "${email}" from subscribers? This cannot be undone.`)) {
            startTransition(() => deleteSubscriber(subscriberId));
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
