"use client";
import { useState } from "react";
import { getProvider } from "@/lib/data";
import { Stars } from "@/components/Stars";
import { formatDate } from "@/lib/utils";

export function ReviewsTab() {
  const p = getProvider("harbor-plumbing")!;
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [posted, setPosted] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-4">
      <p className="solid-panel p-3.5 text-[13px] text-slate-300">
        You can publicly respond to reviews — you cannot edit or remove them. Responses appear on your profile instantly (demo).
      </p>
      {p.reviews.map((rev) => (
        <article key={rev.id} className="solid-panel p-5">
          <div className="flex items-center gap-2">
            <Stars value={rev.rating} />
            <span className="text-sm font-bold text-white">{rev.title}</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">{rev.author} · {formatDate(rev.date)}</p>
          <p className="mt-2 text-sm text-slate-300">{rev.text}</p>
          {rev.providerResponse || posted[rev.id] ? (
            <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-[13px] text-slate-300">
              <span className="font-semibold text-white">Your response: </span>
              {rev.providerResponse?.text ?? responses[rev.id]}
            </p>
          ) : (
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                className="input flex-1" placeholder="Write a public response…"
                value={responses[rev.id] ?? ""}
                onChange={(e) => setResponses({ ...responses, [rev.id]: e.target.value })}
                aria-label={`Respond to ${rev.author}`}
              />
              <button
                onClick={() => {
                  if ((responses[rev.id] ?? "").trim().length < 5) return;
                  setPosted({ ...posted, [rev.id]: true });
                }}
                className="btn-ghost !text-[13px]">
                Post response
              </button>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
