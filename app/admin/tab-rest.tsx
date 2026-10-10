"use client";
import { useState } from "react";
import { PROVIDERS } from "@/lib/data";

export function ASponsored() {
  const [slots, setSlots] = useState<Record<string, boolean>>({
    "northbeam-it": true, "clearsmile-dental": true,
  });
  return (
    <section className="solid-panel p-6" aria-labelledby="sp">
      <h2 id="sp" className="font-bold text-white">Sponsored placements</h2>
      <p className="mt-1 text-[13px] text-slate-400">
        Sponsored listings receive a label and a placement slot — they never alter trust scores or organic rank.
      </p>
      <ul className="mt-4 space-y-3">
        {PROVIDERS.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-sm text-slate-200">{p.name}</span>
            <label className="flex cursor-pointer items-center gap-2 text-[13px] text-slate-300">
              Sponsored
              <input
                type="checkbox" checked={!!slots[p.id]}
                onChange={(e) => setSlots({ ...slots, [p.id]: e.target.checked })}
                className="h-4 w-4 accent-[#4f8cff]"
              />
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AAudit() {
  const rows = [
    ["2026-10-10 09:41", "admin@trustora.example", "Approved review rev_seed_2 (Studio Meridian)"],
    ["2026-10-09 16:02", "admin@trustora.example", "Set apex-auto-care verification → pending"],
    ["2026-10-08 11:27", "system", "Nightly trust-score recompute: 13 providers, 0 anomalies"],
    ["2026-10-07 14:55", "admin@trustora.example", "Resolved dispute d3 (Greenline no-show)"],
  ];
  return (
    <div className="solid-panel overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
            <th className="p-4" scope="col">Time</th>
            <th className="p-4" scope="col">Actor</th>
            <th className="p-4" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([t, a, x]) => (
            <tr key={t + x} className="border-b border-white/10 last:border-0">
              <td className="whitespace-nowrap p-4 text-slate-400">{t}</td>
              <td className="p-4 text-slate-200">{a}</td>
              <td className="p-4 text-slate-300">{x}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AAnalytics() {
  const stats = [
    ["Providers", "13 (demo)"],
    ["Total reviews", String(PROVIDERS.reduce((s, p) => s + p.reviews.length, 0))],
    ["Verified share", "72%"],
    ["Avg. trust score", "89"],
    ["Enquiries (30d)", "46"],
    ["Disputes open", "2"],
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map(([k, v]) => (
        <div key={k} className="solid-panel p-5">
          <p className="text-2xl font-extrabold text-white">{v}</p>
          <p className="text-xs text-slate-500">{k}</p>
        </div>
      ))}
    </div>
  );
}

