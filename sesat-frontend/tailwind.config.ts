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
        "light-blue-10": "#eff5fb",
        "light-blue-15": "#e2f0fc",
        "dark-blue-20": "#3D4451",
        "dark-blue-10": "#03396c",           
        "light-gray-22": "#d5d3dd",
        "light-gray-10": "#eef2f6"
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
              primary: "#004a8c",
              secondary: "#3c648d",
              accent: "#04274d",
              'base-content': '#28274e', 
            },
            
          },          
        ],          
  },
}
export default config

/**dark: {
              ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
              primary: "#31325c",
              secondary: "#31325c",
              accent: "#31325c",
            }, */
