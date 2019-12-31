<template>
    <div class="logo-box">
        <img class="demo-vertical" src="@/assets/images/logo.jpg" alt="" srcset="">
        <span class="demo-vertical" v-if="!collapsed">VUE-CLI-DEMO</span>
    </div>
</template>

<script>
export default {
    props:{
        collapsed:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
        }
    }
}
</script>

<style lang="less" scoped>
    .logo-box{
        display:inline-block;
        height:64px;
        width:100%;
        text-align:center;
        margin-bottom:20px;
        line-height:64px;
        color:#fff;
        img{
            height:24px;
            padding:0 15px;
        }
    }
</style>