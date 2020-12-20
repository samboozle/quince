const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      'depressed': 'inset 0px 0px 3px 3px rgba(0, 0, 0, 0.12)'
    },
    colors: {
      red: colors.red,
      rose: colors.rose,
      gray: colors.coolGray,
      green: colors.lime,
      white: colors.white,
      yellow: colors.yellow,
    },
    fontFamily: {
      mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    },
    extend: {},
  },
  variants: {
    extend: {
      boxShadow: ['active'],
    },
  },
  plugins: [],
}
