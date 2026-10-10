"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, BookmarkCheck, Flag, GitCompareArrows, Mail, Phone } from "lucide-react";
import type { Provider } from "@/lib/types";
import { useStore } from "@/lib/store";
import { cx, formatPrice } from "@/lib/utils";

export function ProfileActions({ provider }: { provider: Provider }) {
  const router = useRouter();
  const { toggleSaved, isSaved, toggleCompare, compare } = useStore();
  const [reported, setReported] = useState(false);
  const saved = isSaved(provider.id);
  const inCompare = compare.includes(provider.id);

  const onCompare = () => {
    const added = toggleCompare(provider.id);
    if (!added && !inCompare) router.push("/compare");
  };

  return (
    <>
      <p className="mt-3 text-[13px] font-semibold text-white">
        {formatPrice(provider.priceMin, provider.priceMax)}
      </p>
      <p className="text-xs text-slate-500">{provider.availability} · Responds {provider.responseTime}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <a href={`mailto:${provider.email}`} className="btn-primary !px-3 !text-[13px]"><Mail size={14} /> Enquire</a>
        <a href={`tel:${provider.phone.replace(/[^+\d]/g, "")}`} className="btn-ghost !px-3 !text-[13px]"><Phone size={14} /> Call</a>
        <button onClick={() => toggleSaved(provider.id)} aria-pressed={saved} className="btn-ghost !px-3 !text-[13px]">
          {saved ? <BookmarkCheck size={14} className="text-accent-400" /> : <Bookmark size={14} />}
          {saved ? "Saved" : "Save"}
        </button>
        <button onClick={onCompare} aria-pressed={inCompare}
          className={cx("btn-ghost !px-3 !text-[13px]", inCompare && "border-accent-400/40 bg-accent-500/15 text-accent-400")}>
          <GitCompareArrows size={14} /> {inCompare ? "Added" : "Compare"}
        </button>
      </div>
      <button onClick={() => setReported(true)} disabled={reported}
        className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 disabled:opacity-60">
        <Flag size={12} /> {reported ? "Thanks — report received (demo)" : "Report a problem"}
      </button>
    </>
  );
}
