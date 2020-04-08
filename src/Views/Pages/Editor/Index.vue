
<template>
    <div>
        <ARow>
            <ACol span="24">
                <h3>tinymce</h3>
                <tinymce v-model="value" :disabled="disabled" ref="editor" />
            </ACol>
        </Arow>
    </div>
</template>

<script>
    import tinymce from '@/Components/Tinymce/Index.vue';
    export default {
        components:{
            tinymce
        },
        data() {
            return {
                value:'<p>this is tinymce</p>',
                disabled:false
            };
        },
        created(){
        }
    };
</script>

<style lang="less" scoped>
.ant-col-12{
    padding:20px;
}
</style>