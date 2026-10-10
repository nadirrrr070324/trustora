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
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35)",
        card: "0 4px 24px rgba(0,0,0,0.30)",
      },
    },
  },
  plugins: [],
};
