/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'linear-indigo': '#181623',
        'linear-gray': '#191725',
        'linear-black': '#0d0b14',
        'midnight-gray': '#24222F',
        'steel-gray': '#6C757D',
        'error-red': '#DC3545',
        'light-gray': '#D9D9D9',
        'light-silver': '#CED4DA',
        'dark-gray': '#212529',
        'rose-red': '#E31221',
        'light-gold': '#DDCCAA',
        'light-slate': '#9C9A9A',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwind-scrollbar-hide')],
}
