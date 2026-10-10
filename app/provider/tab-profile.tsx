"use client";
import { useState } from "react";
import { getProvider } from "@/lib/data";
import { useStore } from "@/lib/store";

export function ProfileTab() {
  const { providerProfile, providerOverrides, setProviderOverride } = useStore();
  const p = getProvider(providerProfile?.id ?? "harbor-plumbing")!;
  const o = providerOverrides[p.id] ?? {};
  const [about, setAbout] = useState((o.about as string) ?? p.about);
  const [phone, setPhone] = useState((o.phone as string) ?? p.phone);
  const [areas, setAreas] = useState(((o.areas as string[]) ?? p.areas).join(", "));
  const [ok, setOk] = useState("");
  const [verify, setVerify] = useState("");

  const save = () => {
    setProviderOverride(p.id, {
      about, phone,
      areas: areas.split(",").map((a) => a.trim()).filter(Boolean),
    });
    setOk("Profile updated — changes apply to your public profile instantly (demo).");
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="solid-panel p-6" aria-labelledby="edit">
        <h2 id="edit" className="font-bold text-white">Edit profile</h2>
        <label className="label mt-4" htmlFor="pp-about">About</label>
        <textarea id="pp-about" rows={5} className="input" value={about} onChange={(e) => setAbout(e.target.value)} />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="pp-phone">Phone</label>
            <input id="pp-phone" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="pp-areas">Service areas (comma-separated)</label>
            <input id="pp-areas" className="input" value={areas} onChange={(e) => setAreas(e.target.value)} />
          </div>
        </div>
        <button onClick={save} className="btn-primary mt-4 !text-[13px]">Save profile</button>
        {ok && <p className="mt-2 text-[13px] text-emerald-300" role="status">{ok}</p>}
      </section>
      <section className="solid-panel p-6" aria-labelledby="ver">
        <h2 id="ver" className="font-bold text-white">Business verification</h2>
        <p className="mt-1 text-[13px] text-slate-400">
          Status: <span className="font-semibold text-emerald-300">Verified (demo)</span>. Submit updated documents to re-verify.
        </p>
        <label className="label mt-4" htmlFor="pp-docs">Document reference</label>
        <input id="pp-docs" className="input" placeholder="e.g. License #PL-88213-WA" onChange={() => setVerify("")} />
        <button onClick={() => setVerify("Documents received — review typically takes 2 business days (demo).")} className="btn-ghost mt-3 !text-[13px]">
          Submit for verification
        </button>
        {verify && <p className="mt-2 text-[13px] text-sky-200" role="status">{verify}</p>}
      </section>
    </div>
  );
}
