/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#141517",
          50: "#1A1B1E",
          0: "#373A40",
        },
        primary: {
          100: "#1C7ED6",
          50: "#4DABF7",
        },
      },
    },
  },
  plugins: [],
};
