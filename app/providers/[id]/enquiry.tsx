"use client";
import { useState } from "react";
import type { Provider } from "@/lib/types";
import { useStore } from "@/lib/store";

export function EnquiryForm({ provider, onSubmit }: {
  provider: Provider;
  onSubmit: (d: { name: string; email: string; service: string; message: string }) => void;
}) {
  const { user } = useStore();
  const [d, setD] = useState({
    name: user?.name ?? "", email: user?.email ?? "",
    service: provider.services[0]?.name ?? "", message: "",
  });
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    if (d.name.trim().length < 2) { setErr("Please enter your name."); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) { setErr("Enter a valid email address."); return; }
    if (d.message.trim().length < 20) { setErr("Describe your job in at least 20 characters."); return; }
    onSubmit({ ...d, name: d.name.trim(), message: d.message.trim() });
    setSent(true);
    setErr("");
  };

  return (
    <section className="glass p-5" aria-labelledby="enq">
      <h2 id="enq" className="text-sm font-bold uppercase tracking-wider text-slate-300">Request a quote</h2>
      {sent ? (
        <p className="mt-3 rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-3.5 text-[13px] text-emerald-100" role="status">
          Enquiry sent — {provider.name} typically responds {provider.responseTime}. Track it in your dashboard.
        </p>
      ) : (
        <form onSubmit={go} className="mt-3 space-y-3">
          <div>
            <label className="label" htmlFor="eq-name">Name</label>
            <input id="eq-name" className="input" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} autoComplete="name" />
          </div>
          <div>
            <label className="label" htmlFor="eq-email">Email</label>
            <input id="eq-email" type="email" className="input" value={d.email} onChange={(e) => setD({ ...d, email: e.target.value })} autoComplete="email" />
          </div>
          <div>
            <label className="label" htmlFor="eq-service">Service</label>
            <select id="eq-service" className="input" value={d.service} onChange={(e) => setD({ ...d, service: e.target.value })}>
              {provider.services.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="eq-msg">Project details</label>
            <textarea id="eq-msg" rows={3} className="input" value={d.message} onChange={(e) => setD({ ...d, message: e.target.value })} placeholder="What do you need, and when?" />
          </div>
          {err && <p className="text-[13px] text-red-300" role="alert">{err}</p>}
          <button type="submit" className="btn-primary w-full">Send enquiry</button>
        </form>
      )}
    </section>
  );
}
