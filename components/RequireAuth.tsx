"use client";
import Link from "next/link";
import type { Role } from "@/lib/types";
import { useStore } from "@/lib/store";

export function RequireAuth({
  roles, children, title,
}: {
  roles: Role[];
  children: React.ReactNode;
  title: string;
}) {
  const { user } = useStore();
  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 pt-16 text-center sm:px-6">
        <h1 className="h-display text-2xl">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in to access this area.</p>
        <Link href="/signin" className="btn-primary mt-5">Sign In</Link>
      </div>
    );
  }
  if (!roles.includes(user.role)) {
    return (
      <div className="mx-auto max-w-md px-4 pt-16 text-center sm:px-6">
        <h1 className="h-display text-2xl">Not permitted</h1>
        <p className="mt-2 text-sm text-slate-400">
          This area requires a {roles.join(" or ")} account — you are signed in as {user.role}.
        </p>
        <Link href="/" className="btn-ghost mt-5">Back home</Link>
      </div>
    );
  }
  return <>{children}</>;
}
