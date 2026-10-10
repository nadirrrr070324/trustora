"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Provider } from "@/lib/types";
import { categoryBySlug } from "@/lib/categories";
import { computeTrustScore, starAverage } from "@/lib/trust-engine";
import { ScoreRing } from "@/components/ScoreRing";
import { Stars } from "@/components/Stars";
import { ProvisionalBadge, SponsoredTag, VerifyBadge } from "@/components/Badges";
import { ProfileActions } from "./actions";

export function ProfileHeader({ provider }: { provider: Provider }) {
  const result = computeTrustScore(provider);
  const { avg, count } = starAverage(provider);
  const cat = categoryBySlug(provider.category);
  return (
    <div className="glass mt-4 overflow-hidden">
      <div className="relative h-52 sm:h-64">
        <Image src={provider.image} alt={`${provider.name} cover photo`} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        {provider.sponsored && <div className="absolute left-4 top-4"><SponsoredTag /></div>}
      </div>
      <div className="flex flex-col gap-5 p-5 sm:p-7 lg:flex-row">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">{cat?.label}</p>
          <h1 className="h-display mt-1 text-3xl">{provider.name}</h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1"><MapPin size={13} /> {provider.location}</span>
            <span>· {provider.yearsInBusiness} yrs in business</span>
            <span>· {provider.completedJobs.toLocaleString()} jobs done</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <VerifyBadge status={provider.verification} />
            {result.provisional && result.score !== null && <ProvisionalBadge />}
            {result.score === null && <span className="chip">Not enough data</span>}
          </div>
          {count > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <Stars value={avg} size={16} />
              <span className="font-bold text-white">{avg.toFixed(1)}</span>
              <span className="text-sm text-slate-400">· {count} reviews</span>
            </div>
          )}
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">{provider.about}</p>
        </div>
        <aside className="w-full shrink-0 rounded-2xl border border-white/10 bg-ink-950/70 p-5 lg:w-80" aria-label="Trust summary and actions">
          <div className="flex items-center gap-4">
            <ScoreRing score={result.score} size={76} />
            <div>
              <p className="text-sm font-bold text-white">
                {result.score === null ? "Not enough data" : `Trust ${result.score}/100`}
              </p>
              <p className="text-xs text-slate-400">{result.reviewCount} reviews · {result.verifiedCount} verified</p>
              <p className="text-xs text-slate-500">Confidence: {result.confidence}</p>
            </div>
          </div>
          <ProfileActions provider={provider} />
        </aside>
      </div>
    </div>
  );
}

export function Crumb({ provider }: { provider: Provider }) {
  const cat = categoryBySlug(provider.category);
  return (
    <nav className="text-xs text-slate-500" aria-label="Breadcrumb">
      <Link href="/discover" className="hover:text-white">Discover</Link>
      <span className="mx-2">/</span>
      <Link href={`/categories/${provider.category}`} className="hover:text-white">{cat?.label}</Link>
      <span className="mx-2">/</span>
      <span className="text-slate-300">{provider.name}</span>
    </nav>
  );
}
