/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'rain': 'rain 1s linear infinite',
        'snow': 'snow 2s linear infinite',
        'flash': 'flash 0.5s ease-in-out infinite',
        'drizzle': 'drizzle 1.5s linear infinite',
        'fade': 'fade 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rain: {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        snow: {
          '0%': { transform: 'translateY(-100vh) translateX(0px)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) translateX(100px)', opacity: '0' },
        },
        flash: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '0.8' },
        },
        drizzle: {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        fade: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
};