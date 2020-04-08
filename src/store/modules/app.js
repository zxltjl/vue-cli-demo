export default {
    namespaced: true,
    state:{
        color:'#FA541C',
        theme:'dark',
        layout:'vertical',
        isFixedSilder:true,//固定左侧菜单栏
        isFixedHeader:true,//固定haader
        isTabs:true,//是否显示tabs标签
        isWeakColor:false,
        errorList:[],
    },
    mutations:{
        changeStae: (state, obj)=>{
            Object.entries(obj).forEach(([key,value])=>{
                state[key] = value;
            });
        },
        addError:(state,value)=>{
            state.errorList.push(value);
        },
        changeWeakColor:(state,val)=>{
            state.isWeakColor = val;
        }
    },
    actions:{
        ToggleState({commit},obj) {
            commit('changeStae',obj);
        },
        addErrorLog ({ commit, rootState }, info) {
            const { user: { userId } } = rootState;
            commit('addError', {
                ...info,
                time: Date.now(),
                userId
            });
        }

    }
};