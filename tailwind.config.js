/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#F5EBE0',
        beige: '#EFE3D5',
        olive: {
          DEFAULT: '#6B705C',
          dark: '#4e5243',
          light: '#8a9079',
        },
        taupe: {
          DEFAULT: '#A98467',
          dark: '#8a6a50',
          light: '#c4a487',
        },
        gold: {
          DEFAULT: '#D4A373',
          dark: '#bb8a58',
          light: '#e3be99',
        },
      },
    },
  },
  plugins: [],
};
