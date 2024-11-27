/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
colors:{
        primary:'#1B1B1B',
        secondary:{
          DEFAULT:"#37B6E9",
          100:"#3C9EEA",
          200:"#4B4CED"
        }

}      
    },
  },
  plugins: [],
}





 