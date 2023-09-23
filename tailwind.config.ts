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
        transparent: "transparent",
        current: "currentColor",
        n: {
          "000": "#ffffff",
          "100": "#F9FAFB",
          "200": "#F8FAFC",
          "300": "#F1F5F9",
          "400": "#CBD5E1",
          "500": "#B4BFCD",
          "600": "#94A3B8",
          "700": "#768293",
          "800": "#475569",
          "900": "#0F172A",
          "00016": "var(--n-00016)",
        },
        v: {
          "100": "#F5F3FF",
          "200": "#EDE9FE",
          "300": "#DDD6FE",
          "400": "#C8B5FD",
          "500": "#6D3AF8",
          "600": "#5417CF",
          "700": "#3D0AA3",
          "800": "#230264",
          "900": "#15013C",
        },
      },
    },
  },
  plugins: [],
};
export default config;
