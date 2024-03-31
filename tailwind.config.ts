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
      padding: "6rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        grey: {
          light: "#F4F7FD",
          medium: "#828FA3",
          dark: "#2B2C37",
          darker: "#20212C",
        },
        purple: {
          medium: "#635FC7",
          light: "#A8A4FF",
        },
        danger: {
          medium: "#EA5555",
          light: "#FF9898",
        },
        lines: {
          dark: "#3E3F4E",
          light: "#E4EBFA",
        },
        input_border: "rgba(130,143,163,.4)",
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
