/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'chorono-accent': '#B55233',
        'chorono-accent-dark': '#8F3D27',
        'chorono-dark': '#120D0B',
        'chorono-light': '#f7f1ed',
      },
    },
  },
  plugins: [],
}
