/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#fdfbf7",
        surface: "#ffffff",
        surface2: "#f3f1ea",
        line: "#ece8df",
        ink: "#1a1a1a",
        ink2: "#555555",
        ink3: "#999999",
        brand: {
          DEFAULT: "#1a6b3a",   // FIA green
          dark: "#135229",
          soft: "#e4f0e9",
        },
        red: {
          DEFAULT: "#e8503a",
          dark: "#d13b25",
          soft: "#fdecea",
        },
        gold: { DEFAULT: "#c8942a", soft: "#fdf4e3" },
        teal: "#16a8a0",
        royal: "#3b6fd4",
        violet: "#8b5cf6",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        ui: ["Outfit", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 16px rgba(0,0,0,.06)",
        lift: "0 12px 48px rgba(0,0,0,.12)",
      },
      keyframes: {
        fadeUp: { "0%": { opacity: 0, transform: "translateY(20px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        megaIn: { "0%": { opacity: 0, transform: "translateY(-8px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-7px)" } },
        shimmer: { "0%": { backgroundPosition: "-200% center" }, "100%": { backgroundPosition: "200% center" } },
      },
      animation: {
        fadeUp: "fadeUp .5s ease both",
        megaIn: "megaIn .22s ease",
        marquee: "marquee 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
