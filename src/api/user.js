import server from '@/plugins/AxiosRequest';
//用户登录
const login = data=>server.request({
    url: 'login',
    method: 'post',
    data: {
        username: data.username,
        password: data.password,
    },
});
//用户信息
const userList = params=>server.request({
    url:'user/index',
    method:'get',
    params
});
//删除用户
const delUser = id=>server.request({
    url:'user/'+id,
    method:'delete',
})
//新增用于
const addUser = data=>server.request({
    url:'user/add',
    method:'post',
    data
})
//编辑用户
const updateUser = (id,data)=>server.request({
    url:'user/'+id,
    method:'put',
    data
})
export {
    login,
    userList,
    delUser,
    addUser,
    updateUser
};