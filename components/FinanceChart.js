"use client";

import { useEffect, useRef } from "react";
import { rupiah } from "@/lib/format";
import { useTheme } from "@/lib/ThemeProvider";
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

  const hasData =
    incomeData.some((v) => v > 0) || expenseData.some((v) => v > 0);

  useEffect(() => {
    if (!canvasRef.current) return;
    Chart.getChart(canvasRef.current)?.destroy();

    const isDark = theme === "dark";
    const gridColor = isDark
      ? "rgba(255,255,255,0.06)"
      : "rgba(16,185,129,0.07)";
    const tickColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(17,34,28,0.4)";

    const ctx = canvasRef.current.getContext("2d");

    // Gradient halus untuk bar, lebih modern daripada warna flat
    const incomeGradient = ctx.createLinearGradient(0, 0, 0, 220);
    incomeGradient.addColorStop(
      0,
      isDark ? "rgba(16,185,129,0.9)" : "rgba(16,185,129,0.95)",
    );
    incomeGradient.addColorStop(
      1,
      isDark ? "rgba(16,185,129,0.35)" : "rgba(16,185,129,0.55)",
    );

    const expenseGradient = ctx.createLinearGradient(0, 0, 0, 220);
    expenseGradient.addColorStop(
      0,
      isDark ? "rgba(244,63,94,0.85)" : "rgba(244,63,94,0.9)",
    );
    expenseGradient.addColorStop(
      1,
      isDark ? "rgba(244,63,94,0.3)" : "rgba(244,63,94,0.5)",
    );

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: "Pemasukan",
            data: incomeData,
            backgroundColor: incomeGradient,
            borderRadius: 6,
            borderSkipped: false,
            maxBarThickness: 18,
          },
          {
            label: "Pengeluaran",
            data: expenseData,
            backgroundColor: expenseGradient,
            borderRadius: 6,
            borderSkipped: false,
            maxBarThickness: 18,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? "#0b1812" : "#11221c",
            padding: 10,
            cornerRadius: 10,
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

      {!hasData && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-sm font-medium text-gray-400 dark:text-gray-600">
            Belum ada data transaksi
          </p>
        </div>
      )}
    </div>
  );
}
