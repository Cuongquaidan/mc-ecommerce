/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                pingAnimation: {
                    "0%": { transform: "scale(1)" },

                    "100%": { transform: "scale(1.5)", opacity: 0 },
                },
            },
            animation: {
                pingCustom: "pingAnimation 2s infinite",
            },
        },
    },
    plugins: [],
};
