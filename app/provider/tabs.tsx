"use client";
import { OverviewTab } from "./tab-overview";
import { ProfileTab } from "./tab-profile";
import { ServicesTab } from "./tab-services";
import { EnquiriesTab } from "./tab-enquiries";
import { ReviewsTab } from "./tab-reviews";
import { ScoreTab } from "./tab-score";
import { AnalyticsTab, BillingTab } from "./tab-more";
import type { PTab } from "./shell";

export function LazyPTab({ tab }: { tab: PTab }) {
  if (tab === "Overview") return <OverviewTab />;
  if (tab === "Profile") return <ProfileTab />;
  if (tab === "Services") return <ServicesTab />;
  if (tab === "Enquiries") return <EnquiriesTab />;
  if (tab === "Reviews") return <ReviewsTab />;
  if (tab === "Score") return <ScoreTab />;
  if (tab === "Analytics") return <AnalyticsTab />;
  return <BillingTab />;
}
