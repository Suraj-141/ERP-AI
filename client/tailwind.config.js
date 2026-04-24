/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Roboto"', '"Oxygen"', '"Ubuntu"', '"Cantarell"', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
