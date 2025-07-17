/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css,html}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'rail-dark': '#1a1a1a',
        'rail-gray': '#2d3748',
        'rail-blue': '#4a9eff',
        'rail-cyan': '#00bcd4',
        'rail-green': '#4caf50',
        'rail-red': '#f44336',
        'rail-yellow': '#ffeb3b',
        'rail-orange': '#ff9800',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0.3' },
        },
      },
      animation: {
        'pulse-slow': 'pulse 2s infinite',
        'blink': 'blink 1s infinite',
      },
    },
  },
  plugins: [],
};
