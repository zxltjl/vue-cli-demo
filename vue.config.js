const path = require("path");
const resolveDir = function (dir) {
  return path.join(__dirname,dir);
}
const webpack = require('webpack')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
// function getAntdSerials (color) {
//   console.log(color)
//   var lightens = new Array(9).fill().map((t, i) => {
//     return ThemeColorReplacer.varyColor.lighten(color, i / 10)
//   })
//   var darkens = new Array(6).fill().map((t, i) => {
//     return ThemeColorReplacer.varyColor.darken(color, i / 10)
//   })
//   return lightens.concat(darkens)
// }
module.exports = {
    // baseUrl: process.env.NODE_ENV === 'production' ? '/development/' : '/',
    publicPath:'./',
    outputDir:'demo',
    productionSourceMap: false,
    devServer: {
        port:8888,
        open:true
    },
    chainWebpack: (config)=>{
      //修改文件引入自定义路径
      config.resolve.alias
          .set('@', resolveDir('src'))
    },
    configureWebpack: {
      plugins: [
        // Ignore all locale files of moment.js
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // 生成仅包含颜色的替换样式（主题色等）
        new ThemeColorReplacer({
          fileName: './css/theme-colors.css',
          // matchColors: getAntdSerials('#222') // 主色系列
        }),

      ]
    },
    transpileDependencies: [],
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
          less: {
            // modifyVars: {
            //   'primary-color': '#f26e1b',
            //   'link-color': '#f26e1b',
            //   'border-radius-base': '2px',
            // },
            javascriptEnabled: true
          }
        }
    }
}

