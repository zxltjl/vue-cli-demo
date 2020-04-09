<template>
    <div style="color:red;">
        首页dasd
        <MySvg :type="'Home'" />
    </div>
</template>

<script>
    import MySvg from '../../layout/Components/Svg';
    import {mapState,mapGetters} from 'vuex';
    export default {
        components:{
            MySvg
        },
        data() {
            return {
            
            };
        },
        computed:{
            ...mapGetters('user',['TOKEN']),
            ...mapState('user',{
                token:state=>state.token
            })
        },
        created() {
            console.log(this.token)
        }
    };
</script>

<style>

</style>