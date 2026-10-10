import type { Provider } from "./types";
import { U, r } from "./data-helpers";

export const P_LEDGERLINE: Provider = {
  id: "ledgerline-accounting",
  name: "Ledgerline Accounting",
  category: "business-services",
  location: "Denver, CO",
  areas: ["Denver", "Boulder", "Remote (US)"],
  image: U("photo-1554224155-6726b3ff858f"),
  initials: "LL",
  verification: "verified",
  licenseNote: "CPA credentials demo-verified (synthetic record)",
  priceMin: 150, priceMax: null, quoteAvailable: true,
  availability: "Booking Q1 tax slots",
  yearsInBusiness: 12, completedJobs: 890, responseTime: "~4 hrs",
  memberSince: "2019",
  services: [
    { name: "Monthly bookkeeping", blurb: "Close-ready books with KPI dashboard.", from: 150 },
    { name: "Tax preparation", blurb: "Business and personal returns, audit support.", from: 350 },
    { name: "Fractional CFO", blurb: "Forecasting and board-ready reporting.", from: 1800 },
  ],
  portfolio: [
    { src: U("photo-1460925895917-afdab827c52f"), caption: "Client reporting dashboard" },
  ],
  about: "CPA-led practice for founders who hate surprises (demo narrative). Fixed monthly pricing, quarterly strategy calls.",
  email: "books@ledgerline.example", phone: "(303) 555-0162",
  scoreHistory: [
    { month: "May", score: 87 }, { month: "Jun", score: 88 },
    { month: "Jul", score: 88 }, { month: "Aug", score: 90 },
    { month: "Sep", score: 89 }, { month: "Oct", score: 91 },
  ],
  reviews: [
    r("ll-1", "ledgerline-accounting", "Nina P.", "Denver, CO", 5,
      { satisfaction: 95, quality: 96, reliability: 94, value: 87, resolution: 92 },
      "2026-08-28", "Books finally make sense", "Switched from a spreadsheet mess to clean monthly closes. Tax season took two emails.", true, "Monthly bookkeeping", 17),
    r("ll-2", "ledgerline-accounting", "Victor H.", "Boulder, CO", 5,
      { satisfaction: 93, quality: 94, reliability: 92, value: 85, resolution: 90 },
      "2026-04-15", "Survived our audit", "IRS notice arrived and they handled everything. Owed less than expected.", true, "Tax preparation", 21),
    r("ll-3", "ledgerline-accounting", "Dana W.", "Remote", 4,
      { satisfaction: 84, quality: 86, reliability: 85, value: 80, resolution: 83 },
      "2026-02-20", "Strong, onboarding was slow", "First month migration took a while, but reporting has been excellent since.", true, "Fractional CFO", 7),
  ],
};
