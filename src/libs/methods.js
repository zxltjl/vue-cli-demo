
const unique = ()=>{
    return '.ssss'
}
/**
 * 
 */

const Chinese = ()=>{
    return '中文'
}
/**
 * @param(fn) 需要节流的函数
 * @param(t) 延时
 */
const throttle = (fn,t)=>{
    let last;
    let timer;
    let interval = t || 500;
    return function () {
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(this, args);
            }, interval);
        } else {
            last = now;
            fn.apply(this, args);
        }
    }      
}
export {
    unique,
    Chinese,
    throttle
}