"use client";
import Link from "next/link";
import { PROVIDERS } from "@/lib/data";
import { useStore } from "@/lib/store";

export function AOverview() {
  const { pendingReviews, enquiries } = useStore();
  const pending = pendingReviews.filter((r) => r.status === "pending").length;
  const cards = [
    { v: String(PROVIDERS.length), l: "Providers (demo)", href: null },
    { v: String(pending), l: "Reviews awaiting moderation", href: null },
    { v: String(PROVIDERS.filter((p) => p.verification === "pending").length), l: "Verifications pending", href: null },
    { v: String(enquiries.length), l: "Enquiries tracked", href: null },
  ];
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.l} className="solid-panel p-5">
            <p className="text-2xl font-extrabold text-white">{c.v}</p>
            <p className="text-xs text-slate-500">{c.l}</p>
          </div>
        ))}
      </div>
      <div className="glass p-5 text-[13px] text-slate-300">
        <span className="font-semibold text-white">Suspicious-activity queue:</span> the
        trust engine flags uniform 5-star bursts, review floods and unverified-heavy
        profiles automatically. <Link href="/methodology" className="text-accent-400 underline underline-offset-2">Detection rules</Link>
      </div>
    </div>
  );
}
