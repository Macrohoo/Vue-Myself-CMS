'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: './',   //部署应用包时的基本 URL
  outputDir: 'dist',  //生成的生产环境构建文件的目录
  assetsDir: 'static',  //放置生成的静态资源 (js、css、img、fonts)的(相对于 outputDir 的)目录
  lintOnSave: process.env.NODE_ENV === 'development',  //当 lintOnSave 是一个 truthy 的值时，eslint-loader 在开发和生产构建下都会被启用
  productionSourceMap: false,  //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,  //设置让浏览器 overlay 同时显示警告和错误
      errors: true
    },
    //before: require('./mock/mock-server.js'),   //mock数据实现模拟配置
    proxy: {
      "/api": {
        //target: "http://localhost:7001",
        target: "http://mboke.top:7001/",
        changeOrigin: true, // 允许跨域
        ws: true,
        pathRewrite: {"^/api" : ""}
      }
    }
  },
  configureWebpack: {
    //configureWebpack如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    //devtool: "source-map", //开启源码映射
    resolve: {
      alias: {
        '@': resolve('src')  //resolve-alias指定模块的别名(src路径的别名@)
      }
    }
  },
  chainWebpack(config) {
    //是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改
    // it can improve the speed of the first screen, it is recommended to turn on preload
    //默认情况下，Vue CLI应用程序将自动为应用程序的初始呈现所需的所有文件生成预加载提示
    config.plugin('preload').tap(() => [
      {
        //提前预加载提高切换路由,这里要把 runtime 代码的 preload 去掉
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    //默认情况下，Vue CLI应用程序将为为异步块生成的所有JavaScript文件自动生成预取提示
    //预取链接将消耗带宽。如果您有一个带有许多异步块的大型应用程序，并且您的用户主要是移动的，因此具有带宽意识，则可能要禁用预取链接，并手动选择要预取的块。
    //remove the prefetch plugin
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    // svg-sprite-loader 可以多个svg图标合并. 使用时只需根据合并的symbol的id即可
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))   //重点:删除默认配置中处理svg
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))  //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')  //修改插件选项
            .after('html')  //指定要在html命名的文件后操作
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/   //在html中内联的脚本
            }])
            .end()
          config
            .optimization.splitChunks({
              //配置SplitChunksPlugin插件
              chunks: 'all',
              //缓存组
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/, //将node_modules文件下的文件单独分割成一个包
                  priority: 10, //权重为10
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), //can customize your rules匹配模块资源绝对路径或块名称
                  minChunks: 3, //minimum common number最小引用次数是3
                  priority: 5,  //权重为5
                  reuseExistingChunk: true  //如果当前块包含已经从主bundle中分离出来的模块，那么它将被重用，而不是生成一个新的模块，这将影响最终打包生成的块文件名称
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
          //把runtime部分的代码抽离出来单独打包  形如import('abc').then(res=>{})这种异步加载的代码。在VueCli工程中常见的异步加载路由即为runtime代码
        }
      )
  }
}
