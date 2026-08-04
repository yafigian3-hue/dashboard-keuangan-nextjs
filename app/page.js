"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Port dari index.html + bagian login di js/auth.js.
// window.location.href = "dashboard.html"  -->  router.push("/dashboard")
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;

    localStorage.setItem("currentUser", trimmed);
    router.push("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-ink-900 p-6 rounded-2xl shadow-card w-80 space-y-4 border border-gray-100 dark:border-white/5"
      >
        <h1 className="text-xl font-bold text-center text-gray-900 dark:text-white">
          Login Dashboard
        </h1>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white p-2 rounded-xl w-full focus:ring-2 focus:ring-brand-500 focus:outline-none"
        />

        <button className="bg-brand-600 hover:bg-brand-700 text-white w-full py-2 rounded-xl font-semibold transition-colors">
          Login
        </button>
      </form>
    </div>
  );
}
