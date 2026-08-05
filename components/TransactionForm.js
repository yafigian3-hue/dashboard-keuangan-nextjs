"use client";

import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/categories";

export default function TransactionForm({
  onAdd,
  onUpdate,
  editingTransaction,
  clearEditing,
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  useEffect(() => {
    if (editingTransaction) {
      setName(editingTransaction.name);
      setAmount(editingTransaction.amount);
      setType(editingTransaction.type);
    }
  }, [editingTransaction]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    const numAmount = Number(amount);

    if (!trimmed || numAmount <= 0) return;

    if (editingTransaction) {
      onUpdate({
        id: editingTransaction.id,
        name: trimmed,
        amount: numAmount,
        type,
      });

      clearEditing();
    } else {
      onAdd({
        name: trimmed,
        amount: numAmount,
        type,
      });
    }

    setName("");
    setAmount("");
    setType("income");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4"
    >
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
        {editingTransaction ? "Update" : "+ Tambah"}
      </button>
      {editingTransaction && (
        <button
          type="button"
          onClick={() => {
            clearEditing();
            setName("");
            setAmount("");
            setType("income");
          }}
          className="px-4 py-3 rounded-2xl border border-gray-300 dark:border-white/10"
        >
          Batal
        </button>
      )}
    </form>
  );
}
