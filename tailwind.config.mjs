const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        "bg-color": "#292635",
        primary: "#171717",
        primary2: "#292646",
        "text-color": "#F8F8F2",
        "gray-text": "#a4a4a4",
        "primary-accent": "#F377A7",
        "hover-color": "#1a1a1a",

        blue50: "#eff4fe",
        blue100: "#e3eafc",
        blue200: "#ccd9f9",
        blue300: "#acbff5",
        blue400: "#8b9dee",
        blue500: "#7884e7",
        blue600: "#5357d8",
        blue700: "#4446be",
        blue800: "#393b9a",
        blue900: "#35397a",
        blue1000: "#1f2047",
        purple50: "#f7f4fe",
        purple100: "#f0ebfc",
        purple200: "#e3dafa",
        purple300: "#cebdf5",
        purple400: "#b597ee",
        purple500: "#a87de8",
        purple600: "#8e4ed9",
        purple700: "#7e3bc6",
        purple800: "#6a31a6",
        purple900: "#582a88",
        purple1000: "#37195c",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
