<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <RouterView />
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
    name: 'app',
    data() {
        return {
          locale: zhCN,
        };
    },
    created(){

    }
}
</script>

<style>
@import './assets/style/index.less';
#app {
  height:100%;
  width:100%;
  background:rgba(0,0,0,0.2)
}
</style>
