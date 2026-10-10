import type { Enquiry, PendingReview, Provider } from "./types";
import { P_HARBOR } from "./p-harbor";
import { P_NORTHBEAM } from "./p-northbeam";
import { P_BRIGHTPATH } from "./p-brightpath";
import { P_LEDGERLINE } from "./p-ledgerline";
import { P_STUDIO } from "./p-studio";
import { P_APEX } from "./p-apex";
import { P_FORMA } from "./p-forma";
import { P_CORNERSTONE } from "./p-cornerstone";
import { P_GREENLINE } from "./p-greenline";
import { P_CLEANFIX } from "./p-cleanfix";
import { P_PIXELFORGE } from "./p-pixelforge";
import { P_KEYSTONE } from "./p-keystone";
import { P_CLEARSMILE } from "./p-clearsmile";

export const PROVIDERS: Provider[] = [
  P_HARBOR, P_NORTHBEAM, P_BRIGHTPATH, P_LEDGERLINE, P_STUDIO,
  P_APEX, P_FORMA, P_CORNERSTONE, P_GREENLINE, P_CLEANFIX,
  P_PIXELFORGE, P_KEYSTONE, P_CLEARSMILE,
];

export function getProvider(id: string): Provider | undefined {
  return PROVIDERS.find((p) => p.id === id);
}

export function withOverrides(
  base: Provider[],
  overrides: Record<string, Partial<Provider>>
): Provider[] {
  if (!Object.keys(overrides).length) return base;
  return base.map((p) =>
    overrides[p.id] ? { ...p, ...overrides[p.id] } : p
  );
}

export const SEED_PENDING: PendingReview[] = [
  {
    id: "seed-pr-1", providerId: "apex-auto-care", author: "Casey L.",
    rating: 4, title: "Follow-up visit much better",
    text: "Second visit after a rocky first one. New advisor kept me updated by text the whole time. Brake job feels great.",
    serviceUsed: "Brake service", date: "2026-10-06", status: "pending",
  },
  {
    id: "seed-pr-2", providerId: "studio-meridian", author: "Morgan D.",
    rating: 5, title: "Brand sprint in 3 weeks",
    text: "Tight timeline for our launch and they delivered the full identity plus a one-pager site. Daily async updates made it painless.",
    serviceUsed: "Brand identity", date: "2026-10-04", status: "pending",
  },
  {
    id: "seed-pr-3", providerId: "greenline-landscaping", author: "Robin A.",
    rating: 2, title: "Missed two visits",
    text: "No-show twice with no call. When they did come the work was fine, but reliability matters for a maintenance plan.",
    serviceUsed: "Lawn care", date: "2026-10-02", status: "pending",
  },
];

export const SEED_ENQUIRIES: Enquiry[] = [
  {
    id: "seed-eq-1", providerId: "harbor-plumbing",
    providerName: "Harbor & Vale Plumbing Co.",
    name: "Demo Customer", email: "customer@example.com",
    service: "Water heater install",
    message: "Our 12-year-old tank is leaking from the base. Looking for a like-for-like replacement next week.",
    date: "2026-10-07", status: "new",
  },
  {
    id: "seed-eq-2", providerId: "brightpath-tutoring",
    providerName: "Brightpath Tutoring",
    name: "Demo Customer", email: "customer@example.com",
    service: "SAT prep",
    message: "Junior in high school targeting spring test dates. Interested in the 12-week program.",
    date: "2026-10-03", status: "replied",
  },
];
