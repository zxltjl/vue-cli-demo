/**
 * @param() 需要去重的数组：简单去重（一维数组）
 */
const unique = (arr)=>{
    return Array.from(new Set(arr));
};

/**
 * @param(section)数字符号
 */
const Chinese = (section)=>{
    let chnNumChar = ['零','一','二','三','四','五','六','七','八','九'];
    let chnUnitChar = ['','十','百','千'];
    let strIns = '', chnStr = '';
    let unitPos = 0;
    let zero = true;
    while (section > 0) {
        let v = section % 10;
        if (v === 0) {
            if (!zero) {
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
            }
        } else {
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
    }
    return chnStr;
};
/**
 * @param(fn) 需要节流的函数
 * @param(t)  延时
 */
const throttle = (fn,t)=>{
    let last;
    let timer;
    let interval = t || 500;
    return function () {
        let args = arguments;
        let now = Number(new Date());
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
    };      
};
export {
    unique,
    Chinese,
    throttle
};