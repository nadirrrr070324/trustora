"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export function DashHead() {
  const { user, signOut } = useStore();
  const router = useRouter();
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="h-display text-3xl">Hi, {user?.name.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-slate-400">Your saved providers, enquiries and reviews.</p>
      </div>
      <button onClick={() => { signOut(); router.push("/"); }} className="btn-ghost !py-2 !text-[13px]">
        Sign out
      </button>
    </div>
  );
}
