import type { Provider } from "./types";
import { U, r } from "./data-helpers";

export const P_NORTHBEAM: Provider = {
  id: "northbeam-it",
  name: "Northbeam IT Solutions",
  category: "technology-it",
  location: "Austin, TX",
  areas: ["Austin", "Round Rock", "Remote (US)"],
  image: U("photo-1497366216548-37526070297c"),
  initials: "NB",
  verification: "verified",
  licenseNote: "Business registration demo-verified (synthetic record)",
  priceMin: 120, priceMax: null, quoteAvailable: true,
  availability: "Taking new clients",
  yearsInBusiness: 9, completedJobs: 640, responseTime: "~2 hrs",
  memberSince: "2020",
  services: [
    { name: "Managed IT support", blurb: "Monitoring, patching, helpdesk, 2-hr SLA.", from: 120 },
    { name: "Cloud migration", blurb: "AWS/Azure moves with zero-downtime cutovers.", from: 2500 },
    { name: "Security audit", blurb: "Hardening review with remediation roadmap.", from: 900 },
  ],
  portfolio: [
    { src: U("photo-1551434678-e076c223a692"), caption: "Helpdesk rollout, 120 seats" },
    { src: U("photo-1558494949-ef010cbdcc31"), caption: "Server room remediation" },
  ],
  about: "Managed service provider for small businesses that outgrew break-fix IT (demo narrative). Month-to-month plans, plain-English reporting.",
  email: "sales@northbeam.example", phone: "(512) 555-0119",
  sponsored: true,
  scoreHistory: [
    { month: "May", score: 86 }, { month: "Jun", score: 87 },
    { month: "Jul", score: 87 }, { month: "Aug", score: 89 },
    { month: "Sep", score: 90 }, { month: "Oct", score: 90 },
  ],
  reviews: [
    r("nb-1", "northbeam-it", "Chris D.", "Austin, TX", 5,
      { satisfaction: 94, quality: 92, reliability: 96, value: 86, resolution: 90 },
      "2026-09-02", "Our IT dept in a box", "Migrated 40 staff to M365 with zero downtime. Tickets answered in under an hour.", true, "Managed IT support", 22),
    r("nb-2", "northbeam-it", "Amara O.", "Round Rock, TX", 5,
      { satisfaction: 92, quality: 90, reliability: 94, value: 84, resolution: 88 },
      "2026-07-25", "Security audit saved us", "Found an exposed RDP port our last vendor missed for years.", true, "Security audit", 18),
    r("nb-3", "northbeam-it", "Sam L.", "Austin, TX", 4,
      { satisfaction: 83, quality: 85, reliability: 88, value: 76, resolution: 82 },
      "2026-05-19", "Great, slightly pricey", "Excellent engineers. Per-seat pricing adds up, but uptime has been flawless.", true, "Managed IT support", 10),
    r("nb-4", "northbeam-it", "Rita G.", "Remote", 5,
      { satisfaction: 95, quality: 93, reliability: 95, value: 88, resolution: 91 },
      "2026-02-11", "Zero-downtime migration", "AWS migration over a weekend; Monday everything just worked.", true, "Cloud migration", 14),
  ],
};
