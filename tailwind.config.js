/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./entrypoints/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Important: Add this to ensure Tailwind works in the content script context
  important: '#linkedin-ai-assistant-root',
}