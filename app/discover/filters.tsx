"use client";
import { X } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

export type PriceBand = "any" | "budget" | "mid" | "premium";

export interface FilterState {
  cats: string[];
  minRating: number;
  verifiedOnly: boolean;
  price: PriceBand;
}

export function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="label">{label}</legend>
      {children}
    </fieldset>
  );
}

export function ActiveChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="chip border-accent-400/30 bg-accent-500/10 text-slate-200">
      {label}
      <button onClick={onClear} aria-label={`Remove filter ${label}`} className="rounded p-0.5 hover:bg-white/15">
        <X size={12} />
      </button>
    </span>
  );
}

export function FilterPanel({
  f,
  setF,
  onClear,
  activeCount,
}: {
  f: FilterState;
  setF: (v: FilterState) => void;
  onClear: () => void;
  activeCount: number;
}) {
  const toggleCat = (slug: string) =>
    setF({ ...f, cats: f.cats.includes(slug) ? f.cats.filter((x) => x !== slug) : [...f.cats, slug] });
  return (
    <div className="space-y-5">
      <FilterGroup label="Category">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c.slug} onClick={() => toggleCat(c.slug)} aria-pressed={f.cats.includes(c.slug)}
              className={f.cats.includes(c.slug) ? "chip border-accent-400/50 bg-accent-500/20 text-white" : "chip hover:text-white"}>
              {c.short}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup label="Minimum rating">
        <div className="flex gap-2">
          {[0, 3.5, 4, 4.5].map((v) => (
            <button key={v} onClick={() => setF({ ...f, minRating: v })} aria-pressed={f.minRating === v}
              className={f.minRating === v ? "chip border-accent-400/50 bg-accent-500/20 text-white" : "chip hover:text-white"}>
              {v === 0 ? "Any" : `${v}+`}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup label="Price">
        <div className="flex flex-wrap gap-2">
          {([["any", "Any"], ["budget", "< $100"], ["mid", "$100–$800"], ["premium", "$800+ / quote"]] as const).map(([v, l]) => (
            <button key={v} onClick={() => setF({ ...f, price: v })} aria-pressed={f.price === v}
              className={f.price === v ? "chip border-accent-400/50 bg-accent-500/20 text-white" : "chip hover:text-white"}>
              {l}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup label="Trust">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-300">
          <input type="checkbox" checked={f.verifiedOnly}
            onChange={(e) => setF({ ...f, verifiedOnly: e.target.checked })}
            className="h-4 w-4 accent-[#4f8cff]" />
          Verified providers only
        </label>
      </FilterGroup>
      {activeCount > 0 && (
        <button onClick={onClear} className="text-xs font-medium text-accent-400 hover:text-white">
          Clear all filters ({activeCount})
        </button>
      )}
    </div>
  );
}
