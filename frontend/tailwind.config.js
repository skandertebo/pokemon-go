const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00295F",
        secondary: "#F09393",
        third: "#F0F3D1",
        fourth: "#8A8D91",
      },
    },
  },
  plugins: [],
});
