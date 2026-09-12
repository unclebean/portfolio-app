import commonUIPreset from "@common/ui-lib/tailwind-preset";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  presets: [commonUIPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@common/ui-lib/**/*.{js,mjs,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
