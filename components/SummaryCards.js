import { rupiah } from "@/lib/format";

export default function SummaryCards({ income, expense, balance }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-8">
      <div className="fade-up relative col-span-2 md:col-span-1 bg-gradient-to-br from-brand-600 via-brand-600 to-emerald-700 text-white p-6 rounded-3xl shadow-soft overflow-hidden">
        <svg
          className="absolute -right-8 -top-8 w-40 h-40 text-white/10"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="currentColor"
            strokeWidth="14"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            stroke="currentColor"
            strokeWidth="14"
          />
        </svg>

        <div className="absolute top-6 right-6 w-11 h-11 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12V7.5A2.5 2.5 0 0018.5 5h-13A2.5 2.5 0 003 7.5v9A2.5 2.5 0 005.5 19h13a2.5 2.5 0 002.5-2.5V12zm0 0h-4.5a1.5 1.5 0 100 3H21"
            />
          </svg>
        </div>

        <div className="relative pr-14">
          <p className="text-brand-100 text-sm font-semibold">Total Saldo</p>
          <p
            className="font-extrabold mt-2 leading-tight whitespace-nowrap overflow-hidden text-ellipsis tabular-nums"
            style={{ fontSize: "clamp(1.1rem, 4.5vw, 1.875rem)" }}
            title={rupiah(balance)}
          >
            {rupiah(balance)}
          </p>
          <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full bg-white/15 text-xs font-semibold">
            Saldo aktif
          </span>
        </div>
      </div>

      <div className="fade-up group bg-white dark:bg-ink-900 p-5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-card hover:-translate-y-0.5 hover:shadow-soft transition-all duration-300 min-w-0">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Pemasukan
          </p>
          <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-5 h-5 text-green-600 dark:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.5 4.5L21.75 7.5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 7.5h5.25v5.25"
              />
            </svg>
          </div>
        </div>
        <p
          className="font-extrabold mt-1 text-gray-900 dark:text-white leading-tight whitespace-nowrap overflow-hidden text-ellipsis tabular-nums"
          style={{ fontSize: "clamp(1.1rem, 4.5vw, 1.875rem)" }}
          title={rupiah(income)}
        >
          {rupiah(income)}
        </p>
      </div>

      <div className="fade-up group bg-white dark:bg-ink-900 p-5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-card hover:-translate-y-0.5 hover:shadow-soft transition-all duration-300 min-w-0">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Pengeluaran
          </p>
          <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-5 h-5 text-red-600 dark:text-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6L9 12.75l4.5-4.5L21.75 16.5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 16.5h5.25v-5.25"
              />
            </svg>
          </div>
        </div>
        <p
          className="font-extrabold mt-1 text-gray-900 dark:text-white leading-tight whitespace-nowrap overflow-hidden text-ellipsis tabular-nums"
          style={{ fontSize: "clamp(1.1rem, 4.5vw, 1.875rem)" }}
          title={rupiah(expense)}
        >
          {rupiah(expense)}
        </p>
      </div>
    </div>
  );
}
