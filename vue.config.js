const path = require('path');
const resolveDir = function (dir) {
    return path.join(__dirname,dir);
};
const webpack = require('webpack');
const createThemeColorReplacerPlugin = require('./src/config/plugin.config')
// 复制 tinymce 所需的静态资源
const copyOptions = [
    {
        from: resolveDir('./src/static/tinymce/langs'),
        to: './tinymce/langs'
    },
    {
        from: resolveDir('./src/static/tinymce/skins'),
        to: './tinymce/skins'
    }
];
module.exports = {
    // baseUrl: process.env.NODE_ENV === 'production' ? '/development/' : '/',
    publicPath:'./',
    outputDir:'dist',
    productionSourceMap: false,
    runtimeCompiler: true,//模板编译可以使用template
    devServer: {
        port:8888,
        open:true
    },
    chainWebpack: config=>{
        //修改文件引入自定义路径
        config.resolve.alias
            .set('@', resolveDir('src'));
        //解析svg
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
        svgRule
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
            .options({
                svgo: {
                    plugins: [
                        { removeDoctype: true },
                        { removeComments: true },
                        { removeViewBox: false }
                    ],
                    removeViewBox: false,
                },
            }).end();
        const hasCopy = config.plugins.has('copy');
        if (hasCopy) config.plugin('copy').tap(args => [args[0].concat(copyOptions)]);
    },
    configureWebpack: {
        plugins: [
        // Ignore all locale files of moment.js
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // 生成仅包含颜色的替换样式（主题色等）
            createThemeColorReplacerPlugin()
        ],
        
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
};