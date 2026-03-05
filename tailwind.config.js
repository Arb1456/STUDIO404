/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: '#F2EFE9',
                charcoal: '#262626',
                'charcoal-light': '#333333',
            },
            fontFamily: {
                sans: ['var(--font-outfit)', 'Inter', 'sans-serif'],
                serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
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
