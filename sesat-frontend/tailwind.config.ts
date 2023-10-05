import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',    
  ],
  theme: {
    extend: {
      colors:{
        "light-blue-10": "#f7f8fa",
        "light-blue-15": "#eef2f6",
        "dark-blue-20": "#3D4451",
        "dark-blue-10": "#03396c",           
        "light-gray-22": "#d5d3dd",
        "light-gray-10": "#F2F2F2"
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
              ...require("daisyui/src/theming/themes")["[data-theme=light]"],                     
              primary: "#31325c",
              secondary: "#31325c",
              accent: "#31325c",
            },
          },          
        ],          
  },
}
export default config
