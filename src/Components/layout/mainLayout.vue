<template>
    <div id="basic-layout">
        <ThemeSetting
            :visible="visible"
            @change="change"
        />
        <ALayout class="layout-box">
            <ALayoutSider
                class="layout-sider"
                :trigger="null"
                collapsible
                v-model="collapsed"
                :theme="theme"
            >
                <Logo :collapsed="collapsed" />
                <Menu 
                    :menu-data="menuData" 
                    mode="inline"
                    :theme="theme"
                    :selected-keys="currentName"
                    :open-keys.sync="openKeys"
                    @select="menuSelect"
                />
            </ALayoutSider>
            <ALayout>
                <ALayoutHeader class="basic-header">
                    <div class="inline-block" @click="collapsed = !collapsed">
                        <AIcon
                            class="trigger"
                            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        />
                    </div>
                    <!-- <Menu 
                        :menu-data="menuData" 
                        mode="horizontal"
                        :theme="theme"
                        :selected-keys="currentName"
                        :open-keys.sync="openKeys"
                        @select="menuSelect"
                    /> -->
                    <div class="tools">
                        <Tooltip @click="toggleDraw" />
                        <User />
                    </div>
                </ALayoutHeader>
                <Tabs />
                <ALayoutContent
                    class="basic-content"
                >
                    <keep-alive>
                        <RouterView />
                    </keep-alive>
                </ALayoutContent>
            </ALayout>
        </ALayout>
    </div>
</template>

<script>
    import Logo from './layout_c/Logo';
    import Menu from './layout_c/menu';
    import Tooltip from './layout_c/tooltip';
    import User from './layout_c/user';
    import Tabs from './layout_c/tabs'


    import ThemeSetting from './layout_c/themeSetting';
    import {mapState,mapMutations} from 'vuex';
    import db from '@/libs/db';
    export default {
        components:{
            Logo,
            Menu,
            Tooltip,
            ThemeSetting,
            Tabs,
            User
        },
        data() {
            return {
                collapsed: false,//导航折叠
                visible:false,//主题设置组件
                currentName:[this.$route.name],//当前打开菜单
                menuData:[],//菜单
                openKeys:[]
            };
        },
        computed:{
            ...mapState('app',{
                theme:state=>state.theme
            })
        },
        watch:{
            '$route.name': {
                handler (newVal) {
                    this.currentName.splice(0, 1, newVal);
                }
            },
        },
        created() {
            this.setUserInfo(db.get('userInfo'));
            this.setToken(db.get('token'));
            this.loadMenu();
            this.findOpenkeys(this.$route.name,this.menuData);
        },
        methods:{
            ...mapMutations('user',['setUserInfo','setToken']),
            findOpenkeys(current,data){
                data.forEach(item=>{
                    if(item.children){
                        item.children.forEach(item1=>{
                            if(item1.name === current){
                                this.openKeys.push(item.name);
                            }
                            if(item1.children){
                                this.findOpenkeys(this.$route.name,item1.children)
                            }
                        })
                    }
                })
            },
            //获取路由表
            loadMenu(){
                const menuList = this.$router.options.routes.filter(item=>item.name==='Home')[0].children.sort((a,b)=>a.sort-b.sort);
                if(Array.isArray(menuList)){
                    this.menuData = menuList
                }
            },
            //主题设置切换按钮
            toggleDraw() {
                this.visible = true;
            },
            change(val) {
                this.visible = val;
            },
            menuSelect(val) {
                if (val.key) {
                    this.$router.push({
                        name:val.key
                    });
                }
            },
        }
    };
</script>

<style lang="less" scoped>
    #basic-layout{
        height:100%;
        width:100%;
    }
    .layout-box{
        height:100%;
        width:100%;
    }
    .layout-sider{
        height:100%;
        overflow:auto;
    }
    .basic-content{
        margin:10px;
        padding:20px;
        background:#fff;
        overflow:auto;
    }
    /deep/.basic-header{
        padding:0 20px;
        background:#fff;
    }
    .tools{
        float:right
    }
</style>