import img from "./assets/images/bg.jpeg";
const { fontFamily } = require('tailwindcss/defaultTheme');
<<<<<<< HEAD
=======

>>>>>>> calendar

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mona Sans', 'Ysabeau SC', ...fontFamily.sans],
        ysabeau: ['Ysabeau SC', ...fontFamily.sans],
        poppins: ['Poppins', 'sans-serif' ]
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to right bottom, rgba(83, 83, 83, 0.5), rgba(43, 108, 176, 0.4)), url('../assets/images/bg.jpeg')",
        "landing-hero":
          "linear-gradient(to right bottom, rgba(83, 83, 83, 0.5), rgba(43, 108, 176, 0.4)), url('../assets/images/landing-hero.png')",
        "arrow-start":
          "url('../assets/images/arrow-start.png')",
        "arrow-middle":
          "url('../assets/images/arrow-middle.png')",
          "arrow-end":
          "url('../assets/images/arrow-end.png')",
      },
<<<<<<< HEAD
      fontFamily: {
        sans: ['Mona Sans', 'Ysabeau SC', ...fontFamily.sans],
        ysabeau: ['Ysabeau SC', ...fontFamily.sans],
      },
=======
      
>>>>>>> calendar

      keyframes: {
        loading: {
          "0%": { color: '#7fa1ae' },
          "50%": { color: '#00435e' },
          "100%": { color: '#7fa1ae' },
        },
        modalEnter: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        modalExit: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.95)' },
        },
      },

      animation: {
        'modal-enter': 'modalEnter 0.3s ease-out',
        'modal-exit': 'modalExit 0.3s ease-in',
      },
    },
    
    colors: {
      "background": "#fcfcfc",
      "button_light": "#354b60",
      "button_hover": "#1A252F",
      "calendar_count": "#c3dbf3",
      "calendar_count_text": "#215181",
      "l-grey": "#cacaca",
      "dark-blue": "#041E42",
      "tableBorder-dgray": "#8b8b8b",
      "tableHeader-lgray": "#868686",
      'white': "#FFFFFF",
      'black': "#000000",
      'red': "#880808",
      'hover-gray': '#e4e4e7',
      'row_hover': "#ddd",
      'light_blue': "#7fa1ae",
      'blue': '#32687e',
      "form-text": "#4f4f4f",
      "form-label": "#6b6b6b",
      "body-text-color": "#2e353c",
    },
  },
  plugins: [],
};
