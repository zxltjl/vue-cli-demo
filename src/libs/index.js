import Vue from 'vue'
import * as methods from './methods'
import prototypies from './prototypies'
import components from './components'


//挂载方法和属性
const addPrototypies = (value,proto)=>{
    Object.entries(value).forEach(([key,val])=>{
        proto.prototype[key] = val
    })
}
//注册全局组件方法
const addComponents = (obj,proto)=>{
    Object.entries(obj).forEach(([key,val])=>{
        proto.component(key,val)
    })
}
addPrototypies(methods,Vue);
addPrototypies(prototypies,Vue);
addComponents(components,Vue)

