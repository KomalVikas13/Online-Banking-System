/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding a custom color
        darkBulish: '#328bff',
        mediumBluish: '#2486ff',
        normalBlusih: '#85b7ff',
        lightBlusih: '#e9f2ff'
      }
    },
  },
  plugins: [],
}