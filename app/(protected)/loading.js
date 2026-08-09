export default function Loading() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-white/5" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="h-32 rounded-3xl bg-gray-200 dark:bg-white/5" />
          <div className="h-32 rounded-3xl bg-gray-200 dark:bg-white/5" />
          <div className="h-32 rounded-3xl bg-gray-200 dark:bg-white/5" />
        </div>

        <div className="h-64 rounded-3xl bg-gray-200 dark:bg-white/5" />
      </div>
    </div>
  );
}
