<template>
    <div id="flame" class="login-box">
        <div class="login-content">
            <h3>{{ title }}</h3>
        </div>
    </div>
</template>

<script>
    export default {    
        data(){
            return {
                title:this.$app.name,
                flag:false
            }
        },
        created(){
            this.ss()
        },
        methods:{
            ss(){
                this.flag = true;
            }
        }
    };
</script>

<style lang="less">
    body,html{
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 100%;
        background: black;
    }
    .login-box{
        width:100%;
        height:100%;
        background:url('../../assets/images/bg.jpg') center center;
        background-size:100% 100%;
        position:relative;
        overflow:hidden;
    }
    .login-content{
        width:400px;
        height:300px;
        padding:20px;
        border-radius:5px;
        position:absolute;
        left:50%;
        top:50%;
        margin-left:-200px;
        margin-top:-150px;
        background:rgba(22,222,221,.5);
        h3{
            color:#fff;
            text-align:center;
        }
    }
    .login-content {
        animation: login-in .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    @keyframes login-in {
        0% {
            transform: translateX(400px);
        }
        100% {
            transform: translateX(0);
        }
    }
</style>