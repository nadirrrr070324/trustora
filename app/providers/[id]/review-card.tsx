"use client";
import { useState } from "react";
import type { PendingReview, Provider, SessionUser } from "@/lib/types";
import { useStore } from "@/lib/store";
import { formatDate, timeAgo, uid } from "@/lib/utils";
import { Stars } from "@/components/Stars";
import { BadgeCheck } from "lucide-react";

export function ReviewCard({ provider, rev }: {
  provider: Provider;
  rev: Provider["reviews"][number];
}) {
  const [helpful, setHelpful] = useState(false);
  return (
    <article className="solid-panel p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Stars value={rev.rating} />
        <h3 className="text-sm font-bold text-white">{rev.title}</h3>
      </div>
      <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
        <span className="font-medium text-slate-300">{rev.author}</span>
        <span>· {rev.authorLocation}</span>
        <span>· {formatDate(rev.date)} ({timeAgo(rev.date)})</span>
        <span>· {rev.serviceUsed}</span>
        {rev.verifiedJob ? (
          <span className="inline-flex items-center gap-1 font-medium text-emerald-300">
            <BadgeCheck size={12} /> Verified completed job
          </span>
        ) : (
          <span className="text-slate-500">Unverified feedback</span>
        )}
      </p>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-300">{rev.text}</p>
      {rev.providerResponse && (
        <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
          <p className="text-xs font-semibold text-slate-200">
            Response from {provider.name} · {formatDate(rev.providerResponse.date)}
          </p>
          <p className="mt-1 text-[13px] text-slate-400">{rev.providerResponse.text}</p>
        </div>
      )}
      <button
        onClick={() => setHelpful((h) => !h)}
        aria-pressed={helpful}
        className="mt-3 text-xs font-medium text-slate-500 hover:text-white"
      >
        Helpful ({rev.helpful + (helpful ? 1 : 0)})
      </button>
    </article>
  );
}
