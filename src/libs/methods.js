
const unique = ()=>{
    return '.ssss'
}
const Chinese = ()=>{
    return '中文'
}
/**
 * @param(func) 需要节流的函数
 * @param(delay) 延时
 */
const throttle = (func,delay)=>{
    var timer = null;            
    return function() {                
        var context = this;               
        var args = arguments;                
        if (!timer) {                    
            timer = setTimeout(function() {                        
                func.apply(context, args);                        
                timer = null;                    
            }, delay);                
        }            
    }        
}
export {
    unique,
    Chinese,
    throttle
}