"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";

export function SettingsTab() {
  const { user, updateUser, notif, setNotif } = useStore();
  const [name, setName] = useState(user?.name ?? "");
  const [ok, setOk] = useState("");
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="solid-panel p-6" aria-labelledby="acct">
        <h2 id="acct" className="font-bold text-white">Account</h2>
        <label className="label mt-4" htmlFor="dash-name">Display name</label>
        <input id="dash-name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
        <p className="mt-2 text-xs text-slate-500">{user?.email}</p>
        <button
          onClick={() => { updateUser({ name: name.trim() || (user?.name ?? "") }); setOk("Profile updated."); }}
          className="btn-primary mt-4 !text-[13px]">
          Save changes
        </button>
        {ok && <p className="mt-2 text-[13px] text-emerald-300" role="status">{ok}</p>}
      </section>
      <section className="solid-panel p-6" aria-labelledby="notif">
        <h2 id="notif" className="font-bold text-white">Notification preferences</h2>
        <div className="mt-4 space-y-3">
          {([["email", "Email notifications"], ["sms", "SMS notifications"], ["leads", "Enquiry updates"], ["reviews", "Review status updates"], ["rankings", "Ranking digests"]] as const).map(([k, label]) => (
            <label key={k} className="flex cursor-pointer items-center justify-between text-sm text-slate-300">
              {label}
              <input type="checkbox" checked={notif[k]}
                onChange={(e) => setNotif({ ...notif, [k]: e.target.checked })}
                className="h-4 w-4 accent-[#4f8cff]" />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
