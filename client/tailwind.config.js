/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': '#0a0e1a',
                'bg-secondary': '#0f1525',
                'bg-tertiary': '#151c30',
                'border-primary': '#1e2d4d',
                'text-primary': '#e2e8f0',
                'text-secondary': '#94a3b8',
                'text-muted': '#475569',
                'accent-orange': '#f97316',
                'price-green': '#22c55e',
                'price-red': '#ef4444',
                'price-blue': '#3b82f6',
                'price-yellow': '#eab308',
            },
            fontFamily: {
                'mono': ['JetBrains Mono', 'monospace'],
                'sans': ['Inter', 'sans-serif'],
            },
            fontSize: {
                'xs': '11px',
                'sm': '12px',
                'base': '13px',
                'lg': '14px',
                'xl': '15px',
                '2xl': '16px',
            },
            spacing: {
                'sidebar-width': '48px',
                'topbar-height': '44px',
                'statusbar-height': '32px',
            }
        },
    },
    plugins: [],
}
