/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Optional: if you're using Inter font
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        glass: 'rgba(255, 255, 255, 0.05)',        // Glassy bg
        borderGlass: 'rgba(255, 255, 255, 0.2)',   // Border around glass
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',     // Subtle shadow
        glow: '0 0 10px rgba(0, 200, 255, 0.3)',    // Glow effect
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // For custom scrollbars
  ],
};
