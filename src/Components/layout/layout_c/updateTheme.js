// import client from 'webpack-theme-color-replacer/client'
// import generate from '@ant-design/colors/lib/generate'

// export default {
//   getAntdSerials (color) {
//     // 淡化（即less的tint）
//     const lightens = new Array(9).fill().map((t, i) => {
//       return client.varyColor.lighten(color, i / 10)
//     })
//     // colorPalette变换得到颜色值
//     const colorPalettes = generate(color)
//     const rgb = client.varyColor.toNum3(color).join(',')
//     return lightens.concat(colorPalettes).concat(rgb)
//   },
//   changeColor (newColor) {
//     var options = {
//       newColors: this.getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`

//       changeUrl (cssUrl) {
//         return `/${cssUrl}` // while router is not `hash` mode, it needs absolute path
//       }
//     }
//     return client.changer.changeColor(options, Promise)
//   }
// }
const client = require('webpack-theme-color-replacer/client');

export default {
    primaryColor: '#1890ff',
    getAntdSerials (color) {
    // 淡化（即less的tint）
        let lightens = new Array(9).fill().map((t, i) => client.varyColor.lighten(color, i / 10));
        // 此处为了简化，采用了darken。实际按color.less需求可以引入tinycolor, colorPalette变换得到颜色值
        let darkens = new Array(6).fill().map((t, i) => client.varyColor.darken(color, i / 10));
        return lightens.concat(darkens);
    },
    changeColor (newColor) {
        let lastColor = this.lastColor || this.primaryColor;
        let options = {
            cssUrl: '/css/theme-colors.css',
            oldColors: this.getAntdSerials(lastColor), // current colors array. The same as `matchColors`
            newColors: this.getAntdSerials(newColor) // new colors array, one-to-one corresponde with `oldColors`
        };
        let promise = client.changer.changeColor(options);
        this.lastColor = lastColor;
        return promise;
    }
};
