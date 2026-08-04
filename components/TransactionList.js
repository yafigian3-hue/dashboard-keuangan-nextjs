import { rupiah } from "@/lib/format";

// Dulu setiap transaksi di-render dengan document.createElement("li") +
// innerHTML template string (lihat renderTransactionItem di js/ui.js).
// Di React, kita cukup .map() array transaksi menjadi JSX -- otomatis
// re-render tiap kali `transactions` berubah, tanpa nulis ulang innerHTML.
export default function TransactionList({ transactions, onDelete, showDelete = true }) {
  if (transactions.length === 0) {
    return (
      <p className="text-center py-10 text-sm font-semibold text-gray-400 dark:text-gray-500">
        Belum ada transaksi
      </p>
    );
  }

  return (
    <ul className="nice-scroll space-y-3 max-h-[28rem] overflow-y-auto pr-1">
      {transactions.map((t) => {
        const isIncome = t.type === "income";
        const tanggal = new Date(t.createdAt).toLocaleDateString("id-ID");
        const jam = new Date(t.createdAt).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <li
            key={t.id}
            className="fade-up flex items-center justify-between gap-3 p-4 rounded-2xl bg-white/90 dark:bg-ink-900/90 border border-gray-100 dark:border-white/5 shadow-card"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                  isIncome
                    ? "bg-brand-100 dark:bg-brand-500/10 text-brand-600 dark:text-brand-500"
                    : "bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
                }`}
              >
                {isIncome ? "↑" : "↓"}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-gray-800 dark:text-white truncate">{t.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isIncome ? "Pemasukan" : "Pengeluaran"} · {tanggal} {jam}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span
                className={`font-bold ${
                  isIncome ? "text-brand-600 dark:text-brand-500" : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {isIncome ? "+" : "-"} {rupiah(t.amount)}
              </span>
              {showDelete && (
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-xs font-semibold text-rose-500 dark:text-rose-400 hover:text-rose-700"
                >
                  Hapus
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
