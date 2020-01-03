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
        name: 'App',
        data() {
            return {
                locale: zhCN,
            };
        },
        created() {

        }
    };
</script>

<style>
#app {
  height:100%;
  width:100%;
}
</style>
