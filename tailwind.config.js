/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eefdf5",
          100: "#d6f9e6",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        ink: {
          800: "#11221c",
          900: "#0b1812",
          950: "#060f0b",
        },
      },
      boxShadow: {
        soft: "0 18px 40px -18px rgba(16,185,129,0.28)",
        card: "0 1px 2px rgba(16,24,40,0.04), 0 12px 30px -20px rgba(16,24,40,0.25)",
      },
    },
  },
  plugins: [],
};
