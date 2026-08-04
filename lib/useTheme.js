"use client";

import { useEffect, useState } from "react";

// Dulu (bagian bawah js/ui.js) dark mode diatur dengan langsung
// menambah/menghapus class "dark" di document.documentElement.
// Di React kita simpan statusnya sebagai state, lalu sinkronkan
// ke document.documentElement lewat useEffect setiap kali berubah.
export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setTheme("dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  }

  return { theme, toggleTheme };
}
