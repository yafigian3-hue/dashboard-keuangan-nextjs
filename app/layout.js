import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { ToastProvider } from "@/components/ToastProvider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata = {
  title: {
    default: "Dashboard Keuangan",
    template: "%s | Dashboard Keuangan",
  },
  description:
    "Dashboard keuangan pribadi berbasis Next.js untuk mencatat pemasukan, pengeluaran, dan memantau kondisi finansial secara sederhana.",

  keywords: [
    "Dashboard Keuangan",
    "Next.js",
    "React",
    "Prisma",
    "Personal Finance",
    "Expense Tracker",
  ],

  authors: [
    {
      name: "Yafi Gian",
    },
  ],

  creator: "Yafi Gian",

  // metadataBase: new URL("https://dashboard-keuangan-nextjs.vercel.app"),

  openGraph: {
    title: "Dashboard Keuangan",
    description:
      "Aplikasi pencatatan keuangan pribadi yang dibangun menggunakan Next.js dan Prisma.",
    url: "https://dashboard-keuangan-nextjs.vercel.app",
    siteName: "Dashboard Keuangan",
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dashboard Keuangan",
    description: "Aplikasi pencatatan keuangan pribadi berbasis Next.js.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className="bg-dots bg-[#f4f7f5] dark:bg-ink-950 min-h-screen text-gray-800 dark:text-gray-100 antialiased selection:bg-brand-500/20">
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}
