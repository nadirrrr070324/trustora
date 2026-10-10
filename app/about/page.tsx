export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">About</p>
      <h1 className="h-display mt-2 text-3xl">Trust earned. Rankings explained.</h1>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-300">
        <p>
          TRUSTORA is a service-provider discovery platform built on a simple idea:
          rankings should be evidence you can inspect, not black boxes you must trust.
          Every provider score traces back to moderated reviews, weighted dimensions,
          and a published methodology.
        </p>
        <p>
          This demonstration build ships with synthetic providers, reviews and scores
          so every workflow — discovery, comparison, reviews, dashboards, moderation —
          can be exercised end to end. Connect Supabase (see SUPABASE_SETUP.md) to run
          it on real data with server-enforced permissions.
        </p>
      </div>
    </div>
  );
}
