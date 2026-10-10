import { AlertTriangle, BadgeCheck, Clock3, ShieldAlert } from "lucide-react";
import type { VerificationStatus } from "@/lib/types";
import { cx } from "@/lib/utils";

export function VerifyBadge({ status }: { status: VerificationStatus }) {
  if (status === "verified")
    return (
      <span className="chip border-emerald-300/20 bg-emerald-400/10 text-emerald-200">
        <BadgeCheck size={13} /> Verified
      </span>
    );
  if (status === "pending")
    return (
      <span className="chip border-amber-300/20 bg-amber-400/10 text-amber-200">
        <Clock3 size={13} /> Verification pending
      </span>
    );
  return (
    <span className="chip border-white/10 bg-white/5 text-slate-400">
      <ShieldAlert size={13} /> Unverified
    </span>
  );
}

export function RankBadge({ rank }: { rank: number | null }) {
  if (rank == null)
    return <span className="chip">Unranked · not enough data</span>;
  const style =
    rank === 1
      ? "border-amber-300/30 bg-amber-400/15 text-amber-200"
      : rank <= 3
        ? "border-accent-400/30 bg-accent-500/15 text-accent-400"
        : "border-white/10 bg-white/5 text-slate-300";
  return <span className={cx("chip font-semibold", style)}>#{rank} ranked</span>;
}

export function ProvisionalBadge() {
  return (
    <span className="chip border-sky-300/20 bg-sky-400/10 text-sky-200">
      <AlertTriangle size={13} /> Provisional ranking
    </span>
  );
}

export function SponsoredTag() {
  return (
    <span className="chip border-white/15 bg-white/10 text-slate-300">
      Sponsored
    </span>
  );
}
