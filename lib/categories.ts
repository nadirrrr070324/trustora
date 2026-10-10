import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  { slug: "home-services", label: "Home Services", short: "Home", tagline: "Plumbers, electricians, cleaners & repairs", icon: "home" },
  { slug: "technology-it", label: "Technology & IT", short: "Tech", tagline: "Developers, IT support & consultants", icon: "cpu" },
  { slug: "education-tutoring", label: "Education & Tutoring", short: "Tutoring", tagline: "Tutors, coaches & test prep", icon: "book" },
  { slug: "business-services", label: "Business Services", short: "Business", tagline: "Accounting, legal & consulting", icon: "briefcase" },
  { slug: "design-creative", label: "Design & Creative", short: "Design", tagline: "Designers, photographers & video", icon: "palette" },
  { slug: "automotive", label: "Automotive", short: "Auto", tagline: "Mechanics, detailers & body shops", icon: "car" },
  { slug: "health-wellness", label: "Health & Wellness", short: "Wellness", tagline: "Trainers, therapists & nutrition", icon: "heart" },
  { slug: "professional-services", label: "Professional Services", short: "Pro", tagline: "Agents, advisors & specialists", icon: "shield" },
];

export function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
