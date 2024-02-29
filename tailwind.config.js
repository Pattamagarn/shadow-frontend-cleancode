/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Kanit: ["Kanit", "sans-serif"],
      },
    },
    colors: {
      'shadow-primary' : '#33007B',
      'shadow-secondary' : '#292524',
      'shadow-accent' : '#FFB302',
      'shadow-haccent' : '#E5A101',
      'shadow-success' : '#A5DC86',
      'shadow-hsuccess' : '#86B36D',
      'shadow-error' : '#F27474',
      'shadow-herror' : '#CA6161',
      'shadow-warning' : '#F8BB86',
      'shadow-hwarning' : '#CF9C6F',
      'shadow-info' : '#3FC3EE',
      'shadow-hinfo' : '#46A5C4',
      'shadow-pink' : '#F000B8',
      'shadow-grey' : '#D9D9D9',
      'shadow-white' : '#FFFFFF',
      'shadow-black' : '#000000',
      
      
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["",
    {
      mytheme: { 
        "primary": "#33007b",
        "secondary": "#292524",
        "accent": "#FFB302",
        "neutral": "#d0d2d6",
        "base-100": "#ffffff",
        "info": "#3fc3ee",
        "success": "#a5dc86",
        "warning": "#f8bb86",
        "error": "#f27474",
      },
    },
    
  ],
  },
}

