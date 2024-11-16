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
        lightGray: "#CFCFCF", // Здесь добавляем кастомный цвет
        categoryButtonColor: "#EDEDED",
        blackGray: "#5F5F5F",
        blackTextColor: "#242424",
        textDisabled: "#a1a5a4",
      },
    },
  },
  plugins: [],
};
