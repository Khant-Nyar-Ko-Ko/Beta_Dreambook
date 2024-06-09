/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Rubik", "sans-serif"],
      },
      colors: {
        darker: "#163665",
        dark: "#265BA6",
        default: "#3A7AD5",
        light: "#89B0E6",
        lighter: "#CDDDF4",
        background: "#022557",
        primarybg: "#eeeeee",
        contentsecondary: "#3A7AD5",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
