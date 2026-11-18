import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        netRed: "#E50914",
        netDark: "#141414",
        netGray: "#808080",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)',
        'gradient-hero-bottom': 'linear-gradient(to top, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0) 100%)',
      }
    },
  },
  plugins: [],
};
export default config;
