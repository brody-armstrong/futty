/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          DEFAULT: '#153226',
          light: '#1E4433',
        },
        chalk: '#F7F9F6',
        floodlight: '#F5A623',
        'floodlight-ink': '#8C4A0F',
        'card-yellow': '#F4C430',
        'card-yellow-ink': '#8A6A00',
        'card-red': '#D62839',
        ink: {
          DEFAULT: '#0E1B16',
          muted: '#4A5750',
        },
        turf: {
          a: '#EFF4EC',
          b: '#E5EDE0',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 