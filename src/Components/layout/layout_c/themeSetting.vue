<template>
    <ADrawer
        :visible="visible"
        :width="286"
        @close="onClose"
        class="setting"
        title="界面设置"
    >
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">主题色</h3>

          <div style="height: 20px">
            <a-tooltip class="setting-drawer-theme-color-colorBlock" v-for="(item, index) in colorList" :key="index">
              <template slot="title">
                {{ item.key }}
              </template>
              <a-tag :color="item.color" @click="changeColor(item.color)">
                <a-icon type="check" v-if="item.color === color"></a-icon>
              </a-tag>
            </a-tooltip>
          </div>
        </div>
        <div class="switch">
            <span class="demo-vertical" style="margin-right:20px;">色弱模式</span>
            <a-switch class="demo-vertical"  @change="switchChange"/>
        </div>
        <div style="margin:20px 0;">
            <h3 class="setting-drawer-index-title">菜单风格</h3>
            <div>
                <span class="demo-vertical" style="margin-right:20px;">暗色</span>
                <a-switch class="demo-vertical"  @change="themeChange1"/>
            </div>
            <div>
                <span class="demo-vertical" style="margin-right:20px;">浅色</span>
                <a-switch class="demo-vertical"  @change="themeChange2"/>
            </div>
        </div>
    </ADrawer>
</template>

<script>
    import { mapState,mapActions } from 'vuex';
    import {updateThemes} from './change'
    export default {
        name: 'Setting',
        props: {
            visible: Boolean
        },
        model: {
            prop: 'visible',
            event: 'change'
        },
        data(){
            return {
                colorList:[
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
            }
        },
        computed: {
            ...mapState('app',{
                color:state=>state.color,
                theme:state=>state.theme
            })
        },
        created () {
        },
        mounted(){
            updateThemes(this.color);
        },
        methods: {
            ...mapActions('app',['ToggleState',]),
            changeColor(color){
                this.ToggleState({color:color});
                updateThemes(color)
            },
            themeChange1(){
                this.ToggleState({theme:'dark'});
            },
            themeChange2(){
                this.ToggleState({theme:'light'});
            },
            switchChange(val){
                val ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak')
            },
            onClose(){
                this.$emit('change',false)
            }
        }
    };
</script>

<style lang="less" scoped>
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
