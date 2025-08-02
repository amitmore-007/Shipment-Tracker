/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your React components
  ],
  theme: {
    extend: {
      colors: {
        // CSS variables that will change based on theme
        'bg-main': 'var(--background-main)',
        'text-main': 'var(--text-main)',
        'card-bg': 'var(--card-bg)',
        'glass-bg': 'var(--glass-bg)',
        'border-main': 'var(--border-main)',
        'border-accent': 'var(--border-accent)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
