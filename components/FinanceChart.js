"use client";

import { useEffect, useRef } from "react";
import { rupiah } from "@/lib/format";
import { useTheme } from "@/lib/useTheme";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

// Ini port langsung dari renderChart() di js/dashboard.js. Bedanya:
// - canvas diakses lewat useRef, bukan document.getElementById
// - chart lama di-destroy di dalam "cleanup function" useEffect,
//   pengganti pengecekan manual `if (financeChart) financeChart.destroy()`
export default function FinanceChart({ incomeData, expenseData }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!window.Chart || !canvasRef.current) return;

    const isDark = theme === "dark";
    const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(16,185,129,0.07)";
    const tickColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(17,34,28,0.4)";

    chartRef.current = new window.Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: "Pemasukan",
            data: incomeData,
            backgroundColor: isDark ? "rgba(16,185,129,0.7)" : "rgba(16,185,129,0.85)",
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: "Pengeluaran",
            data: expenseData,
            backgroundColor: isDark ? "rgba(244,63,94,0.65)" : "rgba(244,63,94,0.8)",
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => " " + ctx.dataset.label + ": " + rupiah(ctx.raw),
            },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: tickColor } },
          y: { grid: { color: gridColor }, ticks: { color: tickColor } },
        },
      },
    });

    // cleanup: dipanggil otomatis sebelum effect berikutnya jalan,
    // atau saat komponen unmount — ini pengganti `.destroy()` manual
    return () => chartRef.current?.destroy();
  }, [incomeData, expenseData, theme]);

  return (
    <div className="h-64 w-full relative rounded-2xl bg-gray-50/60 dark:bg-white/[0.02] p-3 sm:p-4">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
