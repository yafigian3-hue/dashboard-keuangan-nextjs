"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import SummaryCards from "@/components/SummaryCards";
import FinanceChart from "@/components/FinanceChart";
import ExpenseChart from "@/components/ExpenseChart";
import TransactionList from "@/components/TransactionList";
import { useRequireAuth } from "@/lib/useAuth";
import {
  useTransactions,
  calculateSummary,
  prepareChartData,
  prepareExpenseCategoryData,
} from "@/lib/useTransactions";

const MONTH_OPTIONS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export default function DashboardPage() {
  const { checked, logout } = useRequireAuth();
  const { transactions } = useTransactions();
  const [selectedMonth, setSelectedMonth] = useState("all");

  // Belum login / masih dicek -> jangan render apa-apa dulu.
  // Ini pengganti langsung dari redirect di js/auth.js.
  if (!checked) return null;

  const summary = calculateSummary(transactions, selectedMonth);
  const { incomeData, expenseData } = prepareChartData(transactions, selectedMonth);
  const expenseCategories = prepareExpenseCategoryData(transactions, selectedMonth);

  const recent = [...transactions]
    .filter((t) =>
      selectedMonth === "all"
        ? true
        : new Date(t.createdAt).getMonth() === Number(selectedMonth),
    )
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <AppShell active="/dashboard" onLogout={logout}>
      <div className="fade-up mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-brand-100 dark:bg-brand-500/10 text-brand-700 dark:text-brand-500 text-xs font-bold">
          Ringkasan Terbaru
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Selamat Datang 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Kelola pemasukan dan pengeluaranmu dengan mudah
        </p>
      </div>

      <SummaryCards income={summary.income} expense={summary.expense} balance={summary.balance} />

      <div className="fade-up bg-white/90 dark:bg-ink-900/90 p-5 sm:p-6 lg:p-7 rounded-[1.75rem] border border-gray-100 dark:border-white/5 shadow-card w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white">
            Ringkasan Keuangan
          </h3>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full sm:w-52 px-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
          >
            <option value="all">Semua Bulan</option>
            {MONTH_OPTIONS.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
        </div>

        <FinanceChart incomeData={incomeData} expenseData={expenseData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mt-6">
          <div className="bg-gray-50/70 dark:bg-white/[0.02] rounded-3xl p-4 sm:p-5 border border-gray-100 dark:border-white/5 min-w-0">
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Kategori Pengeluaran</h4>
            <ExpenseChart categories={expenseCategories} />
          </div>

          <div className="lg:col-span-2 bg-gray-50/70 dark:bg-white/[0.02] rounded-3xl p-4 sm:p-5 border border-gray-100 dark:border-white/5 min-w-0">
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Riwayat Transaksi</h4>
            <TransactionList transactions={recent} showDelete={false} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
