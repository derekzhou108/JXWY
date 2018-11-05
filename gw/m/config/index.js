 // see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../../../../trunk/frontend/views/site/m_index.php'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '//cdn.ksgame.com/jxwygw/m/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8086,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/news':{
        target:'http://sb-jxwy.ksgame.com',
        changeOrigin:true
      },
      '/game-features':{
        target:'http://sb-jxwy.ksgame.com',
        changeOrigin:true
      },
      '/share':{
        target:'http://sb-jxwy.ksgame.com',
        changeOrigin:true
      },
      '/video':{
        target:'http://sb-jxwy.ksgame.com',
        changeOrigin:true
      },
      '/original':{
        target:'http://sb-jxwy.ksgame.com',
        changeOrigin:true
      },
      '/download':{
        target:'http://sb-jxwy.ksgame.com',
        changeOrigin:true
      },
      '/game-database':{
        target:'http://sb-jxwy.ksgame.com',
        changeOrigin:true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
