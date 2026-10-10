"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { LazyATab } from "./tabs";

export const ATABS = ["Overview", "Providers", "Reviews", "Disputes", "Users", "Config", "Sponsored", "Audit", "Analytics"] as const;
export type ATab = (typeof ATABS)[number];

export function AdminShell() {
  const { signOut } = useStore();
  const router = useRouter();
  const [tab, setTab] = useState<ATab>("Overview");
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="h-display text-3xl">Administration</h1>
          <p className="mt-1 text-sm text-slate-400">
            Server-enforced permissions in production (RLS + role checks) — this demo mirrors those rules client-side.
          </p>
        </div>
        <button onClick={() => { signOut(); router.push("/"); }} className="btn-ghost !py-2 !text-[13px]">
          Sign out
        </button>
      </div>
      <div className="mt-5 flex gap-1 overflow-x-auto border-b border-white/10" role="tablist" aria-label="Admin sections">
        {ATABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={tab === t
              ? "whitespace-nowrap border-b-2 border-accent-400 px-4 py-3 text-sm font-medium text-white"
              : "whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-400 hover:text-white"}>
            {t}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <LazyATab tab={tab} />
      </div>
    </div>
  );
}
