import type { Provider } from "./types";
import { U, r } from "./data-helpers";

export const P_FORMA: Provider = {
  id: "forma-fitness",
  name: "Forma Personal Training",
  category: "health-wellness",
  location: "San Diego, CA",
  areas: ["San Diego", "La Jolla", "Online coaching"],
  image: U("photo-1571019613454-1cb2f99b2d8b"),
  initials: "FF",
  verification: "verified",
  licenseNote: "Certification demo-verified (synthetic record)",
  priceMin: 60, priceMax: 110, quoteAvailable: true,
  availability: "2 morning slots open",
  yearsInBusiness: 5, completedJobs: 980, responseTime: "~5 hrs",
  memberSince: "2022",
  services: [
    { name: "1:1 personal training", blurb: "Strength programs with nutrition targets.", from: 85 },
    { name: "Small-group sessions", blurb: "Max 4 clients, same programming rigor.", from: 60 },
    { name: "Online coaching", blurb: "Weekly programming + video form checks.", from: 110 },
  ],
  portfolio: [
    { src: U("photo-1534438327276-14e5300c3a48"), caption: "Strength floor coaching" },
    { src: U("photo-1518611012118-696072aa579a"), caption: "Small-group session" },
  ],
  about: "Evidence-based coaching, no crash diets (demo narrative). Movement screening first, then tracked programming.",
  email: "train@forma.example", phone: "(619) 555-0135",
  scoreHistory: [
    { month: "May", score: 89 }, { month: "Jun", score: 90 },
    { month: "Jul", score: 91 }, { month: "Aug", score: 92 },
    { month: "Sep", score: 91 }, { month: "Oct", score: 93 },
  ],
  reviews: [
    r("ff-1", "forma-fitness", "Jess A.", "San Diego, CA", 5,
      { satisfaction: 96, quality: 95, reliability: 97, value: 89, resolution: 92 },
      "2026-09-22", "Down 30lbs, stronger than ever", "Never cancels, programs around my bad knee, nutrition targets are realistic.", true, "1:1 training", 29),
    r("ff-2", "forma-fitness", "Brian H.", "La Jolla, CA", 5,
      { satisfaction: 94, quality: 93, reliability: 95, value: 88, resolution: 90 },
      "2026-07-08", "Fixed my deadlift", "Video form checks caught what two previous trainers missed.", true, "1:1 training", 17),
    r("ff-3", "forma-fitness", "Tara M.", "Online", 5,
      { satisfaction: 93, quality: 92, reliability: 94, value: 90, resolution: 89 },
      "2026-05-30", "Online coaching works", "Weekly video reviews keep me honest. Down two sizes.", true, "Online coaching", 12),
  ],
};
