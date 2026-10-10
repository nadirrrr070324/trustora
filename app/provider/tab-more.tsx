"use client";
import { getProvider } from "@/lib/data";
import { useStore } from "@/lib/store";

export function AnalyticsTab() {
  const { providerProfile, enquiries } = useStore();
  const p = getProvider(providerProfile?.id ?? "harbor-plumbing")!;
  const mine = enquiries.filter((e) => e.providerId === p.id);
  const views = [182, 204, 176, 231, 249, 268];
  const max = Math.max(...views);
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="solid-panel p-6" aria-labelledby="pv">
        <h2 id="pv" className="font-bold text-white">Profile views</h2>
        <div className="mt-4 flex h-36 items-end gap-2" role="img" aria-label="Profile views trending upward over six months">
          {views.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="w-full rounded-t-md bg-accent-500/70" style={{ height: `${(v / max) * 120}px` }} />
              <span className="text-[10px] text-slate-500">{months[i]}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[13px] text-slate-400">1,310 views in 6 months · +47% since May (demo analytics).</p>
      </section>
      <section className="solid-panel p-6" aria-labelledby="lead">
        <h2 id="lead" className="font-bold text-white">Lead funnel</h2>
        <ul className="mt-4 space-y-2.5 text-sm">
          {[
            ["Profile views (Oct)", "268"],
            ["Enquiries received", String(mine.length)],
            ["Replied", String(mine.filter((e) => e.status !== "new").length)],
            ["Est. conversion", "31%"],
          ].map(([k, v]) => (
            <li key={k} className="flex items-center justify-between border-b border-white/10 pb-2.5 last:border-0">
              <span className="text-slate-400">{k}</span>
              <span className="font-bold text-white">{v}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function BillingTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="solid-panel p-6" aria-labelledby="plan">
        <h2 id="plan" className="font-bold text-white">Subscription</h2>
        <p className="mt-2 text-sm text-slate-300">Current plan: <span className="font-bold text-white">Professional (demo)</span> — $49/mo</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-[13px] text-slate-400">
          <li>Verified badge & priority review moderation</li>
          <li>Lead analytics and ranking history</li>
          <li>Subscriptions never affect organic ranking</li>
        </ul>
        <div className="mt-4 flex gap-2">
          <button className="btn-ghost !text-[13px]" onClick={() => alert("Demo build — billing connects to Stripe in production. See DEPLOYMENT.md.")}>
            Manage billing
          </button>
          <button className="btn-ghost !text-[13px]" onClick={() => alert("Demo build — sponsored placements are managed in the admin panel.")}>
            Promote listing
          </button>
        </div>
      </section>
      <section className="solid-panel p-6" aria-labelledby="spon">
        <h2 id="spon" className="font-bold text-white">Sponsored disclosure</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
          Paid promotion buys a labelled Sponsored tag and preferred placement slots —
          never a higher trust score or organic rank. All sponsored impressions are logged
          for audit.
        </p>
      </section>
    </div>
  );
}

