const plugin = require ('tailwindcss/plugin')
module.exports = {
  content: [
    "./index.html",
    "./src/views/Auth.vue",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'login-img': "url('./src/assets/bg-HR.png')"
      },
      dropShadow:{
        '4xl': [
          '-2px 1px 1px rgba(0, 0, 0, 0.8)'
      ]
      },
      borderColor:["focus"]
      
    },
  },
  variants:{
    extend:{

    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    })
  ],
}
