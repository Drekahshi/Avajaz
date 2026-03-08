import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        avax: {
          red: '#E84142',
          gold: '#FFD700',
          green: '#27AE60',
          dark: '#0f0f1a',
          surface: '#1a1a2e',
          border: '#2a2a4a',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
