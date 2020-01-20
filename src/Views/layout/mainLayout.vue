<template>
    <div :class="!isFixedHeader&&layout==='horizontal'?'basic':'basic-layout'">
        <Setting
            :visible="visible"
            @change="change"
        />
        <ALayout :class="isFixedSilder?'layout-box':''">
            <ALayoutSider
                v-if="layout==='vertical'"
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
                <ALayoutHeader 
                    :class="layout==='horizontal'?(theme==='dark'?'basic-header dark-color':'basic-header light-color'):'basic-header'"
                >
                    <div 
                        v-if="layout==='vertical'" 
                        class="inline-block" 
                        style="cursor:pointer;" 
                        @click="collapsed = !collapsed"
                    >
                        <AIcon
                            class="trigger"
                            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        />
                    </div>
                    <Logo v-if="layout==='horizontal'" class="horizontal-logo" />
                    <Menu 
                        v-if="layout==='horizontal'"
                        :menu-data="menuData" 
                        mode="horizontal"
                        :theme="theme"
                        :selected-keys="currentName"
                        :open-keys.sync="openKeys"
                        @select="menuSelect"
                        class="horizontal-inline dark-color"
                    />
                    <div class="tools">
                        <Tooltip @click="toggleDraw" />
                        <User />
                    </div>
                </ALayoutHeader>
                <ALayoutContent :class="isFixedHeader?'basic-content':'basic-contents'">
                    <Tabs v-if="isTabs" />
                    <keep-alive>
                        <RouterView class="router-box" />
                    </keep-alive>
                    <!-- <RouterView v-if="!$route.meta.keepAlive" class="router-box" /> -->
                </ALayoutContent>
            </ALayout>
        </ALayout>
    </div>
</template>

<script>
    import Logo from './Components/Logo';
    import Menu from './Components/Menu';
    import Tooltip from './Components/Tooltip';
    import User from './Components/User';
    import Tabs from './Components/Tabs';


    import Setting from './Components/Setting';
    import {mapState,mapMutations} from 'vuex';
    import db from '@/libs/db';
    export default {
        components:{
            Logo,
            Menu,
            Tooltip,
            Setting,
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
                theme:state=>state.theme,
                isFixedSilder:state=>state.isFixedSilder,
                isFixedHeader:state=>state.isFixedHeader,
                layout:state=>state.layout,
                isTabs:state=>state.isTabs

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
            if(document.body.clientWidth<1200){
                this.collapsed = true;
            }else{
                this.collapsed = false;
            }
        },
        mounted(){
            this.wOnresize()
        },
        methods:{
            ...mapMutations('user',['setUserInfo','setToken']),
            findOpenkeys(current,data) {
                data.forEach(item=>{
                    if (item.children) {
                        item.children.forEach(item1=>{
                            if (item1.name === current) {
                                this.openKeys.push(item.name);
                            }
                            if (item1.children) {
                                this.findOpenkeys(this.$route.name,item1.children);
                            }
                        });
                    }
                });
            },
            //获取路由表
            loadMenu() {
                const menuList = this.$router.options.routes.filter(item=>item.name === 'Home')[0].children.sort((a,b)=>a.sort - b.sort);
                if (Array.isArray(menuList)) {
                    this.menuData = menuList;
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
            wOnresize(){
                window.onresize=()=>{
                    if(document.body.clientWidth<1200){
                        this.collapsed = true;
                    }else{
                        this.collapsed = false;
                    }
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .basic-layout{
        height:100%;
        width:100%;
    }
    .basic{
        width:100%;
        height:auto;
    }
    .layout-box{
        height:100%;
        width:100%;
    }
    .basic-content{
        margin:5px 10px;
        overflow:auto;
    }
    .basic-contents{
        margin:5px 10px;
        position:relative;
    }
    /deep/.basic-header{
        padding:0 20px;
        background:#fff;
    }
    .tools{
        float:right
    }
    .horizontal-inline{
        display:inline-block;
    }
    .horizontal-logo{
        display:inline-block;
        width:auto;
        padding-right:20px;
    }
    .dark-color{
        background:#001529;
        color:rgba(255,255,255,0.65)!important;
    }
    .light-color{
        background:#fff;
        color:#000!important;
    }
    .router-box{
        padding:20px;
        background:#fff;
        margin:0 10px;
    }
    /deep/.ant-menu-dark .ant-menu-item-selected{
        color:#fff;
    }
</style>