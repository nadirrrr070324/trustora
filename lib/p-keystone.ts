import type { Provider } from "./types";
import { U, r } from "./data-helpers";

export const P_KEYSTONE: Provider = {
  id: "keystone-realestate",
  name: "Keystone Realty Advisors",
  category: "professional-services",
  location: "Dallas, TX",
  areas: ["Dallas", "Plano", "Frisco"],
  image: U("photo-1560518883-ce09059eeffa"),
  initials: "KR",
  verification: "verified",
  licenseNote: "Broker license demo-verified (synthetic record)",
  priceMin: null, priceMax: null, quoteAvailable: true,
  availability: "Taking buyer clients",
  yearsInBusiness: 10, completedJobs: 760, responseTime: "~3 hrs",
  memberSince: "2020",
  services: [
    { name: "Buyer representation", blurb: "Search, negotiation, closing coordination.", from: null },
    { name: "Listing services", blurb: "Staging advice, photo, pricing strategy.", from: null },
    { name: "Relocation", blurb: "Remote tours and area briefings.", from: null },
  ],
  portfolio: [
    { src: U("photo-1600596542815-ffad4c1539a9"), caption: "Recent listing, Plano" },
  ],
  about: "Boutique brokerage team (demo narrative). Data-driven pricing, evening/weekend tour availability.",
  email: "move@keystone.example", phone: "(214) 555-0199",
  scoreHistory: [
    { month: "May", score: 83 }, { month: "Jun", score: 84 },
    { month: "Jul", score: 85 }, { month: "Aug", score: 86 },
    { month: "Sep", score: 86 }, { month: "Oct", score: 87 },
  ],
  reviews: [
    r("kr-1", "keystone-realestate", "Beth H.", "Dallas, TX", 5,
      { satisfaction: 94, quality: 92, reliability: 93, value: 86, resolution: 90 },
      "2026-08-02", "Won in a bidding war", "Structured an escalation that beat 6 offers without overpaying. Brilliant negotiation.", true, "Buyer representation", 16),
    r("kr-2", "keystone-realestate", "Sam O.", "Plano, TX", 5,
      { satisfaction: 91, quality: 90, reliability: 92, value: 85, resolution: 88 },
      "2026-05-17", "Sold 8% over asking", "Staging advice plus twilight photos. 40 showings in one weekend.", true, "Listing services", 12),
    r("kr-3", "keystone-realestate", "Nadia F.", "Frisco, TX", 4,
      { satisfaction: 84, quality: 85, reliability: 83, value: 82, resolution: 84 },
      "2026-02-08", "Great, inspection was tense", "Pushed hard on repair credits when inspection found foundation issues. Grateful.", true, "Buyer representation", 8),
  ],
};
