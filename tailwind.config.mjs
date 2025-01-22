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
        primary: "#292646",

        "text-color": "#F8F8F2",
        "primary-accent": "#F377A7",
        "hover-color": "#1a1a1a",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
