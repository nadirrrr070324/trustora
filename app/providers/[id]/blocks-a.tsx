"use client";
import { useState } from "react";
import { BadgeCheck, Info } from "lucide-react";
import type { Provider, SessionUser } from "@/lib/types";
import { DIMENSION_LABELS, DIMENSIONS, WEIGHTS, computeTrustScore } from "@/lib/trust-engine";
import { useStore } from "@/lib/store";
import { formatDate, timeAgo, uid } from "@/lib/utils";
import { Stars } from "@/components/Stars";

export function ScoreBreakdown({ provider }: { provider: Provider }) {
  const result = computeTrustScore(provider);
  return (
    <section className="solid-panel p-5" aria-labelledby="breakdown">
      <h2 id="breakdown" className="text-sm font-bold uppercase tracking-wider text-slate-300">
        Trust score breakdown
      </h2>
      {result.score === null ? (
        <p className="mt-3 text-[13px] text-slate-400">
          Not enough data yet — a breakdown appears once at least 3 reviews are recorded.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {DIMENSIONS.map((d) => {
            const v = result.dimensions[d] ?? 0;
            return (
              <div key={d}>
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="font-medium text-slate-200">
                    {DIMENSION_LABELS[d]} <span className="text-slate-500">· {Math.round(WEIGHTS[d] * 100)}%</span>
                  </span>
                  <span className="font-bold text-white">{Math.round(v)}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10" role="img" aria-label={`${DIMENSION_LABELS[d]} ${Math.round(v)} of 100`}>
                  <div className="h-full rounded-full bg-accent-500" style={{ width: `${v}%` }} />
                </div>
              </div>
            );
          })}
          <p className="pt-1 text-xs text-slate-500">
            Confidence {result.confidence} · effective evidence weight {result.effectiveWeight}
          </p>
        </div>
      )}
    </section>
  );
}

export function WhyScore({ provider }: { provider: Provider }) {
  const result = computeTrustScore(provider);
  const [open, setOpen] = useState(false);
  return (
    <section className="glass-soft p-5" aria-labelledby="why">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center gap-2 text-left">
        <Info size={15} className="shrink-0 text-accent-400" />
        <h2 id="why" className="text-sm font-bold text-white">Why this score?</h2>
      </button>
      {open ? (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-slate-300">
          {result.explanation.map((e, i) => <li key={i}>{e}</li>)}
          {result.flags.map((f, i) => (
            <li key={`f${i}`} className="text-amber-200">{f}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-[13px] text-slate-400">
          {result.score === null
            ? "Expand to see why no score is shown."
            : `Expand to see the ${result.reviewCount}-review evidence behind this score.`}
        </p>
      )}
    </section>
  );
}
