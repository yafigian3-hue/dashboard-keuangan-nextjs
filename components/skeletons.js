// components/skeletons.js
"use client";


//  * Blok dasar skeleton — satu sumber kebenaran untuk warna & animasi
//  * "berdenyut". Semua skeleton lain di aplikasi ini disusun dari sini,
//  * supaya kalau suatu saat mau ganti warna/kecepatan animasi, cukup
//  * ubah di satu tempat.
 
export function SkeletonBlock({ className = "" }) {
  return <div className={`bg-gray-200 dark:bg-white/5 ${className}`} />;
}

/**
 * Skeleton untuk 3 kartu ringkasan (saldo/pemasukan/pengeluaran),
 * dipakai di dashboard. Dipisah jadi komponen sendiri karena bentuknya
 * cukup spesifik (grid 2/3 kolom + 1 kartu span-2 di mobile).
 */
export function SummaryCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-8">
      <SkeletonBlock className="col-span-2 md:col-span-1 h-36 rounded-3xl" />
      <SkeletonBlock className="h-36 rounded-3xl" />
      <SkeletonBlock className="h-36 rounded-3xl" />
    </div>
  );
}

/**
 * Skeleton untuk header halaman (badge + judul + subjudul) — bentuknya
 * sama persis di dashboard maupun transaksi, cuma beda lebar teks.
 */
export function PageHeaderSkeleton({
  titleWidth = "w-48",
  subtitleWidth = "w-64",
}) {
  return (
    <div className="mb-8">
      <SkeletonBlock className="h-6 w-40 rounded-full mb-3" />
      <SkeletonBlock className={`h-8 ${titleWidth} rounded-lg mb-2`} />
      <SkeletonBlock className={`h-4 ${subtitleWidth} rounded-lg`} />
    </div>
  );
}

/** Skeleton lengkap untuk halaman Dashboard */
export function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <PageHeaderSkeleton titleWidth="w-56" subtitleWidth="w-72" />

      <SummaryCardsSkeleton />

      <div className="bg-white/90 dark:bg-ink-900/90 p-5 sm:p-6 lg:p-7 rounded-[1.75rem] border border-gray-100 dark:border-white/5 shadow-card">
        <div className="flex items-center justify-between mb-5">
          <SkeletonBlock className="h-6 w-40 rounded-lg" />
          <SkeletonBlock className="h-10 w-40 rounded-2xl" />
        </div>

        <SkeletonBlock className="h-64 rounded-2xl" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mt-6">
          <SkeletonBlock className="h-64 rounded-3xl" />
          <SkeletonBlock className="lg:col-span-2 h-64 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

/** Skeleton lengkap untuk halaman Transaksi */
export function TransaksiSkeleton() {
  return (
    <div className="animate-pulse">
      <PageHeaderSkeleton titleWidth="w-40" subtitleWidth="w-60" />

      <div className="bg-white/90 dark:bg-ink-900/90 p-5 sm:p-6 lg:p-8 rounded-[1.75rem] shadow-card border border-gray-100 dark:border-white/5 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <SkeletonBlock className="h-12 rounded-2xl" />
          <SkeletonBlock className="h-12 rounded-2xl" />
          <SkeletonBlock className="h-12 rounded-2xl" />
        </div>

        <SkeletonBlock className="h-12 w-full max-w-xs rounded-2xl" />

        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <SkeletonBlock key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
