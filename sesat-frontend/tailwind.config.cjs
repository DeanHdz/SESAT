/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,js,jsx,ts,tsx}" ],
  theme: {
    extend: {
      fontFamily: {
        SESAT: ["SESAT", "semibold"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),
            require('@tailwindcss/forms'),
            require("daisyui") ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#31325c",
          secondary: "#31325c",
          accent: "#31325c"
        },
      },
    ],
  },
}
