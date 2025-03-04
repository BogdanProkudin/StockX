/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        largeScreen: { max: "1300px" },
        mediumLargeScreen: { max: "1140px" },
        mediumScreen: { max: "920px" },
        mediumSmallScreen: { max: "768px" },
        smallScreen: { max: "600px" },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      colors: {
        lightGray: "#CFCFCF",
        FAFAFA: "#FAFAFA",
        E2E8F0: "#E2E8F0",
        categoryButtonColor: "#EDEDED",
        blackGray: "#5F5F5F",
        blackTextColor: "#242424",
        textDisabled: "#a1a5a4",
        customDeel: "hsl(0, 0%, 80%)",
      },
    },
  },
  plugins: [],
};
