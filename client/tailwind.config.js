/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  
  theme: {
    extend: {
      height: {
        'body-page': 'calc(100vh - 80px)',
      },
    },
  },
  plugins: [],
}

