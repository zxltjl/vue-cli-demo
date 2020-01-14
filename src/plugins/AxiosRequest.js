// import qs from 'qs';
import axios from 'axios';
import configs from '@/config';
import db from '@/libs/db';
import router from '../router';
// import store from 'store';
class AxiosRequest {
    constructor(config) {
        this.defaultConfig = {
            method:'get',
            ...config
        };
    }
    
    static statusCode = new Map([
        [400, { msg: '请求错误' }],
        [401, { msg: '未认证'}],
        [403, { msg: '未授权'}],
        [404, { msg: '请求地址错误' }],
        [405, { msg: '请求方式错误' }],
        [408, { msg: '请求超时' }],
        [422, { msg: '验证错误' }],
        [500, { msg: '服务器内部错误' }],
        [501, { msg: '服务未实现' }],
        [502, { msg: '网关错误' }],
        [503, { msg: '服务不可用' }],
        [504, { msg: '网关超时' }],
        [505, { msg: 'HTTP版本不受支持' }]
    ]);

    static handleError(ctx) {
        try {
            const error = ctx.response;
            const failedStatus = this.statusCode.get(error.status);
            return Promise.reject(failedStatus);
        } catch {
            throw new Error(ctx);
        }
    }

    interceptors(instance) {
        //拦截请求
        instance.interceptors.request.use(function(config) {
            //在发送请求判断token是否过期否则进入登录页面
            let token = configs.token.value.replace('TOKEN',db.get('token'));
            if (token) {
                config[configs.token.position][configs.token.key] = token;
            } else {
                router.push({name:'Login'});
            }
            return config;  //只有return config后，才能成功发送请求
        },error=>
            //请求错误时做些事
            Promise.reject(error)
        );
        //响应拦截
        instance.interceptors.response.use(function(data) {
            return data.data;   //只有return data后才能完成响应
        },error=>{
            //请求错误时做些事
            if (error.constructor.name === 'Cancel') {
                return Promise.reject(error);
            }
            return AxiosRequest.handleError(error);
        });
    }

    request (options = {}) {
        const instance = axios.create();
        if (!options.url) {
            throw new Error('缺少请求地址');
        }
        this.interceptors(instance);
        const url = process.env.NODE_ENV === 'production'
            ? configs.baseUrl.production + options.url
            : configs.baseUrl.development + options.url;
        options.url = url;//请求根路径
        options.timeout = 1000;//请求超时
        return instance.request(options);
    }

}
export default new AxiosRequest;