import Link from "next/link";

const ITEMS = [
  ["Business verification", "We check licenses, registrations and insurance before awarding the Verified badge. Pending or failed checks show honestly — never hidden."],
  ["Review authenticity", "Verified completed-job reviews carry 1.6x weight. Burst patterns, uniform 5-star floods and unverified-heavy profiles are flagged for investigation, and all reviews pass human moderation."],
  ["Ranking transparency", "Every score displays its dimension inputs, weights, review counts and confidence. Methodology is public; score history is versioned."],
  ["Dispute resolution", "Customers can report problems from any profile. Complaints feed the resolution dimension as evidence — they are never auto-treated as proven misconduct, and both sides can respond on record."],
  ["Sponsored-listing disclosure", "Paid placements are always labelled Sponsored and can never purchase a higher organic rank. The scoring function accepts no payment signals."],
];

export default function TrustPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">Trust & safety</p>
      <h1 className="h-display mt-2 text-3xl">Our trust commitments</h1>
      <p className="mt-3 text-[15px] text-slate-300">Five guarantees, enforced in product logic — not just policy pages.</p>
      <div className="mt-8 space-y-4">
        {ITEMS.map(([t, d], i) => (
          <section key={t} className="glass p-6">
            <h2 className="font-bold text-white">{i + 1}. {t}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{d}</p>
          </section>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/report" className="btn-primary !text-[13px]">Report a problem</Link>
        <Link href="/methodology" className="btn-ghost !text-[13px]">Ranking methodology</Link>
      </div>
    </div>
  );
}
