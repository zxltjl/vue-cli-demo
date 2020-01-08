<template>
    <div id="app">
        <a-locale-provider :locale="locale">
            <RouterView />
        </a-locale-provider>
    </div>
</template>

<script>
    import enUS from 'ant-design-vue/lib/locale-provider/en_US';
    export default {
        name: 'App',
        data() {
            return {
                locale: enUS,
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
