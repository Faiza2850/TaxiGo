/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
        black: "#000000",
        white: "#ffffff",
        jetBlack: "#0e0e0e",
        redfive: "#e1484a",
        gray: "#c1cad4",
        side_blue: "#2D60FF",
        custom_white: "#DFEAF2",
        borderGray: '#E6EFF5',
        lightGray: "#FAFBFD",
        hex : "#FE9901",
        yel: '#FEB601',
        sky: '#EAECF0',
        
      },
    extend: {
      screens: {
        'xs': '480px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}