import Vue from 'vue';
import VueRouter from 'vue-router';
import db from '@/libs/db'
// import store from '../store';
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
            path:'/user',
            name:'Login',
            meta:{
                title:'登录',
                notAuth: true,
                notCache: true
            },
            
            component:()=>import('@/Components/layout/userLayout.vue')
        },
    ]
});


const isRouterAuth = function (to, from, next) {
    const isAuth = to.matched.some(r => !r.meta.notAuth);
    return isAuth || next();
};

//第一次进入
const isFirstEnter = async function (to, from, next) {
    if (!db.get('token')) {
        if(to.name==='Login'){
            next();
        }else{
            return next({ name: 'Login' });
        }
    }
    return true;
};



router.beforeEach(async (to, from, next) => {
    NProgress.start();
    if (!isRouterAuth(to,from,next)) return;
    if (!await isFirstEnter(to, from, next)) return;
    next()
    /* 必须调用 `next` */
});
  
router.beforeResolve((to, from, next) => {
    next();
/* 必须调用 `next` */
});

router.afterEach((to) => {
    Promise.resolve().then(() => {
        NProgress.done();
    });
    window.document.title = to.meta.title ;
    window.scrollTo(0, 0);
});
export default router;