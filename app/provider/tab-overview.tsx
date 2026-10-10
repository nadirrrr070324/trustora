"use client";
import Link from "next/link";
import { getProvider } from "@/lib/data";
import { computeTrustScore } from "@/lib/trust-engine";
import { useStore } from "@/lib/store";
import { ScoreRing } from "@/components/ScoreRing";
import { GuardNote } from "./shell";

export function OverviewTab() {
  const { providerProfile, enquiries } = useStore();
  const p = getProvider(providerProfile?.id ?? "harbor-plumbing")!;
  const result = computeTrustScore(p);
  const mine = enquiries.filter((e) => e.providerId === p.id);
  const stats = [
    { v: result.score == null ? "—" : String(result.score), l: "Trust score" },
    { v: String(p.reviews.length), l: "Reviews" },
    { v: String(mine.filter((e) => e.status === "new").length), l: "New enquiries" },
    { v: p.completedJobs.toLocaleString(), l: "Jobs completed" },
  ];
  return (
    <div className="space-y-4">
      <GuardNote />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="solid-panel p-5">
            <p className="text-2xl font-extrabold text-white">{s.v}</p>
            <p className="text-xs text-slate-500">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="glass flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
        <ScoreRing score={result.score} size={72} />
        <div className="flex-1">
          <p className="font-bold text-white">{p.name}</p>
          <p className="mt-1 text-[13px] text-slate-400">
            {result.confidence} confidence · {result.verifiedCount} verified reviews · ranking responds only to moderated feedback.
          </p>
        </div>
        <Link href={`/providers/${p.id}`} className="btn-ghost !text-[13px]">View public profile</Link>
      </div>
    </div>
  );
}
