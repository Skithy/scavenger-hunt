/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{svelte,ts}'],
  theme: {},
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#ff504c',
          'primary-content': '#ffffff',
          secondary: '#02003C',
          'secondary-content': '#C2CADF',
          accent: '#20AFFF',
          neutral: '#02003c',
          'base-100': '#222222',
          'base-200': '#222222',
          'base-300': '#2C2C2B',
          'base-content': '#F2F3F5',
          info: '#C2CADF',
          success: '#75C327',
          'success-content': '#ffffff',
          warning: '#FBBD23',
          error: '#F87272',
          disabled: '',
        },
      },
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}
