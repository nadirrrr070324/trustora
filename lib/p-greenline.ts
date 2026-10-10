import type { Provider } from "./types";
import { U, r } from "./data-helpers";

export const P_GREENLINE: Provider = {
  id: "greenline-landscaping",
  name: "Greenline Landscaping",
  category: "home-services",
  location: "Portland, OR",
  areas: ["Portland", "Beaverton", "Lake Oswego"],
  image: U("photo-1558904541-efa843a96f01"),
  initials: "GL",
  verification: "unverified",
  priceMin: 60, priceMax: 900, quoteAvailable: true,
  availability: "Spring waitlist",
  yearsInBusiness: 4, completedJobs: 420, responseTime: "~1 day",
  memberSince: "2023",
  services: [
    { name: "Lawn care plans", blurb: "Mowing, edging, seasonal feeding.", from: 60 },
    { name: "Garden beds & mulch", blurb: "Design refresh with native plantings.", from: 350 },
    { name: "Irrigation tune-ups", blurb: "Leak fixes and smart-controller setup.", from: 140 },
  ],
  portfolio: [
    { src: U("photo-1416879595882-3373a0480b5b"), caption: "Native bed refresh" },
    { src: U("photo-1598902108854-10e335adac99"), caption: "Weekly maintenance route" },
  ],
  about: "A young crew doing tidy, reliable maintenance (demo narrative). Verification not yet complete — only two reviews, so no trust score is shown.",
  email: "crew@greenline.example", phone: "(503) 555-0188",
  scoreHistory: [
    { month: "Aug", score: 0 }, { month: "Sep", score: 0 }, { month: "Oct", score: 0 },
  ],
  reviews: [
    r("gl-1", "greenline-landscaping", "Wendy C.", "Portland, OR", 5,
      { satisfaction: 92, quality: 90, reliability: 90, value: 90, resolution: 88 },
      "2026-08-19", "Yard looks great", "Showed up on time twice a month all summer. Edges are razor sharp.", true, "Lawn care", 4),
    r("gl-2", "greenline-landscaping", "Dev P.", "Beaverton, OR", 4,
      { satisfaction: 82, quality: 84, reliability: 80, value: 85, resolution: 80 },
      "2026-06-10", "Good start", "Mulch job looks lovely. One visit got rained out and rescheduling took a week.", false, "Garden beds", 2),
  ],
};
