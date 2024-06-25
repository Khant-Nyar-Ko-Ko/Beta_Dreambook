/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
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
        darkMode1 : "#1F1F1F",
        darkMode2 : "#3D3D3D",
        darkMode3 : "#666666"
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
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spin: "spin 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
