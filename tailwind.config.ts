import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      white: {
        lighter: "#E5E7EB",
        normal: "#d1d5db",
        bright: "#ffffff",
      },
      black: "#000",
      gray: {
        medium: "#9CA3AF",
        dark: "#111827",
      },
      zinc: {
        dark: "#18181B",
      },
      neutral: {
        medium: "#525252",
        dark: "#262626",
        darkest: "#0A0A0A",
      },
      yellow: {
        light: "#FEF3C7",
        medium: "#FCD34D",
      },
      amber: {
        dark: "#78350F",
      },
      lime: {
        dark: "#1A2E05",
      },
      cyan: {
        medium: "#06B6D4",
      },
      blue: {
        dark: "#1D4ED8",
      },
      teal: {
        medium: "#14B8A6",
      },
      rose: {
        dark: "#881337",
      },
      red: "#DC2626",
      green: "#16A34A",
    },
  },
  plugins: [],
}
export default config
