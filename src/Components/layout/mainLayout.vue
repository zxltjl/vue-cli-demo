<template>
    <div id="basic-layout">
        <ThemeSetting :visible="visible" @change="change"/>
        <!-- {{theme}}
        {{$store.state.app.color}} -->
        <ALayout class="layout-box" >
            <ALayoutSider :trigger="null" collapsible v-model="collapsed" :theme="theme">
                <Logo :collapsed="collapsed" />
                <Menu 
                    :menuData="menuData" 
                    mode="inline"
                    :theme="theme"
                    :defaultSelectedKeys="['Index']"
                    @select="menuSelect"
                />
            </ALayoutSider>
            <ALayout>
                <ALayoutHeader class="basic-header">
                    <div class="inline-block">
                        <AIcon
                            class="trigger"
                            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                            @click="collapsed = !collapsed"
                        />
                    </div>
                    <div class="tools">
                         <Tooltip @click="toggleDraw" />
                    </div>
                </ALayoutHeader>
                <ALayoutContent
                    class="basic-content"
                >
                    <RouterView />
                </ALayoutContent>
            </ALayout>
        </ALayout>
    </div>
</template>

<script>
import Logo from './layout_c/Logo';
import Menu from './layout_c/menu';
import Tooltip from './layout_c/tooltip'
import ThemeSetting from './layout_c/themeSetting'
import {mapState} from 'vuex'
export default {
    components:{
        Logo,
        Menu,
        Tooltip,
        ThemeSetting
    },
    data() {
      return {
        collapsed: false,
        visible:false,
        menuData:[
            {
                path:'index',
                name:'Index',
                meta:{
                    title:'首页'
                }
            },
            {
                path:'tinymic',
                name:'Tinymic',
                meta:{
                    title:'富文本'
                }
            },
            {
                path:'process',
                name:'Process',
                meta:{
                    title:'表格'
                },
                children:[
                    {
                        path:'table1',
                        name:'Table1',
                        meta:{
                            title:"表格1"
                        }
                    },
                    {
                        path:'table2',
                        name:'Table2',
                        meta:{
                            title:"表格2"
                        },
                        children:[
                            {
                                path:'2',
                                name:'对',
                                meta:{
                                    title:'哈哈'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
      };
    },
    created(){
    },
    computed:{
        ...mapState('app',{
            theme:state=>state.theme
        })
    },
    methods:{
        //主题设置切换按钮
        toggleDraw(){
            this.visible = true;
        },
        change(val){
            this.visible = val;
        },
        menuSelect(val){
            if(val.key){
                this.$router.push({
                    name:val.key
                })
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
    .basic-content{
        margin:20px;
        padding:20px;
        background:#fff;
    }
    /deep/.basic-header{
        padding:0 20px;
        background:#fff;
    }
    .tools{
        float:right
    }
</style>