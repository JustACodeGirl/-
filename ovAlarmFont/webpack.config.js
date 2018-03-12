const webpack = require('atool-build/lib/webpack')
const path = require('path')

module.exports = function (webpackConfig, env) {
  webpackConfig.babel.plugins.push('transform-runtime')
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: true,
  }])

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval'
    webpackConfig.babel.plugins.push(['dva-hmr', {
      entries: [
        './src/index.js',
      ],
    }])
  } else {
    webpackConfig.babel.plugins.push('dev-expression')
    webpackConfig.entry = { index: './src/_index.js' }
  }

  //Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin)
  })

  // webpackConfig.plugins.push(new webpack.ProvidePlugin({
  //   videojs: 'video.js',
  //   'window.videojs': 'video.js',
  // }))
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'typeof global': JSON.stringify('undefined'),
  }))
  // webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  //   compress: false, // leave false for now. This breaks the videojs-contrib-hls package
  //   mangle: true,
  //   sourceMap: true,
  // }))

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach((loader) => {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/
      loader.test = /\.less$/
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/
      loader.test = /\.less$/
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/
      loader.test = /\.css$/
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/
      loader.test = /\.css$/
    }
  })

  webpackConfig.resolve = {
    // fallback: path.join(__dirname, 'node_modules'),
    // extensions: ['.js', '.json', '.jsx', ''],
    alias: {
      webworkify: 'webworkify-webpack-dropin',
      // 'videojs-contrib-hls': path.join(
      //   __dirname,
      //   'node_modules',
      //   'videojs-contrib-hls',
      //   'es5',
      //   // You can use the unminified version and let the minifier minify!
      //   'videojs-contrib-hls.js'
      // ),
    },
  }
  webpackConfig.devtool = 'cheap-source-map'
  console.log(webpackConfig.plugins)
  return webpackConfig
}
