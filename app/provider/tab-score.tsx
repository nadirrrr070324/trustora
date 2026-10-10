"use client";
import { getProvider } from "@/lib/data";
import { DIMENSION_LABELS, DIMENSIONS, WEIGHTS, computeTrustScore } from "@/lib/trust-engine";
import { ScoreRing } from "@/components/ScoreRing";

export function ScoreTab() {
  const p = getProvider("harbor-plumbing")!;
  const result = computeTrustScore(p);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="solid-panel p-6" aria-labelledby="bd">
        <h2 id="bd" className="font-bold text-white">Trust score breakdown</h2>
        <div className="mt-4 flex items-center gap-4">
          <ScoreRing score={result.score} size={84} />
          <p className="text-[13px] text-slate-400">
            {result.confidence} confidence · {result.verifiedCount} of {result.reviewCount} reviews verified.
            Recalculated nightly from moderated reviews only.
          </p>
        </div>
        <div className="mt-5 space-y-3">
          {DIMENSIONS.map((d) => {
            const v = result.dimensions[d] ?? 0;
            return (
              <div key={d}>
                <div className="flex justify-between text-[13px]">
                  <span className="text-slate-200">{DIMENSION_LABELS[d]} · {Math.round(WEIGHTS[d] * 100)}%</span>
                  <span className="font-bold text-white">{Math.round(v)}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-accent-500" style={{ width: `${v}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="solid-panel p-6" aria-labelledby="hist">
        <h2 id="hist" className="font-bold text-white">Ranking history</h2>
        <ol className="mt-4 space-y-2.5">
          {p.scoreHistory.map((s) => (
            <li key={s.month} className="flex items-center gap-3 text-sm">
              <span className="w-10 text-slate-500">{s.month}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full rounded-full bg-accent-500" style={{ width: `${s.score}%` }} />
              </span>
              <span className="w-8 text-right font-bold text-white">{s.score}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-slate-500">
          Every score change is versioned with its evidence snapshot. Full audit history ships with production Supabase.
        </p>
      </section>
    </div>
  );
}
