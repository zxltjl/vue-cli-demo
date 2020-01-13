export default {
    namespaced: true,
    state:{
        color:'#722ED1',
        theme:'dark',
        layout:'vertical',
        errorList:[]
    },
    mutations:{
        changeStae: (state, obj)=>{
            Object.entries(obj).forEach(([key,value])=>{
                state[key] = value;
            });
        },
        addError:(state,value)=>{
            state.errorList.push(value);
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