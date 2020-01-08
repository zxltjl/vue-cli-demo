<template>
    <div class="ValidCode disabled-select" @click="refreshCode">
        <span v-for="(item, index) in codeList" :key="index" class="span" :style="getStyle(item)">{{ item.code }}</span>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                codeList: [],
            }
        },
        mounted(){
            this.createdCode();
        },
        methods:{
            //刷新
            refreshCode () {
                this.createdCode()
            },
            //验证码创建
            createdCode () {
                let codeList = [];
                let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789';
                let charsLen = chars.length;
                for (let i = 0; i < 4; i++) {
                    let rgb = [Math.round(Math.random() * 220), Math.round(Math.random() * 240), Math.round(Math.random() * 200)]
                    codeList.push({
                        code: chars.charAt(Math.floor(Math.random() * charsLen)),
                        color: `rgb(${rgb})`,
                        fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
                        transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)`
                    })
                }
                this.codeList = codeList;
                this.$emit('update:value', codeList.map(item => item.code).join(''))
            },
            // 动态绑定样式
            getStyle (data) {
                return `color: ${data.color}; font-size: ${data.fontSize};transform: ${data.transform}`
            }
        }
    }
</script>

<style scoped>
    .span{
        display:inline-block;
        width:25%;
        text-align:center;
    }
</style>