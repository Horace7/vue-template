const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: [
    ]
  },
  // 生产环境
  build: {}
}
module.exports = {
  // runtimeCompiler: true,
  publicPath: './',
  devServer: {
    hot: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    liveReload: true
  },

  // webpack相关配置
  chainWebpack: (config) => {
    config.entry.app = ['./src/main.js']
    config.resolve.alias
      .set('@', resolve('src'))
      .set('cps', resolve('src/components'))
    // 关闭npm run build之后，This can impact web performance 警告
    config.performance
      .set('hints', false)
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    config.optimization.minimize(true)
    config.optimization.splitChunks({
      chunks: 'all'
    })
    // 对图片进行压缩处理
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        disable: true, // webpack@2.x and newer
        quality: '65-80',
        speed: 4
      })
      .end()

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .plugin('html')
      .tap(args => {
        if (process.env.NODE_ENV === 'production') {
          args[0].cdn = cdn.build
        }
        if (process.env.NODE_ENV === 'development') {
          args[0].cdn = cdn.dev
        }
        return args
      })
  },
  configureWebpack: config => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production') {
      // 忽略生产环境打包的文件
      config.externals = {
        'vuex': 'Vuex',
        'axios': 'axios',
        'element-ui': 'ELEMENT',
        'nprogress': 'NProgress',
        'js-cookie': 'Cookies'
      }
      // 去除console来减少文件大小，效果同'UglifyJsPlugin'
      /* eslint-disable no-new */
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          }
        }
      })
      // 开启gzip压缩
      config.plugins.push(new CompressionPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'), // 匹配文件扩展名
        // threshold: 10240, // 对超过10k的数据进行压缩
        threshold: 5120, // 对超过5k的数据进行压缩
        minRatio: 0.8,
        cache: true, // 是否需要缓存
        deleteOriginalAssets: false // true删除源文件(不建议);false不删除源文件
      }))
    } else {
    }
  }
}
