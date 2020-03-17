import server from '@/plugins/AxiosRequest';
//用户登录
const getAccount = params=>server.request({
    url: 'account/index',
    method: 'get',
    params
});
const putAccount = data=>server.request({
    url:'account/add',
    method:'post',
    data
})
const delAccount = id=>server.request({
    url:'account/'+id,
    method:'delete'
})
export {
    getAccount,
    putAccount,
    delAccount
}