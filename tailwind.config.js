/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
      },
      colors: {
        xenon: {
          500: '#1E59FF',
          600: '#003DFF',
          700: '#022EB9',
          900: '#000033',
        },
      },
    },
  },
  plugins: [],
};
