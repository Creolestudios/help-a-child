/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          100: "#FDF2E5",
          200: "#FCE5CB",
          300: "#FAD7B0",
          400: "#F8C987",
          500: "#F6BB5D",
          600: "#F4AD33",
          700: "#F29F09",
          800: "#C47D07",
          900: "#FF971D",
        },
      },
    },
    fontFamily: {
      avenir: ["Avenir", "Fjalla One"],
      handwritten: ["help__a__child___handwrittenRg"],
    },
  },
  plugins: [],
  important: true,
};
