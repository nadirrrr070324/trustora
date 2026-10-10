"use client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { PROVIDERS, withOverrides } from "@/lib/data";
import { computeTrustScore, rankProviders, starAverage } from "@/lib/trust-engine";
import { useStore } from "@/lib/store";
import { DemoNotice } from "@/components/CompareTray";
import { AutoLocate } from "@/components/AutoLocate";
import { ActiveChip, FilterPanel, type FilterState } from "./filters";
import { EmptyResults, ResultsGrid } from "./results";

export type SortKey = "rank" | "rating" | "value" | "reviews";
const SORTS: { key: SortKey; label: string }[] = [
  { key: "rank", label: "Overall ranking" },
  { key: "rating", label: "Customer rating" },
  { key: "value", label: "Value for money" },
  { key: "reviews", label: "Review count" },
];
const PAGE_SIZE = 6;

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 pt-8 text-slate-400">Loading…</div>}>
      <DiscoverInner />
    </Suspense>
  );
}

function DiscoverInner() {
  const params = useSearchParams();
  const { providerOverrides } = useStore();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [loc, setLoc] = useState(params.get("loc") ?? "");
  const [f, setF] = useState<FilterState>({
    cats: params.get("cat") ? [params.get("cat") as string] : [],
    minRating: 0, verifiedOnly: false, price: "any",
  });
  const [sort, setSort] = useState<SortKey>("rank");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [sheet, setSheet] = useState(false);

  const merged = useMemo(() => withOverrides(PROVIDERS, providerOverrides), [providerOverrides]);
  const ranked = useMemo(() => rankProviders(merged), [merged]);
  const rankOf = useMemo(() => {
    const m = new Map<string, number | null>();
    ranked.forEach((r) => m.set(r.provider.id, r.rank));
    return m;
  }, [ranked]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const ll = loc.trim().toLowerCase();
    const list = merged.filter((p) => {
      if (f.cats.length && !f.cats.includes(p.category)) return false;
      if (f.verifiedOnly && p.verification !== "verified") return false;
      if (f.minRating > 0 && starAverage(p).avg < f.minRating) return false;
      if (f.price !== "any") {
        const anchor = p.priceMin ?? 999999;
        if (f.price === "budget" && anchor > 100) return false;
        if (f.price === "mid" && (anchor <= 100 || anchor > 800)) return false;
        if (f.price === "premium" && anchor <= 800 && p.priceMin != null) return false;
      }
      if (ql) {
        const hay = `${p.name} ${p.location} ${p.services.map((s) => s.name).join(" ")}`.toLowerCase();
        const catLabel = CATEGORIES.find((c) => c.slug === p.category)?.label.toLowerCase() ?? "";
        if (!hay.includes(ql) && !catLabel.includes(ql)) return false;
      }
      if (ll && !`${p.location} ${p.areas.join(" ")}`.toLowerCase().includes(ll)) return false;
      return true;
    });
    const cmp = {
      rank: (a: (typeof list)[number], b: (typeof list)[number]) =>
        (computeTrustScore(b).score ?? -1) - (computeTrustScore(a).score ?? -1),
      rating: (a: (typeof list)[number], b: (typeof list)[number]) =>
        starAverage(b).avg - starAverage(a).avg,
      reviews: (a: (typeof list)[number], b: (typeof list)[number]) =>
        b.reviews.length - a.reviews.length,
      value: (a: (typeof list)[number], b: (typeof list)[number]) =>
        (computeTrustScore(b).dimensions.value ?? -1) - (computeTrustScore(a).dimensions.value ?? -1),
    }[sort];
    const sorted = [...list].sort(cmp);
    if (sort !== "rank") return sorted;
    const spon = sorted.filter((p) => p.sponsored);
    const rest = sorted.filter((p) => !p.sponsored);
    return [...spon.slice(0, 1), ...rest, ...spon.slice(1)];
  }, [merged, q, loc, f, sort]);

  const activeCount = f.cats.length + (f.verifiedOnly ? 1 : 0) + (f.minRating > 0 ? 1 : 0) + (f.price !== "any" ? 1 : 0);
  const clearAll = () => {
    setQ(""); setLoc("");
    setF({ cats: [], minRating: 0, verifiedOnly: false, price: "any" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <h1 className="h-display text-3xl">Discover providers</h1>
      <p className="mt-1 text-sm text-slate-400">Search, filter and sort — organic rank is never for sale.</p>
      <div className="mt-4"><DemoNotice compact /></div>
      <div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-ink-950/60 p-3 sm:grid-cols-[1fr_1fr_auto]">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Service, business or keyword…" className="input" aria-label="Search services" />
        <div className="relative">
          <input value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="Location…" className="input pr-28" aria-label="Filter by location" />
          <span className="absolute right-1.5 top-1/2 -translate-y-1/2">
            <AutoLocate auto={loc === ""} onLocate={(p) => setLoc(p.city)} />
          </span>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="input sm:w-48" aria-label="Sort providers">
          {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
      </div>
      {(q || loc || activeCount > 0) && (
        <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="Active filters">
          {q && <ActiveChip label={`“${q}”`} onClear={() => setQ("")} />}
          {loc && <ActiveChip label={loc} onClear={() => setLoc("")} />}
          {f.cats.map((c) => (
            <ActiveChip key={c} label={CATEGORIES.find((x) => x.slug === c)?.short ?? c}
              onClear={() => setF({ ...f, cats: f.cats.filter((x) => x !== c) })} />
          ))}
          {f.minRating > 0 && <ActiveChip label={`${f.minRating}+ stars`} onClear={() => setF({ ...f, minRating: 0 })} />}
          {f.verifiedOnly && <ActiveChip label="Verified only" onClear={() => setF({ ...f, verifiedOnly: false })} />}
          {f.price !== "any" && <ActiveChip label={f.price} onClear={() => setF({ ...f, price: "any" })} />}
        </div>
      )}
      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="solid-panel sticky top-24 p-5">
            <FilterPanel f={f} setF={setF} onClear={clearAll} activeCount={activeCount} />
          </div>
        </aside>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-400" role="status">{filtered.length} providers found</p>
            <button onClick={() => setSheet(true)} className="btn-ghost !py-2 lg:hidden">
              <SlidersHorizontal size={15} /> Filters{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>
          </div>
          {filtered.length === 0 ? (
            <EmptyResults onClear={clearAll} />
          ) : (
            <ResultsGrid list={filtered} rankOf={rankOf} visible={visible} onMore={() => setVisible((v) => v + PAGE_SIZE)} />
          )}
        </div>
      </div>
      {sheet && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSheet(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-ink-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Filters</h2>
              <button onClick={() => setSheet(false)} aria-label="Close filters" className="rounded-lg p-2 text-slate-300 hover:bg-white/10">
                <X size={18} />
              </button>
            </div>
            <FilterPanel f={f} setF={setF} onClear={clearAll} activeCount={activeCount} />
            <button onClick={() => setSheet(false)} className="btn-primary mt-6 w-full">
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

