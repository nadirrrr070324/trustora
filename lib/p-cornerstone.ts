import type { Provider } from "./types";
import { U, r } from "./data-helpers";

export const P_CORNERSTONE: Provider = {
  id: "cornerstone-legal",
  name: "Cornerstone Legal Group",
  category: "professional-services",
  location: "Boston, MA",
  areas: ["Boston", "Cambridge", "Remote consults"],
  image: U("photo-1589829545856-d10d557cf95f"),
  initials: "CL",
  verification: "verified",
  licenseNote: "Bar standing demo-verified (synthetic record)",
  priceMin: null, priceMax: null, quoteAvailable: true,
  availability: "Consult wait ~1 week",
  yearsInBusiness: 18, completedJobs: 1750, responseTime: "~1 day",
  memberSince: "2019",
  services: [
    { name: "Small-business counsel", blurb: "Formation, contracts, employment basics.", from: null },
    { name: "Estate planning", blurb: "Wills, trusts, POA with plain-English review.", from: null },
    { name: "Real-estate closings", blurb: "Purchase and refinance representation.", from: null },
  ],
  portfolio: [
    { src: U("photo-1505664194779-8beaceb93744"), caption: "Client closing day" },
  ],
  about: "Boutique firm that answers its own phone (demo narrative). Flat-fee menus; every engagement letter states the fee ceiling.",
  email: "intake@cornerstone.example", phone: "(617) 555-0156",
  scoreHistory: [
    { month: "May", score: 85 }, { month: "Jun", score: 86 },
    { month: "Jul", score: 88 }, { month: "Aug", score: 87 },
    { month: "Sep", score: 89 }, { month: "Oct", score: 90 },
  ],
  reviews: [
    r("cl-1", "cornerstone-legal", "Deborah F.", "Boston, MA", 5,
      { satisfaction: 94, quality: 95, reliability: 92, value: 84, resolution: 91 },
      "2026-08-12", "Estate plan without jargon", "Explained every clause twice without impatience. Flat fee honored.", true, "Estate planning", 19),
    r("cl-2", "cornerstone-legal", "Andre B.", "Cambridge, MA", 5,
      { satisfaction: 92, quality: 93, reliability: 91, value: 83, resolution: 89 },
      "2026-05-27", "Startup counsel done right", "Formation, founder agreements, first hire docs. Fixed price, a day early.", true, "Small-business counsel", 15),
    r("cl-3", "cornerstone-legal", "Helen Z.", "Boston, MA", 4,
      { satisfaction: 84, quality: 88, reliability: 82, value: 78, resolution: 86 },
      "2026-01-30", "Excellent, not cheap", "Top-tier work product. Fee estimate was accurate.", true, "Real-estate closing", 8),
    r("cl-4", "cornerstone-legal", "Omar R.", "Remote", 4,
      { satisfaction: 85, quality: 87, reliability: 86, value: 80, resolution: 84 },
      "2025-11-08", "Clear remote consult", "Video review of contractor agreements with redlines the same evening.", false, "Contract review", 6),
  ],
};
