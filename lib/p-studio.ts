import type { Provider } from "./types";
import { U, r } from "./data-helpers";

export const P_STUDIO: Provider = {
  id: "studio-meridian",
  name: "Studio Meridian",
  category: "design-creative",
  location: "Brooklyn, NY",
  areas: ["Brooklyn", "Manhattan", "Remote (worldwide)"],
  image: U("photo-1561070791-2526d30994b5"),
  initials: "SM",
  verification: "verified",
  priceMin: 800, priceMax: 12000, quoteAvailable: true,
  availability: "Booking 3 weeks out",
  yearsInBusiness: 6, completedJobs: 214, responseTime: "~1 day",
  memberSince: "2021",
  services: [
    { name: "Brand identity", blurb: "Logo, type system, guidelines, launch kit.", from: 3500 },
    { name: "Web design", blurb: "Marketing sites designed to convert.", from: 4500 },
    { name: "Pitch decks", blurb: "Investor decks with narrative coaching.", from: 800 },
  ],
  portfolio: [
    { src: U("photo-1626785774573-4b799315345d"), caption: "Fintech rebrand" },
    { src: U("photo-1586717791821-3f44a563fa4c"), caption: "Editorial site design" },
  ],
  about: "A six-designer brand studio for startups (demo narrative). Strategy workshops up front, scoped revision rounds.",
  email: "hello@studiomeridian.example", phone: "(718) 555-0127",
  scoreHistory: [
    { month: "May", score: 84 }, { month: "Jun", score: 86 },
    { month: "Jul", score: 87 }, { month: "Aug", score: 86 },
    { month: "Sep", score: 88 }, { month: "Oct", score: 89 },
  ],
  reviews: [
    r("sm-1", "studio-meridian", "Alex B.", "Brooklyn, NY", 5,
      { satisfaction: 94, quality: 96, reliability: 88, value: 82, resolution: 90 },
      "2026-09-05", "Rebrand doubled demo bookings", "They interviewed customers before touching a pixel. The new site finally explains what we sell.", true, "Brand identity", 26),
    r("sm-2", "studio-meridian", "Farah Q.", "Remote", 5,
      { satisfaction: 92, quality: 94, reliability: 90, value: 84, resolution: 89 },
      "2026-07-14", "Pitch deck that raised", "Closed our seed two weeks after the new deck. Investors complimented slide 4.", true, "Pitch decks", 20),
    r("sm-3", "studio-meridian", "Greg T.", "Manhattan, NY", 4,
      { satisfaction: 83, quality: 89, reliability: 80, value: 78, resolution: 85 },
      "2026-05-08", "Beautiful, runs long", "Final work is gorgeous but the timeline slipped two weeks. They were honest about it.", true, "Web design", 9),
    r("sm-4", "studio-meridian", "Ivy C.", "Remote", 4,
      { satisfaction: 85, quality: 87, reliability: 86, value: 80, resolution: 84 },
      "2025-10-19", "Strong process", "Weekly check-ins kept feedback tight. Quality won out in the end.", false, "Brand identity", 5),
  ],
};
