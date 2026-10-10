"use client";
import { ProviderCard } from "@/components/ProviderCard";
import type { Provider } from "@/lib/types";

export function ResultsGrid({
  list, rankOf, visible, onMore,
}: {
  list: Provider[];
  rankOf: Map<string, number | null>;
  visible: number;
  onMore: () => void;
}) {
  if (list.length === 0) return null;
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {list.slice(0, visible).map((p) => (
          <ProviderCard key={p.id} provider={p} rank={rankOf.get(p.id) ?? null} />
        ))}
      </div>
      {visible < list.length && (
        <div className="mt-6 text-center">
          <button onClick={onMore} className="btn-ghost">
            Load more ({list.length - visible} remaining)
          </button>
        </div>
      )}
    </>
  );
}

export function EmptyResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="solid-panel p-10 text-center">
      <p className="text-lg font-bold text-white">No providers match those filters</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400">
        Try widening the location, removing a category, or lowering the minimum rating.
      </p>
      <button onClick={onClear} className="btn-primary mt-5">Clear all filters</button>
    </div>
  );
}
