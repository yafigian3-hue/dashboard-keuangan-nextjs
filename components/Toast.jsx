"use client";

function CheckIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function ErrorIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m0 3.375h.008v.008H12v-.008z"
      />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

const AUTO_DISMISS_MS = 3000;

export default function Toast({ message, type, visible, onClose }) {
  const isSuccess = type === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed z-[999] left-4 right-4 top-4 sm:left-auto sm:right-6 sm:top-6 sm:w-full sm:max-w-sm transition-all duration-200 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div
        className={`relative overflow-hidden flex items-start gap-3 rounded-2xl pl-4 pr-3 py-4 shadow-card border backdrop-blur-xl bg-white/95 dark:bg-ink-900/95 ${
          isSuccess
            ? "border-green-200 dark:border-green-500/20"
            : "border-red-200 dark:border-red-500/20"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isSuccess
              ? "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-red-100 dark:bg-red-500/10 text-red-500 dark:text-red-400"
          }`}
        >
          {isSuccess ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <ErrorIcon className="w-5 h-5" />
          )}
        </div>

        <p className="flex-1 font-semibold text-sm sm:text-base text-gray-800 dark:text-white pt-2">
          {message}
        </p>

        <button
          onClick={onClose}
          aria-label="Tutup notifikasi"
          className="flex-shrink-0 p-1.5 mt-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
        >
          <XIcon className="w-4 h-4" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 dark:bg-white/5">
          {visible && (
            <div
              key={message}
              className={`h-full ${isSuccess ? "bg-green-500" : "bg-red-500"}`}
              style={{
                animation: `toast-shrink ${AUTO_DISMISS_MS}ms linear forwards`,
              }}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes toast-shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
