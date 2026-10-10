"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { RequireAuth } from "@/components/RequireAuth";
import { DashHead } from "./head";
import { CompareTab, EnqTab, RevTab, SavedTab, SearchTab } from "./tabs-a";
import { SettingsTab } from "./tabs-b";
import { TABS, type Tab } from "./shared";

export default function DashboardPage() {
  return (
    <RequireAuth roles={["customer"]} title="Customer dashboard">
      <DashShell />
    </RequireAuth>
  );
}

function DashShell() {
  const { user } = useStore();
  const [tab, setTab] = useState<Tab>("Saved");
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <DashHead />
      <div className="mt-5 flex gap-1 overflow-x-auto border-b border-white/10" role="tablist" aria-label="Dashboard sections">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={tab === t
              ? "whitespace-nowrap border-b-2 border-accent-400 px-4 py-3 text-sm font-medium text-white"
              : "whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-400 hover:text-white"}>
            {t}{t === "Saved" ? <TabCount kind="saved" /> : null}
            {t === "Enquiries" ? <TabCount kind="enquiries" /> : null}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {tab === "Saved" && <SavedTab />}
        {tab === "Searches" && <SearchTab />}
        {tab === "Compare" && <CompareTab />}
        {tab === "Enquiries" && <EnqTab />}
        {tab === "Reviews" && <RevTab />}
        {tab === "Settings" && <SettingsTab />}
      </div>
      <p className="sr-only">Signed in as {user?.name}</p>
    </div>
  );
}

function TabCount({ kind }: { kind: "saved" | "enquiries" }) {
  const { saved, enquiries } = useStore();
  const n = kind === "saved" ? saved.length : enquiries.length;
  return n > 0 ? <> ({n})</> : null;
}
