/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        layra: {
          bg: '#090B12',
          sidebar: '#0D1019',
          surface: '#121725',
          elevated: '#171E2D',
          hover: '#1B2335',
          border: '#252C3C',
          'border-light': '#2F374A',
          primary: '#8B7CFF',
          'primary-hover': '#9F92FF',
          'primary-muted': 'rgba(139, 124, 255, 0.12)',
          secondary: '#55D6E8',
          'secondary-hover': '#71DFEE',
          'secondary-muted': 'rgba(85, 214, 232, 0.12)',
          text: '#F4F5FA',
          muted: '#929AAF',
          faint: '#5D667E',
          success: '#39C99A',
          'success-muted': 'rgba(57, 201, 154, 0.12)',
          warning: '#F3B96B',
          'warning-muted': 'rgba(243, 185, 107, 0.12)',
          danger: '#FF6B6B',
          'danger-muted': 'rgba(255, 107, 107, 0.12)',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(139, 124, 255, 0.15) 0%, transparent 70%)',
        'radial-glow-cyan': 'radial-gradient(circle at 50% 100%, rgba(85, 214, 232, 0.1) 0%, transparent 60%)',
      },
      boxShadow: {
        'glow-primary': '0 0 20px -3px rgba(139, 124, 255, 0.35)',
        'glow-secondary': '0 0 20px -3px rgba(85, 214, 232, 0.35)',
        'elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '0.6' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
