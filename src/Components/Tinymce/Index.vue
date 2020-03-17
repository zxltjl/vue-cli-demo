<template>
    <div>
        <Editor 
            v-if="active"
            v-model="myValue"   
            :init="init"
            :disabled="disabled"
            @onClick="onClick"
        />
    </div>
</template>

<script>
    import Tinymce from 'tinymce/tinymce';
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/themes/silver';
 
    //plugin
    import 'tinymce/plugins/image';
    import 'tinymce/plugins/imagetools';
    import 'tinymce/plugins/code';
    import 'tinymce/plugins/advlist';
    import 'tinymce/plugins/autolink';
    import 'tinymce/plugins/link';
    import 'tinymce/plugins/image';
    import 'tinymce/plugins/lists';
    import 'tinymce/plugins/charmap';
    import 'tinymce/plugins/preview';
    import 'tinymce/plugins/hr';
    import 'tinymce/plugins/anchor';
    import 'tinymce/plugins/pagebreak';
    import 'tinymce/plugins/spellchecker';
    import 'tinymce/plugins/searchreplace';
    import 'tinymce/plugins/wordcount';
    import 'tinymce/plugins/visualblocks';
    import 'tinymce/plugins/visualchars';
    import 'tinymce/plugins/fullscreen';
    import 'tinymce/plugins/insertdatetime';
    import 'tinymce/plugins/media';
    import 'tinymce/plugins/nonbreaking';
    import 'tinymce/plugins/table';
    import 'tinymce/plugins/template';
    import 'tinymce/plugins/paste';
    import 'tinymce/plugins/print';
    import 'tinymce/plugins/autosave'
    export default {
        components:{
            Editor
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            theme:{
                type:String,
                default:'dark'
            }
        },
        data() {
            return {
                disabled:false,
                init:{
                    baseUrl:'./tinymce',
                    suffix:'.min',
                    language: 'zh_CN',
                    content_css:'./tinymce/skins/content/default/content.css',
                    language_url: './tinymce/langs/zh_CN.js',
                    skin_url: './tinymce/skins/ui/oxide',
                    plugins: [
                        'paste lists advlist nonbreaking table autolink autosave link image imagetools charmap print preview anchor searchreplace code pagebreak insertdatetime wordcount fullscreen'
                    ],
                    menubar: 'file edit insert view format table tools',
                    toolbar: 'undo redo | fontselect fontsizeselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist | table image link fullscreen',
                    // 自定义扩展，非原生 api
                    mobile_phone_toolbar: 'undo redo bold italic underline forecolor styleselect fontsizeselect bullist table image link',
                    toolbar_drawer: 'floating',
                    max_height: 1000,
                    min_height: 560,
                    autofocus:true,
                    style_formats_merge: true,                // 允许 style_formats 覆盖文本样式
                    images_reuse_filename: true,              // 使用图片的实际文件名
                    contextmenu: false,                       // 禁用富文本的右键菜单
                    paste_retain_style_properties: 'all',     // 粘贴时保留所有样式
                    paste_word_valid_elements: '*[*]',        // 保留 word 样式
                    paste_data_images: true,                  // 粘贴的同时把内容里的图片自动上传
                    paste_webkit_styles: 'all',               // 保留 webkit 样式
                    branding: false,                          // 禁止右下角标识
                    image_advtab: true,                       // 自动上传图片
                    autosave_interval: '3s',                  // 自动保存时长
                    autosave_retention: '60m',                // 本地存储时间上限
                    pagebreak_split_block: true,              // 分页符
                    file_picker_types: 'file image media',    // 文件上传的类型（将开启浏览本地文件的选项）
                    font_formats: `
                        宋体=SimSun;
                        黑体=SimHei;
                        仿宋=FangSong;
                        楷体=KaiTi;
                        微软雅黑=Microsoft YaHei;
                        Arial=arial,helvetica,sans-serif;
                        Comic Sans MS=comic sans ms,sans-serif;
                        Courier New=courier new,courier;
                        Georgia=georgia,palatino;
                        Helvetica=helvetica;
                        Symbol=symbol;
                        Tahoma=tahoma,arial,helvetica,sans-serif;
                        Times New Roman=times new roman,times;
                        Wingdings=wingdings,zapf dingbats
                    `,
                    fontsize_formats: '初号=44pt 小初=36pt 一号=26pt 小一=24pt 二号=22pt 小二=18pt 三号=16pt 小三=15pt 四号=14pt 小四=12pt 五号=10.5pt 小五=9pt',
                    formats: {
                        p: {
                            selector : 'p, span, a',
                            styles: { textIndent: '2em', fontSize: '14pt', lineHeight: '1.5', margin: '0' },
                        },
                    },
                    images_upload_handler: (blobInfo, success, failure) => {
                        // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
                        success('http://i1.sinaimg.cn/ent/d/2008-06-04/U105P28T3D2048907F326DT20080604225106.jpg')
                    }
                },
                myValue:this.value,
                active:true,//利用v-if避免销毁不能再次创建的问题
            };
        },
        watch: {
            value (newValue) {
                this.myValue = newValue
            },
            myValue (newValue) {
                this.$emit('input', newValue)
            }
        },
        mounted() {
            this.createEditor();
        },
        activated () {
            this.createEditor();
        },
        deactivated () {
            this.destroyEditor();
        },
        beforeDestroy () {
            this.destroyEditor();
        },
        methods:{
            onClick(e){
                this.$emit('onClick',e,Tinymce)
            },
            createEditor(){
                Tinymce.init({})
                this.active = true;
            },
            destroyEditor(){         
                this.active = false;
            }
        },
    
    };
</script>
<style lang="less">
    .edit{
        display:block;
    }
</style>