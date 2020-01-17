<template>
    <div style="color:red;">
        首页
        <MySvg :type="'Home'" />
    </div>
</template>

<script>
    import MySvg from '../../layout/Components/Svg'
    export default {
        components:{
            MySvg
        },
        data() {
            return {
            
            };
        },
        created() {

        }
    };
</script>

<style>

</style>