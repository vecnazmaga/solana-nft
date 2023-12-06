/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,vue,ts}', '!./**/node_modules/**'],
  theme: {
    extend: {
      colors: {
        'text-color': 'var(--text-color)',
        'text-color-inverse': 'var(--text-color-inverse)',
        'border-color': 'var(--border-color)',
        'background-color': 'var(--background-color)',
        'background-color-inverse': 'var(--background-color-inverse)',
        'link-hover': 'var(--link-hover)',
        'k-accent': 'var(--k-accent)',
        'k-accent2': 'var(--k-accent2)',
        'k-accent-light': 'var(--k-accent-light)',
        'k-accent-hover': 'var(--k-accent-hover)',
        'k-accent-light-2': 'var(--k-accent-light-2)',
        'k-accent-light-2-dark': 'var(--k-accent-light-2-dark)',
        'k-accent-light-2-dark-head': 'var(--k-accent-light-2-dark-head)',
        'k-accent-light-2-dark-paragraph':
          'var(--k-accent-light-2-dark-paragraph)',
        'k-accent-light-3': 'var(--k-accent-light-3)',
        'k-green': 'var(--k-green)',
        'k-red': 'var(--k-red)',
        'k-orange': 'var(--k-orange)',
        'k-red-accent': 'var(--k-red-accent)',
        'k-red-accent-2': 'var(--k-red-accent-2)',
        'k-grey': 'var(--k-grey)',
        'k-grey-fix': 'var(--k-grey-fix)',
        'k-pink': 'var(--k-pink)',
        'k-yellow': 'var(--k-yellow)',
        'k-blue-accent': 'var(--k-blue-accent)',
        'k-aqua-blue': 'var(--k-aqua-blue)',
        'k-green-accent': 'var(--k-green-accent)',
        'k-green-accent-2': 'var(--k-green-accent-2)',
        'k-hover-grey': 'var(--k-hover-grey)',
        'k-blue': 'var(--k-blue)',
        'k-blue-hover': 'var(--k-blue-hover)',
        'k-blue-light': 'var(--k-blue-light)',
        'k-primary': 'var(--k-primary)',
        'k-primary-light': 'var(--k-primary-light)',
        'k-shade': 'var(--k-shade)',
        'placeholder-color': 'var(--placeholder-color)',
        disabled: 'var(--disabled)',
        'card-border-color': 'var(--card-border-color)',
        'card-border-color-light': 'var(--card-border-color-light)',
        'green-border-color': 'var(--green-border-color)',
        'blue-accent-bg-color': 'var(--blue-accent-bg-color)',
        'blue-light-hover-color': 'var(--blue-light-hover-color)',
        'separator-line-color': 'var(--separator-line-color)',
        'toggle-primary': 'var(--toggle-primary)',
        'toggle-active-switch': 'var(--toggle-active-switch)',
      },
      boxShadow: {
        primary: 'var(--primary-shadow)',
      },
      fontFamily: {
        inherit: 'inherit',
      },
      opacity: {
        unset: 'unset',
        'card-hover-opacity': 'var(--card-hover-opacity)',
      },
      // TODO: remove it after removing .border class from global.scss
      borderWidth: {
        default: '1px',
      },
      lineHeight: {
        4.5: '1.125rem',
      },
      animation: {
        'icon-spin':
          'icon-spin infinite linear var(--oruga-icon-spin-duration, 1.5s)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
