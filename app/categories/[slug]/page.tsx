import { notFound } from "next/navigation";
import Link from "next/link";
import { categoryBySlug } from "@/lib/categories";
import { PROVIDERS } from "@/lib/data";
import { rankProviders } from "@/lib/trust-engine";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ProviderCard } from "@/components/ProviderCard";
import { DemoNotice } from "@/components/CompareTray";

export function generateStaticParams() {
  return [
    { slug: "home-services" }, { slug: "technology-it" },
    { slug: "education-tutoring" }, { slug: "business-services" },
    { slug: "design-creative" }, { slug: "automotive" },
    { slug: "health-wellness" }, { slug: "professional-services" },
  ];
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = categoryBySlug(params.slug);
  if (!cat) notFound();
  const inCat = PROVIDERS.filter((p) => p.category === cat.slug);
  const ranked = rankProviders(inCat);
  const rankOf = new Map(ranked.map((r) => [r.provider.id, r.rank]));

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <nav className="text-xs text-slate-500" aria-label="Breadcrumb">
        <Link href="/categories" className="hover:text-white">Categories</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">{cat.label}</span>
      </nav>
      <div className="mt-4 flex items-start gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-accent-500/10 text-accent-400">
          <CategoryIcon icon={cat.icon} size={26} />
        </span>
        <div>
          <h1 className="h-display text-3xl">{cat.label}</h1>
          <p className="mt-1 text-sm text-slate-400">{cat.tagline}</p>
        </div>
      </div>
      <div className="mt-4"><DemoNotice compact /></div>
      <p className="mt-4 text-sm text-slate-400" role="status">
        {inCat.length} provider{inCat.length === 1 ? "" : "s"} in this category
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.map(({ provider }) => (
          <ProviderCard key={provider.id} provider={provider} rank={rankOf.get(provider.id) ?? null} />
        ))}
      </div>
      {inCat.length === 0 && (
        <div className="solid-panel mt-4 p-10 text-center text-slate-400">
          No demo providers in this category yet.
        </div>
      )}
    </div>
  );
}
