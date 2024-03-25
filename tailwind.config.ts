import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        inputBorder: "rgba(130,143,163,.4)",
        mainPurple: "#635FC7",
        secondaryPurple: "#A8A4FF",
        veryDarkGrey: "#20212C",
        darkGrey: "#2B2C37",
        mediumGrey: "#828FA3",
        lightGrey: "#F4F7FD",
        linesDark: "#3E3F4E",
        linesLight: "#E4EBFA",
        danger: "#EA5555",
        dangerHover: "#FF9898",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "sidebar-open": {
          from: { left: "-19rem" },
          to: { left: "0" },
        },
        "sidebar-closed": {
          from: { left: "0" },
          to: { left: "-19rem" },
        },
        "sidebar-open-page": {
          from: { marginLeft: "0" },
          to: { marginLeft: "19rem" },
        },
        "sidebar-closed-page": {
          from: { marginLeft: "19rem" },
          to: { marginLeft: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "sidebar-open": "sidebar-open 0.3s ease",
        "sidebar-closed": "sidebar-closed 0.3s ease",
        "sidebar-open-page": "sidebar-open-page 0.3s ease",
        "sidebar-closed-page": "sidebar-closed-page 0.3s ease",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
