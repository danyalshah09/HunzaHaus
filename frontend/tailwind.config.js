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
          'primary': '#ffffff', // White color
          'primary-dark': '#f8f9fa', // Slightly off-white
          'secondary': '#e9ecef', // Light gray
          'secondary-dark': '#dee2e6' // Slightly darker gray
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
          display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }