"use client";
import { useState } from "react";

export function AUsers() {
  const [users, setUsers] = useState([
    { email: "customer@example.com", role: "customer", status: "active" },
    { email: "hello@harborvale.example", role: "provider", status: "active" },
    { email: "admin@trustora.example", role: "admin", status: "active" },
    { email: "spam@example.com", role: "customer", status: "suspended" },
  ]);
  return (
    <div className="solid-panel overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
            <th className="p-4" scope="col">Email</th>
            <th className="p-4" scope="col">Role</th>
            <th className="p-4" scope="col">Status</th>
            <th className="p-4" scope="col"><span className="sr-only">Action</span></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email} className="border-b border-white/10 last:border-0">
              <td className="p-4 text-slate-200">{u.email}</td>
              <td className="p-4"><span className="chip capitalize">{u.role}</span></td>
              <td className="p-4"><span className="chip capitalize">{u.status}</span></td>
              <td className="p-4 text-right">
                <button
                  onClick={() => setUsers(users.map((x) => (x.email === u.email ? { ...x, status: x.status === "active" ? "suspended" : "active" } : x)))}
                  className="text-xs font-medium text-accent-400 hover:text-white">
                  {u.status === "active" ? "Suspend" : "Reinstate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

