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
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.5s ease-in'
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' }
        }
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
