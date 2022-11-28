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
          primary: '#ff504c',
          secondary: '#F000B8',
          accent: '#ff504c',
          'accent-content': '#ffffff',
          neutral: '#02003c',
          'base-100': '#f2f4f9',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
