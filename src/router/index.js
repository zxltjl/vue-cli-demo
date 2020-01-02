import Vue from 'vue'
import VueRouter from 'vue-router';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)
NProgress.configure({ showSpinner: false }) 
const files = require.context('./router_modules',false,/\.js$/);
let arr = [];
const loadRoutes = ()=>{
  files.keys().forEach(key => {
      arr = arr.concat(files(key).default);
  });
  return arr;
}

const router = new VueRouter({
    routes: [
      { 
        path: '/',
        name:'Home',
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
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    // console.log(to);
    next();
    /* 必须调用 `next` */
  })
  
router.beforeResolve((to, from, next) => {
    // console.log(to);
    next();
/* 必须调用 `next` */
})

router.afterEach(() => {
    NProgress.done()
    // console.log(to);
    // console.log(from);
})
export default router;