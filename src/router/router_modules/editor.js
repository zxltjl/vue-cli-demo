export default [
    {
        sort:2,
        path:'editor',
        name:'Editor',
        icon:'Editor',
        meta:{
            title:'富文本编辑器'
        },
        component:()=>import('@/Views/Pages/Editor/Index.vue')
    }
];