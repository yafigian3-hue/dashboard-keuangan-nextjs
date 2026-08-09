"use client";

import { useState } from "react";
import SummaryCards from "@/components/SummaryCards";
import FinanceChart from "@/components/FinanceChart";
import ExpenseChart from "@/components/ExpenseChart";
import TransactionList from "@/components/TransactionList";
import {
  useTransactions,
  calculateSummary,
  prepareChartData,
  prepareExpenseCategoryData,
} from "@/lib/useTransactions";

const MONTH_OPTIONS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function SparkleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3l1.6 4.9L18.5 9.5 13.6 11.1 12 16l-1.6-4.9L5.5 9.5l4.9-1.6L12 3z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChartBarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="4"
        y="12"
        width="3.5"
        height="8"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="10.25"
        y="7"
        width="3.5"
        height="13"
        rx="1"
        fill="currentColor"
        opacity="0.75"
      />
      <rect x="16.5" y="3" width="3.5" height="17" rx="1" fill="currentColor" />
    </svg>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DashboardPage() {
  const { transactions } = useTransactions(true);
  const [selectedMonth, setSelectedMonth] = useState("all");

  const summary = calculateSummary(transactions, selectedMonth);
  const { incomeData, expenseData } = prepareChartData(
    transactions,
    selectedMonth,
  );
  const expenseCategories = prepareExpenseCategoryData(
    transactions,
    selectedMonth,
  );

  const recent = [...transactions]
    .filter((t) =>
      selectedMonth === "all"
        ? true
        : new Date(t.createdAt).getMonth() === Number(selectedMonth),
    )
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <>
      <div className="fade-up relative mb-8 overflow-hidden ">
        <div className="pointer-events-none absolute -top-16 -left-10 h-48 w-48 " />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-brand-100 dark:bg-brand-500/10 text-brand-700 dark:text-brand-500 text-xs font-bold">
            <SparkleIcon className="w-3 h-3" />
            Ringkasan Terbaru
          </span>

          <h1 className="flex items-center gap-2.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Selamat Datang
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
            Kelola pemasukan dan pengeluaranmu dengan mudah
          </p>
        </div>
      </div>

      <SummaryCards
        income={summary.income}
        expense={summary.expense}
        balance={summary.balance}
      />

      <div className="fade-up bg-white/90 dark:bg-ink-900/90 p-5 sm:p-6 lg:p-7 rounded-[1.75rem] border border-gray-100 dark:border-white/5 shadow-card w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <h3 className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-100 dark:bg-brand-500/10 text-brand-600 dark:text-brand-500 shrink-0">
              <ChartBarIcon className="w-4 h-4" />
            </span>
            Ringkasan Keuangan
          </h3>

          <div className="relative w-full sm:w-52">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 pr-9 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none transition-shadow"
            >
              <option value="all">Semua Bulan</option>
              {MONTH_OPTIONS.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <FinanceChart incomeData={incomeData} expenseData={expenseData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mt-6">
          <div className="bg-gray-50/70 dark:bg-white/[0.02] rounded-3xl p-4 sm:p-5 border border-gray-100 dark:border-white/5 min-w-0 transition-colors hover:border-brand-200 dark:hover:border-brand-500/20">
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">
              Kategori Pengeluaran
            </h4>
            <ExpenseChart categories={expenseCategories} />
          </div>

          <div className="lg:col-span-2 bg-gray-50/70 dark:bg-white/[0.02] rounded-3xl p-4 sm:p-5 border border-gray-100 dark:border-white/5 min-w-0 transition-colors hover:border-brand-200 dark:hover:border-brand-500/20">
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">
              Riwayat Transaksi
            </h4>
            <TransactionList transactions={recent} showActions={false} />
          </div>
        </div>
      </div>
    </>
  );
}
