module.exports = {
  mode: "jit",
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}"
  ],
  content: ["@/client/components/**/*.{vue,js,ts}", "@/client/layouts/**/*.vue", "@/client/pages/**/*.vue", "@/client/plugins/**/*.{js,ts}", "@/client/nuxt.config.{js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
