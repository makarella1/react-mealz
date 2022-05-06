module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bump: {
          "0%": { transform: "scale(1)" },
          "10%": { transform: "scale(0.9)" },
          "30%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
        mealsAppear: {
          from: { opacity: "0", transform: "translateY(3rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        modalAppear: {
          from: { opacity: "0", transform: "translateY(-3rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        bump: "bump 0.3s ease-out",
        mealsAppear: "mealsAppear 1s forwards",
        modalAppear: "modalAppear 0.7s forwards",
      },
    },
  },
  plugins: [],
};
