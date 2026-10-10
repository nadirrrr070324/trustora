"use client";
import { useState } from "react";
import { getProvider } from "@/lib/data";
import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export function EnquiriesTab() {
  const { providerProfile, enquiries, updateEnquiry } = useStore();
  const p = getProvider(providerProfile?.id ?? "harbor-plumbing")!;
  const mine = enquiries.filter((e) => e.providerId === p.id);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<Record<string, boolean>>({});

  if (!mine.length)
    return <div className="solid-panel p-10 text-center text-sm text-slate-400">No enquiries yet. New quote requests appear here.</div>;

  return (
    <ul className="space-y-3">
      {mine.map((e) => (
        <li key={e.id} className="solid-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-bold text-white">{e.name} <span className="font-normal text-slate-500">· {e.email}</span></p>
            <span className="chip capitalize">{e.status}</span>
          </div>
          <p className="mt-1 text-[13px] text-slate-400">{e.service} · {formatDate(e.date)}</p>
          <p className="mt-2 text-sm text-slate-300">{e.message}</p>
          {sent[e.id] ? (
            <p className="mt-3 text-[13px] text-emerald-300" role="status">Reply sent (demo).</p>
          ) : (
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                className="input flex-1" placeholder="Type a reply…"
                value={replies[e.id] ?? ""}
                onChange={(ev) => setReplies({ ...replies, [e.id]: ev.target.value })}
                aria-label={`Reply to ${e.name}`}
              />
              <button
                onClick={() => {
                  if ((replies[e.id] ?? "").trim().length < 3) return;
                  updateEnquiry(e.id, { status: "replied" });
                  setSent({ ...sent, [e.id]: true });
                }}
                className="btn-primary !text-[13px]">
                Reply
              </button>
              <button onClick={() => updateEnquiry(e.id, { status: "closed" })} className="btn-ghost !text-[13px]">
                Close
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
