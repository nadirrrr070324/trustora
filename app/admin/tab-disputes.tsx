"use client";
import { useState } from "react";

const SEED = [
  { id: "d1", subject: "Billing dispute — Apex Auto Care", detail: "Customer says final invoice exceeded the approved estimate by $140.", status: "open" },
  { id: "d2", subject: "Review challenge — Studio Meridian", detail: "Provider claims a 2-star review is from a non-customer. Evidence requested.", status: "investigating" },
  { id: "d3", subject: "No-show report — Greenline Landscaping", detail: "Two missed maintenance visits reported. Provider has been notified.", status: "open" },
];

export function ADisputes() {
  const [items, setItems] = useState(SEED);
  return (
    <ul className="space-y-3">
      {items.map((d) => (
        <li key={d.id} className="solid-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-bold text-white">{d.subject}</p>
            <span className="chip capitalize">{d.status}</span>
          </div>
          <p className="mt-1 text-sm text-slate-400">{d.detail}</p>
          <p className="mt-2 text-xs text-slate-500">Complaints inform the resolution dimension — they are never auto-treated as proven misconduct.</p>
          <div className="mt-3 flex gap-2">
            {d.status === "open" && (
              <button onClick={() => setItems(items.map((x) => (x.id === d.id ? { ...x, status: "investigating" } : x)))}
                className="btn-ghost !px-3 !py-1.5 !text-xs">Start investigation</button>
            )}
            {d.status !== "resolved" && (
              <button onClick={() => setItems(items.map((x) => (x.id === d.id ? { ...x, status: "resolved" } : x)))}
                className="btn-primary !px-3 !py-1.5 !text-xs">Mark resolved</button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
