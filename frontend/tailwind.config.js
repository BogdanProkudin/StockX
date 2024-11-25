/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      colors: {
        lightGray: "#CFCFCF",
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
