"use client";
import { useState } from "react";
import { PROVIDERS } from "@/lib/data";

export default function ReportPage() {
  const [d, setD] = useState({ provider: PROVIDERS[0].id, kind: "Service complaint", detail: "" });
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    if (d.detail.trim().length < 30) { setErr("Please describe the issue in at least 30 characters."); return; }
    setSent(true);
    setErr("");
  };

  return (
    <div className="mx-auto max-w-xl px-4 pt-8 sm:px-6">
      <h1 className="h-display text-3xl">Report a problem</h1>
      <p className="mt-1 text-sm text-slate-400">
        Complaints become resolution evidence — both sides can respond, and admins investigate. Nothing here auto-penalises a provider.
      </p>
      <div className="glass mt-6 p-6">
        {sent ? (
          <p className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm text-emerald-100" role="status">
            Report received — reference TR-2026-DEMO. An admin will review it in the disputes queue. (Demo: stored locally.)
          </p>
        ) : (
          <form onSubmit={go} className="space-y-3">
            <div>
              <label className="label" htmlFor="r-prov">Provider</label>
              <select id="r-prov" className="input" value={d.provider} onChange={(e) => setD({ ...d, provider: e.target.value })}>
                {PROVIDERS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="r-kind">Issue type</label>
              <select id="r-kind" className="input" value={d.kind} onChange={(e) => setD({ ...d, kind: e.target.value })}>
                <option>Service complaint</option>
                <option>No-show / lateness</option>
                <option>Billing dispute</option>
                <option>Suspected fake review</option>
                <option>Safety concern</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="r-detail">What happened? (min 30 characters)</label>
              <textarea id="r-detail" rows={5} className="input" value={d.detail} onChange={(e) => setD({ ...d, detail: e.target.value })} placeholder="Dates, what was agreed, what went wrong…" />
            </div>
            {err && <p className="text-[13px] text-red-300" role="alert">{err}</p>}
            <button type="submit" className="btn-primary w-full">Submit report</button>
          </form>
        )}
      </div>
    </div>
  );
}
