/** @type {import('tailwindcss').Config} */
import { heroui } from '@heroui/react'

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FE724C',
        secondary: '#FE724C40',
        accent: '#FF4D4F',
        background: '#F5F7FA',
        foreground: '#D9D9D945',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        xl: '1.25rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
}
