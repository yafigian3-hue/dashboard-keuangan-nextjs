"use client";

import AppShell from "@/components/AppShell";
import { useRequireAuth } from "@/lib/useAuth";

export default function ProtectedLayout({ children }) {
  const { checked, logout } = useRequireAuth();

  if (!checked) {
    return null;
  }

  return <AppShell onLogout={logout}>{children}</AppShell>;
}
