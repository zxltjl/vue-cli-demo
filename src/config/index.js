//冻结对象
const freeze = (obj)=>{
    if (typeof obj === 'object' && !Object.isFrozen(obj)) {
        Object.freeze(obj);
        Object.keys(obj).forEach(property => freeze(obj[property]));
    }
    return obj;
}
const config = freeze({
    //系统名称
    name:'VUE-CLI-DEMO',

    //api路径
    baseUrl:{
        development:'',
        production:''
    },
    //token
    token:{

    }
})

export default config