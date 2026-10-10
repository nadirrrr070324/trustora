"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { LazyPTab } from "./tabs";

export const PTABS = ["Overview", "Profile", "Services", "Enquiries", "Reviews", "Score", "Analytics", "Billing"] as const;
export type PTab = (typeof PTABS)[number];


export function ProvShell() {
  const { user, signOut } = useStore();
  const router = useRouter();
  const [tab, setTab] = useState<PTab>("Overview");
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="h-display text-3xl">Provider studio</h1>
          <p className="mt-1 text-sm text-slate-400">
            Signed in as {user?.name} · manages Harbor & Vale Plumbing Co. (demo mapping)
          </p>
        </div>
        <button onClick={() => { signOut(); router.push("/"); }} className="btn-ghost !py-2 !text-[13px]">
          Sign out
        </button>
      </div>
      <div className="mt-5 flex gap-1 overflow-x-auto border-b border-white/10" role="tablist" aria-label="Provider sections">
        {PTABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={tab === t
              ? "whitespace-nowrap border-b-2 border-accent-400 px-4 py-3 text-sm font-medium text-white"
              : "whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-400 hover:text-white"}>
            {t}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <LazyPTab tab={tab} />
      </div>
    </div>
  );
}

export function GuardNote() {
  return (
    <p className="solid-panel border-amber-300/20 bg-amber-400/5 p-3.5 text-[13px] text-amber-100">
      Guardrail: providers cannot edit customer reviews or change their own scores.
      Score inputs come only from moderated reviews — this panel is read-only for scoring.
    </p>
  );
}
