/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#F08264",
        secondary: "#91C8C3",
        button: "#AA004B",
      },
      fontFamily: {
        primary: ["Roboto"],
        secondary: ["Roboto Slab"],
      },
      fontWeight: {
        primary: 600,
        secondary: 400,
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
