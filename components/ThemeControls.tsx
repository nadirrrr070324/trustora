"use client";
import { useEffect, useRef, useState } from "react";
import {
  Accessibility,
  Contrast,
  Gauge,
  Eye,
  Moon,
  RotateCcw,
  Sun,
  Type,
} from "lucide-react";
import { useTheme, type TextSize } from "@/lib/theme";
import { cx } from "@/lib/utils";

const TEXT_SIZES: { key: TextSize; label: string }[] = [
  { key: "normal", label: "Normal" },
  { key: "large", label: "Large" },
  { key: "xlarge", label: "Extra" },
];

/** Floating accessibility & appearance panel (dark mode + a11y helpers). */
export function ThemeControls() {
  const {
    dark, toggleDark, textSize, setTextSize,
    highContrast, toggleHighContrast,
    reduceMotion, toggleReduceMotion,
    dyslexiaFont, toggleDyslexiaFont,
    reset,
  } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape or outside click for keyboard / pointer users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={panelRef} className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Accessibility and appearance settings"
          className="glass w-[min(20rem,calc(100vw-2rem))] p-4 shadow-glass-lg"
        >
          <div className="mb-3 flex items-center gap-2">
            <Accessibility size={18} className="text-green-600 dark:text-green-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Accessibility &amp; display</h2>
          </div>
          <button
            onClick={toggleDark}
            aria-pressed={dark}
            className="mb-2 flex w-full items-center gap-3 rounded-xl border border-green-200 bg-white/70 px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-green-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {dark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-500 dark:text-slate-300" />}
            <span className="flex-1">Dark mode</span>
            <Toggle on={dark} />
          </button>

          <div className="mb-2 rounded-xl border border-green-200 bg-white/70 px-3 py-2.5 dark:border-white/10 dark:bg-white/5">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <Type size={16} className="text-slate-500 dark:text-slate-300" />
              <span>Text size</span>
            </div>
            <div role="group" aria-label="Text size" className="grid grid-cols-3 gap-1.5">
              {TEXT_SIZES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTextSize(t.key)}
                  aria-pressed={textSize === t.key}
                  className={cx(
                    "rounded-lg border px-2 py-1.5 text-xs font-semibold transition",
                    textSize === t.key
                      ? "border-green-400 bg-green-100 text-green-700 dark:border-green-400/60 dark:bg-green-500/20 dark:text-green-300"
                      : "border-green-200 bg-white text-slate-600 hover:bg-green-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <ToggleRow
            icon={<Contrast size={16} className="text-slate-500 dark:text-slate-300" />}
            label="High contrast"
            on={highContrast}
            onToggle={toggleHighContrast}
          />
          <ToggleRow
            icon={<Gauge size={16} className="text-slate-500 dark:text-slate-300" />}
            label="Reduce motion"
            on={reduceMotion}
            onToggle={toggleReduceMotion}
          />
          <ToggleRow
            icon={<Eye size={16} className="text-slate-500 dark:text-slate-300" />}
            label="Dyslexia-friendly font"
            on={dyslexiaFont}
            onToggle={toggleDyslexiaFont}
          />

          <button
            onClick={reset}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 bg-white/60 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-green-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          >
            <RotateCcw size={14} /> Reset to defaults
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close accessibility settings" : "Open accessibility settings"}
        title="Accessibility & display"
        className="glass flex h-12 w-12 items-center justify-center rounded-full shadow-glass-lg transition hover:border-green-400/40"
      >
        <Accessibility size={22} className="text-green-600 dark:text-green-400" strokeWidth={2} />
      </button>
    </div>
  );
}

function ToggleRow({
  icon, label, on, onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      className="mb-2 flex w-full items-center gap-3 rounded-xl border border-green-200 bg-white/70 px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-green-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
    >
      {icon}
      <span className="flex-1">{label}</span>
      <Toggle on={on} />
    </button>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={cx(
        "relative h-5 w-9 shrink-0 rounded-full transition",
        on ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"
      )}
    >
      <span
        className={cx(
          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all",
          on ? "left-[1.125rem]" : "left-0.5"
        )}
      />
    </span>
  );
}
