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

function LoadingSpinner({ className }) {
  return (
    <svg
      className={`${className} animate-spin`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />

      <path
        d="M22 12a10 10 0 00-10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertIcon({ className }) {
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
        d="M12 9v3.75m0 3.375h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function fieldClass(hasError) {
  return `w-full bg-gray-50 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 border p-3 rounded-2xl outline-none transition-all duration-200 ${
    hasError
      ? "border-red-300 dark:border-red-500/40 ring-2 ring-red-500/20 focus:ring-red-500/40"
      : "border-gray-200 dark:border-white/10 focus:bg-white dark:focus:bg-white/5 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
  }`;
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setName(editingTransaction.name);
      setAmount(editingTransaction.amount);
      setType(editingTransaction.type);
      setErrors({});
    }
  }, [editingTransaction]);

  function resetForm() {
    setName("");
    setAmount("");
    setType("income");
    setErrors({});
  }

  function validate() {
    const newErrors = {};
    const trimmed = name.trim();
    const numAmount = Number(amount);

    if (!trimmed) {
      newErrors.name = "Nama transaksi wajib diisi.";
    } else if (trimmed.length < 3) {
      newErrors.name = "Nama transaksi minimal 3 karakter.";
    } else if (trimmed.length > 50) {
      newErrors.name = "Nama transaksi maksimal 50 karakter.";
    }

    if (amount === "") {
      newErrors.amount = "Jumlah wajib diisi.";
    } else if (numAmount <= 0) {
      newErrors.amount = "Jumlah harus lebih dari 0.";
    } else if (numAmount > 999999999) {
      newErrors.amount = "Jumlah terlalu besar.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    const trimmed = name.trim();
    const numAmount = Number(amount);

    try {
      setLoading(true);

      if (editingTransaction) {
        await onUpdate({
          id: editingTransaction.id,
          name: trimmed,
          amount: numAmount,
          type,
        });

        clearEditing();
      } else {
        await onAdd({
          name: trimmed,
          amount: numAmount,
          type,
        });
      }

      resetForm();
    } catch (error) {
      console.error(error);
      showToast("Terjadi kesalahan.", "error");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    clearEditing();
    resetForm();
  }

  const isEditing = Boolean(editingTransaction);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-start">
        {/* Tipe */}
        <div className="relative">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="appearance-none w-full bg-gray-50 dark:bg-white/5 dark:text-white border border-gray-200 dark:border-white/10 focus:bg-white dark:focus:bg-white/5 focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:outline-none pl-3 pr-10 py-3 rounded-2xl transition-all duration-200"
          >
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
          <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Kategori */}
        <div>
          <input
            list="categories"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="Kategori transaksi..."
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClass(errors.name)}
          />
          <datalist id="categories">
            {CATEGORIES[type].map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          {errors.name && (
            <p
              id="name-error"
              className="flex items-center gap-1 text-xs text-red-500 mt-1.5 px-1"
            >
              <AlertIcon className="w-3.5 h-3.5 shrink-0" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Jumlah */}
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              if (errors.amount) setErrors((prev) => ({ ...prev, amount: "" }));
            }}
            placeholder="Jumlah uang"
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? "amount-error" : undefined}
            className={fieldClass(errors.amount)}
          />
          {errors.amount && (
            <p
              id="amount-error"
              className="flex items-center gap-1 text-xs text-red-500 mt-1.5 px-1"
            >
              <AlertIcon className="w-3.5 h-3.5 shrink-0" />
              {errors.amount}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold rounded-2xl shadow-soft hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <LoadingSpinner className="w-5 h-5" />
              {isEditing ? "Menyimpan..." : "Menambahkan..."}
            </>
          ) : isEditing ? (
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
