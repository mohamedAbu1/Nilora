import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        nilora: {
          ink: '#092438',
          gold: '#edb84b',
          teal: '#12608a',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
