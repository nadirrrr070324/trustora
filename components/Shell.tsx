"use client";
import { PROVIDERS, SEED_ENQUIRIES, SEED_PENDING } from "@/lib/data";
import { withOverrides } from "@/lib/data";
import { StoreProvider } from "@/lib/store";
import { ThemeProvider } from "@/lib/theme";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CompareTray } from "./CompareTray";
import { ThemeControls } from "./ThemeControls";

export function Shell({ children }: { children: React.ReactNode }) {
  const providerProfile = PROVIDERS.find((p) => p.id === "harbor-plumbing") ?? null;
  return (
    <ThemeProvider>
      <StoreProvider
        providerProfile={providerProfile}
        seedPending={SEED_PENDING}
        seedEnquiries={SEED_ENQUIRIES}
      >
        <Inner>{children}</Inner>
      </StoreProvider>
    </ThemeProvider>
  );
}

function Inner({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CompareTray />
      <ThemeControls />
    </div>
  );
}

export { withOverrides };
