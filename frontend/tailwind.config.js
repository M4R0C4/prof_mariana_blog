/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#1e1b4b",
          primary: "#6366f1",
          light: "#e0e7ff",
        }
      }
    },
  },
  plugins: [],
}