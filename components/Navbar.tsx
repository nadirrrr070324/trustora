"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { GitCompareArrows, Menu, Search, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { cx } from "@/lib/utils";

export const LINKS = [
  { href: "/discover", label: "Discover" },
  { href: "/categories", label: "Categories" },
  { href: "/rankings", label: "Rankings" },
  { href: "/how-it-works", label: "How It Works" },
];

export function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { user, compare } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/discover?q=${encodeURIComponent(q.trim())}` : "/discover");
    setOpen(false);
  };
  const dashHref = !user
    ? "/dashboard"
    : user.role === "provider"
      ? "/provider"
      : user.role === "admin"
        ? "/admin"
        : "/dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-green-200 bg-white/80 backdrop-blur-2xl shadow-glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="TRUSTORA home">
          <div className="relative h-8 w-8">
            <Image
              src="/logo.png"
              alt="TRUSTORA Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-[17px] font-extrabold tracking-tight text-slate-900">TRUSTORA</span>
        </Link>
        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cx(
                "rounded-lg px-3 py-2 text-sm font-medium transition",
                path === l.href || path.startsWith(l.href + "/")
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "text-slate-600 hover:bg-green-50 hover:text-green-700"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <form onSubmit={go} className="ml-auto hidden min-w-0 max-w-xs flex-1 items-center md:flex" role="search">
          <div className="relative w-full">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search plumbers, tutors…" className="input py-2 pl-9"
              aria-label="Quick search providers"
            />
          </div>
        </form>
        <div className="ml-auto flex items-center gap-1.5 md:ml-0">
          <Link href="/compare" className="relative hidden rounded-lg p-2 text-slate-600 transition hover:bg-green-50 hover:text-green-700 sm:block" aria-label={`Compare (${compare.length})`}>
            <GitCompareArrows size={19} />
            {compare.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-green-500 px-1 text-[10px] font-bold text-white">{compare.length}</span>
            )}
          </Link>
          {user ? (
            <Link href={dashHref} className="btn-ghost hidden !py-2 sm:inline-flex">
              {user.name.split(" ")[0]} · {user.role}
            </Link>
          ) : (
            <>
              <Link href="/signin" className="hidden px-3 py-2 text-sm font-medium text-slate-600 hover:text-green-700 sm:block">Sign In</Link>
              <Link href="/join" className="btn-primary hidden !py-2 sm:inline-flex">Join as a Provider</Link>
            </>
          )}
          <button className="rounded-lg p-2 text-slate-600 hover:bg-green-50 lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <MobileMenu q={q} setQ={setQ} go={go} close={() => setOpen(false)} dashHref={dashHref} />
      )}
    </header>
  );
}

function MobileMenu({ q, setQ, go, close, dashHref }: {
  q: string; setQ: (v: string) => void;
  go: (e: React.FormEvent) => void;
  close: () => void; dashHref: string;
}) {
  const { user, compare } = useStore();
  return (
    <div className="border-t border-green-200 bg-white/90 px-4 py-4 backdrop-blur-2xl lg:hidden">
      <form onSubmit={go} className="mb-3 md:hidden" role="search">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search plumbers, tutors…" className="input" aria-label="Quick search providers" />
      </form>
      <nav className="grid gap-1" aria-label="Mobile">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={close} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50">
            {l.label}
          </Link>
        ))}
        <Link href="/compare" onClick={close} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50">
          Compare ({compare.length})
        </Link>
        {user ? (
          <Link href={dashHref} onClick={close} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50">
            {user.name} · {user.role}
          </Link>
        ) : (
          <>
            <Link href="/signin" onClick={close} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50">Sign In</Link>
            <Link href="/join" onClick={close} className="btn-primary mt-1">Join as a Provider</Link>
          </>
        )}
      </nav>
    </div>
  );
}
