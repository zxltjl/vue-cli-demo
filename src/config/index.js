//冻结对象
const freeze = obj=>{
    if (typeof obj === 'object' && !Object.isFrozen(obj)) {
        Object.freeze(obj);
        Object.keys(obj).forEach(property => freeze(obj[property]));
    }
    return obj;
};
const config = freeze({
    //系统名称
    name:'VUE-CLI-DEMO',

    //api路径
    baseUrl:{
        development:'http://localhost:3000/',
        production:'http://localhost:3000/'
    },
    //token
    token: {
        // 'headers' | 'params' | 'data'
        position: 'headers',
        key: 'Authorization',
        value: 'Bearer TOKEN',
    },
    
    //localstorge前缀
    prefix:'demo',
    //localstorge过期时间(单位：天)
    expires:7,
});

export default config;