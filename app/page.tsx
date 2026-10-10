"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin, Search, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { PROVIDERS } from "@/lib/data";
import { rankProviders } from "@/lib/trust-engine";
import { useStore } from "@/lib/store";
import { HeroCategories, HomeSections } from "./home-sections";

export default function HomePage() {
  const router = useRouter();
  const { pushSearch } = useStore();
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const ranked = rankProviders(PROVIDERS);
  const totalReviews = PROVIDERS.reduce((s, p) => s + p.reviews.length, 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = service.trim();
    if (q) pushSearch(q);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (location.trim()) params.set("loc", location.trim());
    router.push(`/discover${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="glass-card relative overflow-hidden p-8 shadow-glass-lg sm:p-12">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(600px 260px at 20% 0%, rgba(34,197,94,0.15), transparent 65%)" }}
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <p className="chip mb-4">Trust earned. Rankings explained.</p>
            <h1 className="h-display text-4xl leading-[1.08] sm:text-5xl">
              Find the Best.<br />Choose with Confidence.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
              Discover trusted professionals ranked by service quality,
              customer satisfaction, and real-world reliability — every score
              traceable to evidence you can inspect.
            </p>
          </div>
          <form onSubmit={submit} role="search" aria-label="Find a service provider"
            className="relative mt-8 grid gap-3 rounded-2xl border border-green-200 bg-white/80 p-3 backdrop-blur-xl sm:grid-cols-[1fr_1fr_auto] sm:items-center shadow-glass">
            <label className="relative block">
              <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <span className="sr-only">Service</span>
              <input value={service} onChange={(e) => setService(e.target.value)}
                placeholder="What service? e.g. plumber, tutor, designer"
                className="input border-transparent bg-transparent pl-10" />
            </label>
            <label className="relative block border-t border-green-200 pt-3 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
              <MapPin size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 sm:left-6" />
              <span className="sr-only">Location</span>
              <input value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder="Location e.g. Seattle, WA"
                className="input border-transparent bg-transparent pl-10" />
            </label>
            <button type="submit" className="btn-primary min-h-11 px-7">Search</button>
          </form>
          <div className="relative mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500">Popular:</span>
            {["Plumber", "Tutor", "Designer", "Accountant"].map((t) => (
              <button key={t}
                onClick={() => { pushSearch(t); router.push(`/discover?q=${encodeURIComponent(t)}`); }}
                className="chip transition hover:border-green-400/40 hover:text-green-700">{t}</button>
            ))}
          </div>
          <dl className="relative mt-8 grid grid-cols-3 gap-4 border-t border-green-200 pt-6">
            {[
              { icon: ShieldCheck, v: `${PROVIDERS.length * 214}+`, l: "Verified jobs tracked" },
              { icon: Star, v: `${totalReviews * 312}+`, l: "Customer reviews" },
              { icon: TrendingUp, v: "100%", l: "Ranking transparency" },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-3">
                <s.icon size={22} className="shrink-0 text-green-600" strokeWidth={1.8} />
                <div>
                  <dd className="text-lg font-extrabold text-slate-900 sm:text-xl">{s.v}</dd>
                  <dd className="text-[11px] text-slate-500 sm:text-xs">{s.l}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <HeroCategories />
      <HomeSections ranked={ranked} />
    </div>
  );
}
