/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F6F8FA',
        paper: '#FFFFFF',
        mist: '#EDF1F6',
        ink: '#0B1220',
        hairline: '#E4E9F0',
        navy: {
          DEFAULT: '#22245F',
          deep: '#1B1D52',
          mid: '#2C2F73',
          soft: '#EEF0F8',
          tint: '#E3E6F3',
        },
        brand: {
          DEFAULT: '#2FA24C',
          light: '#4CC46A',
          deep: '#1B7A36',
          tint: '#EAF7EE',
          soft: '#D7EEDF',
        },
        jade: {
          DEFAULT: '#0F766E',
          deep: '#115E59',
          tint: '#E6F4F2',
        },
        steel: {
          DEFAULT: '#475467',
          soft: '#667085',
          mute: '#98A2B3',
          faint: '#C6CDD8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,0.04), 0 8px 24px -14px rgba(16,24,40,0.14)',
        card: '0 1px 3px rgba(16,24,40,0.05), 0 18px 40px -26px rgba(16,24,40,0.20)',
        lift: '0 2px 6px rgba(16,24,40,0.06), 0 30px 60px -30px rgba(16,24,40,0.28)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.9)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(3%, -4%, 0) scale(1.06)' },
          '100%': { transform: 'translate3d(0,0,0) scale(1)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.85)', opacity: '0.6' },
          '70%': { transform: 'scale(1.7)', opacity: '0' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
      },
      animation: {
        floaty: 'floaty 9s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        marquee: 'marquee 42s linear infinite',
        pulseRing: 'pulseRing 2.8s cubic-bezier(0.2,0.6,0.3,1) infinite',
        fadeIn: 'fadeIn 0.6s ease both',
      },
    },
  },
  plugins: [],
};
