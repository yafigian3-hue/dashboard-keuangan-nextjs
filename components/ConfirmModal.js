"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function TrashIcon({ className }) {
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
        d="M6 7.5h12M9.75 7.5V6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v1.5m-7.5 0v9a2.25 2.25 0 002.25 2.25h4.5A2.25 2.25 0 0016.5 16.5v-9"
      />
    </svg>
  );
}

export default function ConfirmModal({
  open,
  title = "Hapus Transaksi",
  message,
  onConfirm,
  onCancel,
}) {
  const [mounted, setMounted] = useState(false);

  
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKey(e) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onCancel]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      onClick={onCancel}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="w-full max-w-md rounded-3xl bg-white dark:bg-ink-900 border border-gray-100 dark:border-white/10 shadow-card p-6 sm:p-7 fade-up"
      >
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center">
            <TrashIcon className="w-7 h-7 text-red-500 dark:text-red-400" />
          </div>
        </div>

        <h2
          id="confirm-modal-title"
          className="text-xl font-extrabold text-center text-gray-900 dark:text-white"
        >
          {title}
        </h2>

        <p className="mt-2.5 text-center text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {message}
        </p>

        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-7">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-[0_18px_40px_-18px_rgba(239,68,68,0.5)] hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 transition-all duration-300"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
