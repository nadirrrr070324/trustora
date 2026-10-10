function Doc({ title, kicker, children }: { title: string; kicker: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">{kicker}</p>
      <h1 className="h-display mt-2 text-3xl">{title}</h1>
      <div className="solid-panel mt-6 space-y-4 p-6 text-sm leading-relaxed text-slate-300 sm:p-8">
        {children}
      </div>
    </div>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}
export { Doc };
