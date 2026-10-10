"use client";
import { useState } from "react";

export default function ContactPage() {
  const [d, setD] = useState({ name: "", email: "", topic: "General", message: "" });
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    if (d.name.trim().length < 2) { setErr("Please enter your name."); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) { setErr("Enter a valid email."); return; }
    if (d.message.trim().length < 20) { setErr("Please write at least 20 characters."); return; }
    setSent(true);
    setErr("");
  };

  return (
    <div className="mx-auto max-w-xl px-4 pt-8 sm:px-6">
      <h1 className="h-display text-3xl">Contact us</h1>
      <p className="mt-1 text-sm text-slate-400">We reply within 2 business days (demo: messages stay in your browser).</p>
      <div className="glass mt-6 p-6">
        {sent ? (
          <p className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm text-emerald-100" role="status">
            Message received — thanks for reaching out. (Demo build: nothing was transmitted.)
          </p>
        ) : (
          <form onSubmit={go} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="c-name">Name</label>
                <input id="c-name" className="input" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} />
              </div>
              <div>
                <label className="label" htmlFor="c-email">Email</label>
                <input id="c-email" type="email" className="input" value={d.email} onChange={(e) => setD({ ...d, email: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="c-topic">Topic</label>
              <select id="c-topic" className="input" value={d.topic} onChange={(e) => setD({ ...d, topic: e.target.value })}>
                <option>General</option>
                <option>Verification help</option>
                <option>Review dispute</option>
                <option>Provider onboarding</option>
                <option>Press</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="c-msg">Message</label>
              <textarea id="c-msg" rows={5} className="input" value={d.message} onChange={(e) => setD({ ...d, message: e.target.value })} />
            </div>
            {err && <p className="text-[13px] text-red-300" role="alert">{err}</p>}
            <button type="submit" className="btn-primary w-full">Send message</button>
          </form>
        )}
      </div>
    </div>
  );
}
