import { rupiah } from "@/lib/format";

export default function SummaryCards({ income, expense, balance }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-8">
      <div className="fade-up relative col-span-2 md:col-span-1 bg-gradient-to-br from-brand-600 via-brand-600 to-emerald-700 text-white p-6 rounded-3xl shadow-soft overflow-hidden">
        <p className="text-brand-100 text-sm font-semibold">Total Saldo</p>
        <p className="text-2xl sm:text-3xl font-extrabold mt-2 break-words truncate">
          {rupiah(balance)}
        </p>
        <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full bg-white/15 text-xs font-semibold">
          Saldo aktif
        </span>
      </div>

      <div className="fade-up bg-white dark:bg-ink-900 p-5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-card min-w-0">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
          Pemasukan
        </p>
        <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white break-words truncate">
          {rupiah(income)}
        </p>
      </div>

      <div className="fade-up bg-white dark:bg-ink-900 p-5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-card min-w-0">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
          Pengeluaran
        </p>
        <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white break-words truncate">
          {rupiah(expense)}
        </p>
      </div>
    </div>
  );
}
