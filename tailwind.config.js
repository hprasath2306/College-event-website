/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#FF3366',
          secondary: '#33FF99',
          accent: '#9933FF',
          background: '#1a1a1a',
        },
        fontFamily: {
          'righteous': ['Righteous', 'cursive'],
          'poppins': ['Poppins', 'sans-serif'],
        },
        animation: {
          'fadeIn': 'fadeIn 1s ease-in',
          'slideDown': 'slideDown 1s ease-out',
          'slideUp': 'slideUp 1s ease-out',
          'glow': 'glow 2s ease-in-out infinite alternate',
          'bounce-slow': 'bounce 2s infinite',
          'scrollDown': 'scrollDown 1.5s ease-in-out infinite',
          'modalSlideIn': 'modalSlideIn 0.3s ease-out',
          'successFadeIn': 'successFadeIn 0.5s ease-out forwards',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-100px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(100px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          glow: {
            '0%': { textShadow: '0 0 10px rgba(255,51,102,0.5)' },
            '100%': { textShadow: '0 0 20px rgba(255,51,102,0.8), 0 0 30px rgba(255,51,102,0.6)' },
          },
          scrollDown: {
            '0%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(6px)' },
            '100%': { transform: 'translateY(0)' },
          },
          modalSlideIn: {
            '0%': { 
              transform: 'translateY(-20px)',
              opacity: '0'
            },
            '100%': { 
              transform: 'translateY(0)',
              opacity: '1'
            },
          },
          successFadeIn: {
            '0%': {
              opacity: '0',
              transform: 'scale(0.9)',
            },
            '100%': {
              opacity: '1',
              transform: 'scale(1)',
            },
          },
        },
      },
    },
    plugins: [],
  }