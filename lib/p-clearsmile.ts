import type { Provider } from "./types";
import { U, r } from "./data-helpers";

export const P_CLEARSMILE: Provider = {
  id: "clearsmile-dental",
  name: "ClearSmile Dental Studio",
  category: "health-wellness",
  location: "Miami, FL",
  areas: ["Miami", "Coral Gables", "Doral"],
  image: U("photo-1629909613654-28e377c37b09"),
  initials: "CS",
  verification: "verified",
  licenseNote: "Clinic license demo-verified (synthetic record)",
  priceMin: 89, priceMax: 4500, quoteAvailable: true,
  availability: "Evening appointments",
  yearsInBusiness: 7, completedJobs: 3200, responseTime: "~1 hr",
  memberSince: "2021",
  services: [
    { name: "Checkup & cleaning", blurb: "Exam, X-rays, polish in one visit.", from: 89 },
    { name: "Clear aligners", blurb: "3D-planned orthodontics, payment plans.", from: 2900 },
    { name: "Whitening", blurb: "In-office treatment, sensitivity-safe.", from: 299 },
  ],
  portfolio: [
    { src: U("photo-1588776814546-1ffcf47267a5"), caption: "Modern treatment suite" },
  ],
  about: "Patient-first dental studio (demo narrative). Transparent treatment plans with itemized costs before work begins.",
  email: "smile@clearsmile.example", phone: "(305) 555-0160",
  sponsored: true,
  scoreHistory: [
    { month: "May", score: 87 }, { month: "Jun", score: 88 },
    { month: "Jul", score: 88 }, { month: "Aug", score: 89 },
    { month: "Sep", score: 90 }, { month: "Oct", score: 90 },
  ],
  reviews: [
    r("cs-1", "clearsmile-dental", "Maria T.", "Miami, FL", 5,
      { satisfaction: 95, quality: 94, reliability: 95, value: 88, resolution: 91 },
      "2026-09-08", "Painless root canal", "Thought it would be awful. Numb in seconds, done in an hour, zero follow-up pain.", true, "Root canal", 24),
    r("cs-2", "clearsmile-dental", "James W.", "Coral Gables, FL", 5,
      { satisfaction: 93, quality: 94, reliability: 92, value: 87, resolution: 89 },
      "2026-07-19", "Aligners done right", "3D preview showed the end result before I paid a cent. 14 months, perfect finish.", true, "Clear aligners", 15),
    r("cs-3", "clearsmile-dental", "Lucy P.", "Doral, FL", 4,
      { satisfaction: 85, quality: 87, reliability: 84, value: 83, resolution: 85 },
      "2026-04-30", "Great care, parking tricky", "Clinic itself is wonderful; downtown parking took 20 minutes. Book extra time.", true, "Checkup", 6),
    r("cs-4", "clearsmile-dental", "Dev A.", "Miami, FL", 5,
      { satisfaction: 92, quality: 91, reliability: 93, value: 89, resolution: 88 },
      "2026-01-12", "No upsell pressure", "Two other clinics pushed crowns I did not need. ClearSmile showed the X-rays and said watch-and-wait.", false, "Checkup", 10),
  ],
};
