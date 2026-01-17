/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: '#F2EFE9',
                charcoal: '#262626',
                'charcoal-light': '#333333',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            height: {
                screen: '100dvh',
            },
            animation: {
                'button-glow': 'button-glow 3s ease-in-out infinite',
            },
            keyframes: {
                'button-glow': {
                    '0%, 100%': { boxShadow: '0 4px 6px -1px rgba(38, 38, 38, 0.1), 0 2px 4px -1px rgba(38, 38, 38, 0.06)' },
                    '50%': { boxShadow: '0 0 20px rgba(38, 38, 38, 0.3), 0 4px 6px -1px rgba(38, 38, 38, 0.1)' },
                }
            }
        },
    },
    plugins: [],
}
