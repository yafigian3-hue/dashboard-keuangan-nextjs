"use client";

import { useEffect, useRef } from "react";
import { rupiah } from "@/lib/format";
import { useTheme } from "@/lib/ThemeProvider";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const CHART_COLORS = [
  "#f43f5e",
  "#fb923c",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#06b6d4",
  "#8b5cf6",
  "#ec4899",
];

export default function ExpenseChart({ categories }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const { theme } = useTheme();

  const labels = Object.keys(categories);
  const data = Object.values(categories);
  const total = data.reduce((sum, v) => sum + v, 0);
  const isEmpty = labels.length === 0;

  const colors = data.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]);

  useEffect(() => {
    if (!canvasRef.current) return;

    Chart.getChart(canvasRef.current)?.destroy();

    if (isEmpty) return;

    const isDark = theme === "dark";

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
            borderWidth: 3,
            borderColor: isDark ? "#0b1812" : "#f9fafb",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: isDark ? "#9ca3af" : "#6b7280",
              usePointStyle: true,
              boxWidth: 8,
              padding: 14,
              font: { size: 11 },
            },
          },
          tooltip: {
            backgroundColor: isDark ? "#0b1812" : "#11221c",
            padding: 10,
            cornerRadius: 10,
            callbacks: {
              label: (ctx) => " " + ctx.label + ": " + rupiah(ctx.raw),
            },
          },
        },
      },
      plugins: [
        {
          id: "centerText",
          afterDraw(chart) {
            const meta = chart.getDatasetMeta(0).data[0];
            if (!meta) return;
            const { ctx } = chart;
            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = isDark
              ? "rgba(255,255,255,0.45)"
              : "rgba(17,34,28,0.4)";
            ctx.font = "600 10px sans-serif";
            ctx.fillText("TOTAL PENGELUARAN", meta.x, meta.y - 14);
            ctx.fillStyle = isDark ? "#f9fafb" : "#11221c";
            ctx.font = "700 16px sans-serif";
            ctx.fillText(rupiah(total), meta.x, meta.y + 8);
            ctx.restore();
          },
        },
      ],
    });

    return () => chartRef.current?.destroy();
  }, [JSON.stringify(categories), theme]);

  return (
    <div className="relative w-full h-64 sm:h-72 lg:h-96">
      <canvas ref={canvasRef} className="!w-full !h-full" />

      {isEmpty && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
          <div className="w-24 h-24 rounded-full border-[10px] border-gray-100 dark:border-white/5" />
          <p className="text-sm font-medium text-gray-400 dark:text-gray-600 -mt-2">
            Belum ada pengeluaran
          </p>
        </div>
      )}
    </div>
  );
}
