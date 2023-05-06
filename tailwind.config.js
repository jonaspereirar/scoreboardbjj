/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderColor: {
        'gray-700': '#1f1e22',
      },
      borderWidth: {
        2: '6px',
      },
      textColor: {
        negative: '#f73d3d',
        positive: '#3f803f',
      },
      colors: {
        black: '#000',
        white: '#fff',
        gray: '#282c34',
        'dark-gray': '#1f1f23',
        'darker-gray': '#141417',
        green: '#3f803f',
        'light-green': '#ade5a9',
        red: '#f73d3d',
        'light-red': '#b87e7c',
        yellow: '#f5db50',
      },

      fontFamily: {
        'bebas-neue': 'BebasNeue',
      },
    },
    screens: {
      xs: '480px',
      sm: '768px',
      md: '1060px',
    },
  },
  plugins: [],
};
