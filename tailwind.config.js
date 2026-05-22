/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Original palette (used by other pages)
        champagne: '#C9A96E',
        gold: '#FBBF24',
        violet: '#7C3AED',
        midnight: '#0A0A0F',
        surface: '#1A1A2E',
        // New refined palette
        dark1: '#1A1A1A',
        dark2: '#111827',
        dark3: '#0F172A',
        'gold-accent': '#F4B942',
        'burnt-orange': '#FF8A3D',
        'purple-accent': '#8B5CF6',
      },
      fontFamily: {
        alexBrush: ['Alex Brush', 'cursive'],
        cinzel: ['Cinzel', 'serif'],
        dancing: ['Dancing Script', 'cursive'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
