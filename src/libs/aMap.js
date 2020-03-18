import config from '../config';
// 地图插件
const plugin = ['AMap.OverView','AMap.Scale','AMap.ToolBar'];
export default function mapLoader() {
    return new Promise((resolve,reject)=>{
        if (Window.AMap) {
            resolve(window.AMap);
        }
        else {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.sync = true;
            script.src = 'http://webapi.amap.com/maps?v=1.4.15&callback=initAMap&key=' + config.amapKey + '&&plugin=' + plugin.join(',');
            script.onerror = reject;
            document.head.appendChild(script);
        }
        window.initAMap = () =>{
            resolve(window.AMap);
        };
    });
}
