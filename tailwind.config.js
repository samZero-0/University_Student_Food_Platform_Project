/** @type {import('tailwindcss').Config} */
import tailwindcssMotion from "tailwindcss-motion";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#76fb74',
        'accent' : '#a0e2ff',
        'secondary' : '#15d2ea'
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
    tailwindcssMotion
  ],
}

