/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#6C63FF',
        customBlue: '#3F3D56',
      },
    },
  },
  plugins: [],
}
