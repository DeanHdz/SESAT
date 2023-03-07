/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,js,jsx,ts,tsx}" ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"),
            require('@tailwindcss/typography') ],
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
