/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: "#121110",
          800: "#1A1917",
          700: "#20201E",
          600: "#2E2D2A",
        },
        ivory: {
          50: "#FFFEFC",
          100: "#FBF9F5",
          200: "#F5F3EF",
          300: "#EFE9DF",
          400: "#E4E2DE",
        },
        sandstone: {
          DEFAULT: "#D8CFC4",
          light: "#EAE5DE",
          dark: "#B8ADA0",
        },
        gold: {
          50: "#FAF5EA",
          100: "#F3E7CA",
          200: "#E9D29A",
          300: "#DDB86C",
          400: "#D0A448",
          DEFAULT: "#C5A059",
          600: "#A9853F",
          700: "#8C6A2E",
          800: "#6F5120",
        },
        bronze: "#9E7D3B",
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.22em',
        caps: '.25em',
        editorial: '.3em',
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(26, 25, 23, 0.06)',
        'warm-md': '0 8px 24px -4px rgba(26, 25, 23, 0.08)',
        'warm-lg': '0 20px 48px -12px rgba(26, 25, 23, 0.12)',
        'warm-xl': '0 32px 64px -16px rgba(26, 25, 23, 0.16)',
      },
      opacity: {
        98: '0.98',
      }
    },
  },
  plugins: [],
}
