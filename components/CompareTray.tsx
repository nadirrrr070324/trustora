"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { getProvider } from "@/lib/data";
import { useStore } from "@/lib/store";

export function CompareTray() {
  const { compare, toggleCompare, clearCompare } = useStore();
  const router = useRouter();
  if (compare.length === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4" role="region" aria-label="Comparison tray">
      <div className="glass mx-auto flex max-w-3xl flex-wrap items-center gap-2 px-4 py-3 shadow-glass">
        <span className="text-sm font-semibold text-white">
          Compare ({compare.length}/3):
        </span>
        {compare.map((id) => {
          const p = getProvider(id);
          return (
            <span key={id} className="chip !py-1.5">
              {p?.name ?? id}
              <button
                onClick={() => toggleCompare(id)}
                aria-label={`Remove ${p?.name ?? id} from comparison`}
                className="ml-1 rounded p-0.5 hover:bg-white/15"
              >
                <X size={12} />
              </button>
            </span>
          );
        })}
        <span className="ml-auto flex gap-2">
          <button onClick={clearCompare} className="text-xs font-medium text-slate-400 hover:text-white">
            Clear
          </button>
          <button
            onClick={() => router.push("/compare")}
            className="btn-primary !px-3 !py-1.5 !text-xs"
            disabled={compare.length < 2}
            title={compare.length < 2 ? "Select at least 2 providers" : "Open comparison"}
          >
            Compare now <ArrowRight size={13} />
          </button>
        </span>
      </div>
    </div>
  );
}

export function DemoNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "chip" : "solid-panel border-accent-400/20 bg-accent-500/10 p-3 text-[13px] text-slate-300"}>
      <span className="font-semibold text-accent-400">Demo data:</span> providers,
      reviews and scores on this page are synthetic illustrations — not real
      businesses or authentic feedback.{" "}
      <Link href="/methodology" className="underline underline-offset-2 hover:text-white">
        How ranking works
      </Link>
    </div>
  );
}

