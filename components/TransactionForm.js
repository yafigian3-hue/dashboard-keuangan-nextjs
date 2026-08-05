"use client";

import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/categories";

function PlusIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

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

  function resetForm() {
    setName("");
    setAmount("");
    setType("income");
  }

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
      onAdd({ name: trimmed, amount: numAmount, type });
    }

    resetForm();
  }

  function handleCancel() {
    clearEditing();
    resetForm();
  }

  const isEditing = Boolean(editingTransaction);

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      {/* Grup input, selalu rapi dalam grid sendiri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <input
          list="categories"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Kategori transaksi..."
          className="bg-gray-50 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 border border-gray-200 dark:border-white/10 focus:bg-white dark:focus:bg-white/5 focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:outline-none p-3 rounded-2xl transition-all duration-300"
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
          className="bg-gray-50 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 border border-gray-200 dark:border-white/10 focus:bg-white dark:focus:bg-white/5 focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:outline-none p-3 rounded-2xl transition-all duration-300"
        />

        <div className="relative">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="appearance-none w-full bg-gray-50 dark:bg-white/5 dark:text-white border border-gray-200 dark:border-white/10 focus:bg-white dark:focus:bg-white/5 focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:outline-none pl-3 pr-10 py-3 rounded-2xl transition-all duration-300"
          >
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
          <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Grup tombol aksi, selalu nempel bareng, gak pernah nyangkut sendirian */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold rounded-2xl shadow-soft hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 transition-all duration-300"
        >
          {isEditing ? (
            <>
              <CheckIcon className="w-5 h-5" />
              Simpan Perubahan
            </>
          ) : (
            <>
              <PlusIcon className="w-5 h-5" />
              Tambah
            </>
          )}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300"
          >
            <XIcon className="w-4 h-4" />
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
