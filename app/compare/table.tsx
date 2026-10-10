import { categoryBySlug } from "@/lib/categories";
import { getProvider } from "@/lib/data";
import { DIMENSIONS, DIMENSION_LABELS, computeTrustScore } from "@/lib/trust-engine";
import { formatPrice } from "@/lib/utils";

export function CompareDims({ ids }: { ids: string[] }) {
  return (
    <>
      {DIMENSIONS.map((d) => (
        <tr key={d} className="border-b border-white/10">
          <th scope="row" className="p-4 text-xs uppercase tracking-wider text-slate-500">{DIMENSION_LABELS[d]}</th>
          {ids.map((id) => {
            const v = computeTrustScore(getProvider(id)!).dimensions[d];
            return (
              <td key={id} className="p-4">
                {v == null ? <span className="text-slate-500">—</span> : (
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                      <span className="block h-full rounded-full bg-accent-500" style={{ width: `${v}%` }} />
                    </span>
                    <span className="font-semibold text-white">{Math.round(v)}</span>
                  </span>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

export function CompareFacts({ ids }: { ids: string[] }) {
  const rows: { label: string; get: (id: string) => string }[] = [
    { label: "Category", get: (id) => categoryBySlug(getProvider(id)?.category ?? "")?.label ?? "—" },
    { label: "Location", get: (id) => getProvider(id)?.location ?? "—" },
    { label: "Price", get: (id) => { const p = getProvider(id)!; return formatPrice(p.priceMin, p.priceMax); } },
    { label: "Jobs done", get: (id) => (getProvider(id)?.completedJobs ?? 0).toLocaleString() },
    { label: "Responds", get: (id) => getProvider(id)?.responseTime ?? "—" },
  ];
  return (
    <>
      {rows.map((r) => (
        <tr key={r.label} className="border-b border-white/10 last:border-0">
          <th scope="row" className="p-4 text-xs uppercase tracking-wider text-slate-500">{r.label}</th>
          {ids.map((id) => (
            <td key={id} className="p-4 text-slate-200">{r.get(id)}</td>
          ))}
        </tr>
      ))}
    </>
  );
}
