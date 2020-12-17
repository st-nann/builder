
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
    pages: {
        index: {
          entry: 'src/main.ts',
          template: 'public/index.html',
          filename: 'index.html',
          title: process.env.VUE_APP_TITLE
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-template-builder/'
        : '/'
}
