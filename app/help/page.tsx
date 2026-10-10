"use client";
import { useState } from "react";

const FAQS = [
  ["How are trust scores calculated?", "Five weighted dimensions (satisfaction 30%, quality 25%, reliability 20%, value 15%, resolution 10%) computed from moderated reviews. Verified-job reviews carry 1.6x weight; older evidence decays with a 12-month half-life; small samples blend with a neutral prior."],
  ["What does “Provisional” mean?", "Fewer than 8 reviews (or fewer than 3 verified) — the score is shown but blended with a prior and labelled provisional. Under 3 reviews shows “Not enough data” with no score at all."],
  ["Can providers pay for higher rankings?", "No. Subscriptions unlock features (analytics, verification priority). Sponsored placements are labelled and never touch scores or organic sort."],
  ["How do I leave a verified review?", "Book through an enquiry and complete the job — the provider confirms completion, which marks your review verified and gives it 1.6x weight."],
  ["How are disputes handled?", "Report from any profile. Complaints feed the resolution dimension as evidence and both sides can respond on record. Nothing is auto-treated as proven misconduct; admins investigate."],
  ["Is my data safe?", "Production runs on Supabase with row-level security and server-side role checks. This demo stores session data in your browser only — see SUPABASE_SETUP.md for the production path."],
];

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
      <h1 className="h-display text-3xl">Help Center</h1>
      <p className="mt-1 text-sm text-slate-400">Answers to the questions we hear most.</p>
      <div className="mt-6 space-y-3">
        {FAQS.map(([q, a], i) => (
          <div key={q} className="solid-panel overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-white">
              {q}
              <span className="text-accent-400">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">{a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
