"use client";

import { useEffect, useRef } from "react";
import { rupiah } from "@/lib/format";
import { useTheme } from "@/lib/useTheme";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export default function FinanceChart({ incomeData, expenseData }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;

    const isDark = theme === "dark";
    const gridColor = isDark
      ? "rgba(255,255,255,0.06)"
      : "rgba(16,185,129,0.07)";
    const tickColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(17,34,28,0.4)";

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: "Pemasukan",
            data: incomeData,
            backgroundColor: isDark
              ? "rgba(16,185,129,0.7)"
              : "rgba(16,185,129,0.85)",
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: "Pengeluaran",
            data: expenseData,
            backgroundColor: isDark
              ? "rgba(244,63,94,0.65)"
              : "rgba(244,63,94,0.8)",
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

    return () => chartRef.current?.destroy();
  }, [incomeData, expenseData, theme]);

  return (
    <div className="h-64 w-full relative rounded-2xl bg-gray-50/60 dark:bg-white/[0.02] p-3 sm:p-4">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
