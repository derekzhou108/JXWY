var path = require('path')
var utils = require('./utils')

var projectRoot = path.resolve(__dirname, '../')
// var SpritesmithPlugin = require('webpack-spritesmith');
const vuxLoader = require('vux-loader')

var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// var spritePlugin = new SpritesmithPlugin({
//   // 目标小图标
//   src: {
//     cwd: path.resolve(__dirname, '../src/assets/img/sprite'),
//     glob: '*.png'
//   },
//   // 输出雪碧图文件及样式文件
//   target: {
//     image: utils.assetsPath('sprites/sprite.png'),
//     css: utils.assetsPath('sprites/sprite.css')
//   },
//   // 样式文件中调用雪碧图地址写法
//   apiOptions: {
//     cssImageRef: '../src/assets/css/template.css'
//   },
//   spritesmithOptions: {
//     algorithm: 'top-down'
//   }
// })

let webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp3)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}


module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
})
