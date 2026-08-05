"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useRequireAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
      router.replace("/");
      return;
    }

    setUser(currentUser);
    setChecked(true);
  }, [router]);

  function logout() {
    localStorage.removeItem("currentUser");
    router.push("/");
  }

  return { user, checked, logout };
}
