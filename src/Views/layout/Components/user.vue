<template>
    <a-dropdown>
        <div
            class="avatar v-icon-hover"
        >
            <a-avatar size="large" :style="{'backgroundColor':color}" icon="user" />
            <a class="ant-dropdown-link username">{{ userInfo.nickname }}</a>
        </div>
        <a-menu slot="overlay">
            <a-menu-item class="drop-item">
                <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-item class="drop-item">
                <a href="javascript:;" @click="exit">退出登录</a>
            </a-menu-item>
        </a-menu>
    </a-dropdown>
</template>

<script>
    import { mapState } from 'vuex';
    import db from '@/libs/db';
    export default {
        data() {
            return {

            };
        },
        computed:{
            ...mapState('user',['userInfo']),
            ...mapState('app',['color'])
        },
        created() {
        },
        methods:{
            //退出登录 清除localstorge
            exit() {
                db.clear();
                this.$router.push({name:'Login'});
            }
        }
    };
</script>

<style lang="less" scoped> 
    .avatar {
        display: inline-block;
        padding:0 12px;
    }
    .drop-item{
        text-align:center;
    }
    .username{
        padding-left:5px;
    }
</style>