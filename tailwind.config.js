import daisyui from "daisyui"

module.exports = {
    plugins: [
        daisyui,
    ],
    daisyui: {
        themes: [
            {
                wallettheme: {
                    "primary": "#005CC8",        // Buttons
                    "primary-content": "#FFFFFF", // Text on Dark
                    "secondary": "#00479A",      // Transparent Buttons
                    "accent": "#0D2C54",         // Headers
                    "neutral": "#D7D7D7",        // Outlines
                    "base-100": "#F2F7FC",       // Light blue Background
                    "base-content": "#000000",   // Text
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