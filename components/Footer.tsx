import Link from "next/link";

const COLS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { href: "/discover", label: "Discover providers" },
      { href: "/categories", label: "Categories" },
      { href: "/rankings", label: "Rankings" },
      { href: "/compare", label: "Compare" },
    ],
  },
  {
    title: "Trust & Safety",
    links: [
      { href: "/how-it-works", label: "How It Works" },
      { href: "/methodology", label: "Ranking Methodology" },
      { href: "/trust", label: "Trust & Verification" },
      { href: "/report", label: "Report a problem" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/help", label: "Help Center" },
      { href: "/join", label: "Join as a Provider" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/provider-guidelines", label: "Provider Guidelines" },
      { href: "/methodology", label: "Sponsored disclosure" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-ink-950/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500 text-sm font-extrabold text-white">T</span>
              <span className="text-[17px] font-extrabold tracking-tight text-white">TRUSTORA</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Trust earned. Rankings explained. Transparent, performance-based
              rankings for service providers — every score traceable to evidence.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Demonstration build: provider content is synthetic demo data, not
              real-world verification.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-4" aria-label="Footer">
            {COLS.map((c) => (
              <div key={c.title}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {c.title}
                </h3>
                <ul className="space-y-2">
                  {c.links.map((l) => (
                    <li key={l.label + l.href}>
                      <Link href={l.href} className="link-muted text-sm">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <span>© 2026 TRUSTORA. Demo build — all providers, reviews and scores are synthetic.</span>
          <span>Sponsored listings are always labelled and never boost organic rank.</span>
        </div>
      </div>
    </footer>
  );
}

