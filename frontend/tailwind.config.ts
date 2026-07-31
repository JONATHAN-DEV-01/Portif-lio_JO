import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#0D1117',
        surface: '#161B22',
        'surface-hover': '#1C2128',
        border: '#30363D',
        'text-primary': '#E6EDF3',
        'text-secondary': '#8B949E',
        'accent-blue': '#58A6FF',
        'accent-blue-strong': '#1F6FEB',
        'accent-green': '#3FB950',
        'accent-orange': '#D29922',
        'accent-purple': '#A371F7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(88, 166, 255, 0.15)',
        'glow-green': '0 0 20px rgba(63, 185, 80, 0.15)',
        'card': '0 1px 3px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(88,166,255,0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
