/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: 'rgb(var(--primary) / <alpha-value>)',
          'primary-light': 'rgb(var(--primary-light) / <alpha-value>)',
          secondary: 'rgb(var(--secondary) / <alpha-value>)',
          background: 'rgb(var(--background) / <alpha-value>)',
          foreground: 'rgb(var(--foreground) / <alpha-value>)',
        },
      },
    },
    plugins: [],
  }
  
  