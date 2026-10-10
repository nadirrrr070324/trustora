import Link from "next/link";
import { DIMENSIONS, DIMENSION_LABELS, WEIGHTS } from "@/lib/trust-engine";

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">Ranking methodology</p>
      <h1 className="h-display mt-2 text-3xl">How TRUSTORA rankings work</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-300">
        Every trust score is computed from review evidence on a 0–100 scale using
        five weighted dimensions. Nothing is hand-tuned per provider, and no
        subscription can buy a higher organic rank.
      </p>

      <section className="glass mt-8 p-6 sm:p-8" aria-labelledby="weights">
        <h2 id="weights" className="text-lg font-bold text-white">Dimension weights</h2>
        <div className="mt-4 space-y-3">
          {DIMENSIONS.map((d) => {
            const pct = Math.round(WEIGHTS[d] * 100);
            return (
              <div key={d}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-200">{DIMENSION_LABELS[d]}</span>
                  <span className="font-bold text-white">{pct}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-accent-500" style={{ width: `${pct * 2}%`, maxWidth: "100%" }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          ["Verified reviews weigh more", "Reviews tied to a completed job carry 1.6x weight versus unverified feedback."],
          ["Recency matters — fairly", "Evidence decays with a 12-month half-life, so recent performance counts most without erasing history."],
          ["Small samples stay honest", "Scores blend with a neutral prior (72). Under 3 reviews shows “Not enough data”; under 8 (or under 3 verified) shows “Provisional”."],
          ["Fraud gets flagged", "Uniform 5-star bursts, review floods and unverified-heavy profiles are flagged for human investigation."],
          ["Complaints are evidence, not verdicts", "Disputes feed the resolution dimension. Nothing is auto-treated as proven misconduct."],
          ["Scores are versioned", "Every change is snapshotted with its evidence, so rankings are auditable over time."],
        ].map(([t, d]) => (
          <section key={t} className="solid-panel p-5">
            <h2 className="text-sm font-bold text-white">{t}</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{d}</p>
          </section>
        ))}
      </div>

      <section className="glass mt-6 p-6" aria-labelledby="spon">
        <h2 id="spon" className="text-base font-bold text-white">Sponsored-listing disclosure</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Sponsored providers carry a visible label and may appear in a preferred
          placement slot. Sponsorship never changes trust scores, dimension inputs,
          or organic sort order — the ranking function does not accept payment signals.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/rankings" className="btn-primary !text-[13px]">See live rankings</Link>
          <Link href="/trust" className="btn-ghost !text-[13px]">Trust commitments</Link>
        </div>
      </section>
    </div>
  );
}
