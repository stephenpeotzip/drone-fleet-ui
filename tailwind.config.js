/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Custom ChatGPT-style grayscale palette
        chat: {
          bg: "#F7F7F8",
          card: "#EDEDED",
          darkBg: "#343541",
          darkCard: "#444654",
          border: "#D0D0D0",
          text: "#1F1F1F",
          darkText: "#ECECF1"
        }
      }
    }
  },
  plugins: [],
};
