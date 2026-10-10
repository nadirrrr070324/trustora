"use client";
import Link from "next/link";
import { X } from "lucide-react";
import { getProvider } from "@/lib/data";
import { computeTrustScore, starAverage } from "@/lib/trust-engine";
import { useStore } from "@/lib/store";
import { Stars } from "@/components/Stars";
import { ScoreRing } from "@/components/ScoreRing";
import { VerifyBadge } from "@/components/Badges";
import { CompareDims, CompareFacts } from "./table";

export default function ComparePage() {
  const { compare, toggleCompare, clearCompare } = useStore();
  const items = compare.map((id) => getProvider(id)).filter(Boolean);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6">
        <h1 className="h-display text-3xl">Compare providers</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
          Select up to 3 providers using the Compare button on any provider card
          or profile to see a side-by-side breakdown.
        </p>
        <Link href="/discover" className="btn-primary mt-6">Browse providers</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="h-display text-3xl">Compare providers</h1>
          <p className="mt-1 text-sm text-slate-400">Side-by-side trust scores and key facts.</p>
        </div>
        <button onClick={clearCompare} className="text-sm text-slate-400 hover:text-white">Clear all</button>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] border-collapse bg-ink-900 text-left text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="w-36 p-4 text-xs uppercase tracking-wider text-slate-500" scope="col">Provider</th>
              {items.map((p) => (
                <th key={p!.id} scope="col" className="min-w-52 p-4 align-top">
                  <button onClick={() => toggleCompare(p!.id)} aria-label={`Remove ${p!.name}`}
                    className="mb-2 ml-auto flex rounded p-1 text-slate-500 hover:bg-white/10 hover:text-white">
                    <X size={14} />
                  </button>
                  <Link href={`/providers/${p!.id}`} className="font-bold text-white hover:underline">{p!.name}</Link>
                  <div className="mt-2 flex items-center gap-2">
                    <ScoreRing score={computeTrustScore(p!).score} size={52} />
                    <VerifyBadge status={p!.verification} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10">
              <th scope="row" className="p-4 text-xs uppercase tracking-wider text-slate-500">Star rating</th>
              {items.map((p) => {
                const { avg, count } = starAverage(p!);
                return (
                  <td key={p!.id} className="p-4">
                    <span className="flex items-center gap-2">
                      <Stars value={avg} /> <span className="font-semibold text-white">{avg.toFixed(1)}</span>
                      <span className="text-slate-500">({count})</span>
                    </span>
                  </td>
                );
              })}
            </tr>
            <CompareDims ids={items.map((p) => p!.id)} />
            <CompareFacts ids={items.map((p) => p!.id)} />
            <tr>
              <th scope="row" className="p-4" />
              {items.map((p) => (
                <td key={p!.id} className="p-4">
                  <Link href={`/providers/${p!.id}`} className="btn-primary w-full !text-xs">View Profile</Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
