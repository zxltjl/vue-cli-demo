<template>
    <div class="tabs-box">
        <div class="flex">
            <a-tabs 
                v-model="activeKey" 
                @change="callback" 
                @edit="edit"
                type="editable-card" 
                :hide-add="true"
                size="small"
            >
                <a-tab-pane 
                    v-for="item in routerCache" 
                    :tab="item.title" 
                    :key="item.path"
                    :closable="routerCache.length>1"
                />
            </a-tabs>
            <a-dropdown class="dropdown">
                <a-menu slot="overlay">
                    <a-menu-item :disabled="disabled" @click="closeCurrent">
                        关闭当前
                    </a-menu-item>
                    <a-menu-item :disabled="disabled" @click="closeAll">
                        关闭所有
                    </a-menu-item>
                </a-menu>
                <a-button type="primary" style="margin-left: 8px">
                    更多操作 
                    <a-icon type="down" />
                </a-button>
            </a-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeKey:'',//当前激活的tab
                routerCache:[],//路由缓存数组
                fullPathList:[],//path数组
                disabled:false,//关闭当前
            };
        },
        computed:{

        },
        watch: {
            '$route' (newVal) {
                let obj = {
                    name:'',
                    path:'',
                    title:'',
                    close:true
                };
                obj.name = newVal.name;
                obj.path = newVal.path;
                obj.title = newVal.meta.title;
                this.activeKey = newVal.fullPath;
                if (this.fullPathList.indexOf(newVal.fullPath) < 0) {
                    this.routerCache.push(obj);
                    this.fullPathList.push(newVal.fullPath);
                }
            },
            fullPathList(newVal) {
                if (newVal.length === 1) {
                    this.disabled = true;
                } else {
                    this.disabled = false;
                }
            }
        },
        created() {
            let obj = {
                name:'',
                path:'',
                title:'',
                close:true
            };
            obj.name = this.$route.name;
            obj.path = this.$route.path;
            obj.title = this.$route.meta.title;
            this.activeKey = this.$route.fullPath;
            this.routerCache.push(obj);
            this.fullPathList.push(this.$route.fullPath);
        },
        methods:{
            //关闭当前标签
            closeCurrent() {
                const i = this.fullPathList.findIndex(value=>value === this.activeKey);
                const len = this.fullPathList.length;
                if (i < (len - 1)) {
                    this.activeKey = this.fullPathList[(i + 1)];
                } else {
                    this.activeKey = this.fullPathList[(i - 1)];
                }
                this.fullPathList.splice(i,1);
                this.routerCache.splice(i,1);
                this.$router.push({
                    path:this.activeKey
                });
            },
            //关闭所有标签
            closeAll() {
                if (this.routerCache.length > 1) {
                    this.fullPathList = [this.activeKey];
                    this.routerCache = this.routerCache.filter(item=>item.path === this.activeKey); 
                }
            },
            //点击tabs的回调
            callback(val) {
                this.$router.push({
                    path:val
                });
            },
            //路由标签删除
            edit(val,action) {
                const i = this.fullPathList.findIndex(value=>value === val);
                const len = this.fullPathList.length;
                if (this.activeKey === val) {
                    if (i < (len - 1)) {
                        this.activeKey = this.fullPathList[(i + 1)];
                    } else {
                        this.activeKey = this.fullPathList[(i - 1)];
                    }
                    this.fullPathList.splice(i,1);
                    this.routerCache.splice(i,1);
                    this.$router.push({
                        path:this.activeKey
                    });
                } else {
                    if (action === 'remove') {
                        this.fullPathList.splice(i,1);
                        this.routerCache.splice(i,1);
                    }
                }
            }
        }
    };
</script>

<style lang="less" scoped> 
    .tabs-box{
        height:auto;
        width:100%;
        padding:10px;
        .flex{
            background:#fff;
            box-sizing:border-box;
            width:100%;
            display:flex;
            align-items:center;
            padding:3px 10px;
            justify-content: space-between;
        }
    }
    // .dropdown{
        
    // }
    /deep/.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab{
        margin:0;
    }
    /deep/.ant-tabs-bar{
        margin:0
    }
</style>