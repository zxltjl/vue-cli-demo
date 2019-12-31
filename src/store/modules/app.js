export default {
    namespaced: true,
    state:{
        color:'#722ED1',
        theme:'dark',
    },
    mutations:{
        changeStae: (state, obj)=>{
            Object.entries(obj).forEach(([key,value])=>{
                state[key] = value;
            })
        },
    },
    actions:{
        ToggleState({commit},obj){
            commit('changeStae',obj)
        },
    }
}