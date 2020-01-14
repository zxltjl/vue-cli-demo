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
const addUser = data=>server.request({
    url:'user/add',
    method:'post',
    data
})
export {
    login,
    userList,
    delUser,
    addUser
};