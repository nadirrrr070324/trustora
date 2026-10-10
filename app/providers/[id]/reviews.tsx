"use client";
import { useState } from "react";
import Link from "next/link";
import type { PendingReview, Provider, SessionUser } from "@/lib/types";
import { useStore } from "@/lib/store";
import { uid } from "@/lib/utils";
import { ReviewCard } from "./review-card";

export function ReviewsBlock({ provider, user }: {
  provider: Provider; user: SessionUser | null;
}) {
  const { addMyReview } = useStore();
  const [form, setForm] = useState({
    rating: 5, title: "", text: "",
    service: provider.services[0]?.name ?? "",
  });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { setError("Sign in as a customer to submit a review."); return; }
    if (user.role !== "customer") { setError("Only customer accounts can submit reviews."); return; }
    if (form.title.trim().length < 4) { setError("Give your review a short title (4+ characters)."); return; }
    if (form.text.trim().length < 30) { setError("Please write at least 30 characters."); return; }
    const review: PendingReview = {
      id: uid("rev"), providerId: provider.id, author: user.name,
      rating: form.rating, title: form.title.trim(), text: form.text.trim(),
      serviceUsed: form.service, date: new Date().toISOString().slice(0, 10),
      status: "pending",
    };
    addMyReview(review);
    setDone(true);
    setError("");
  };

  return (
    <div className="mt-4 space-y-4">
      {[...provider.reviews]
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
        .map((rev) => <ReviewCard key={rev.id} provider={provider} rev={rev} />)}
      <section className="glass p-5" aria-labelledby="write">
        <h2 id="write" className="text-base font-bold text-white">Write a review</h2>
        <p className="mt-1 text-xs text-slate-400">
          Reviews are moderated before they affect scores. Verified reviews require a completed job.
        </p>
        {done ? (
          <p className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-3.5 text-sm text-emerald-100" role="status">
            Thanks — your review was submitted for moderation.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-3">
            {!user && (
              <p className="text-[13px] text-slate-400">
                <Link href="/signin" className="text-accent-400 underline underline-offset-2">Sign in</Link> to write a review.
              </p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="rev-rating">Rating</label>
                <select id="rev-rating" value={form.rating} onChange={(e) => setForm({ ...form, rating: +e.target.value })} className="input">
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="rev-service">Service used</label>
                <select id="rev-service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="input">
                  {provider.services.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label" htmlFor="rev-title">Headline</label>
              <input id="rev-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" placeholder="Sum it up in a sentence" />
            </div>
            <div>
              <label className="label" htmlFor="rev-text">Your experience (min 30 characters)</label>
              <textarea id="rev-text" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4} className="input" placeholder="What went well? What could improve?" />
            </div>
            {error && <p className="text-[13px] text-red-300" role="alert">{error}</p>}
            <button type="submit" className="btn-primary">Submit for moderation</button>
          </form>
        )}
      </section>
    </div>
  );
}
