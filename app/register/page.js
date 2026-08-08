// app/register/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";

function UserIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function EyeIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function EyeOffIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.243L9.88 9.88"
      />
    </svg>
  );
}

function AlertIcon({ className }) {
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
        d="M12 9v3.75m0 3.375h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function fieldClass(hasError) {
  return `w-full bg-gray-50 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 border pl-11 pr-4 py-3 rounded-2xl outline-none transition-all duration-200 ${
    hasError
      ? "border-red-300 dark:border-red-500/40 ring-2 ring-red-500/20 focus:ring-red-500/40"
      : "border-gray-200 dark:border-white/10 focus:bg-white dark:focus:bg-white/5 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
  }`;
}

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validate() {
    const newErrors = {};
    const name = form.name.trim();
    const email = form.email.trim();

    if (!name) newErrors.name = "Nama wajib diisi.";
    else if (name.length < 2) newErrors.name = "Nama minimal 2 karakter.";

    if (!email) newErrors.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Format email tidak valid.";

    if (!form.password) newErrors.password = "Password wajib diisi.";
    else if (form.password.length < 8)
      newErrors.password = "Password minimal 8 karakter.";

    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Konfirmasi password tidak cocok.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
       
        showToast(data.message || "Registrasi gagal. Coba lagi.", "error");
        return;
      }

      router.push("/?registered=1");
    } catch (err) {
      showToast("Tidak bisa terhubung ke server. Coba lagi.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dots bg-[#f4f7f5] dark:bg-ink-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 items-center justify-center shadow-soft mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-7 h-7 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.5L7.5 9l3.5 3.5L21 4m0 0v5m0-5h-5"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Buat Akun
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Mulai kelola keuanganmu bersama kami
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white/90 dark:bg-ink-900/90 p-6 sm:p-7 rounded-[1.75rem] border border-gray-100 dark:border-white/5 shadow-card space-y-4"
        >
          {/* Nama */}
          <div>
            <div className="relative">
              <UserIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Nama lengkap"
                aria-invalid={Boolean(errors.name)}
                className={fieldClass(errors.name)}
              />
            </div>
            {errors.name && (
              <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5 px-1">
                <AlertIcon className="w-3.5 h-3.5 shrink-0" />
                {errors.name}
              </p>
            )}
          </div>

         
          <div>
            <div className="relative">
              <MailIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Alamat email"
                aria-invalid={Boolean(errors.email)}
                className={fieldClass(errors.email)}
              />
            </div>
            {errors.email && (
              <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5 px-1">
                <AlertIcon className="w-3.5 h-3.5 shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

        
          <div>
            <div className="relative">
              <LockIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="Password (minimal 8 karakter)"
                aria-invalid={Boolean(errors.password)}
                className={`${fieldClass(errors.password)} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5 px-1">
                <AlertIcon className="w-3.5 h-3.5 shrink-0" />
                {errors.password}
              </p>
            )}
          </div>

         
          <div>
            <div className="relative">
              <LockIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                placeholder="Konfirmasi password"
                aria-invalid={Boolean(errors.confirmPassword)}
                className={fieldClass(errors.confirmPassword)}
              />
            </div>
            {errors.confirmPassword && (
              <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5 px-1">
                <AlertIcon className="w-3.5 h-3.5 shrink-0" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold rounded-2xl shadow-soft hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0 transition-all duration-300"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Sudah punya akun?{" "}
            <Link
              href="/"
              className="font-semibold text-brand-600 dark:text-brand-500 hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
