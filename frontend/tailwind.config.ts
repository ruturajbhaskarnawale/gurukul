import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    light: "#3b82f6", // Trust Blue variants
                    DEFAULT: "#2563eb",
                    dark: "#1d4ed8",
                },
                accent: {
                    light: "#fef08a", // Gold variants
                    DEFAULT: "#facc15",
                    dark: "#eab308",
                }
            },
        },
    },
    plugins: [],
};
export default config;
