import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { PROVIDERS } from "@/lib/data";
import { CategoryIcon } from "@/components/CategoryIcon";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <h1 className="h-display text-3xl">Categories</h1>
      <p className="mt-1 text-sm text-slate-400">Eight specialties, ranked by the same transparent method.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c) => {
          const n = PROVIDERS.filter((p) => p.category === c.slug).length;
          return (
            <Link key={c.slug} href={`/categories/${c.slug}`}
              className="glass group p-6 transition hover:border-accent-400/30">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-accent-500/10 text-accent-400 transition group-hover:bg-accent-500/20">
                <CategoryIcon icon={c.icon} size={22} />
              </span>
              <span className="mt-4 block text-base font-bold text-white">{c.label}</span>
              <span className="mt-1 block text-[13px] text-slate-400">{c.tagline}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-accent-400">
                {n} provider{n === 1 ? "" : "s"} <ArrowRight size={14} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
