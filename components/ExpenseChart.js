"use client";

import { useEffect, useRef } from "react";
import { rupiah } from "@/lib/format";
import { useTheme } from "@/lib/useTheme";

const CHART_COLORS = ["#f43f5e", "#fb6f84", "#fb923c", "#fbbf6b", "#fcd9a8", "#e11d48", "#fda4af"];

export default function ExpenseChart({ categories }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const { theme } = useTheme();

  const labels = Object.keys(categories);
  const data = Object.values(categories);
  const total = data.reduce((sum, v) => sum + v, 0);

  useEffect(() => {
    if (!window.Chart || !canvasRef.current) return;

    const isDark = theme === "dark";

    chartRef.current = new window.Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{ data, backgroundColor: CHART_COLORS, borderWidth: 3 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: isDark ? "#9ca3af" : "#6b7280", usePointStyle: true },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => " " + ctx.label + ": " + rupiah(ctx.raw),
            },
          },
        },
      },
      // Plugin kecil untuk nulis total di tengah donat — sama seperti
      // centerTextPlugin di js/dashboard.js
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
            ctx.fillStyle = isDark ? "rgba(255,255,255,0.45)" : "rgba(17,34,28,0.4)";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(categories), theme]);

  return (
    <div className="relative w-full h-64 sm:h-72 lg:h-96">
      <canvas ref={canvasRef} className="!w-full !h-full" />
    </div>
  );
}
