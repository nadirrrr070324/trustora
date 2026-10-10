"use client";
import { useState } from "react";
import { WEIGHTS } from "@/lib/trust-engine";

export function AConfig() {
  const [w, setW] = useState<Record<string, number>>(
    Object.fromEntries(Object.entries(WEIGHTS).map(([k, v]) => [k, Math.round(v * 100)]))
  );
  const total = Object.values(w).reduce((a, b) => a + b, 0);
  return (
    <section className="solid-panel p-6" aria-labelledby="cfg">
      <h2 id="cfg" className="font-bold text-white">Ranking configuration</h2>
      <p className="mt-1 text-[13px] text-slate-400">
        Adjust dimension weights (percent). Changes are versioned and re-run across all providers in production.
      </p>
      <div className="mt-4 space-y-3">
        {Object.keys(w).map((k) => (
          <label key={k} className="flex items-center gap-3 text-sm text-slate-200">
            <span className="w-44 capitalize">{k}</span>
            <input
              type="range" min={0} max={60} value={w[k]}
              onChange={(e) => setW({ ...w, [k]: +e.target.value })}
              className="flex-1 accent-[#4f8cff]" aria-label={`${k} weight percent`}
            />
            <span className="w-12 text-right font-bold text-white">{w[k]}%</span>
          </label>
        ))}
      </div>
      <p className={total === 100 ? "mt-3 text-[13px] text-emerald-300" : "mt-3 text-[13px] text-amber-200"} role="status">
        Total: {total}% {total === 100 ? "— valid." : "— must equal 100% to save."}
      </p>
      <button
        disabled={total !== 100}
        onClick={() => alert("Demo build — weight changes apply in production via versioned config migration.")}
        className="btn-primary mt-3 !text-[13px]">
        Save configuration
      </button>
    </section>
  );
}
