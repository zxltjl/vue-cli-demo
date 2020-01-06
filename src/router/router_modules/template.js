import RouterView from '@/Components/layout/RouterView'
export default [
    {
        sort:3,
        path:'public-components',
        name:'PublicComponents',
        meta:{
            title:"公共组件"
        },
        redirect:{
            name:'PublicCiomponentSearch'
        },
        component:RouterView,
        children:[
            {
                path:'public-component-table',
                name:'PublicCiomponentTable',
                meta:{
                    title:'表格'
                },
                component:()=>import('@/Views/PublicComponents/Table/Index.vue'),
            },
            {
                path:'public-component-search',
                name:'PublicCiomponentSearch',
                meta:{
                    title:'搜索'
                },
                component:()=>import('@/Views/PublicComponents/Search/Index.vue'),
            },
        ]
    }
];