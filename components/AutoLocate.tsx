"use client";
import { useEffect, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import { detectLocation, type GeoPlace } from "@/lib/geo";

interface Props {
  onLocate: (place: GeoPlace) => void;
  /** Auto-run on mount when geolocation permission is already granted (no prompt). */
  auto?: boolean;
  className?: string;
}

const BASE =
  "inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-white/70 px-2.5 py-1.5 text-[11px] font-semibold text-green-700 transition hover:border-green-400/50 hover:bg-green-50";

/** "Near me" button: detects location, reverse-geocodes it, then links to Google Maps. */
export function AutoLocate({ onLocate, auto = true, className }: Props) {
  const [busy, setBusy] = useState(false);
  const [place, setPlace] = useState<GeoPlace | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const started = useRef(false);

  const run = async () => {
    if (busy) return;
    setBusy(true);
    setErr(null);
    try {
      const p = await detectLocation();
      setPlace(p);
      onLocate(p);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Location unavailable");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!auto || started.current) return;
    started.current = true;
    let active = true;
    (async () => {
      try {
        const status = await navigator.permissions.query({ name: "geolocation" });
        if (active && status.state === "granted") await run();
      } catch {
        /* Permissions API unavailable — user can press the button. */
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto]);

  if (place) {
    return (
      <a
        href={`https://www.google.com/maps?q=${place.lat},${place.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        title={`${place.label} — open in Google Maps`}
        className={`${BASE} border-accent-400/40 bg-accent-500/10 text-accent-600 hover:bg-accent-500/20 ${className ?? ""}`}
      >
        <MapPin size={13} />
        {place.city}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={run}
      disabled={busy}
      title={err ?? "Detect my location"}
      className={`${className ?? ""} ${BASE} ${busy ? "opacity-70" : ""}`}
    >
      {busy ? <Loader2 size={13} className="animate-spin" /> : <MapPin size={13} />}
      {busy ? "Locating…" : err ? "Retry location" : "Near me"}
    </button>
  );
}
