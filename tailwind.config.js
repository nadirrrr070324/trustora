/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
      colors: {
        ink: { 950: "#0b0e13", 900: "#10141b", 800: "#161b24", 700: "#1e2531" },
        accent: { 400: "#7aa7ff", 500: "#4f8cff", 600: "#3a6fd8" },
        green: {
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
      },
      boxShadow: {
        glass: "inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 8px 32px rgba(34, 197, 94, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5)",
        "glass-lg": "inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 12px 48px rgba(34, 197, 94, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.6)",
        card: "0 4px 24px rgba(34, 197, 94, 0.08)",
        "card-lg": "0 8px 32px rgba(34, 197, 94, 0.1)",
        glow: "0 0 40px rgba(34, 197, 94, 0.3), 0 0 80px rgba(34, 197, 94, 0.15)",
        "glow-emerald": "0 0 40px rgba(16, 185, 129, 0.3), 0 0 80px rgba(16, 185, 129, 0.15)",
      },
    },
  },
  plugins: [],
};
