import server from '@/plugins/AxiosRequest'

const login = (data)=>{
    return server.request({
        url: 'login',
        data: {
            username: data.username,
            password: data.password,
        },
        method: 'post',
    })
}
export{
    login
}