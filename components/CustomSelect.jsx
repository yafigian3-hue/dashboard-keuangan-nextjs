"use client";

import { useState, useRef, useEffect } from "react";

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

/**
 * CustomSelect
 * Pengganti <select> native supaya dropdown-nya ikut dark/light mode.
 *
 * Props:
 * - value: value yang sedang dipilih
 * - onChange: (value) => void
 * - options: [{ value: string, label: string }]
 * - placeholder?: string
 * - className?: string tambahan untuk wrapper (mis. lebar custom)
 */
export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Pilih",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((opt) => String(opt.value) === String(value));

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between w-full gap-2 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white border pl-3.5 pr-3 py-3 rounded-2xl transition-all duration-200 focus:outline-none ${
          open
            ? "border-transparent ring-2 ring-brand-500"
            : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"
        }`}
      >
        <span className="truncate text-left font-medium">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180 text-brand-500" : ""
          }`}
        />
      </button>

      <div
        className={`absolute z-20 left-0 right-0 mt-2 origin-top rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-ink-900 shadow-soft transition-all duration-150 ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="max-h-60 overflow-y-auto py-1.5 px-1.5">
          {options.map((opt) => {
            const isSelected = String(opt.value) === String(value);
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-sm rounded-xl transition-colors duration-150 ${
                  isSelected
                    ? "bg-brand-500 text-white font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
