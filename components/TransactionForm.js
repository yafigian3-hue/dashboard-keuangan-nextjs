"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";

// Dulu form ditangani lewat addTransactions() di js/transaksi.js yang
// membaca .value dari elements.categoryInput/amountInput/typeInput
// secara langsung. Di React, tiap input jadi "controlled" oleh state,
// dan submit tinggal memanggil callback `onAdd` dari komponen induk.
export default function TransactionForm({ onAdd }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    const numAmount = Number(amount);

    if (!trimmed || numAmount <= 0) return;

    onAdd({ name: trimmed, amount: numAmount, type });
    setName("");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
      <input
        list="categories"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Kategori transaksi..."
        className="bg-gray-50 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-brand-500 focus:outline-none p-3 rounded-2xl transition-all duration-300"
      />
      <datalist id="categories">
        {CATEGORIES[type].map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Jumlah uang"
        required
        className="bg-gray-50 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-brand-500 focus:outline-none p-3 rounded-2xl transition-all duration-300"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="bg-gray-50 dark:bg-white/5 dark:text-white border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-brand-500 focus:outline-none p-3 rounded-2xl transition-all duration-300"
      >
        <option value="income">Pemasukan</option>
        <option value="expense">Pengeluaran</option>
      </select>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold rounded-2xl shadow-soft hover:-translate-y-0.5 hover:opacity-95 transition-all duration-300"
      >
        + Tambah
      </button>
    </form>
  );
}
