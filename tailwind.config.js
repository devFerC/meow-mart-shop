/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'fredoka': ['"Fredoka"', 'cursive'],
      },
    },
    colors: {...colors,}
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}