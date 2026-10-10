import type {
  DimensionScores,
  Enquiry,
  PendingReview,
  Provider,
  Review,
} from "./types";

// ─── TRUSTORA demo dataset ───────────────────────────────────────────────────
// Synthetic demonstration data only. The UI labels this as demo data and never
// claims real-world verification or authentic reviews.

export const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;

export function r(
  id: string,
  providerId: string,
  author: string,
  authorLocation: string,
  rating: number,
  dims: DimensionScores,
  date: string,
  title: string,
  text: string,
  verifiedJob: boolean,
  serviceUsed: string,
  helpful = 0,
  providerResponse?: { date: string; text: string }
): Review {
  return {
    id, providerId, author, authorLocation, rating, dims, date,
    title, text, verifiedJob, serviceUsed, helpful, providerResponse,
  };
}
