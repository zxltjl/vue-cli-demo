<template>
    <div class="search-box">
        <a-form layout="inline">
            <slot />
            <a-button @click="reset" class="margin">重置</a-button>
            <a-button type="primary" @click="search" class="margin">搜索</a-button>
        </a-form>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        methods:{
            reset(){
                this.$emit('reset')
            },
            search(){
                this.$emit('search')
            }
        }
    }
</script>

<style lang="less" scoped>
    .search-box{
        display:inline-block;
    }
    /deep/.ant-form-item-control{
        line-height:32px;
    }
    .margin{
        margin:0 10px;
    }
</style>