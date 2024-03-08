/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
    colors: {
      'primary': {
        '200':'#E4FCFF',
        '300': '#B7E8EF',
        '500': '#55B9C6',
        '800': '#2B94A1',
        '900':'04616E'
      },
      'gray': {
        "100": '#FFFFFF',
        "150":'#FBFBFB',
        "200": '#EEEEEE ',
        "300": '#D4D4D4',
        "400": '#A9A9A9',
        "500": '#838383',
        "600": '#5B5B5B',
        "700": '#353535',
        "800": '#000000',
      },
      'danger': '#e73d4a',
      'success': '#78B862',
      'white': '#fff',
      'black': '#000',
      'red': '#000'
    },
  },
  plugins: [],
}

