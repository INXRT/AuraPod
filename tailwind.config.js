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
          950: '#07090E', // Deep velvet studio black
          900: '#0C0F17', // Chassis matte slate
          850: '#111622', // Machined titanium surface
          800: '#181F30', // Elevated control panel
          700: '#232D42', // Structural divider
        },
        cyan: {
          neon: '#38BDF8', // Calibrated Surgical Sky Blue (replaces glaring #00F2FE)
          glow: '#0EA5E9',
          dim: 'rgba(56, 189, 248, 0.12)',
        },
        emerald: {
          signal: '#22C55E', // Phosphor RF Green (authentic instrument LED)
          glow: '#16A34A',
          dim: 'rgba(34, 197, 94, 0.12)',
        },
        crimson: {
          hazard: '#EF4444',
          glow: '#DC2626',
          dim: 'rgba(239, 68, 68, 0.12)',
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
        'cyan-glow': '0 0 20px -3px rgba(56, 189, 248, 0.25)',
        'emerald-glow': '0 0 20px -3px rgba(34, 197, 94, 0.25)',
        'crimson-glow': '0 0 20px -3px rgba(239, 68, 68, 0.25)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'card-elevation': '0 4px 20px -2px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'card-highlight': '0 12px 32px -4px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.16)',
      },
    },
  },
  plugins: [],
}
