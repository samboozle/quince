const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // boxShadow: {
    //   'Electro': 'inset 0px 0px 2px 0px #D9F99D'
    // },
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
      backgroundColor: ['active'],
      boxShadow: ['active'],
    },
  },
  plugins: [],
}
