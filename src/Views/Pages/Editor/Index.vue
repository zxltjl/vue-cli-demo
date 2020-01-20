
<template>
    <div>
        <ARow>
            <ACol span="24">
                <h3>tinymce</h3>
                <tinymce v-model="value" :theme="'light'" />
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
                value:'<p>tinymce</p>'
            };
        },
        created(){
        }
    };
</script>

<style>
.ant-col-12{
    padding:20px;
}
</style>