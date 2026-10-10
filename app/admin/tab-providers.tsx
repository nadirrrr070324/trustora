"use client";
import { useState } from "react";
import { PROVIDERS } from "@/lib/data";
import { computeTrustScore } from "@/lib/trust-engine";

export function AProviders() {
  const [ver, setVer] = useState<Record<string, string>>({});
  const set = (id: string, v: string) => setVer({ ...ver, [id]: v });
  return (
    <div className="space-y-3">
      {PROVIDERS.map((p) => {
        const r = computeTrustScore(p);
        const status = ver[p.id] ?? p.verification;
        return (
          <div key={p.id} className="solid-panel flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="font-bold text-white">{p.name}</p>
              <p className="text-xs text-slate-500">
                {p.location} · score {r.score ?? "—"} · {r.reviewCount} reviews · {r.flags.length} flag{r.flags.length === 1 ? "" : "s"}
              </p>
              {r.flags.length > 0 && (
                <p className="mt-1 text-xs text-amber-200">{r.flags[0]}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="chip capitalize">{status}</span>
              <select
                value={status} onChange={(e) => set(p.id, e.target.value)}
                className="input !w-auto !py-1.5 !text-xs" aria-label={`Verification status for ${p.name}`}>
                <option value="verified">verified</option>
                <option value="pending">pending</option>
                <option value="unverified">unverified</option>
              </select>
            </div>
          </div>
        );
      })}
      <p className="text-xs text-slate-500">Demo: status changes apply to this session. Production writes go through an audited server API.</p>
    </div>
  );
}
