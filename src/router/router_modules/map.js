export default [
    {
        sort:5,
        path:'map',
        name:'Map',
        icon:'Map',
        meta:{
            title:'高德地图'
        },
        component:()=>import('@/Views/Pages/Map/Index.vue')
    },
];