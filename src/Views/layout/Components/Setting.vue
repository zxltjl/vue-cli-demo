<template>
    <ADrawer
        :visible="visible"
        :width="286"
        @close="onClose"
        class="setting"
        title="界面设置"
    >
        <!-- 菜单风格（左侧垂直、顶部水平） -->
        <div class="vertical-space">
            <h3>
                布局风格
            </h3>
            <div class="flex">
                <a-tooltip title="暗色" @click="ToggleState({theme:'dark'})">
                    <div class="setting-layout">
                        <DarkMenuSvg v-once />
                        <a-icon class="check-icon v-theme-color" type="check" v-if="theme==='dark'" />
                    </div>
                </a-tooltip>
                <a-tooltip title="亮色" @click="ToggleState({theme:'light'})">
                    <div class="setting-layout">
                        <LightMenuSvg v-once />
                        <a-icon class="check-icon v-theme-color" type="check" v-if="theme==='light'" />
                    </div>
                </a-tooltip>
            </div>
        </div>
        <!-- 主题颜色风格 -->
        <div class="vertical-space">
            <h3>
                主题风格
            </h3>
            <div style="margin:15px 0;height:20px;">
                <a-tooltip
                    class="setting-drawer-theme-color-colorBlock"
                    v-for="(item, index) in colorList"
                    :key="index"
                >
                    <template slot="title">
                        {{ item.key }}
                    </template>
                    <a-tag
                        :color="item.color"
                        @click="changeColor(item.color)"
                    >
                        <a-icon
                            type="check"
                            v-if="item.color === color"
                        />
                    </a-tag>
                </a-tooltip>
            </div>
        </div>
        <div class="vertical-space">
            <h3>
                导航菜单风格
            </h3>
            <div class="flex">
                <a-tooltip title="垂直菜单" @click="ToggleState({layout:'vertical'})">
                    <div class="setting-layout">
                        <VerticalSvg v-once />
                        <a-icon class="check-icon v-theme-color" type="check" v-if="layout==='vertical'" />
                    </div>
                </a-tooltip>
                <a-tooltip title="水平菜单" @click="ToggleState({layout:'horizontal'})">
                    <div class="setting-layout">
                        <HorizontalSvg v-once />
                        <a-icon class="check-icon v-theme-color" type="check" v-if="layout==='horizontal'" />
                    </div>
                </a-tooltip>
            </div>
        </div>
        <div class="vertical-space">
            <h3>
                其他设置
            </h3>
            <div class="flex">
                <span
                    class="demo-vertical"
                    style="margin-right:20px;"
                >
                    色弱模式
                </span>
                <a-switch
                    class="demo-vertical"
                    @change="switchChange"
                />
            </div>
            <div class="flex">
                <span
                    class="demo-vertical"
                    style="margin-right:20px;"
                >
                    固定左侧菜单栏
                </span>
                <a-switch
                    :checked="isFixedSilder"
                    class="demo-vertical"
                    @change="silderChange"
                />
            </div>
            <div class="flex">
                <span
                    class="demo-vertical"
                    style="margin-right:20px;"
                >
                    固定header
                </span>
                <a-switch
                    :checked="isFixedHeader"
                    class="demo-vertical"
                    @change="headerChange"
                />
            </div>
            <div class="flex">
                <span
                    class="demo-vertical"
                    style="margin-right:20px;"
                >
                    多标签模式
                </span>
                <a-switch
                    :checked="isTabs"
                    class="demo-vertical"
                    @change="tabsChange"
                />
            </div>
        </div>
    </ADrawer>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    import LightMenuSvg from '@/assets/svg/lightMenu.svg?inline';
    import DarkMenuSvg from '@/assets/svg/darkMenu.svg?inline';
    import VerticalSvg from '@/assets/svg/vertical.svg?inline';
    import HorizontalSvg from '@/assets/svg/horizontal.svg?inline';
    import { updateThemes } from './change';
    export default {
        name: 'Setting',
        components: {
            LightMenuSvg,
            DarkMenuSvg,
            VerticalSvg,
            HorizontalSvg
        },
        model: {
            prop: 'visible',
            event: 'change'
        },
        props: {
            visible: Boolean
        },
        data () {
            return {
                colorList: [
                    {
                        key: '薄暮', color: '#F5222D'
                    },
                    {
                        key: '火山', color: '#FA541C'
                    },
                    {
                        key: '日暮', color: '#FAAD14'
                    },
                    {
                        key: '明青', color: '#13C2C2'
                    },
                    {
                        key: '极光绿', color: '#52C41A'
                    },
                    {
                        key: '拂晓蓝（默认）', color: '#1890FF'
                    },
                    {
                        key: '极客蓝', color: '#2F54EB'
                    },
                    {
                        key: '酱紫', color: '#722ED1'
                    }
                ]
            };
        },
        computed: {
            ...mapState('app', {
                color: state => state.color,
                theme: state => state.theme,
                isFixedHeader: state=>state.isFixedHeader,
                isFixedSilder: state=>state.isFixedSilder,
                layout: state=>state.layout,
            }),
            isTabs:{
                get:function(){
                    return this.$store.state.app.isTabs
                },
                set:function(newVal){
                    this.$store.state.app.isTabs = newVal
                }
            }
        },
        created () {
        },
        mounted () {
            updateThemes(this.color);
        },
        methods: {
            ...mapActions('app', ['ToggleState',]),
            changeColor (color) {
                this.ToggleState({ color });
                updateThemes(color);
            },
            switchChange (val) {
                val ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak');
            },
            onClose () {
                this.$emit('change', false);
            },
            silderChange(val){
                this.ToggleState({isFixedSilder:val});
            },
            headerChange(val){
                this.ToggleState({isFixedHeader:val});
            },
            tabsChange(val){
                this.ToggleState({isTabs:val});
            }
        }
    };
</script>

<style lang="less" scoped>
.vertical-space{
    margin-bottom:25px; 
}
.flex{
    padding:0 10px;
    display:flex;
    justify-content:space-between;
    margin:10px 0;
}
.setting-layout{
    position:relative;
    display:inline-block;
    cursor:pointer;
}
.check-icon{
    position:absolute;
    top:15px;
    left:25px;
}
.setting-drawer-theme-color-colorBlock {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  float: left;
  cursor: pointer;
  margin-right: 8px;
  padding-left: 0px;
  padding-right: 0px;
  text-align: center;
  color: #fff;
  font-weight: 700;

  i {
    font-size: 14px;
  }
}
</style>
