"use client";
import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { PROVIDERS, withOverrides } from "@/lib/data";
import { rankProviders } from "@/lib/trust-engine";
import { useStore } from "@/lib/store";
import { ProviderCard } from "@/components/ProviderCard";
import { DemoNotice } from "@/components/CompareTray";

export default function RankingsPage() {
  const { providerOverrides } = useStore();
  const merged = useMemo(() => withOverrides(PROVIDERS, providerOverrides), [providerOverrides]);
  const ranked = useMemo(() => rankProviders(merged), [merged]);
  const scored = ranked.filter((r) => r.result.score !== null);
  const unscored = ranked.filter((r) => r.result.score === null);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <h1 className="h-display text-3xl">Rankings</h1>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Live organic ranking across all categories, computed by the trust engine
        from current evidence. Sponsored placements are labelled and never boost rank.
      </p>
      <div className="mt-4"><DemoNotice compact /></div>

      <ol className="mt-6 space-y-4">
        {scored.map(({ provider, rank, result }) => (
          <li key={provider.id} className="solid-panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl font-extrabold text-white">
              {rank}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/providers/${provider.id}`} className="text-base font-bold text-white hover:underline">
                  {provider.name}
                </Link>
                {provider.sponsored && <span className="chip">Sponsored</span>}
                {result.provisional && <span className="chip border-sky-300/20 bg-sky-400/10 text-sky-200">Provisional</span>}
              </div>
              <p className="mt-0.5 text-[13px] text-slate-400">
                {CATEGORIES.find((c) => c.slug === provider.category)?.label} · {provider.location} · {result.reviewCount} reviews ({result.verifiedCount} verified)
              </p>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-right">
                <p className="text-2xl font-extrabold text-white">{result.score}</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-500">trust score</p>
              </div>
              <Link href={`/providers/${provider.id}`} className="btn-ghost !px-3 !py-2 !text-xs">
                Profile <ArrowRight size={13} />
              </Link>
            </div>
          </li>
        ))}
      </ol>

      {unscored.length > 0 && (
        <section className="mt-10" aria-labelledby="unranked">
          <h2 id="unranked" className="h-display text-xl">Not yet ranked</h2>
          <p className="mt-1 text-sm text-slate-400">Fewer than 3 reviews — we show “Not enough data” instead of guessing.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {unscored.map(({ provider }) => (
              <ProviderCard key={provider.id} provider={provider} rank={null} compact />
            ))}
          </div>
        </section>
      )}

      <div className="glass mt-10 p-6 text-sm text-slate-300">
        <span className="font-semibold text-white">Why this order?</span> Providers sort
        by trust score, then verified-review count.{" "}
        <Link href="/methodology" className="text-accent-400 underline underline-offset-2 hover:text-white">
          Read the full methodology
        </Link>
      </div>
    </div>
  );
}
