/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "node_modules/preline/dist/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"),
    require("preline/plugin"),
    require("daisyui"),
  ],
});
