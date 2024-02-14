/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      body: "#F5F5F9",
      "body-2": "#F5F6F8",
      gray: "#697A8D",
      "gray-100": "#8E9BAA",
      "gray-200": "#566A7F",
      "gray-300": "#D9DEE3",
      "gray-400": "#B4BDC6",
      "gray-500": "#ECEEF1",
      blue: "#696CFF",
      "blue-100": "#4F52E6",
      "blue-200": "#F3F3FF",
      "purple-100": "#E7E7FF",
      green: "#71DD37",
      red: "#FF3E1D",
    },
    fontFamily: {
      sans: ["Public Sans", "sans-serif"],
    },
    extend: {
      boxShadow: {
        sidebar: "1px 1px 8px rgba(219, 213, 226, 0.80)",
        mobileSidebar: "2px 0px 5px 0px rgba(0,0,0,0.1)",
        card: "1px 1px 8px 0px #DBD5E2CC",
      },
      backgroundImage: {
        // title: "url('/src/assets/images/title-bg.jpg')",
        // dialogHeader: "url('/src/assets/images/dialog-banner.png')",
      },
    },
  },
  plugins: [],
};
