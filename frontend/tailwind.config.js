/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      'bg-primary',
      'bg-primary-dark',
      'text-primary',
      'hover:bg-primary-dark',
      'hover:text-primary',
      'text-white',
      'hover:text-gray-200',
      'bg-white',
      'hover:bg-gray-100',
      'bg-gray-800',
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