/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
    colors: {
      'primary': {
        '300': '#6C9BD1',
        '500': '#0081c6',
        '700': '#3D63A2',
        '900': '#003378'
      },
      'gray': {
        "100": '#8C8C8C',
        "200": '#595959 ',
        "300": '#e0e0e0',
        "400": '#ced4da',
        "500": '#adb5bd',
        "600": '#6c757d',
        "700": '#495057',
        "800": '#343a40',
        "900": '#212529'
      },
      'danger': '#e73d4a',
      'success': '#78B862',
      'white': '#fff',
      'black': '#000'
    },
  },
  plugins: [],
}

