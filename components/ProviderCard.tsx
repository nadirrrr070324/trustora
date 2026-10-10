"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bookmark, BookmarkCheck, GitCompareArrows, MapPin } from "lucide-react";
import type { Provider } from "@/lib/types";
import { categoryBySlug } from "@/lib/categories";
import { computeTrustScore, starAverage } from "@/lib/trust-engine";
import { useStore } from "@/lib/store";
import { cx, formatPrice } from "@/lib/utils";
import { Stars } from "./Stars";
import { ProvisionalBadge, RankBadge, SponsoredTag, VerifyBadge } from "./Badges";
import { ScoreRing } from "./ScoreRing";

export function ProviderCard({
  provider,
  rank,
  compact = false,
}: {
  provider: Provider;
  rank: number | null;
  compact?: boolean;
}) {
  const router = useRouter();
  const { toggleSaved, isSaved, toggleCompare, compare } = useStore();
  const result = computeTrustScore(provider);
  const { avg, count } = starAverage(provider);
  const saved = isSaved(provider.id);
  const inCompare = compare.includes(provider.id);
  const cat = categoryBySlug(provider.category);

  const onCompare = () => {
    const added = toggleCompare(provider.id);
    if (!added && !inCompare) {
      router.push("/compare");
    }
  };

  return (
    <article className="glass-card group flex flex-col overflow-hidden p-0 shadow-card-lg transition hover:border-green-400/30 hover:shadow-glow">
      <div className="relative h-40 w-full overflow-hidden bg-slate-100">
        <Image
          src={provider.image}
          alt={`${provider.name} — ${cat?.label ?? provider.category}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <RankBadge rank={rank} />
          {provider.sponsored && <SponsoredTag />}
        </div>
        <button
          onClick={() => toggleSaved(provider.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${provider.name} from saved` : `Save ${provider.name}`}
          title={saved ? "Saved" : "Save provider"}
          className="absolute right-3 top-3 rounded-lg border border-white/30 bg-white/80 p-2 text-slate-600 backdrop-blur-md transition hover:bg-white hover:text-green-600 hover:border-green-400/30"
        >
          {saved ? <BookmarkCheck size={16} className="text-green-600" /> : <Bookmark size={16} />}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600">
              {cat?.label}
            </p>
            <Link href={`/providers/${provider.id}`} className="mt-0.5 block truncate text-[16px] font-bold text-slate-900 hover:underline">
              {provider.name}
            </Link>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={12} /> {provider.location}
            </p>
          </div>
          <ScoreRing score={result.score} size={compact ? 56 : 64} />
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <VerifyBadge status={provider.verification} />
          {result.provisional && result.score !== null && <ProvisionalBadge />}
          {result.score === null && (
            <span className="chip">Not enough data</span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          {count > 0 ? (
            <>
              <Stars value={avg} />
              <span className="font-semibold text-white">{avg.toFixed(1)}</span>
              <span className="text-slate-400">({count} reviews)</span>
            </>
          ) : (
            <span className="text-slate-500">No reviews yet</span>
          )}
        </div>

        <p className="text-[13px] text-slate-400">
          {result.score !== null ? (
            <>Trust {result.score}/100 · {result.verifiedCount} verified · {provider.completedJobs.toLocaleString()} jobs</>
          ) : (
            <>Awaiting more verified feedback before a score is shown.</>
          )}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-sm font-semibold text-white">
            {formatPrice(provider.priceMin, provider.priceMax)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onCompare}
              className={cx("btn-ghost !px-3 !py-2 !text-xs", inCompare && "border-green-400/40 bg-green-500/15 text-green-600")}
              aria-pressed={inCompare}
              title={inCompare ? "Remove from compare" : "Add to compare (max 3)"}
            >
              <GitCompareArrows size={14} /> {inCompare ? "Added" : "Compare"}
            </button>
            <Link href={`/providers/${provider.id}`} className="btn-primary !px-3 !py-2 !text-xs">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

