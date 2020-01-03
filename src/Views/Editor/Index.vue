
<template>
    <div>
        <ARow>
            <ACol span="24">
                <h3>wangEditor</h3>
                <WangEditor
                    :value="value"
                    :prefix-cls="'ant-editor-wang'"
                />
            </ACol>
        </Arow>
        <ARow>
            <ACol span="24">
                <h3>tinymce</h3>
                <tinymce v-model="value" />
            </ACol>
        </Arow>
    </div>
</template>

<script>
    import WangEditor from '@/Components/public_c/WangEditor.vue';
    import tinymce from '@/Components/public_c/Tinymce.vue';
    export default {
        components:{
            WangEditor,
            tinymce
        },
        data() {
            return {
                value:'大声道'
            };
        }
    };
</script>

<style>
.ant-col-12{
    padding:20px;
}
</style>