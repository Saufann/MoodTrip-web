import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet brand MoodTrip — rule 60:30:10
        // 60% putih (bg body & kartu), 30% keluarga teal (primary/cream/footer), 10% accent oranye (CTA)
        primary: "#126C62",
        "primary-dark": "#0C4C45",
        accent: "#E65A3D",
        cream: "#EEF4F2", // tint teal muda — bagian dari 30%
        ink: "#202B28",
        muted: "#626F6A",
        line: "#E5EAE8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(32, 43, 40, 0.06)",
        card: "0 8px 24px rgba(32, 43, 40, 0.1)",
        glow: "0 8px 30px rgba(18, 108, 98, 0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
