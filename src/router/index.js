import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import '../assets/style/nprocess.less';//引入自定义的nprocess样式
Vue.use(VueRouter);


//去除nrocess的加载选择动画组件
NProgress.configure({ showSpinner: false }); 
//
const files = require.context('./router_modules',false,/\.js$/);
let arr = [];
const loadRoutes = ()=>{
    files.keys().forEach(key => {
        arr = arr.concat(files(key).default);
    });
    return arr;
};

const router = new VueRouter({
    routes: [
        { 
            path: '/',
            name:'Home',
            meta:{
                title:'首页'
            },
            redirect:{name:'Index'},
            component: ()=>import('@/Components/layout/mainLayout.vue'),
            children:loadRoutes()
        },
        {
            path:'login',
            name:'Login',
            component:()=>import('@/Components/layout/userLayout.vue')
        }
    ]
});
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
    /* 必须调用 `next` */
});
  
router.beforeResolve((to, from, next) => {
    // console.log(to);
    next();
/* 必须调用 `next` */
});

router.afterEach(() => {
    NProgress.done();
    // console.log(to);
    // console.log(from);
});
export default router;