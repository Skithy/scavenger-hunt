/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.svelte'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#65C3C8',
          secondary: '#02003C',
          'secondary-content': '#C2CADF',
          accent: '#ff504c',
          'accent-content': '#ffffff',
          neutral: '#02003c',
          'base-100': '#f2f4f9',
          info: '#20afff',
          success: '#75C327',
          'success-content': '#ffffff',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}
