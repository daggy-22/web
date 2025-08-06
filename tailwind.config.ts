import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui, require("tailwind-scrollbar-hide")],
  theme: {
    extend: {
      colors: {
        primary: "#F9B654",
        secondary: "#904AF4",
        tertiary: "#F05A7C",
        heroBg: "#FFFCE4",
        danger: "#e3342f",
        dark: "#1a202c",
        gradient1: "#FE7E00",
        gradient2: "70185C",
        gradient3: "#3D0148",
        primaryBtn: "#FF7F00",
        footerBg: "#06141F",
      },
      gradientColorStops: ({ theme }) => ({
        gradient1: "#FE7E00",
        gradient2: "#70185C",
        gradient3: "#3D0148",
      }),
    },
  },
  daisyui: {
    themes: ["light"],
  },
} satisfies Config;
