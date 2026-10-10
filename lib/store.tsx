"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Enquiry, PendingReview, Provider, SessionUser } from "@/lib/types";

const K = {
  user: "trustora.user",
  saved: "trustora.saved",
  searches: "trustora.searches",
  compare: "trustora.compare",
  providers: "trustora.provider-overrides",
  enquiries: "trustora.enquiries",
  myReviews: "trustora.my-reviews",
  pending: "trustora.pending-reviews",
  notif: "trustora.notif-prefs",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export interface NotifPrefs {
  email: boolean;
  sms: boolean;
  leads: boolean;
  reviews: boolean;
  rankings: boolean;
}

export interface StoreState {
  user: SessionUser | null;
  signIn: (u: SessionUser) => void;
  signOut: () => void;
  updateUser: (patch: Partial<SessionUser>) => void;
  saved: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  searches: string[];
  pushSearch: (q: string) => void;
  clearSearches: () => void;
  compare: string[];
  toggleCompare: (id: string) => boolean;
  clearCompare: () => void;
  providerOverrides: Record<string, Partial<Provider>>;
  setProviderOverride: (id: string, patch: Partial<Provider>) => void;
  providerProfile: Provider | null;
  enquiries: Enquiry[];
  addEnquiry: (e: Enquiry) => void;
  updateEnquiry: (id: string, patch: Partial<Enquiry>) => void;
  myReviews: PendingReview[];
  addMyReview: (r: PendingReview) => void;
  pendingReviews: PendingReview[];
  setPendingReviews: (r: PendingReview[]) => void;
  notif: NotifPrefs;
  setNotif: (n: NotifPrefs) => void;
}

const StoreCtx = createContext<StoreState | null>(null);

const DEFAULT_NOTIF: NotifPrefs = {
  email: true,
  sms: false,
  leads: true,
  reviews: true,
  rankings: false,
};

export function StoreProvider({
  children,
  providerProfile,
  seedPending,
  seedEnquiries,
}: {
  children: ReactNode;
  providerProfile: Provider | null;
  seedPending: PendingReview[];
  seedEnquiries: Enquiry[];
}) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [searches, setSearches] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [overrides, setOverrides] = useState<Record<string, Partial<Provider>>>({});
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [myReviews, setMyReviews] = useState<PendingReview[]>([]);
  const [pending, setPending] = useState<PendingReview[]>([]);
  const [notif, setNotifState] = useState<NotifPrefs>(DEFAULT_NOTIF);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(read<SessionUser | null>(K.user, null));
    setSaved(read<string[]>(K.saved, []));
    setSearches(read<string[]>(K.searches, []));
    setCompare(read<string[]>(K.compare, []));
    setOverrides(read(K.providers, {}));
    setEnquiries(read<Enquiry[]>(K.enquiries, seedEnquiries));
    setMyReviews(read<PendingReview[]>(K.myReviews, []));
    setPending(read<PendingReview[]>(K.pending, seedPending));
    setNotifState(read<NotifPrefs>(K.notif, DEFAULT_NOTIF));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    write(K.user, user);
    write(K.saved, saved);
    write(K.searches, searches);
    write(K.compare, compare);
    write(K.providers, overrides);
    write(K.enquiries, enquiries);
    write(K.myReviews, myReviews);
    write(K.pending, pending);
    write(K.notif, notif);
  }, [hydrated, user, saved, searches, compare, overrides, enquiries, myReviews, pending, notif]);

  const signIn = useCallback((u: SessionUser) => setUser(u), []);
  const signOut = useCallback(() => setUser(null), []);
  const updateUser = useCallback(
    (patch: Partial<SessionUser>) =>
      setUser((u) => (u ? { ...u, ...patch } : u)),
    []
  );
  const toggleSaved = useCallback((id: string) => {
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }, []);
  const isSaved = useCallback((id: string) => saved.includes(id), [saved]);
  const pushSearch = useCallback((q: string) => {
    const t = q.trim();
    if (!t) return;
    setSearches((s) => [t, ...s.filter((x) => x !== t)].slice(0, 8));
  }, []);
  const clearSearches = useCallback(() => setSearches([]), []);
  const toggleCompare = useCallback((id: string) => {
    let added = false;
    setCompare((c) => {
      if (c.includes(id)) return c.filter((x) => x !== id);
      if (c.length >= 3) return c;
      added = true;
      return [...c, id];
    });
    return added;
  }, []);
  const clearCompare = useCallback(() => setCompare([]), []);
  const setProviderOverride = useCallback(
    (id: string, patch: Partial<Provider>) => {
      setOverrides((o) => ({ ...o, [id]: { ...(o[id] ?? {}), ...patch } }));
    },
    []
  );
  const addEnquiry = useCallback(
    (e: Enquiry) => setEnquiries((list) => [e, ...list]),
    []
  );
  const updateEnquiry = useCallback((id: string, patch: Partial<Enquiry>) => {
    setEnquiries((list) =>
      list.map((e) => (e.id === id ? { ...e, ...patch } : e))
    );
  }, []);
  const addMyReview = useCallback((r: PendingReview) => {
    setMyReviews((list) => [r, ...list]);
    setPending((list) => [r, ...list]);
  }, []);
  const setPendingReviews = useCallback((r: PendingReview[]) => setPending(r), []);
  const setNotif = useCallback((n: NotifPrefs) => setNotifState(n), []);

  const value = useMemo<StoreState>(
    () => ({
      user, signIn, signOut, updateUser, saved, toggleSaved, isSaved,
      searches, pushSearch, clearSearches, compare, toggleCompare,
      clearCompare, providerOverrides: overrides, setProviderOverride,
      providerProfile, enquiries, addEnquiry, updateEnquiry,
      myReviews, addMyReview, pendingReviews: pending,
      setPendingReviews, notif, setNotif,
    }),
    [user, signIn, signOut, updateUser, saved, toggleSaved, isSaved,
      searches, pushSearch, clearSearches, compare, toggleCompare,
      clearCompare, overrides, setProviderOverride, providerProfile,
      enquiries, addEnquiry, updateEnquiry, myReviews, addMyReview,
      pending, setPendingReviews, notif, setNotif]
  );

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore(): StoreState {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
