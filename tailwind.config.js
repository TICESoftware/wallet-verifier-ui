import daisyui from "daisyui"
module.exports = {
    plugins: [
        daisyui,
    ],
    daisyui: {
        themes: [
            {
                wallettheme: {
                    "primary": "#a991f7",
                    "secondary": "#a991f7",
                    "accent": "#a991f7",
                    "neutral": "#a991f7",
                    "base-100": "#F2F7FC",
                },
            },
        ],
    },
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
}