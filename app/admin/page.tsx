"use client";
import { RequireAuth } from "@/components/RequireAuth";
import { AdminShell } from "./shell";

export default function AdminPage() {
  return (
    <RequireAuth roles={["admin"]} title="Administration">
      <AdminShell />
    </RequireAuth>
  );
}
