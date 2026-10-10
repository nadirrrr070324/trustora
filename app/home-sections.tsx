"use client";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { PROVIDERS } from "@/lib/data";
import type { RankedProvider } from "@/lib/trust-engine";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ProviderCard } from "@/components/ProviderCard";
import { DemoNotice } from "@/components/CompareTray";

export function HeroCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6" aria-labelledby="cats">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 id="cats" className="h-display text-2xl">Browse categories</h2>
          <p className="mt-1 text-sm text-slate-400">Eight specialties, one transparent ranking method.</p>
        </div>
        <Link href="/categories" className="hidden items-center gap-1 text-sm font-medium text-accent-400 hover:text-white sm:inline-flex">
          All categories <ArrowRight size={15} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CATEGORIES.map((c) => {
          const n = PROVIDERS.filter((p) => p.category === c.slug).length;
          return (
            <Link key={c.slug} href={`/categories/${c.slug}`}
              className="glass-soft group p-4 transition hover:border-accent-400/30 hover:bg-white/10 sm:p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-accent-500/10 text-accent-400 transition group-hover:bg-accent-500/20">
                <CategoryIcon icon={c.icon} />
              </span>
              <span className="mt-3 block text-sm font-semibold text-white">{c.label}</span>
              <span className="mt-0.5 block text-xs text-slate-400">
                {n > 0 ? `${n} demo provider${n === 1 ? "" : "s"}` : "More providers soon"}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function HomeSections({ ranked }: { ranked: RankedProvider[] }) {
  const top = ranked.slice(0, 6);
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6" aria-labelledby="top">
        <div className="mb-2 flex items-end justify-between">
          <div>
            <h2 id="top" className="h-display text-2xl">Top-ranked providers</h2>
            <p className="mt-1 text-sm text-slate-400">Ranked live by the trust engine.</p>
          </div>
          <Link href="/rankings" className="hidden items-center gap-1 text-sm font-medium text-accent-400 hover:text-white sm:inline-flex">
            Full rankings <ArrowRight size={15} />
          </Link>
        </div>
        <div className="mb-6"><DemoNotice compact /></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {top.map(({ provider, rank }) => (
            <ProviderCard key={provider.id} provider={provider} rank={rank} />
          ))}
        </div>
      </section>
      <MethodologyStrip />
      <TrustGrid />
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6" aria-label="Get started">
        <div className="solid-panel flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="flex-1">
            <h2 className="h-display text-2xl">Are you a service provider?</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
              Claim your profile, collect verified reviews, and let your work
              speak through a score you cannot buy — only earn.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/join" className="btn-primary">Join as a Provider</Link>
            <Link href="/how-it-works" className="btn-ghost">How ranking works</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function MethodologyStrip() {
  const items = [
    { w: "30%", t: "Customer satisfaction", d: "Overall happiness across verified and community feedback." },
    { w: "25%", t: "Quality of work", d: "Craftsmanship and outcome quality reported by customers." },
    { w: "20%", t: "Reliability & punctuality", d: "On-time arrival, communication and follow-through." },
    { w: "15%", t: "Value for money", d: "Fairness of pricing relative to the result delivered." },
    { w: "10%", t: "Complaint resolution", d: "How fairly and quickly problems get resolved." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6" aria-labelledby="method">
      <div className="glass p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">Ranking methodology</p>
        <h2 id="method" className="h-display mt-2 text-2xl">How every score is calculated</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
          Five evidence-backed dimensions on a 0–100 scale. Small samples are
          blended with a neutral prior instead of shown as definitive.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((m) => (
            <div key={m.t} className="rounded-xl border border-white/10 bg-ink-950/60 p-4">
              <p className="text-2xl font-extrabold text-white">{m.w}</p>
              <p className="mt-1 text-[13px] font-semibold text-slate-200">{m.t}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{m.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/methodology" className="btn-primary !text-[13px]">Full methodology</Link>
          <Link href="/rankings" className="btn-ghost !text-[13px]">See live rankings</Link>
        </div>
      </div>
    </section>
  );
}

function TrustGrid() {
  const cards = [
    { t: "Business verification", d: "Licenses checked before the badge appears." },
    { t: "Review authenticity", d: "Verified-job reviews carry 1.6x weight; suspicious patterns flagged." },
    { t: "Ranking transparency", d: "Every score shows inputs, weights and confidence." },
    { t: "Dispute resolution", d: "Complaints feed resolution scores — never auto-guilt." },
    { t: "Sponsored disclosure", d: "Paid placements labelled; they can never buy rank." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6" aria-labelledby="trust">
      <h2 id="trust" className="h-display text-center text-2xl">Why TRUSTORA is different</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-400">
        Five guarantees baked into the platform — not marketing copy.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.t} className="glass-soft p-5">
            <ShieldCheck size={20} className="text-accent-400" strokeWidth={1.8} />
            <h3 className="mt-3 text-sm font-bold text-white">{c.t}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{c.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/trust" className="btn-ghost">Explore our trust commitments</Link>
      </div>
    </section>
  );
}
