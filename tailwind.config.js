/** @type {import('tailwindcss').Config} */
import tailwindcssMotion from "tailwindcss-motion";
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: '#76fb74',
  			accent: '#a0e2ff',
  			secondary: '#15d2ea'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
    tailwindcssMotion,
      require("tailwindcss-animate")
],
}

