import db from '@/libs/db';
import {login} from '@/api/user';
export default {
    namespaced: true,
    state:{
        userInfo:'',
        token:''
    },
    mutations:{
        setUserInfo(state,val) {
            state.userInfo = val;
            db.set('userInfo',val);
        },
        setToken(state,val) {
            state.token = val;
            db.set('token',val);
        },
    },
    actions:{   
        login({commit},val) {
            return new Promise((resolve,reject)=>{
                login(val).then(res=>{
                    commit('setUserInfo',res.data.userinfo);
                    commit('setToken',res.data.token.value);
                    resolve();
                }).catch(err=>{
                    console.log(err)
                    reject(err);
                });
            });
        },
    }
};