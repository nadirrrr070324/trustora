"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type TextSize = "normal" | "large" | "xlarge";

export interface ThemeSettings {
  /** Dark colour scheme. */
  dark: boolean;
  /** Root font-size scaling for readability. */
  textSize: TextSize;
  /** High-contrast mode: stronger borders, solid surfaces, thicker focus rings. */
  highContrast: boolean;
  /** Disable animations / transitions (motion sensitivity). */
  reduceMotion: boolean;
  /** Dyslexia-friendly font stack + wider letter/word spacing. */
  dyslexiaFont: boolean;
}

export const DEFAULT_THEME: ThemeSettings = {
  dark: false,
  textSize: "normal",
  highContrast: false,
  reduceMotion: false,
  dyslexiaFont: false,
};

const STORAGE_KEY = "trustora.theme";

export interface ThemeState extends ThemeSettings {
  setDark: (v: boolean) => void;
  toggleDark: () => void;
  setTextSize: (v: TextSize) => void;
  toggleHighContrast: () => void;
  toggleReduceMotion: () => void;
  toggleDyslexiaFont: () => void;
  reset: () => void;
  /** True once settings have hydrated from storage on the client. */
  ready: boolean;
}

const ThemeCtx = createContext<ThemeState | null>(null);

/** Apply a settings object to the <html> element (classes + data attributes). */
export function applyTheme(s: ThemeSettings) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.classList.toggle("dark", s.dark);
  el.classList.toggle("a11y-contrast", s.highContrast);
  el.classList.toggle("a11y-reduce-motion", s.reduceMotion);
  el.classList.toggle("a11y-dyslexic", s.dyslexiaFont);
  el.setAttribute("data-text-size", s.textSize);
  el.style.colorScheme = s.dark ? "dark" : "light";
}

function readStored(): ThemeSettings {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_THEME;
    const parsed = JSON.parse(raw) as Partial<ThemeSettings>;
    return {
      dark: !!parsed.dark,
      textSize: parsed.textSize ?? "normal",
      highContrast: !!parsed.highContrast,
      reduceMotion: !!parsed.reduceMotion,
      dyslexiaFont: !!parsed.dyslexiaFont,
    };
  } catch {
    return DEFAULT_THEME;
  }
}

/**
 * Inline bootstrap applied before first paint (see layout.tsx) to avoid a
 * light→dark flash. Kept as a standalone string so the SSR script and the
 * client provider apply an identical result.
 */
export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var s=JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'{}');var e=document.documentElement;if(s.dark)e.classList.add('dark');if(s.highContrast)e.classList.add('a11y-contrast');if(s.reduceMotion)e.classList.add('a11y-reduce-motion');if(s.dyslexiaFont)e.classList.add('a11y-dyslexic');e.setAttribute('data-text-size',s.textSize||'normal');e.style.colorScheme=s.dark?'dark':'light';}catch(_){}})();`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  // Hydrate from storage, then keep <html> in sync on every change.
  useEffect(() => {
    const next = readStored();
    setSettings(next);
    applyTheme(next);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyTheme(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* storage unavailable */
    }
  }, [ready, settings]);

  const setDark = useCallback((v: boolean) => setSettings((s) => ({ ...s, dark: v })), []);
  const toggleDark = useCallback(() => setSettings((s) => ({ ...s, dark: !s.dark })), []);
  const setTextSize = useCallback(
    (v: TextSize) => setSettings((s) => ({ ...s, textSize: v })),
    []
  );
  const toggleHighContrast = useCallback(
    () => setSettings((s) => ({ ...s, highContrast: !s.highContrast })),
    []
  );
  const toggleReduceMotion = useCallback(
    () => setSettings((s) => ({ ...s, reduceMotion: !s.reduceMotion })),
    []
  );
  const toggleDyslexiaFont = useCallback(
    () => setSettings((s) => ({ ...s, dyslexiaFont: !s.dyslexiaFont })),
    []
  );
  const reset = useCallback(() => setSettings(DEFAULT_THEME), []);

  const value: ThemeState = {
    ...settings,
    setDark,
    toggleDark,
    setTextSize,
    toggleHighContrast,
    toggleReduceMotion,
    toggleDyslexiaFont,
    reset,
    ready,
  };

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): ThemeState {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
