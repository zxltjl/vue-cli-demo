export default [
    {
        sort:4,
        path:'user',
        name:'User',
        icon:'Account',
        meta:{
            title:'用户管理'
        },
        component:()=>import('@/Views/Pages/User/Index.vue')
    },
];