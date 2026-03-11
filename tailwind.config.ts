import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-navy': 'var(--dark-navy)',
        'navy': 'var(--navy)',
        'light-navy': 'var(--light-navy)',
        'lightest-navy': 'var(--lightest-navy)',
        'dark-slate': 'var(--dark-slate)',
        'slate': 'var(--slate)',
        'light-slate': 'var(--light-slate)',
        'lightest-slate': 'var(--lightest-slate)',
        'white': 'var(--white)',
        'green': 'var(--green)',
        'green-tint': 'var(--green-tint)',
        'pink': 'var(--pink)',
        'blue': 'var(--blue)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        'xxs': 'var(--fz-xxs)',
        'xs': 'var(--fz-xs)',
        'sm': 'var(--fz-sm)',
        'md': 'var(--fz-md)',
        'lg': 'var(--fz-lg)',
        'xl': 'var(--fz-xl)',
        'xxl': 'var(--fz-xxl)',
        'heading': 'var(--fz-heading)',
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
      },
      boxShadow: {
        'navy': '0 10px 30px -15px var(--navy-shadow)',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
