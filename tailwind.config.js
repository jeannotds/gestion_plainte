/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          800: '#1e40af',
          700: '#1d4ed8',
          100: '#dbeafe',
        },
      },
    },
  },
  plugins: [],
};