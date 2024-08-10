/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
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
        background: 'var(--background)',
        'text-primary': 'var(--text-color)',
        'text-secondary': 'var(--text-color)',
        accent: 'var(--accent)',
        border: 'var(--border)',
        'card-background': 'var(--card-background)',
        'sidebar-bg': 'var(--sidebar-bg)',
        'hover-bg': 'var(--hover-bg)',
        'input-bg': 'var(--input-bg)',
        'input-border': 'var(--input-border)',
        'light-background': 'var(--light-background)',
        'light-foreground': 'var(--light-foreground)',
        'light-secondary-background': 'var(--light-secondary-background)',
        'light-border': 'var(--light-border)',
        'light-accent': 'var(--light-accent)',
        'light-accent-hover': 'var(--light-accent-hover)',
        'light-muted': 'var(--light-muted)',
        'dark-background': 'var(--dark-background)',
        'dark-foreground': 'var(--dark-foreground)',
        'dark-secondary-background': 'var(--dark-secondary-background)',
        'dark-border': 'var(--dark-border)',
        'dark-accent': 'var(--dark-accent)',
        'dark-accent-hover': 'var(--dark-accent-hover)',
        'dark-muted': 'var(--dark-muted)',
      },
      gradientColorStops: theme => ({
        'light-accent': '#00bd7e',
        'light-accent-hover': '#00a86f',
        'dark-accent': '#00bd7e',
        'dark-accent-hover': '#00d68f',
      }),
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}