/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {}
  },
  plugins: [],
  safelist: [
    'bg-primary',
    'bg-secondary',
    'bg-success',
    'bg-error',
    'bg-warning',
    'bg-info',
    'bg-light',
    'bg-dark',
    'text-primary',
    'text-secondary',
    'text-success',
    'text-error',
    'text-warning',
    'text-info',
    'text-light',
    'text-dark',
    'bg-primary-light',
    'bg-secondary-light',
    'bg-success-light',
    'bg-error-light',
    'bg-warning-light',
    'bg-info-light',
    'md:space-x-1',
    'md:inline'
  ]
};
