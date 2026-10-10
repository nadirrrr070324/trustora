import type { Provider } from "./types";
import { U, r } from "./data-helpers";

export const P_CLEANFIX: Provider = {
  id: "cleanfix-services",
  name: "CleanFix Home Services",
  category: "home-services",
  location: "Denver, CO",
  areas: ["Denver", "Aurora", "Lakewood"],
  image: U("photo-1581578731548-c64695cc6952"),
  initials: "CF",
  verification: "verified",
  licenseNote: "Insured & bonded demo record (synthetic)",
  priceMin: 79, priceMax: 350, quoteAvailable: true,
  availability: "Next available: Wed",
  yearsInBusiness: 8, completedJobs: 1870, responseTime: "~2 hrs",
  memberSince: "2020",
  services: [
    { name: "Deep home cleaning", blurb: "Top-to-bottom with eco products.", from: 149 },
    { name: "Appliance repair", blurb: "Washers, dryers, dishwashers, ovens.", from: 79 },
    { name: "Handyman visits", blurb: "Mounting, caulking, minor fixes.", from: 95 },
  ],
  portfolio: [
    { src: U("photo-1528740561666-dc2479dc08ab"), caption: "Move-out deep clean" },
  ],
  about: "Cleaning + light repair crew for busy households (demo narrative). Checklist-signed cleans with photos.",
  email: "book@cleanfix.example", phone: "(720) 555-0112",
  scoreHistory: [
    { month: "May", score: 84 }, { month: "Jun", score: 85 },
    { month: "Jul", score: 86 }, { month: "Aug", score: 87 },
    { month: "Sep", score: 87 }, { month: "Oct", score: 88 },
  ],
  reviews: [
    r("cf-1", "cleanfix-services", "Alba M.", "Denver, CO", 5,
      { satisfaction: 93, quality: 92, reliability: 94, value: 89, resolution: 88 },
      "2026-09-11", "Spotless move-out", "Checklist clean with photos of every room. Landlord returned full deposit.", true, "Deep cleaning", 18),
    r("cf-2", "cleanfix-services", "Jonas F.", "Aurora, CO", 4,
      { satisfaction: 85, quality: 86, reliability: 84, value: 86, resolution: 82 },
      "2026-07-03", "Dryer fixed fast", "Diagnosed a dead heating element in 20 minutes. Part ordered, fixed two days later.", true, "Appliance repair", 9),
    r("cf-3", "cleanfix-services", "Ruth E.", "Lakewood, CO", 5,
      { satisfaction: 94, quality: 93, reliability: 92, value: 90, resolution: 90 },
      "2026-04-25", "Monthly plan convert", "Switched to bi-weekly cleans after one visit. Same crew each time.", true, "Home cleaning", 11),
    r("cf-4", "cleanfix-services", "Omar S.", "Denver, CO", 4,
      { satisfaction: 83, quality: 84, reliability: 82, value: 85, resolution: 80 },
      "2025-12-02", "Good handyman run", "Mounted TVs, fixed grout, patched drywall. One shelf needed a return visit.", false, "Handyman", 5),
  ],
};
