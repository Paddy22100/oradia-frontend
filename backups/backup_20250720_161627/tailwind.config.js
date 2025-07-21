/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        oradiaBlue: "#0F172A",
        oradiaIndigo: "#1E3A8A",
        oradiaGold: "#FFD700",
        oradiaViolet: "#8B5CF6",
      },
      fontFamily: {
        oradia: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
