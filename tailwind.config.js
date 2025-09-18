/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stagetek: {
          red: {
            primary: '#e90101',
            medium: '#862128',
            dark: '#63141a',
          },
          white: '#fbfafb',
          black: '#000',
          gray: '#727272',
          'gray-light': '#323132',
          success: '#28a745',
        }
      },
      borderRadius: {
        'brand': '14px',
      },
      boxShadow: {
        'brand': '0 10px 30px rgba(0,0,0,.35)',
      },
      transitionDuration: {
        'brand': '0.2s',
      }
    },
  },
  plugins: [],
}