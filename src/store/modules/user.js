import db from '@/libs/db'

export default {
    state:{
        userInfo:'',
        token:''
    },
    mutations:{
        setUserInfo(state,val){
            state.userInfo = val;
            db.set('userInfo',val)
        },
        setToken(state,val){
            state.token = val;
            db.set('token',val)
        }
    },
    actions:{   
        login({commit},val){
            console.log(val);
            const obj = {
                avatar:'',
                username:val.username,
                nickname:val.username,
                userId:''
            };
            commit('setUserInfo',obj);
            commit('setToken','#ADFJHJASDNkkasdda213KDASDNJK')
        }
    }
};