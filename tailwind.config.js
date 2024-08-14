/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      cursor:{
        'cursor-pointer': 'url(./src/assets/cursor.svg), pointer',
      }
    },
    fontFamily: {
      jbm: ["JetBrains Mono", "sans-serif"],
    },
  },
  plugins: [],
};
