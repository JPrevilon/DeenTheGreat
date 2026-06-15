import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { acid: "#c4ff00", void: "#020302", panel: "#071007" },
      boxShadow: {
        acid: "0 0 28px rgba(196,255,0,.35)",
        neon: "0 0 22px rgba(196,255,0,.20)",
        "neon-strong": "0 0 32px rgba(196,255,0,.38)",
      },
      fontFamily: { tech: ["Arial Black", "Impact", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
