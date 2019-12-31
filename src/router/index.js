import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter)

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
    // console.log(to);
    next();
    /* 必须调用 `next` */
  })
  
router.beforeResolve((to, from, next) => {
    // console.log(to);
    next();
/* 必须调用 `next` */
})

// router.afterEach((to, from) => {
    // console.log(to);
    // console.log(from);
// })
export default router;