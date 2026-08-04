"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/useTheme";

// Dulu setiap file HTML (dashboard.html, transaksi.html) copy-paste
// seluruh markup sidebar-nya sendiri-sendiri. Di Next.js cukup satu
// komponen, dipakai ulang di semua halaman -> ini salah satu alasan
// utama orang pindah dari HTML statis ke React/Next.
export default function AppShell({ active, onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/transaksi", label: "Transaksi" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-white/85 dark:bg-ink-900/90 backdrop-blur-2xl border-r border-gray-200/70 dark:border-white/5 p-6 z-50 transition-transform duration-300 md:translate-x-0 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-soft">
            <span className="text-white font-bold text-lg">Rp</span>
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-white">
              Keuangan
            </p>
            <span className="text-[10px] tracking-[0.25em] uppercase text-brand-600 dark:text-brand-500 font-bold">
              Dashboard
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-600">
            Menu
          </p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 ${
                active === item.href ? "active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-gray-200/70 dark:border-white/5 space-y-1">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
          >
            <span>{theme === "dark" ? "☀️" : "🌙"}</span>
            <span>{theme === "dark" ? "Mode Terang" : "Mode Gelap"}</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 p-4 sm:p-6 lg:p-8 md:ml-72 w-full overflow-hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden mb-6 inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-ink-900 rounded-2xl border border-gray-200 dark:border-white/5 shadow-card text-gray-800 dark:text-gray-200 font-semibold"
        >
          ☰ Menu
        </button>

        {children}
      </main>
    </div>
  );
}
