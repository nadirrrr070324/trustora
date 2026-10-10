"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";

export default function JoinPage() {
  const router = useRouter();
  const { signIn } = useStore();
  const [d, setD] = useState({ business: "", name: "", email: "", category: "home-services", agree: false });
  const [err, setErr] = useState("");

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    if (d.business.trim().length < 2) { setErr("Enter your business name."); return; }
    if (d.name.trim().length < 2) { setErr("Enter your name."); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) { setErr("Enter a valid email."); return; }
    if (!d.agree) { setErr("Please accept the Provider Guidelines to continue."); return; }
    signIn({ name: d.name.trim(), email: d.email.trim(), role: "provider", providerId: "harbor-plumbing" });
    router.push("/provider");
  };

  return (
    <div className="mx-auto max-w-lg px-4 pt-12 sm:px-6">
      <div className="glass p-7">
        <h1 className="h-display text-2xl">Join as a Provider</h1>
        <p className="mt-1 text-sm text-slate-400">
          Claim a demo profile, manage enquiries and watch your trust score respond to real evidence.
        </p>
        <form onSubmit={go} className="mt-5 space-y-3">
          <div>
            <label className="label" htmlFor="j-biz">Business name</label>
            <input id="j-biz" className="input" value={d.business} onChange={(e) => setD({ ...d, business: e.target.value })} placeholder="e.g. Harbor & Vale Plumbing Co." />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="j-name">Your name</label>
              <input id="j-name" className="input" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} autoComplete="name" />
            </div>
            <div>
              <label className="label" htmlFor="j-email">Work email</label>
              <input id="j-email" type="email" className="input" value={d.email} onChange={(e) => setD({ ...d, email: e.target.value })} autoComplete="email" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="j-cat">Primary category</label>
            <select id="j-cat" className="input" value={d.category} onChange={(e) => setD({ ...d, category: e.target.value })}>
              <option value="home-services">Home Services</option>
              <option value="technology-it">Technology & IT</option>
              <option value="education-tutoring">Education & Tutoring</option>
              <option value="business-services">Business Services</option>
              <option value="design-creative">Design & Creative</option>
              <option value="automotive">Automotive</option>
              <option value="health-wellness">Health & Wellness</option>
              <option value="professional-services">Professional Services</option>
            </select>
          </div>
          <label className="flex cursor-pointer items-start gap-2.5 text-[13px] text-slate-300">
            <input type="checkbox" checked={d.agree} onChange={(e) => setD({ ...d, agree: e.target.checked })} className="mt-0.5 h-4 w-4 accent-[#4f8cff]" />
            I agree to the Provider Guidelines: no fake reviews, no score manipulation, honest verification documents.
          </label>
          {err && <p className="text-[13px] text-red-300" role="alert">{err}</p>}
          <button type="submit" className="btn-primary w-full">Create provider account</button>
          <p className="text-center text-xs text-slate-500">Demo build — accounts live in your browser only.</p>
        </form>
      </div>
    </div>
  );
}
