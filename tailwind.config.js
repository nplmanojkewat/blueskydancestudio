/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.js"
  ],
  theme: {
    extend: {
      keyframes: {
    slideInRight: {
        "0%": {
            opacity: "0",
            transform: "translateX(-100px)"
        },
        "100%": {
            opacity: "1",
            transform: "translateX(0)"
        }
    }
},

animation: {
    slideInRight: "slideInRight 2s ease-out forwards"
}
    },
  },
  plugins: [],
}