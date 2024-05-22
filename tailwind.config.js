/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Rubik", "sans-serif"],
      },
      colors: {
        darker : "#163665",
        dark : "#265BA6",
        default: "#3A7AD5",
        light : "#89B0E6",
        lighter : "#CDDDF4",
        background : "#022557",
        primarybg : "#eeeeee"
      }
    },
  },
  plugins: [],
};
