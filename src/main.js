import Vue from 'vue';
import ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import './assets/style/global.less';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import './libs/index'


Vue.use(ant);
Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
