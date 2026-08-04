"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Dulu (js/auth.js) proteksi halaman dilakukan dengan cek
// window.location.pathname lalu window.location.href = "index.html".
//
// Di Next.js, ini jadi sebuah hook yang dipanggil di awal setiap
// halaman yang butuh login (dashboard, transaksi). Konsepnya:
// - useRouter()   -> pengganti window.location, tapi tanpa full reload
// - useEffect()   -> jalan sekali setelah komponen mount di browser,
//                    tempat yang tepat untuk baca localStorage & redirect
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
