"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import type { SessionUser } from "@/lib/types";
import { useStore } from "@/lib/store";

const QUICK: { label: string; user: SessionUser }[] = [
  { label: "Customer demo", user: { name: "Demo Customer", email: "customer@example.com", role: "customer" } },
  { label: "Provider demo", user: { name: "Harbor & Vale Team", email: "hello@harborvale.example", role: "provider", providerId: "harbor-plumbing" } },
  { label: "Admin demo", user: { name: "Trustora Admin", email: "admin@trustora.example", role: "admin" } },
];

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const em = email.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { setErr("Enter a valid email address."); return; }
    if (password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    const role = em.includes("admin") ? "admin" : em.includes("provider") || em.includes("harbor") ? "provider" : "customer";
    signIn({
      name: em.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email: em, role,
      providerId: role === "provider" ? "harbor-plumbing" : undefined,
    });
    router.push(role === "provider" ? "/provider" : role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="mx-auto max-w-md px-4 pt-12 sm:px-6">
      <div className="glass p-7">
        <h1 className="h-display text-2xl">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-600">Sign in to save providers, compare and review.</p>
        <form onSubmit={go} className="mt-5 space-y-3">
          <div>
            <label className="label" htmlFor="si-email">Email</label>
            <input id="si-email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" />
          </div>
          <div>
            <label className="label" htmlFor="si-pass">Password</label>
            <input id="si-pass" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="••••••••" />
          </div>
          {err && <p className="text-[13px] text-red-600" role="alert">{err}</p>}
          <button type="submit" className="btn-primary w-full">Sign In</button>
        </form>
        <div className="mt-5 border-t border-green-200 pt-4">
          <p className="text-xs text-slate-500">Demo build with local auth — pick a role to explore:</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {QUICK.map((q) => (
              <button key={q.label} className="btn-ghost !px-2 !py-2 !text-xs"
                onClick={() => {
                  signIn(q.user);
                  router.push(q.user.role === "provider" ? "/provider" : q.user.role === "admin" ? "/admin" : "/dashboard");
                }}>
                {q.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-[13px] text-slate-600">
          New here? <Link href="/join" className="text-green-600 underline underline-offset-2">Join as a provider</Link>
        </p>
      </div>
    </div>
  );
}
