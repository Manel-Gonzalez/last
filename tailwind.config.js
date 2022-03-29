module.exports = {
  content: [
    "./index.html",
    "./src/views/Auth.vue",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'login-img': "url('./src/assets/bg-HR.jpg')"
    
      },
      dropShadow:{
        '4xl': [
          '1px 2px 2px rgba(0, 0, 0, 1)'
      ]
      },
      borderColor:["focus"]
      
    },
  },
  variants:{
    extend:{

    }
  },
  plugins: [],
}
