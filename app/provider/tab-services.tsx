"use client";
import { useState } from "react";
import { getProvider } from "@/lib/data";
import { useStore } from "@/lib/store";

export function ServicesTab() {
  const { providerProfile, providerOverrides, setProviderOverride } = useStore();
  const p = getProvider(providerProfile?.id ?? "harbor-plumbing")!;
  const o = providerOverrides[p.id] ?? {};
  const [services, setServices] = useState(p.services.map((s) => ({ ...s })));
  const [ok, setOk] = useState("");

  void o;
  const setFrom = (i: number, v: string) => {
    setServices((list) => list.map((s, j) => (j === i ? { ...s, from: v === "" ? null : Math.max(0, +v || 0) } : s)));
  };

  return (
    <section className="solid-panel p-6" aria-labelledby="svc">
      <h2 id="svc" className="font-bold text-white">Services & pricing</h2>
      <p className="mt-1 text-[13px] text-slate-400">Starting prices shown on your public profile.</p>
      <ul className="mt-4 space-y-3">
        {services.map((s, i) => (
          <li key={s.name} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{s.name}</p>
              <p className="text-xs text-slate-500">{s.blurb}</p>
            </div>
            <label className="flex items-center gap-2 text-[13px] text-slate-300">
              From $
              <input
                type="number" min={0} value={s.from ?? ""}
                onChange={(e) => setFrom(i, e.target.value)}
                className="input !w-28" aria-label={`Starting price for ${s.name}`}
              />
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          setProviderOverride(p.id, { services });
          setOk("Services saved.");
        }}
        className="btn-primary mt-4 !text-[13px]">
        Save services
      </button>
      {ok && <p className="mt-2 text-[13px] text-emerald-300" role="status">{ok}</p>}
    </section>
  );
}
