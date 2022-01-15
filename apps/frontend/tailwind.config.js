const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const colors = require('tailwindcss/colors');

module.exports = {
  purge:
    process.env.NODE_ENV === 'production'
      ? createGlobPatternsForDependencies(__dirname)
      : null,
  content: ['./apps/frontend/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      heading: [
        'Epilogue',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      content: [
        'Roboto',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ]
    },
    extend: {
      colors: {
        'text': '#0f172a',
        'text-secondary': '#374151',
        primary: '#7e22ce',
        'primary-darker': '#6b21a8',
        secondary: '#be185d',
        'secondary-darker': '#9d174d',
        tertiary: '#475569',
        'tertiary-darker': '#334155',
        background: '#fafaf9',
        error: '#f43f5e',
        'field-background': '#f8fafc'
      },
    },
  },
  plugins: [],
};
