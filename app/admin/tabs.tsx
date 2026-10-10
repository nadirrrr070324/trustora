"use client";
import { AOverview } from "./tab-overview";
import { AProviders } from "./tab-providers";
import { AReviews } from "./tab-reviews";
import { ADisputes } from "./tab-disputes";
import { AUsers } from "./tab-users";
import { AConfig } from "./tab-config";
import { AAnalytics, AAudit, ASponsored } from "./tab-rest";
import type { ATab } from "./shell";

export function LazyATab({ tab }: { tab: ATab }) {
  if (tab === "Overview") return <AOverview />;
  if (tab === "Providers") return <AProviders />;
  if (tab === "Reviews") return <AReviews />;
  if (tab === "Disputes") return <ADisputes />;
  if (tab === "Users") return <AUsers />;
  if (tab === "Config") return <AConfig />;
  if (tab === "Sponsored") return <ASponsored />;
  if (tab === "Audit") return <AAudit />;
  return <AAnalytics />;
}
