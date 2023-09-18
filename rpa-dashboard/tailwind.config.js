module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false,
    theme: {
      extend: {
        colors: {
          "dark-blue":"#1F283E",
          "light-blue": "#3A94EF",
          "analogous-blue": "#254288",
          "pastel-blue": "#233D7C",
          'light-white': 'rgba(255, 255, 255, 0.18)',

          // Status Bar
          "blue-sucess" : "#139BFE",
          "blue-error" : "#0051AA",
          "blue-others" : "#FFFFFF",
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }