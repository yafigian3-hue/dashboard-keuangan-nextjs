export function SkeletonBlock({ className = "" }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-white/5 ${className}`} />
  );
}

export function DashboardSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-8">
        <SkeletonBlock className="col-span-2 md:col-span-1 h-32 rounded-3xl" />
        <SkeletonBlock className="h-32 rounded-3xl" />
        <SkeletonBlock className="h-32 rounded-3xl" />
      </div>

      <div className="bg-white/90 dark:bg-ink-900/90 p-5 sm:p-6 lg:p-7 rounded-[1.75rem] border border-gray-100 dark:border-white/5 shadow-card">
        <div className="flex items-center justify-between mb-5">
          <SkeletonBlock className="h-6 w-40 rounded-lg" />
          <SkeletonBlock className="h-10 w-32 rounded-2xl" />
        </div>

        <SkeletonBlock className="h-56 rounded-2xl mb-5" />

        <div className="space-y-3">
          <SkeletonBlock className="h-14 rounded-2xl" />
          <SkeletonBlock className="h-14 rounded-2xl" />
          <SkeletonBlock className="h-14 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function TransaksiSkeleton() {
  return (
    <div>
      <div className="mb-8">
        <SkeletonBlock className="h-4 w-32 rounded-lg mb-3" />
        <SkeletonBlock className="h-9 w-48 rounded-lg mb-2" />
        <SkeletonBlock className="h-4 w-64 rounded-lg" />
      </div>

      <div className="bg-white/90 dark:bg-ink-900/90 p-5 sm:p-6 lg:p-8 rounded-[1.75rem] shadow-card border border-gray-100 dark:border-white/5 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <SkeletonBlock className="h-12 rounded-2xl" />
          <SkeletonBlock className="h-12 rounded-2xl" />
          <SkeletonBlock className="h-12 rounded-2xl" />
        </div>

        <SkeletonBlock className="h-12 w-full max-w-xs rounded-2xl" />

        <div className="space-y-3">
          <SkeletonBlock className="h-16 rounded-2xl" />
          <SkeletonBlock className="h-16 rounded-2xl" />
          <SkeletonBlock className="h-16 rounded-2xl" />
          <SkeletonBlock className="h-16 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
