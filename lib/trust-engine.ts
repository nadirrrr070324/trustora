import type { DimensionKey, Provider, Review } from "./types";

// ─── TRUSTORA Trust Score Engine ─────────────────────────────────────────────
// Weighted, evidence-backed scoring on a 0–100 scale.
//   satisfaction 30% · quality 25% · reliability 20% · value 15% · resolution 10%
// Verified completed-job reviews carry extra weight (×1.6). Recency decays
// with a 365-day half-life. Bayesian smoothing keeps small samples honest.
// Sponsored placements NEVER influence this score (handled at sort time).

export const WEIGHTS: Record<DimensionKey, number> = {
  satisfaction: 0.3,
  quality: 0.25,
  reliability: 0.2,
  value: 0.15,
  resolution: 0.1,
};

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  satisfaction: "Customer satisfaction",
  quality: "Quality of work",
  reliability: "Reliability & punctuality",
  value: "Value for money",
  resolution: "Complaint resolution",
};

export const DIMENSIONS = Object.keys(WEIGHTS) as DimensionKey[];

const PRIOR_MEAN = 72;
const PRIOR_STRENGTH = 4;
const VERIFIED_MULTIPLIER = 1.6;
const HALF_LIFE_DAYS = 365;

export function recencyWeight(dateISO: string, now: number): number {
  const t = new Date(dateISO).getTime();
  if (Number.isNaN(t)) return 1;
  const days = Math.max(0, (now - t) / 86_400_000);
  return Math.pow(0.5, days / HALF_LIFE_DAYS);
}

export function reviewWeight(r: Review, now: number): number {
  return recencyWeight(r.date, now) * (r.verifiedJob ? VERIFIED_MULTIPLIER : 1);
}

export type Confidence = "High" | "Medium" | "Low" | "Insufficient";

export interface TrustResult {
  score: number | null;
  provisional: boolean;
  confidence: Confidence;
  dimensions: Record<DimensionKey, number | null>;
  reviewCount: number;
  verifiedCount: number;
  unverifiedCount: number;
  effectiveWeight: number;
  flags: string[];
  explanation: string[];
}

export function detectSuspiciousPatterns(
  provider: Provider,
  now: number = Date.now()
): string[] {
  const flags: string[] = [];
  const reviews = provider.reviews;
  const n = reviews.length;
  if (n < 4) return flags;

  const fiveStar = reviews.filter((r) => r.rating === 5).length;
  const avgLen = reviews.reduce((s, r) => s + r.text.length, 0) / Math.max(1, n);
  if (fiveStar / n >= 0.75 && avgLen < 90) {
    flags.push(
      "Unusually uniform 5-star feedback with very short review text — flagged for investigation."
    );
  }
  const recent = reviews.filter(
    (r) => now - new Date(r.date).getTime() < 30 * 86_400_000
  ).length;
  if (n >= 6 && recent / n > 0.5) {
    flags.push(
      "More than half of all reviews arrived in the last 30 days — burst pattern flagged for investigation."
    );
  }
  const unverified = reviews.filter((r) => !r.verifiedJob).length;
  if (n >= 6 && unverified / n > 0.6) {
    flags.push(
      "Most feedback for this provider is unverified — treat the score with caution."
    );
  }
  const resAvg = reviews.reduce((s, r) => s + r.dims.resolution, 0) / Math.max(1, n);
  if (n >= 5 && resAvg < 55) {
    flags.push(
      "Below-average complaint-resolution signals — customers report issues going unresolved."
    );
  }
  return flags;
}
export function computeTrustScore(
  provider: Provider,
  now: number = Date.now()
): TrustResult {
  const reviews = provider.reviews ?? [];
  const n = reviews.length;
  const verifiedCount = reviews.filter((r) => r.verifiedJob).length;
  const unverifiedCount = n - verifiedCount;

  if (n < 3) {
    return {
      score: null,
      provisional: true,
      confidence: "Insufficient",
      dimensions: {
        satisfaction: null,
        quality: null,
        reliability: null,
        value: null,
        resolution: null,
      },
      reviewCount: n,
      verifiedCount,
      unverifiedCount,
      effectiveWeight: 0,
      flags: [],
      explanation: [
        n === 0
          ? "No reviews yet — this provider has not enough data for a trust score."
          : `Only ${n} reviews on record — not enough data for a reliable score (minimum 3).`,
      ],
    };
  }

  const dimensions = {} as Record<DimensionKey, number>;
  let effectiveWeight = 0;
  for (const d of DIMENSIONS) {
    let sw = 0;
    let s = 0;
    for (const r of reviews) {
      const w = reviewWeight(r, now);
      sw += w;
      s += w * r.dims[d];
    }
    effectiveWeight = Math.max(effectiveWeight, sw);
    dimensions[d] = (s + PRIOR_STRENGTH * PRIOR_MEAN) / (sw + PRIOR_STRENGTH);
  }

  const raw = DIMENSIONS.reduce((sum, d) => sum + WEIGHTS[d] * dimensions[d], 0);
  const score = Math.max(0, Math.min(100, Math.round(raw)));
  const confidence: Confidence =
    n >= 20 && verifiedCount >= 10
      ? "High"
      : n >= 8 && verifiedCount >= 3
        ? "Medium"
        : "Low";
  const provisional = n < 8 || verifiedCount < 3;

  const explanation: string[] = [
    `Based on ${n} reviews (${verifiedCount} from verified completed jobs).`,
    "Verified-job reviews carry 1.6x weight; older reviews decay with a 12-month half-life.",
    provisional
      ? "Limited evidence — blended with a neutral category prior (72) and marked provisional."
      : "Sufficient verified evidence — the score reflects observed performance.",
  ];

  return {
    score,
    provisional,
    confidence,
    dimensions,
    reviewCount: n,
    verifiedCount,
    unverifiedCount,
    effectiveWeight: Math.round(effectiveWeight * 10) / 10,
    flags: detectSuspiciousPatterns(provider, now),
    explanation,
  };
}

export interface RankedProvider {
  provider: Provider;
  result: TrustResult;
  rank: number | null;
}

/** Organic ranking. Sponsored providers are labelled, never boosted. */
export function rankProviders(
  providers: Provider[],
  now: number = Date.now()
): RankedProvider[] {
  const scored = providers.map((provider) => ({
    provider,
    result: computeTrustScore(provider, now),
  }));
  const withScore = scored.filter((s) => s.result.score !== null);
  const withoutScore = scored.filter((s) => s.result.score === null);
  withScore.sort((a, b) => {
    const d = (b.result.score ?? 0) - (a.result.score ?? 0);
    if (d !== 0) return d;
    const v = b.result.verifiedCount - a.result.verifiedCount;
    if (v !== 0) return v;
    return b.result.reviewCount - a.result.reviewCount;
  });
  const ranked: RankedProvider[] = withScore.map((s, i) => ({
    ...s,
    rank: i + 1,
  }));
  for (const s of withoutScore) ranked.push({ ...s, rank: null });
  return ranked;
}

export function starAverage(provider: Provider): { avg: number; count: number } {
  const n = provider.reviews.length;
  if (!n) return { avg: 0, count: 0 };
  return {
    avg: provider.reviews.reduce((s, r) => s + r.rating, 0) / n,
    count: n,
  };
}

