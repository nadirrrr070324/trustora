"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Provider } from "@/lib/types";
import { useStore } from "@/lib/store";
import { cx, uid } from "@/lib/utils";
import { DemoNotice } from "@/components/CompareTray";
import { Crumb, ProfileHeader } from "./header";
import { ReviewsBlock } from "./reviews";
import { EnquiryForm } from "./enquiry";
import { ScoreBreakdown, WhyScore } from "./blocks-a";

export function ProfileBody({ base }: { base: Provider }) {
  const { user, providerOverrides, addEnquiry } = useStore();
  const provider = useMemo(() => {
    const o = providerOverrides[base.id];
    return o ? { ...base, ...o } : base;
  }, [base, providerOverrides]);
  const [tab, setTab] = useState<"reviews" | "about" | "photos">("reviews");

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <Crumb provider={provider} />
      <ProfileHeader provider={provider} />
      <div className="mt-4"><DemoNotice compact /></div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0">
          <div className="flex gap-1 overflow-x-auto border-b border-white/10" role="tablist" aria-label="Profile sections">
            {(["reviews", "about", "photos"] as const).map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
                className={cx("whitespace-nowrap px-4 py-3 text-sm font-medium capitalize transition",
                  tab === t ? "border-b-2 border-accent-400 text-white" : "text-slate-400 hover:text-white")}>
                {t === "reviews" ? `Reviews (${provider.reviews.length})` : t === "about" ? "Services & areas" : `Photos (${provider.portfolio.length})`}
              </button>
            ))}
          </div>
          {tab === "reviews" && <ReviewsBlock provider={provider} user={user} />}
          {tab === "about" && <AboutTab provider={provider} />}
          {tab === "photos" && <PhotosTab provider={provider} />}
        </div>
        <div className="space-y-4">
          <ScoreBreakdown provider={provider} />
          <WhyScore provider={provider} />
          <EnquiryForm
            provider={provider}
            onSubmit={(d) => addEnquiry({
              id: uid("eq"), providerId: provider.id, providerName: provider.name,
              name: d.name, email: d.email, service: d.service, message: d.message,
              date: new Date().toISOString().slice(0, 10), status: "new",
            })}
          />
        </div>
      </div>
    </div>
  );
}

function AboutTab({ provider }: { provider: Provider }) {
  return (
    <div className="solid-panel mt-4 space-y-6 p-6">
      <section aria-labelledby="svcs">
        <h2 id="svcs" className="text-base font-bold text-white">Services & pricing</h2>
        <ul className="mt-3 space-y-3">
          {provider.services.map((s) => (
            <li key={s.name} className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
              <div>
                <p className="text-sm font-semibold text-white">{s.name}</p>
                <p className="mt-0.5 text-[13px] text-slate-400">{s.blurb}</p>
              </div>
              <span className="shrink-0 text-[13px] font-semibold text-accent-400">
                {s.from != null ? `from $${s.from}` : "Quote"}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="areas">
        <h2 id="areas" className="text-base font-bold text-white">Service areas</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {provider.areas.map((a) => <span key={a} className="chip">{a}</span>)}
        </div>
      </section>
      <section aria-labelledby="contact">
        <h2 id="contact" className="text-base font-bold text-white">Contact</h2>
        <p className="mt-2 text-sm text-slate-300">{provider.email} · {provider.phone}</p>
        <p className="mt-1 text-xs text-slate-500">
          Member since {provider.memberSince} · {provider.responseTime} typical response.
        </p>
      </section>
    </div>
  );
}

function PhotosTab({ provider }: { provider: Provider }) {
  if (!provider.portfolio.length)
    return <p className="mt-4 text-sm text-slate-500">No portfolio photos yet.</p>;
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {provider.portfolio.map((ph) => (
        <figure key={ph.src} className="overflow-hidden rounded-2xl border border-white/10">
          <div className="relative h-52">
            <Image src={ph.src} alt={ph.caption} fill className="object-cover" sizes="50vw" />
          </div>
          <figcaption className="bg-ink-900 px-4 py-2.5 text-xs text-slate-400">{ph.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
