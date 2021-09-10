module.exports = {
  mode: 'jit',
  purge: ['index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-pattern': "url('/img/pattern-bg.png')",
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
