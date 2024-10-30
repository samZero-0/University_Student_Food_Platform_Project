/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#76fb74',
        'accent' : '#a0e2ff'
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
  ],
}

