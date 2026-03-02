/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-space)", "system-ui", "-apple-system", "sans-serif"],
                display: ["var(--font-syne)", "sans-serif"],
                mono: ["var(--font-mono)", "Fira Code", "monospace"]
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)"
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)"
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)"
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)"
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)"
                },
                border: "var(--border)",
                destructive: "var(--destructive)",
                success: "var(--success)",
                warning: "var(--warning)"
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            keyframes: {
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" }
                },
                "pulse-slow": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.6" }
                },
                "gradient-shift": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" }
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" }
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" }
                },
                "xp-float": {
                    "0%": { transform: "translateY(0) scale(0.8)", opacity: "0" },
                    "20%": { transform: "translateY(-10px) scale(1)", opacity: "1" },
                    "80%": { transform: "translateY(-40px) scale(1)", opacity: "1" },
                    "100%": { transform: "translateY(-60px) scale(0.9)", opacity: "0" }
                },
                "slide-up": {
                    from: { transform: "translateY(8px)", opacity: "0" },
                    to: { transform: "translateY(0)", opacity: "1" }
                },
                "shimmer": {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" }
                }
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "pulse-slow": "pulse-slow 4s ease-in-out infinite",
                "gradient": "gradient-shift 8s ease infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "xp-float": "xp-float 1.5s ease-out forwards",
                "slide-up": "slide-up 0.3s ease-out",
                "shimmer": "shimmer 2s linear infinite"
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
}
