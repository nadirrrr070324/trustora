"use client";
import Link from "next/link";
import { getProvider, PROVIDERS } from "@/lib/data";
import { rankProviders } from "@/lib/trust-engine";
import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { ProviderCard } from "@/components/ProviderCard";
import { Empty } from "./shared";

export function SavedTab() {
  const { saved } = useStore();
  const ranked = rankProviders(PROVIDERS);
  const rankOf = new Map(ranked.map((r) => [r.provider.id, r.rank]));
  const list = saved.map(getProvider).filter(Boolean);
  if (!list.length)
    return <Empty title="No saved providers yet" body="Tap the bookmark on any provider card to keep it here." cta="Discover providers" href="/discover" />;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p) => <ProviderCard key={p!.id} provider={p!} rank={rankOf.get(p!.id) ?? null} />)}
    </div>
  );
}

export function SearchTab() {
  const { searches, clearSearches } = useStore();
  if (!searches.length)
    return <Empty title="No recent searches" body="Searches from the homepage and discovery appear here." cta="Start searching" href="/discover" />;
  return (
    <div className="solid-panel p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold text-white">Recent searches</h2>
        <button onClick={clearSearches} className="text-xs text-slate-400 hover:text-white">Clear</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((s) => (
          <Link key={s} href={`/discover?q=${encodeURIComponent(s)}`} className="chip hover:text-white">{s}</Link>
        ))}
      </div>
    </div>
  );
}

export function CompareTab() {
  const { compare } = useStore();
  if (compare.length < 2)
    return <Empty title="Nothing to compare yet" body="Add at least 2 providers to compare side by side (max 3)." cta="Discover providers" href="/discover" />;
  return (
    <div className="solid-panel p-6 text-center">
      <p className="text-sm text-slate-300">{compare.length} providers ready to compare.</p>
      <Link href="/compare" className="btn-primary mt-4">Open comparison</Link>
    </div>
  );
}

export function EnqTab() {
  const { enquiries } = useStore();
  if (!enquiries.length)
    return <Empty title="No enquiries yet" body="Quote requests from provider profiles land here." cta="Find a provider" href="/discover" />;
  return (
    <ul className="space-y-3">
      {enquiries.map((e) => (
        <li key={e.id} className="solid-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-bold text-white">{e.providerName}</p>
            <span className="chip capitalize">{e.status}</span>
          </div>
          <p className="mt-1 text-[13px] text-slate-400">{e.service} · {formatDate(e.date)}</p>
          <p className="mt-2 text-sm text-slate-300">{e.message}</p>
        </li>
      ))}
    </ul>
  );
}

export function RevTab() {
  const { myReviews } = useStore();
  if (!myReviews.length)
    return <Empty title="No reviews submitted" body="Reviews go through moderation, then appear here." cta="Find someone to review" href="/discover" />;
  return (
    <ul className="space-y-3">
      {myReviews.map((r) => {
        const p = getProvider(r.providerId);
        return (
          <li key={r.id} className="solid-panel p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-white">{r.title} <span className="font-normal text-slate-500">· {p?.name}</span></p>
              <span className="chip capitalize">{r.status}</span>
            </div>
            <p className="mt-1 text-[13px] text-slate-400">{r.rating} stars · {r.serviceUsed}</p>
            <p className="mt-2 text-sm text-slate-300">{r.text}</p>
          </li>
        );
      })}
    </ul>
  );
}
