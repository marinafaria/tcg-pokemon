/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        8: "2rem",
        72: "18rem",
        72: "18rem",
        84: "21rem",
        96: "24rem",
        108: "27rem",
        216: "54rem",
      },
    },
  },
  plugins: [],
  important: true,
};
