import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#18181b',
          elevated: '#1c1c1f',
        },
        // Sage Assistant brand palette
        sage: {
          50:  '#f0f7f2',
          100: '#d8edde',
          200: '#b4d9be',
          300: '#8cc59e',
          400: '#6daf82',   // light text / badges
          500: '#4d8c68',   // primary accent
          600: '#3d7055',   // button / hover
          700: '#2d5540',   // dark
          800: '#1e3a2b',
          900: '#0f2016',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glow-sage':    '0 0 40px rgba(77, 140, 104, 0.18)',
        'glow-blue':    '0 0 40px rgba(59, 130, 246, 0.15)',
        'glow-red':     '0 0 40px rgba(239, 68, 68, 0.15)',
        'glow-emerald': '0 0 40px rgba(16, 185, 129, 0.12)',
        'glass':        '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
