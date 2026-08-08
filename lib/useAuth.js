"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useRequireAuth() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const res = await fetch("/api/auth/me");

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();

        if (active) {
          setUser(data.user);
          setChecked(true);
        }
      } catch {
        if (active) {
          setChecked(true);
          router.replace("/");
        }
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, [router]);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.replace("/");
    router.refresh();
  }

  return {
    user,
    checked,
    logout,
  };
}
