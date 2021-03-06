module.exports = {
  purge: {
    enabled: false,
    content: ["./public/**/*.html", "./src/**/*.vue", "./src/assets/**.*.css"],
  },
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    screens: {
      xl: { max: "1450px" },
      lg: { max: "1350px" },
      md: { max: "992px" },
      sm: { max: "650px" },
      xs: { max: "550px" },
      xxs: { max: "350px" },
    },
    fontFamily: {
      main: ["Muller"],
    },
    colors: {
      white: "#fff",
      cardBg: "var(--card-bg-color)",
      buttonText: "var(--button-text-color)",
      second: "var(--second-color)",
      black: "#000",
      red: {
        DEFAULT: "var(--main-color)",
      },
      transparent: "transparent",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
