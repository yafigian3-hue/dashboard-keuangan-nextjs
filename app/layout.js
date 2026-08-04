import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata = {
  title: "Dashboard Keuangan",
  description: "Dashboard keuangan pribadi — versi Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className="bg-dots bg-[#f4f7f5] dark:bg-ink-950 min-h-screen text-gray-800 dark:text-gray-100 antialiased selection:bg-brand-500/20">
        {children}
      </body>
    </html>
  );
}
