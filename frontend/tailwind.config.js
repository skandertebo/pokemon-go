import withMT from '@material-tailwind/react/utils/withMT';

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: ' #00295F',
        secondary: '#F0F3D1',
        third: '#F09393',
        fourth: '#8A8D91'
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    }
  },
  plugins: [],
});

// module.exports = {
//   theme:{
//     colors:{
//       'coral': '#F09393',
//       'yellow': '#F0F3D1',
//       'grey': '#8A8D91',
//       'blue':"#00295F"
//     }
//   }
// }