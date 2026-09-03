/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#04060A',
          900: '#080C14',
          850: '#0D1320',
          800: '#141D2F',
          700: '#1E2B45',
        },
        cyan: {
          neon: '#00F2FE',
          glow: '#4FACFE',
          dim: 'rgba(0, 242, 254, 0.15)',
        },
        emerald: {
          signal: '#10B981',
          glow: '#34D399',
          dim: 'rgba(16, 185, 129, 0.15)',
        },
        crimson: {
          hazard: '#EF4444',
          glow: '#F87171',
          dim: 'rgba(239, 68, 68, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'monospace'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'beam-travel': 'beamTravel 3s ease-in-out infinite',
        'wave-ping': 'wavePing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        beamTravel: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        wavePing: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 35px -5px rgba(0, 242, 254, 0.35)',
        'emerald-glow': '0 0 35px -5px rgba(16, 185, 129, 0.35)',
        'crimson-glow': '0 0 35px -5px rgba(239, 68, 68, 0.35)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}
