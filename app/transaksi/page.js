"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import { useRequireAuth } from "@/lib/useAuth";
import { useTransactions } from "@/lib/useTransactions";

export default function TransaksiPage() {
  const { checked, logout } = useRequireAuth();
  const { transactions, addTransaction, deleteTransaction, updateTransaction } =
    useTransactions();

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [editingTransaction, setEditingTransaction] = useState(null);

  if (!checked) return null;

  const filtered = [...transactions]
    .sort((a, b) => b.createdAt - a.createdAt)
    .filter((t) => {
      const matchFilter =
        activeFilter === "all" ? true : t.type === activeFilter;
      const matchSearch = t.name.toLowerCase().includes(keyword.toLowerCase());
      return matchFilter && matchSearch;
    });

  const tabs = [
    { key: "all", label: "Semua" },
    { key: "income", label: "Masuk" },
    { key: "expense", label: "Keluar" },
  ];

  return (
    <AppShell active="/transaksi" onLogout={logout}>
      <div className="fade-up mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-brand-100 dark:bg-brand-500/10 text-brand-700 dark:text-brand-500 text-xs font-bold">
          Catatan Aktivitas
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Transaksi
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Kelola semua pemasukan dan pengeluaranmu
        </p>
      </div>

      <div className="fade-up bg-white/90 dark:bg-ink-900/90 p-5 sm:p-6 lg:p-8 rounded-[1.75rem] shadow-card border border-gray-100 dark:border-white/5 space-y-6 w-full overflow-hidden">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white mb-4">
            Tambah Transaksi
          </h3>
          <TransactionForm
            onAdd={addTransaction}
            onUpdate={updateTransaction}
            editingTransaction={editingTransaction}
            clearEditing={() => setEditingTransaction(null)}
          />{" "}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-1 gap-1.5 p-1.5 rounded-2xl bg-gray-100 dark:bg-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeFilter === tab.key
                    ? "bg-brand-600 text-white shadow-soft"
                    : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/5 hover:bg-brand-100 dark:hover:bg-brand-500/10 text-gray-600 dark:text-gray-300"
          >
            🔍
          </button>
        </div>
        {searchOpen && (
          <input
            autoFocus
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari transaksi..."
            className="w-full p-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        )}
        <TransactionList
          transactions={filtered}
          onDelete={deleteTransaction}
          onEdit={setEditingTransaction}
        />
      </div>
    </AppShell>
  );
}
