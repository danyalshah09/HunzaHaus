/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6', // Blue color
        'primary-dark': '#2563eb',
        'secondary': '#10b981', // Green color
        'secondary-dark': '#059669'
      }
    },
  },
  plugins: [],
} 