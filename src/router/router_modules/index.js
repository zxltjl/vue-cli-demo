export default [
    {
        sort:1,
        path:'index',
        name:'Index',
        icon:'Home',
        meta:{
            title:'首页'
        },
        component:()=>import('@/Views/Pages/Index/Index.vue')
    },
];