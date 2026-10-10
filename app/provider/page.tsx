"use client";
import { RequireAuth } from "@/components/RequireAuth";
import { ProvShell } from "./shell";

export default function ProviderPage() {
  return (
    <RequireAuth roles={["provider", "admin"]} title="Provider dashboard">
      <ProvShell />
    </RequireAuth>
  );
}
