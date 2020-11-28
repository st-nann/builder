
process.env.VUE_APP_VERSION = require('./package.json').version

const path = require('path')

module.exports = {
    pages: {
        index: {
          entry: 'src/main.ts',
          template: 'public/index.html',
          filename: 'index.html',
          title: process.env.VUE_APP_TITLE
        }
    },
    devServer: {
      disableHostCheck: true
    },
    runtimeCompiler: true,
    css: {
      modules: true
    },
    configureWebpack: {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, './src')
        },
        extensions: ['.ts', '.vue', '.json', 'scss']
      }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-template-builder/'
        : '/'
}
