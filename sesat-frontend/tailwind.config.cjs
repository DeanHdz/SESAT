/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,js,jsx,ts,tsx}" ],
  theme: {
    extend: {
      colors:{
        "light-blue-10": "#E3EEF6",
        "dark-blue-20": "#3D4451",
        "dark-blue-10": "#03396c",    
        "light-gray-22": "#d5d3dd"     
      },
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
