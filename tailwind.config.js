/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#F4F1E8',
        charcoal: '#101111',
        accent: '#D7FF54',
        'accent-dark': '#6E8120',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgb(26 27 26 / 0.12)',
        lift: '0 12px 40px -8px rgb(26 27 26 / 0.18)',
        glow: '0 0 60px -12px rgb(196 169 98 / 0.35)',
        'glow-dark': '0 0 60px -12px rgb(232 223 201 / 0.15)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
};
