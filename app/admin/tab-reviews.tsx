"use client";
import { getProvider } from "@/lib/data";
import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { Stars } from "@/components/Stars";

export function AReviews() {
  const { pendingReviews, setPendingReviews } = useStore();
  const decide = (id: string, status: "approved" | "rejected") =>
    setPendingReviews(pendingReviews.map((r) => (r.id === id ? { ...r, status } : r)));

  if (!pendingReviews.length)
    return <div className="solid-panel p-10 text-center text-sm text-slate-400">Moderation queue is empty.</div>;

  return (
    <ul className="space-y-3">
      {pendingReviews.map((r) => {
        const p = getProvider(r.providerId);
        return (
          <li key={r.id} className="solid-panel p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-white">{r.title} <span className="font-normal text-slate-500">· {p?.name}</span></p>
              <span className="chip capitalize">{r.status}</span>
            </div>
            <p className="mt-1 flex items-center gap-2 text-[13px] text-slate-400">
              <Stars value={r.rating} size={12} /> {r.author} · {r.serviceUsed} · {formatDate(r.date)}
            </p>
            <p className="mt-2 text-sm text-slate-300">{r.text}</p>
            {r.status === "pending" && (
              <div className="mt-3 flex gap-2">
                <button onClick={() => decide(r.id, "approved")} className="btn-primary !px-3 !py-1.5 !text-xs">Approve</button>
                <button onClick={() => decide(r.id, "rejected")} className="btn-ghost !px-3 !py-1.5 !text-xs">Reject</button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
