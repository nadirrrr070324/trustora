import type { Provider } from "./types";
import { U, r } from "./data-helpers";

export const P_PIXELFORGE: Provider = {
  id: "pixelforge-studio",
  name: "PixelForge Web Studio",
  category: "technology-it",
  location: "Remote (US)",
  areas: ["Remote (US)", "Remote (worldwide)"],
  image: U("photo-1547658719-da2b51169166"),
  initials: "PF",
  verification: "verified",
  priceMin: 1500, priceMax: 18000, quoteAvailable: true,
  availability: "Booking 2 weeks out",
  yearsInBusiness: 5, completedJobs: 180, responseTime: "~6 hrs",
  memberSince: "2022",
  services: [
    { name: "Marketing sites", blurb: "Next.js builds with CMS editing.", from: 4500 },
    { name: "Web apps", blurb: "Dashboards, portals, SaaS frontends.", from: 8000 },
    { name: "Care plans", blurb: "Updates, monitoring, small tweaks.", from: 150 },
  ],
  portfolio: [
    { src: U("photo-1467232004584-a241de8bcf5d"), caption: "SaaS marketing site" },
  ],
  about: "Small senior-only web team (demo narrative). No handoffs to juniors; fixed bids with weekly demos.",
  email: "build@pixelforge.example", phone: "(415) 555-0140",
  scoreHistory: [
    { month: "May", score: 85 }, { month: "Jun", score: 86 },
    { month: "Jul", score: 87 }, { month: "Aug", score: 88 },
    { month: "Sep", score: 88 }, { month: "Oct", score: 89 },
  ],
  reviews: [
    r("pf-1", "pixelforge-studio", "Karen J.", "Remote", 5,
      { satisfaction: 93, quality: 95, reliability: 92, value: 85, resolution: 90 },
      "2026-08-20", "Site loads instantly", "Rebuilt our WordPress into Next.js. Lighthouse 99 and conversions up 30%.", true, "Marketing site", 21),
    r("pf-2", "pixelforge-studio", "Leo M.", "Remote", 5,
      { satisfaction: 92, quality: 93, reliability: 91, value: 84, resolution: 89 },
      "2026-06-15", "Weekly demos kept us aligned", "Never wondered about status. Fixed bid held despite two scope adds on their side.", true, "Web app", 13),
    r("pf-3", "pixelforge-studio", "Ana G.", "Remote", 4,
      { satisfaction: 84, quality: 88, reliability: 83, value: 80, resolution: 85 },
      "2026-03-01", "Great build, CMS learning curve", "Editor training took an extra session but support was patient.", true, "Marketing site", 7),
  ],
};
