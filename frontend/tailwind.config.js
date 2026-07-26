/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fuchsia: {
          primary: '#800a43',
        },
        gold: {
          primary: '#d4af37',
          accent: '#d4af37',
        },
        'gold-primary': '#d4af37',  // Alias pour compatibilité
        'gold-accent': '#d4af37',   // Alias pour compatibilité
        whatsapp: {
          green: '#25d366',
        },
        soft: {
          bg: '#faf5f8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
