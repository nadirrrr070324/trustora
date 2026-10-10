"use client";
import Link from "next/link";

export const TABS = ["Saved", "Searches", "Compare", "Enquiries", "Reviews", "Settings"] as const;
export type Tab = (typeof TABS)[number];

export function Empty({ title, body, cta, href }: {
  title: string; body: string; cta: string; href: string;
}) {
  return (
    <div className="solid-panel p-10 text-center">
      <p className="text-lg font-bold text-white">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400">{body}</p>
      <Link href={href} className="btn-primary mt-5">{cta}</Link>
    </div>
  );
}
