import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Velora brand colors - vibrant and modern
        velora: {
          primary: '#6366F1', // Indigo - modern and vibrant
          secondary: '#8B5CF6', // Purple - creative and bold
          accent: '#EC4899', // Pink - playful and energetic
          teal: '#14B8A6', // Teal - fresh and modern
          orange: '#F97316', // Orange - warm and inviting
          yellow: '#FBBF24', // Amber - bright and cheerful
        },
        // Keep pastel for gradients and backgrounds
        pastel: {
          pink: '#FFD6E8',
          purple: '#E8D5FF',
          blue: '#D5E8FF',
          green: '#D5FFE8',
          yellow: '#FFF6D5',
          peach: '#FFE8D5',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
export default config
