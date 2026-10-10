// ─── TRUSTORA · shared domain types ─────────────────────────────────────────
// Demo-safe: nothing here claims real-world verification. All demo content is
// synthetic and must be labelled as demonstration data in the UI.

export type CategorySlug =
  | "home-services"
  | "technology-it"
  | "education-tutoring"
  | "business-services"
  | "design-creative"
  | "automotive"
  | "health-wellness"
  | "professional-services";

export interface Category {
  slug: CategorySlug;
  label: string;
  short: string;
  tagline: string;
  icon: string; // lucide icon key used by CategoryIcon
}

export type DimensionKey =
  | "satisfaction"
  | "quality"
  | "reliability"
  | "value"
  | "resolution";

export type DimensionScores = Record<DimensionKey, number>; // 0–100 inputs

export interface Review {
  id: string;
  providerId: string;
  author: string;
  authorLocation: string;
  rating: number; // 1–5 overall
  dims: DimensionScores; // per-dimension 0–100 evidence
  date: string; // ISO
  title: string;
  text: string;
  verifiedJob: boolean;
  serviceUsed: string;
  helpful: number;
  providerResponse?: { date: string; text: string };
  flagged?: boolean;
}

export type VerificationStatus = "verified" | "pending" | "unverified";

export interface ScorePoint {
  month: string;
  score: number;
}

export interface Provider {
  id: string;
  name: string;
  category: CategorySlug;
  location: string;
  areas: string[];
  image: string;
  initials: string;
  verification: VerificationStatus;
  licenseNote?: string;
  priceMin: number | null;
  priceMax: number | null;
  quoteAvailable: boolean;
  availability: string;
  yearsInBusiness: number;
  completedJobs: number;
  responseTime: string;
  memberSince: string;
  services: { name: string; blurb: string; from: number | null }[];
  portfolio: { src: string; caption: string }[];
  about: string;
  email: string;
  phone: string;
  sponsored?: boolean;
  reviews: Review[];
  scoreHistory: ScorePoint[];
}

export type Role = "customer" | "provider" | "admin";

export interface SessionUser {
  name: string;
  email: string;
  role: Role;
  providerId?: string;
}

export interface Enquiry {
  id: string;
  providerId: string;
  providerName: string;
  name: string;
  email: string;
  service: string;
  message: string;
  date: string;
  status: "new" | "replied" | "closed";
}

export interface PendingReview {
  id: string;
  providerId: string;
  author: string;
  rating: number;
  title: string;
  text: string;
  serviceUsed: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}
