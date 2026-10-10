import Link from "next/link";

const STEPS = [
  ["Search & filter", "Find providers by service, location, category, price and verification status."],
  ["Compare evidence", "Open profiles to inspect the score breakdown, verified reviews and ranking history."],
  ["Enquire directly", "Send a quote request — tracked in your customer dashboard."],
  ["Leave verified feedback", "After a completed job, your review carries 1.6x weight in the trust engine."],
];

export default function HowPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">How it works</p>
      <h1 className="h-display mt-2 text-3xl">Choose with confidence in four steps</h1>
      <ol className="mt-8 space-y-4">
        {STEPS.map(([t, d], i) => (
          <li key={t} className="glass flex gap-5 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500 text-base font-extrabold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="font-bold text-white">{t}</h2>
              <p className="mt-1 text-sm text-slate-400">{d}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/discover" className="btn-primary">Discover providers</Link>
        <Link href="/methodology" className="btn-ghost">Ranking methodology</Link>
      </div>
    </div>
  );
}
