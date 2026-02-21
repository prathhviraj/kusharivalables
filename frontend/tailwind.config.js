/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          pink: '#F8C8DC',
          beige: '#F5E6DA',
        },
        gray: {
          800: '#18181b', // deeper zinc-900 equivalent for containers
          900: '#09090b', // darker zinc-950 equivalent for main backgrounds
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
